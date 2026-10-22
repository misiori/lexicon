export type RelationshipType = 'etymological' | 'semantic' | 'borrowing' | 'translation';

export type ExistentialCategory =
  | 'all'
  | 'longing-nostalgia'
  | 'solitude-nature'
  | 'communal-gathering'
  | 'imperfection-transience'
  | 'creative-possession'
  | 'spirit-epoch';

export interface Morpheme {
  token: string;
  type: 'prefix' | 'root' | 'suffix' | 'verb-stem' | 'particle';
  originalScript?: string;
  meaning: string;
  ancestralForm: string;
  ancestralLanguage: string;
  cognateNotes?: string;
}

export interface RelatedWord {
  word: string;
  language: string;
  languageCode?: string;
  relationshipType: RelationshipType;
  explanation: string;
  targetId?: string; // If this word exists in Lexicon
}

export interface ExampleSentence {
  quote: string;
  translation?: string;
  source?: string;
}

export interface WordSense {
  definition: string;
  register?: string; // e.g. "poetic", "colloquial", "formal", "philosophical"
  examples?: ExampleSentence[];
}

export interface EtymologicalRoot {
  root: string;
  language: string;
  meaning: string;
}

export type ConstituentRoot = EtymologicalRoot;

export interface HistoricalForm {
  period: string; // e.g. "Proto-Indo-European", "Old High German", "Classical Latin"
  form: string;
  meaning?: string;
}

export interface HistoricalTimelineNode {
  era: string; // e.g. "Prehistoric (~3500 BCE)", "Classical Antiquity (c. 100 BCE)", "Middle Ages (12th c.)"
  date: string;
  language: string;
  form: string;
  meaning: string;
  historicalContext: string;
}

export interface EtymologyData {
  protoRoot?: string;
  origin: string;
  certaintyLevel: 'established' | 'reconstructed' | 'disputed' | 'uncertain';
  centuryOfFirstAttestation?: string;
  phoneticShifts?: string[];
  roots: EtymologicalRoot[];
  historicalForms?: HistoricalForm[];
  timeline?: HistoricalTimelineNode[];
  semanticShifts?: string;
  notes?: string;
}

export interface CulturalContextData {
  summary: string;
  nuances: string[];
  socialSignificance?: string;
}

export interface PhonaestheticData {
  prosody: string;
  symbolism: string;
}

export interface WordEntry {
  id: string; // unique slug e.g. "sobremesa"
  word: string;
  script?: string; // native script if different from romanized, e.g. "木漏れ日"
  transliteration?: string;
  language: string;
  languageCode: string; // e.g. "es", "ja", "de", "pt"
  partOfSpeech: string;
  ipa?: string;
  audioUrl?: string;
  shortDefinition: string;
  linguisticNote?: string;
  existentialCategory?: ExistentialCategory;
  morphemes?: Morpheme[];
  phonaesthetics?: PhonaestheticData;
  senses: WordSense[];
  etymology: EtymologyData;
  relatedWords: RelatedWord[];
  culturalContext?: CulturalContextData;
  source: {
    name: string;
    url?: string;
    isCurated: boolean;
    isExternal: boolean;
  };
}

export type ActiveNavTab = 'explore' | 'search' | 'saved' | 'history' | 'about';

