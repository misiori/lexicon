/**
 * Wiktionary Definition Service
 * Fetches accurate, real dictionary definitions and senses directly from Wiktionary
 * with native support for Spanish and English bilingual definitions.
 */

export interface WiktionarySense {
  definition: string; // Primary definition (in English for global consistency)
  definitionEs?: string; // Spanish definition
  definitionEn?: string; // English definition
  register?: string;
  examples?: Array<{ quote: string; translation?: string }>;
}

export interface WiktionaryResult {
  word: string;
  language: string;
  languageCode: string;
  partOfSpeech: string;
  shortDefinition: string;
  shortDefinitionEs?: string;
  shortDefinitionEn?: string;
  senses: WiktionarySense[];
  source: string;
}

/**
 * Strips HTML tags and decodes common HTML entities from Wiktionary definition markup.
 */
export function cleanWiktionaryHtml(html: string): string {
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

/**
 * Fetches native Spanish definition from es.wiktionary.org
 */
export async function fetchNativeSpanishDefinition(cleanWord: string, depth = 0): Promise<string | null> {
  if (depth > 1) return null;
  try {
    const res = await fetch(
      `https://es.wiktionary.org/w/api.php?action=parse&page=${encodeURIComponent(cleanWord)}&prop=wikitext&format=json&origin=*`,
      {
        headers: {
          'User-Agent': 'LexiconApp/1.0 (academic dictionary; contact: info@example.com)',
        },
      }
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
          const baseDef = await fetchNativeSpanishDefinition(baseWord, depth + 1);
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
    // Non-blocking fallback
  }
  return null;
}

/**
 * Parses raw Wiktionary REST API payload into structured definitions and senses.
 */
export function parseWiktionaryPayload(
  data: any,
  originalWord: string,
  languageHint?: string
): WiktionaryResult | null {
  if (!data || typeof data !== 'object') return null;

  const isSpanish =
    languageHint === 'es' ||
    languageHint === 'spanish' ||
    Boolean(data.es) ||
    /[áéíóúñ¿¡]/i.test(originalWord);

  let chosenLangCode = 'en';
  let chosenLangName = 'English';
  let langSections: any[] = [];

  if (isSpanish && data.es) {
    chosenLangCode = 'es';
    chosenLangName = 'Spanish';
    langSections = data.es;
  } else if (languageHint && languageHint !== 'all' && data[languageHint]) {
    chosenLangCode = languageHint;
    chosenLangName = languageHint.toUpperCase();
    langSections = data[languageHint];
  } else if (data.en) {
    chosenLangCode = 'en';
    chosenLangName = 'English';
    langSections = data.en;
  } else {
    const nonOtherKey = Object.keys(data).find((k) => k !== 'other');
    if (nonOtherKey && data[nonOtherKey]) {
      chosenLangCode = nonOtherKey;
      chosenLangName = nonOtherKey === 'es' ? 'Spanish' : nonOtherKey.toUpperCase();
      langSections = data[nonOtherKey];
    }
  }

  if (!Array.isArray(langSections) || langSections.length === 0) {
    return null;
  }

  // Prioritize primary lexical categories over symbols, abbreviations, codes
  const posPriority = [
    'Noun',
    'Verb',
    'Adjective',
    'Adverb',
    'Pronoun',
    'Preposition',
    'Conjunction',
    'Interjection',
    'Phrase',
    'Idiom',
  ];

  const sortedSections = [...langSections].sort((a, b) => {
    const idxA = posPriority.indexOf(a.partOfSpeech || '');
    const idxB = posPriority.indexOf(b.partOfSpeech || '');
    const scoreA = idxA !== -1 ? idxA : 99;
    const scoreB = idxB !== -1 ? idxB : 99;
    return scoreA - scoreB;
  });

  const senses: WiktionarySense[] = [];
  let detectedPos = sortedSections[0]?.partOfSpeech || 'noun';

  for (const section of sortedSections) {
    const pos = (section.partOfSpeech || '').toLowerCase();
    const defs = section.definitions || [];

    for (const defObj of defs) {
      const rawDef = defObj.definition || '';
      const plain = cleanWiktionaryHtml(rawDef);

      if (!plain || plain.length < 3) continue;

      const examples: Array<{ quote: string; translation?: string }> = [];
      if (Array.isArray(defObj.parsedExamples)) {
        for (const ex of defObj.parsedExamples) {
          const rawEx = ex.example || (typeof ex === 'string' ? ex : '');
          const plainEx = cleanWiktionaryHtml(rawEx);
          const rawTrans = ex.translation || '';
          const plainTrans = cleanWiktionaryHtml(rawTrans);
          if (plainEx && plainEx.length > 3) {
            examples.push({
              quote: plainEx,
              translation: plainTrans || undefined,
            });
          }
        }
      }

      senses.push({
        definition: plain,
        definitionEn: plain,
        register: pos || undefined,
        examples: examples.length > 0 ? examples.slice(0, 2) : undefined,
      });
    }
  }

  if (senses.length === 0) {
    return null;
  }

  return {
    word: originalWord,
    language: chosenLangName,
    languageCode: chosenLangCode,
    partOfSpeech: detectedPos.toLowerCase(),
    shortDefinition: senses[0].definition,
    shortDefinitionEn: senses[0].definition,
    senses: senses.slice(0, 8),
    source: 'Wiktionary',
  };
}

/**
 * Fetches word definitions from Wiktionary.
 * Checks backend endpoint /api/definition/:word first, then direct Wikimedia REST API,
 * and fetches native Spanish definitions when applicable.
 */
export async function fetchWiktionaryDefinition(
  rawWord: string,
  languageHint?: string
): Promise<WiktionaryResult | null> {
  const cleanWord = rawWord.trim();
  if (!cleanWord) return null;

  // 1. Try server-side endpoint first with language hint
  try {
    const langParam = languageHint ? `?lang=${encodeURIComponent(languageHint)}` : '';
    const res = await fetch(`/api/definition/${encodeURIComponent(cleanWord.toLowerCase())}${langParam}`);
    if (res.ok) {
      const result = await res.json();
      if (result && result.shortDefinition && result.senses?.length > 0) {
        return result;
      }
    }
  } catch {
    // Continue to direct client fetch
  }

  // 2. Direct Wikimedia REST API with case variants
  const variants = [
    cleanWord.toLowerCase(),
    cleanWord,
    cleanWord.charAt(0).toUpperCase() + cleanWord.slice(1).toLowerCase(),
  ];

  for (const variant of variants) {
    try {
      const res = await fetch(
        `https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(variant)}`,
        {
          headers: {
            'User-Agent': 'LexiconApp/1.0 (academic lexeme index)',
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        const parsed = parseWiktionaryPayload(data, cleanWord, languageHint);
        if (parsed) {
          // If Spanish, also fetch native Spanish definition concurrently
          if (parsed.languageCode === 'es' || languageHint === 'es') {
            const nativeEs = await fetchNativeSpanishDefinition(cleanWord);
            if (nativeEs) {
              parsed.shortDefinitionEs = nativeEs;
              if (parsed.senses[0]) {
                parsed.senses[0].definitionEs = nativeEs;
              }
            }
          }
          return parsed;
        }
      }
    } catch {
      // Try next variant
    }
  }

  // 3. Native Spanish Wiktionary direct lookup if hinted or Spanish
  if (languageHint === 'es' || /[áéíóúñ¿¡]/i.test(cleanWord)) {
    const nativeEs = await fetchNativeSpanishDefinition(cleanWord);
    if (nativeEs) {
      return {
        word: cleanWord,
        language: 'Spanish',
        languageCode: 'es',
        partOfSpeech: /(ar|er|ir)$/i.test(cleanWord) ? 'verb' : 'noun',
        shortDefinition: nativeEs,
        shortDefinitionEs: nativeEs,
        shortDefinitionEn: `Spanish lexical entry for "${cleanWord}".`,
        senses: [
          {
            definition: nativeEs,
            definitionEs: nativeEs,
            definitionEn: `Spanish lexical entry for "${cleanWord}".`,
            register: /(ar|er|ir)$/i.test(cleanWord) ? 'verb' : 'noun',
          },
        ],
        source: 'Wiktionary (Español)',
      };
    }
  }

  // 4. Fallback: Free Dictionary API for English
  try {
    const dictRes = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord.toLowerCase())}`
    );
    if (dictRes.ok) {
      const entries = await dictRes.json();
      if (Array.isArray(entries) && entries.length > 0) {
        const entry = entries[0];
        const senses: WiktionarySense[] = [];
        let detectedPos = 'noun';

        for (const meaning of entry.meanings || []) {
          const pos = meaning.partOfSpeech || 'noun';
          if (!detectedPos) detectedPos = pos;

          for (const def of meaning.definitions || []) {
            if (def.definition) {
              const examples = def.example ? [{ quote: def.example }] : undefined;
              senses.push({
                definition: def.definition,
                definitionEn: def.definition,
                register: pos,
                examples,
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
    // Ignore and return null
  }

  return null;
}
