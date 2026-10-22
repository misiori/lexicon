/**
 * Wiktionary Definition Service
 * Fetches accurate, real dictionary definitions and senses directly from Wiktionary
 * (with fallback to the Free Dictionary API).
 */

export interface WiktionarySense {
  definition: string;
  register?: string;
  examples?: Array<{ quote: string; translation?: string }>;
}

export interface WiktionaryResult {
  word: string;
  partOfSpeech: string;
  shortDefinition: string;
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
 * Parses raw Wiktionary REST API payload into structured definitions and senses.
 */
export function parseWiktionaryPayload(
  data: any,
  originalWord: string
): WiktionaryResult | null {
  if (!data || typeof data !== 'object') return null;

  // Prefer English language definitions first ('en'), then any available language key
  const langSections = data.en || data[Object.keys(data)[0]] || [];
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

      // Skip empty or trivial entries
      if (!plain || plain.length < 3) continue;

      const examples: Array<{ quote: string }> = [];
      if (Array.isArray(defObj.parsedExamples)) {
        for (const ex of defObj.parsedExamples) {
          const rawEx = ex.example || (typeof ex === 'string' ? ex : '');
          const plainEx = cleanWiktionaryHtml(rawEx);
          if (plainEx && plainEx.length > 4) {
            examples.push({ quote: plainEx });
          }
        }
      }

      senses.push({
        definition: plain,
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
    partOfSpeech: detectedPos.toLowerCase(),
    shortDefinition: senses[0].definition,
    senses: senses.slice(0, 8),
    source: 'Wiktionary',
  };
}

/**
 * Fetches word definitions from Wiktionary.
 * Checks backend endpoint /api/definition/:word first, then direct Wikimedia REST API,
 * and falls back to Free Dictionary API if Wiktionary does not have an entry.
 */
export async function fetchWiktionaryDefinition(
  rawWord: string
): Promise<WiktionaryResult | null> {
  const cleanWord = rawWord.trim();
  if (!cleanWord) return null;

  // 1. Try server-side endpoint first (avoids browser CORS & network quirks)
  try {
    const res = await fetch(`/api/definition/${encodeURIComponent(cleanWord.toLowerCase())}`);
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
        const parsed = parseWiktionaryPayload(data, cleanWord);
        if (parsed) return parsed;
      }
    } catch {
      // Try next variant
    }
  }

  // 3. Fallback: Free Dictionary API
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
                register: pos,
                examples,
              });
            }
          }
        }

        if (senses.length > 0) {
          return {
            word: cleanWord,
            partOfSpeech: detectedPos,
            shortDefinition: senses[0].definition,
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
