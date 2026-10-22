import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Gemini SDK with User-Agent header for server-side telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Timeout helper to guarantee low latency if external services experience traffic spikes
function withTimeout<T>(promise: Promise<T>, ms = 2500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('API timed out')), ms)),
  ]);
}

function cleanWiktionaryHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#91;/g, '[')
    .replace(/&#93;/g, ']')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchSpanishWiktionaryDefinition(word: string, depth = 0): Promise<string | null> {
  if (depth > 1) return null;
  try {
    const res = await withTimeout(
      fetch(
        `https://es.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(word)}&prop=wikitext&format=json`,
        {
          headers: {
            'User-Agent': 'LexiconApp/1.0 (academic dictionary; contact: info@example.com)',
          },
        }
      ),
      2500
    );
    if (!res.ok) return null;
    const data: any = await res.json();
    const wikitext = data?.parse?.wikitext?.['*'] || '';
    if (!wikitext) return null;

    const lines = wikitext.split('\n');
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (/^(;[0-9]+|:[0-9]+|\*[0-9]+)/.test(line)) {
        const formaMatch = line.match(/\{\{forma (?:sustantivo|adjetivo)\|([^|}]+)\|femenino/i);
        if (formaMatch && formaMatch[1]) {
          const baseWord = formaMatch[1];
          const baseDef = await fetchSpanishWiktionaryDefinition(baseWord, depth + 1);
          if (baseDef) {
            return `Forma femenina de ${baseWord}: ${baseDef.toLowerCase().replace(/padre del padre/g, 'madre del padre')}`;
          }
          return `Forma femenina de ${baseWord}.`;
        }

        const cleaned = line
          .replace(/^(;[0-9]+:?|:[0-9]+:?|\*[0-9]+:?)\s*/, '')
          .replace(/\[\[([^|\]]+\|)?([^\]]+)\]\]/g, '$2')
          .replace(/\{\{[^}]+\}\}/g, '')
          .replace(/^[:;]\s*/, '')
          .trim();
        if (cleaned.length > 5) {
          return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
        }
      }
    }
  } catch {
    // Ignore timeout or fetch error
  }
  return null;
}

function isSpanishWordCandidate(word: string, hint?: string, data?: any): boolean {
  if (hint === 'es' || hint === 'spanish') return true;
  const w = word.toLowerCase().trim();
  if (/[áéíóúñ¿¡]/i.test(w)) return true;
  if (/(uela|uelo|illa|illo|ita|ito|ero|era|oso|osa|ado|ada|ido|ida|eza|ura|miento|ción|sión|dad|tad|mente|ar|er|ir)$/i.test(w)) return true;
  if (/^(abuel[ao]|amig[ao]|t[ií][ao]|herman[ao]|prim[ao]|padre|madre|hij[ao]|niñ[ao]|niet[ao]|churr[ao]s?|tac[ao]s?|burrit[ao]s?|salsas?|fiestas?|siestas?|haciendas?|sombreros?|quesos?|tortillas?|cervezas?)$/i.test(w)) return true;
  
  if (data && data.es) {
    if (!data.en) return true;
    const enDef = cleanWiktionaryHtml(data.en?.[0]?.definitions?.[0]?.definition || '').toLowerCase();
    if (/(hispanic|spanish|borrowed from spanish|in spain|in mexico|in latin america)/i.test(enDef)) {
      return true;
    }
  }
  return false;
}

async function fetchWiktionaryDirect(rawWord: string, languageHint?: string) {
  const cleanWord = rawWord.trim();
  if (!cleanWord) return null;

  const initialSpanish = isSpanishWordCandidate(cleanWord, languageHint);

  const variants = [
    cleanWord.toLowerCase(),
    cleanWord,
    cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1).toLowerCase(),
  ];

  let nativeSpanishDef: string | null = null;
  if (initialSpanish) {
    nativeSpanishDef = await fetchSpanishWiktionaryDefinition(cleanWord);
  }

  for (const variant of variants) {
    try {
      const res = await fetch(
        `https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(variant)}`,
        {
          headers: {
            'User-Agent': 'LexiconApp/1.0 (academic dictionary; contact: info@example.com)',
          },
        }
      );
      if (!res.ok) continue;
      const data: any = await res.json();

      let langSections: any[] = [];
      let detectedLang = 'English';
      let detectedLangCode = 'en';

      const isWordSpanish = isSpanishWordCandidate(cleanWord, languageHint, data);

      if (isWordSpanish && data.es) {
        langSections = data.es;
        detectedLang = 'Spanish';
        detectedLangCode = 'es';
        if (!nativeSpanishDef) {
          nativeSpanishDef = await fetchSpanishWiktionaryDefinition(cleanWord);
        }
      } else if (languageHint && languageHint !== 'all' && data[languageHint]) {
        langSections = data[languageHint];
        detectedLang = languageHint === 'es' ? 'Spanish' : languageHint.toUpperCase();
        detectedLangCode = languageHint;
      } else if (data.es && !data.en) {
        langSections = data.es;
        detectedLang = 'Spanish';
        detectedLangCode = 'es';
      } else if (data.en) {
        langSections = data.en;
        detectedLang = 'English';
        detectedLangCode = 'en';
      } else if (data.es) {
        langSections = data.es;
        detectedLang = 'Spanish';
        detectedLangCode = 'es';
      } else {
        const nonOther = Object.keys(data).find((k) => k !== 'other');
        if (nonOther && data[nonOther]) {
          langSections = data[nonOther];
          detectedLang = nonOther === 'es' ? 'Spanish' : nonOther.toUpperCase();
          detectedLangCode = nonOther;
        }
      }

      if (!Array.isArray(langSections) || langSections.length === 0) continue;

      const posPriority = [
        'Noun', 'Verb', 'Adjective', 'Adverb', 'Pronoun', 'Preposition', 'Conjunction', 'Interjection'
      ];
      const sorted = [...langSections].sort((a, b) => {
        const idxA = posPriority.indexOf(a.partOfSpeech || '');
        const idxB = posPriority.indexOf(b.partOfSpeech || '');
        return (idxA !== -1 ? idxA : 99) - (idxB !== -1 ? idxB : 99);
      });

      const senses: Array<{
        definition: string;
        definitionEs?: string;
        definitionEn?: string;
        register?: string;
        examples?: Array<{ quote: string; translation?: string }>;
      }> = [];
      let detectedPos = sorted[0]?.partOfSpeech || 'noun';

      for (const sec of sorted) {
        const pos = (sec.partOfSpeech || '').toLowerCase();
        for (const defObj of sec.definitions || []) {
          const plain = cleanWiktionaryHtml(defObj.definition || '');
          if (!plain || plain.length < 3) continue;

          const examples: Array<{ quote: string; translation?: string }> = [];
          if (Array.isArray(defObj.parsedExamples)) {
            for (const ex of defObj.parsedExamples) {
              const exText = cleanWiktionaryHtml(ex.example || (typeof ex === 'string' ? ex : ''));
              const exTrans = cleanWiktionaryHtml(ex.translation || '');
              if (exText && exText.length > 4) {
                examples.push({
                  quote: exText,
                  translation: exTrans || undefined,
                });
              }
            }
          }

          senses.push({
            definition: plain,
            definitionEn: plain,
            definitionEs: nativeSpanishDef || undefined,
            register: pos || undefined,
            examples: examples.length > 0 ? examples.slice(0, 2) : undefined,
          });
        }
      }

      if (senses.length > 0) {
        return {
          word: cleanWord,
          language: detectedLang,
          languageCode: detectedLangCode,
          partOfSpeech: detectedPos.toLowerCase(),
          shortDefinition: senses[0].definition,
          shortDefinitionEn: senses[0].definition,
          shortDefinitionEs: nativeSpanishDef || undefined,
          senses: senses.slice(0, 8),
          source: 'Wiktionary',
        };
      }
    } catch {
      // try next variant
    }
  }

  // If native Spanish definition found without en.wiktionary
  if (nativeSpanishDef) {
    return {
      word: cleanWord,
      language: 'Spanish',
      languageCode: 'es',
      partOfSpeech: /(ar|er|ir)$/i.test(cleanWord) ? 'verb' : 'noun',
      shortDefinition: nativeSpanishDef,
      shortDefinitionEs: nativeSpanishDef,
      shortDefinitionEn: `Spanish lexical entry for "${cleanWord}".`,
      senses: [
        {
          definition: nativeSpanishDef,
          definitionEs: nativeSpanishDef,
          definitionEn: `Spanish lexical entry for "${cleanWord}".`,
          register: /(ar|er|ir)$/i.test(cleanWord) ? 'verb' : 'noun',
        },
      ],
      source: 'Wiktionary (Español)',
    };
  }

  // Fallback to Free Dictionary API for English
  try {
    const dictRes = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord.toLowerCase())}`
    );
    if (dictRes.ok) {
      const entries: any = await dictRes.json();
      if (Array.isArray(entries) && entries.length > 0) {
        const entry = entries[0];
        const senses: Array<{ definition: string; definitionEn?: string; register?: string; examples?: Array<{ quote: string }> }> = [];
        let detectedPos = 'noun';

        for (const meaning of entry.meanings || []) {
          const pos = meaning.partOfSpeech || 'noun';
          if (!detectedPos) detectedPos = pos;
          for (const def of meaning.definitions || []) {
            if (def.definition) {
              senses.push({
                definition: def.definition,
                definitionEn: def.definition,
                register: pos,
                examples: def.example ? [{ quote: def.example }] : undefined,
              });
            }
          }
        }

        if (senses.length > 0) {
          return {
            word: cleanWord,
            language: 'English',
            languageCode: 'en',
            partOfSpeech: detectedPos,
            shortDefinition: senses[0].definition,
            shortDefinitionEn: senses[0].definition,
            senses: senses.slice(0, 8),
            source: 'Open Dictionary',
          };
        }
      }
    }
  } catch {
    // Ignore
  }

  return null;
}

// Wiktionary Definition API: returns real definitions and senses for any searched word
app.get('/api/definition/:word', async (req, res) => {
  const langHint = (req.query.lang as string) || undefined;
  const result = await fetchWiktionaryDirect(req.params.word, langHint);
  if (!result) {
    return res.status(404).json({ error: 'Definition not found' });
  }
  return res.json(result);
});

// Full-stack Etymology & Historical Roots Reconstructor API
app.post('/api/etymology', async (req, res) => {
  const { word, languageHint } = req.body;
  if (!word || typeof word !== 'string') {
    return res.status(400).json({ error: 'Word parameter is required' });
  }

  const cleanWord = word.trim().toLowerCase();
  const wiktionaryMeaning = await fetchWiktionaryDirect(cleanWord, languageHint);

  try {
    const prompt = `Perform a comprehensive, scientifically rigorous historical etymology and philological reconstruction for the word: "${cleanWord}".
${wiktionaryMeaning ? `Documented dictionary meaning: "${wiktionaryMeaning.shortDefinition}".` : ''}
You are an expert comparative philologist specializing in Proto-Indo-European (PIE), Proto-Germanic, Latin, Ancient Greek, Proto-Japonic, and world linguistic history.
Ensure every historical timeline stage, reconstructed proto-form with asterisks (e.g. *wódr̥, *meh₂tēr, *nókʷts), attested historical forms (e.g. Old English wæter, Classical Latin, Homeric Greek), phonetic sound shifts (e.g. Grimm's Law, Verner's Law, vowel shifts, palatalization), constituent roots, and historical evolution are philologically verified. Avoid popular internet folk myths.`;

    const response = await withTimeout(ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are an academic historical linguistics engine. Return strictly structured JSON adhering to the provided schema with precise historical linguistic data and genuine reconstructed ancestral forms.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING },
            language: { type: Type.STRING },
            languageCode: { type: Type.STRING },
            partOfSpeech: { type: Type.STRING },
            ipa: { type: Type.STRING },
            shortDefinition: { type: Type.STRING },
            protoRoot: {
              type: Type.STRING,
              description: 'Reconstructed ancestral proto-root e.g. PIE *wódr̥ or Proto-Germanic *watōr',
            },
            centuryOfFirstAttestation: {
              type: Type.STRING,
              description: 'Earliest documented historical period or century e.g. 8th c. CE, 8th c. BCE',
            },
            origin: {
              type: Type.STRING,
              description: 'Detailed etymological origin narrative with linguistic depth',
            },
            certaintyLevel: {
              type: Type.STRING,
              enum: ['established', 'reconstructed', 'uncertain'],
            },
            phoneticShifts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Key phonetic shifts, sound laws (Grimm\'s law, lenition, vowel shifts)',
            },
            timeline: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  era: { type: Type.STRING },
                  date: { type: Type.STRING },
                  language: { type: Type.STRING },
                  form: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                  historicalContext: { type: Type.STRING },
                },
                required: ['era', 'date', 'language', 'form', 'meaning', 'historicalContext'],
              },
            },
            roots: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  root: { type: Type.STRING },
                  language: { type: Type.STRING },
                  meaning: { type: Type.STRING },
                },
                required: ['root', 'language', 'meaning'],
              },
            },
            morphemes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  token: { type: Type.STRING },
                  type: {
                    type: Type.STRING,
                    enum: ['prefix', 'root', 'suffix', 'verb-stem', 'particle'],
                  },
                  meaning: { type: Type.STRING },
                  ancestralForm: { type: Type.STRING },
                  ancestralLanguage: { type: Type.STRING },
                  cognateNotes: { type: Type.STRING },
                },
                required: ['token', 'type', 'meaning', 'ancestralForm', 'ancestralLanguage'],
              },
            },
            senses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  definition: { type: Type.STRING },
                  register: { type: Type.STRING },
                },
                required: ['definition'],
              },
            },
            relatedWords: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  language: { type: Type.STRING },
                  relationshipType: {
                    type: Type.STRING,
                    enum: ['etymological', 'semantic', 'borrowing', 'translation'],
                  },
                  explanation: { type: Type.STRING },
                },
                required: ['word', 'language', 'relationshipType', 'explanation'],
              },
            },
            culturalContext: {
              type: Type.OBJECT,
              properties: {
                summary: { type: Type.STRING },
                nuances: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['summary'],
            },
          },
          required: [
            'word',
            'language',
            'languageCode',
            'partOfSpeech',
            'shortDefinition',
            'protoRoot',
            'origin',
            'timeline',
            'senses',
            'relatedWords',
          ],
        },
      },
    }));

    let parsed: any = null;
    try {
      parsed = JSON.parse(response.text || '{}');
    } catch {
      parsed = null;
    }

    if (parsed && parsed.protoRoot) {
      if (wiktionaryMeaning) {
        parsed.shortDefinition = wiktionaryMeaning.shortDefinition;
        if (wiktionaryMeaning.senses?.length > 0) {
          parsed.senses = wiktionaryMeaning.senses;
        }
        if (wiktionaryMeaning.partOfSpeech) {
          parsed.partOfSpeech = wiktionaryMeaning.partOfSpeech;
        }
      }
      return res.json(parsed);
    }
    throw new Error('Incomplete response structure');
  } catch (error) {
    console.warn('Gemini 3.8 flash unavailable, attempting fallback model or philological reconstructor:', error);
    try {
      // Try gemini-3.1-flash-lite with fast timeout
      const response2 = await withTimeout(
        ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: `Perform a scientifically rigorous historical etymology and root reconstruction for "${cleanWord}". Output strictly valid JSON with fields: word, language, languageCode, partOfSpeech, shortDefinition, protoRoot, centuryOfFirstAttestation, origin, certaintyLevel, phoneticShifts, timeline (array of {era, date, language, form, meaning, historicalContext}), roots (array of {root, language, meaning}), senses (array of {definition}).`,
          config: {
            responseMimeType: 'application/json',
          },
        }),
        2500
      );
      const parsed2 = JSON.parse(response2.text || '{}');
      if (parsed2 && parsed2.protoRoot) {
        if (wiktionaryMeaning) {
          parsed2.shortDefinition = wiktionaryMeaning.shortDefinition;
          if (wiktionaryMeaning.senses?.length > 0) {
            parsed2.senses = wiktionaryMeaning.senses;
          }
          if (wiktionaryMeaning.partOfSpeech) {
            parsed2.partOfSpeech = wiktionaryMeaning.partOfSpeech;
          }
        }
        return res.json(parsed2);
      }
    } catch (fallbackError) {
      console.warn('Secondary model unavailable, falling back to local reconstructor:', fallbackError);
    }

    // Dynamic import of reconstructEtymology so server never fails
    try {
      const { reconstructEtymology } = await import('./src/services/etymologyReconstructor.ts');
      const entry = reconstructEtymology(
        cleanWord,
        wiktionaryMeaning
          ? {
              definition: wiktionaryMeaning.shortDefinition,
              definitionEs: wiktionaryMeaning.shortDefinitionEs,
              definitionEn: wiktionaryMeaning.shortDefinitionEn,
              senses: wiktionaryMeaning.senses,
              partOfSpeech: wiktionaryMeaning.partOfSpeech,
              sourceName: 'Wiktionary',
              sourceUrl: `https://en.wiktionary.org/wiki/${encodeURIComponent(cleanWord)}`,
              language: wiktionaryMeaning.language,
              languageCode: wiktionaryMeaning.languageCode,
            }
          : undefined,
        languageHint || wiktionaryMeaning?.languageCode
      );
      return res.json({
        word: entry.word,
        language: entry.language,
        languageCode: entry.languageCode,
        partOfSpeech: entry.partOfSpeech,
        shortDefinition: entry.shortDefinition,
        shortDefinitionEs: entry.shortDefinitionEs,
        shortDefinitionEn: entry.shortDefinitionEn,
        protoRoot: entry.etymology.protoRoot,
        centuryOfFirstAttestation: entry.etymology.centuryOfFirstAttestation,
        origin: entry.etymology.origin,
        certaintyLevel: entry.etymology.certaintyLevel,
        phoneticShifts: entry.etymology.phoneticShifts,
        roots: entry.etymology.roots,
        timeline: entry.etymology.timeline,
        senses: entry.senses,
        relatedWords: entry.relatedWords,
        culturalContext: entry.culturalContext,
      });
    } catch (localErr) {
      console.error('All etymology reconstruction paths failed:', localErr);
      return res.status(500).json({ error: 'Failed to reconstruct etymology' });
    }
  }
});


// Mount Vite middleware in development or serve static build in production
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Lexicon full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
