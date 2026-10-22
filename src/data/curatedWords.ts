import { WordEntry } from '../types/lexicon';

export const CURATED_WORDS: WordEntry[] = [
  {
    id: 'sobremesa',
    word: 'sobremesa',
    language: 'Spanish',
    languageCode: 'es',
    partOfSpeech: 'noun, feminine',
    ipa: '/so.βɾeˈme.sa/',
    shortDefinition: 'The time spent lingering around the table after a meal, engaged in conversation.',
    linguisticNote: 'Compound noun combining the preposition sobre ("over/upon") with mesa ("table"). Attested in Spanish literature since the 16th century.',
    existentialCategory: 'communal-gathering',
    morphemes: [
      {
        token: 'sobre',
        type: 'prefix',
        meaning: 'over, above, upon',
        ancestralForm: 'super',
        ancestralLanguage: 'Classical Latin',
        cognateNotes: 'Cognate with English over and Greek hyper.',
      },
      {
        token: 'mesa',
        type: 'root',
        meaning: 'table, board, dining surface',
        ancestralForm: 'mensa',
        ancestralLanguage: 'Classical Latin',
        cognateNotes: 'From PIE *me-nt- (that which is measured/set).',
      },
    ],
    phonaesthetics: {
      prosody: 'Trochaic cadence ending in open vowels (-e-a), evoking casual, unhurried breath.',
      symbolism: 'Soft bilabial /β/ and unhurried alveolar /s/ mimic the relaxed murmur of conversation over empty plates.',
    },
    senses: [
      {
        definition: 'The lingering conversation around the dining table that follows breakfast, lunch, or dinner, extending long after the food has been consumed.',
        register: 'everyday / cultural',
        examples: [
          {
            quote: 'La sobremesa duró hasta bien entrada la tarde.',
            translation: 'The post-meal conversation lasted well into the late afternoon.'
          },
          {
            quote: 'En las fiestas familiares, la sobremesa es más larga que la propia comida.',
            translation: 'In family celebrations, the time around the table is longer than the meal itself.'
          }
        ]
      },
      {
        definition: 'A dessert, sweet wine, or coffee served during this period of relaxed fellowship.',
        register: 'regional / traditional'
      }
    ],
    etymology: {
      protoRoot: 'PIE *me-nt-t-eh₂ + Latin super',
      origin: 'Derived from Old Spanish sobre- (from Latin super, "above, upon") and mesa (from Latin mensa, "table, food, course of a feast").',
      certaintyLevel: 'established',
      centuryOfFirstAttestation: 'Late 15th c. (c. 1490)',
      phoneticShifts: [
        'Latin super > Old Spanish sobre (lenition of intervocalic /p/ to voiced /b/)',
        'Latin mensa > Spanish mesa (loss of pre-consonantal nasal /n/)',
        'Compound lexicalization: [sobre + mesa] > sobremesa',
      ],
      roots: [
        { root: 'super', language: 'Classical Latin', meaning: 'over, above, beyond' },
        { root: 'mensa', language: 'Classical Latin', meaning: 'table, altar, board' },
        { root: '*me-nt-t-eh₂', language: 'Proto-Indo-European', meaning: 'to measure; that which is set' }
      ],
      historicalForms: [
        { period: 'Classical Latin (c. 100 BCE)', form: 'super mensam', meaning: 'above or at the table' },
        { period: 'Medieval Spanish (c. 1490)', form: 'sobre mesa', meaning: 'tablecloth; discourse at table' },
        { period: 'Early Modern Spanish (1611, Covarrubias)', form: 'sobremesa', meaning: 'conversation had while lingering after eating' }
      ],
      timeline: [
        {
          era: 'Indo-European Antiquity',
          date: '~3000 BCE',
          language: 'Proto-Indo-European',
          form: '*me-nt-t-eh₂',
          meaning: 'that which is set down or measured',
          historicalContext: 'Nominal root designating portions laid out during communal sacrificial meals.',
        },
        {
          era: 'Roman Republic & Empire',
          date: '1st c. BCE',
          language: 'Classical Latin',
          form: 'super mensam',
          meaning: 'over the dining table / during the banquet',
          historicalContext: 'Syntactic phrase used in Roman convivial symposia and legal records.',
        },
        {
          era: 'Medieval Iberia',
          date: 'c. 1490',
          language: 'Old Spanish',
          form: 'sobre mesa',
          meaning: 'cloth draped over the table; casual talk after supper',
          historicalContext: 'Appeared in Antonio de Nebrija\'s early lexicons as an everyday domestic practice.',
        },
        {
          era: 'Siglo de Oro (Golden Age)',
          date: '1611',
          language: 'Early Modern Spanish',
          form: 'sobremesa',
          meaning: 'the communal discourse held while remaining seated after the meal',
          historicalContext: 'Formally codified in Sebastián de Covarrubias\'s Tesoro de la lengua castellana o española.',
        },
      ],
      semanticShifts: 'Shifted from describing a physical object (a cloth covering the table) to the temporal and social ritual occurring upon the cleared table.',
      notes: 'Cognates appear in Portuguese (sobremesa, though in Portuguese it primarily denotes dessert) and Galician (sobremesa).'
    },
    relatedWords: [
      {
        word: 'convivencia',
        language: 'Spanish',
        languageCode: 'es',
        relationshipType: 'semantic',
        explanation: 'The practice or art of living together in mutual tolerance and social harmony.',
        targetId: 'convivencia',
      },
      {
        word: 'tertulia',
        language: 'Spanish',
        languageCode: 'es',
        relationshipType: 'semantic',
        explanation: 'A regular social gathering of literary or artistic friends for conversation and debate.'
      },
      {
        word: 'sobremesa',
        language: 'Portuguese',
        languageCode: 'pt',
        relationshipType: 'etymological',
        explanation: 'Direct morphological cognate; in standard Portuguese, primarily means "dessert" rather than the conversation itself.'
      }
    ],
    culturalContext: {
      summary: 'Sobremesa reflects the Mediterranean ethos where eating is secondary to communal bonding. Rushing away from a table immediately upon finishing food is often regarded as cold or discourteous.',
      nuances: [
        'Often accompanied by café solo, orujo, pacharán, or digestion infusions.',
        'Can last from thirty minutes to several hours, especially during Sunday family meals.',
        'Serves as a democratic forum where politics, literature, and domestic affairs are debated.'
      ],
      socialSignificance: 'Institutionalized in everyday Spanish domestic and social life across Spain and parts of Latin America.'
    },
    source: {
      name: 'Real Academia Española (DLE) & Corominas Diccionario Crítico Etimológico',
      isCurated: true,
      isExternal: false
    }
  },
  {
    id: 'saudade',
    word: 'saudade',
    language: 'Portuguese',
    languageCode: 'pt',
    partOfSpeech: 'noun, feminine',
    ipa: '/sɐwˈda.dɨ/ (PT), /sawˈda.dʒi/ (BR)',
    shortDefinition: 'A deep emotional state of melancholic longing or yearning for a person, place, or time that is absent or lost.',
    linguisticNote: 'Evolution from Old Portuguese soedade, tracing back to Latin solitas ("solitude"), influenced by saudar ("to greet") through popular folk-etymological assimilation.',
    existentialCategory: 'longing-nostalgia',
    morphemes: [
      {
        token: 'soed- / saud-',
        type: 'root',
        meaning: 'alone, solitary',
        ancestralForm: 'solitas (from solus)',
        ancestralLanguage: 'Classical Latin',
        cognateNotes: 'From PIE *se- (apart, on one\'s own).',
      },
      {
        token: '-ade',
        type: 'suffix',
        meaning: 'abstract noun suffix denoting state or condition',
        ancestralForm: '-tatem (acc. of -tas)',
        ancestralLanguage: 'Classical Latin',
        cognateNotes: 'Cognate with English -ty in solitude and Spanish -dad in soledad.',
      },
    ],
    phonaesthetics: {
      prosody: 'Diphthong /aw/ expanding into dental stop /d/ and muted /ɨ/, mimicking an inward inhalation and sigh.',
      symbolism: 'In Lusophone poetic tradition, the open diphthong is felt as a hollow space waiting to be filled.',
    },
    senses: [
      {
        definition: 'An intense, bittersweet yearning for someone or something absent, lost, or distant, accompanied by the tender knowledge that it may never return.',
        register: 'literary / existential',
        examples: [
          {
            quote: 'Tenho saudades da minha infância na beira do mar.',
            translation: 'I feel saudade for my childhood at the seashore.'
          },
          {
            quote: 'A saudade é a presença da ausência.',
            translation: 'Saudade is the presence of absence.'
          }
        ]
      },
      {
        definition: 'Remembrances, warm regards sent to absent friends.',
        register: 'epistolary / conventional',
        examples: [
          {
            quote: 'Mande muitas saudades a todos.',
            translation: 'Send warm regards / remembrances to everyone.'
          }
        ]
      }
    ],
    etymology: {
      protoRoot: 'PIE *se- (apart) > Latin sōlus / sōlitās',
      origin: 'Derived from Old Portuguese soedade/suidade, which developed from Latin solitudo, solitas ("solitude, state of being alone").',
      certaintyLevel: 'established',
      centuryOfFirstAttestation: '13th c. (Cantigas d\'Amigo)',
      phoneticShifts: [
        'Latin solitātem > Vulgar Latin *soledāde (syncope of intertonic vowel)',
        'Galician-Portuguese soedade > suidade (vowel reduction in unstressed position)',
        'Diphthongization: soedade > saudade through assimilation with saudar (Latin salutāre)',
      ],
      roots: [
        { root: 'solus', language: 'Classical Latin', meaning: 'alone, lonely, sole' },
        { root: '-itas', language: 'Classical Latin', meaning: 'abstract noun suffix denoting state or condition' },
        { root: '*se-', language: 'Proto-Indo-European', meaning: 'reflexive base; aside, apart' }
      ],
      historicalForms: [
        { period: 'Classical Latin', form: 'sōlitās / sōlitūdō', meaning: 'solitude, state of being alone' },
        { period: 'Galician-Portuguese (13th c.)', form: 'soedade / soidade', meaning: 'loneliness, spiritual isolation, missing someone' },
        { period: 'Classical Portuguese (15th c.)', form: 'saudade', meaning: 'melancholic longing; altered under contact with saudar' }
      ],
      timeline: [
        {
          era: 'Indo-European Antiquity',
          date: '~3500 BCE',
          language: 'Proto-Indo-European',
          form: '*se-',
          meaning: 'apart, on one\'s own, separated',
          historicalContext: 'Core reflexive particle denoting detachment from the tribe or hearth.',
        },
        {
          era: 'Roman Era',
          date: '1st c. CE',
          language: 'Classical Latin',
          form: 'sōlitās',
          meaning: 'loneliness, seclusion',
          historicalContext: 'Denoted physical absence or uninhabited wilderness in Cicero and Seneca.',
        },
        {
          era: 'Troubadour Era',
          date: 'c. 1280',
          language: 'Galician-Portuguese',
          form: 'soedade',
          meaning: 'the aching absence of the beloved sailor or knight',
          historicalContext: 'Cantigas de Amigo: female poetic voices longing for lovers absent at sea or court.',
        },
        {
          era: 'Age of Discovery',
          date: '1498–1550',
          language: 'Renaissance Portuguese',
          form: 'saudade',
          meaning: 'collective national grief for caravels departed for India and the Americas',
          historicalContext: 'Luis de Camões used saudade to express imperial mourning and exile in The Lusiads.',
        },
      ],
      semanticShifts: 'Evolved from physical isolation/loneliness into an intricate emotional concept synthesizing grief, affection, gratitude, and yearning.',
      notes: 'Frequently romanticized in 19th-century Portuguese Romanticism and early 20th-century Saudosismo movement.'
    },
    relatedWords: [
      {
        word: 'hiraeth',
        language: 'Welsh',
        languageCode: 'cy',
        relationshipType: 'semantic',
        explanation: 'Deep Welsh longing for a homeland or past era with tinges of grief and sorrow.',
        targetId: 'hiraeth',
      },
      {
        word: 'sehnsucht',
        language: 'German',
        languageCode: 'de',
        relationshipType: 'semantic',
        explanation: 'Intense yearning for an indefinable or unreachable state of completion.',
        targetId: 'sehnsucht',
      },
      {
        word: 'soledad',
        language: 'Spanish',
        languageCode: 'es',
        relationshipType: 'etymological',
        explanation: 'Cognate from Latin solitas, though retaining primarily the meaning of solitude or seclusion.'
      },
      {
        word: 'nostalgia',
        language: 'English',
        languageCode: 'en',
        relationshipType: 'semantic',
        explanation: 'Sentimental ache for the past; clinical origin contrasting with saudade\'s poetic origin.',
        targetId: 'nostalgia',
      }
    ],
    culturalContext: {
      summary: 'Often regarded as an untranslatable emotional pillar of Lusophone identity, tied historically to maritime explorations (the Age of Discovery), emigration, and the musical tradition of Fado.',
      nuances: [
        'Central motif in Amália Rodrigues and classical Fado songs.',
        'Not purely sorrowful: includes an appreciation of having loved something deeply enough to mourn its absence.',
        'Distinguished from mere nostalgia because it can yearn for things that never even materialized.'
      ],
      socialSignificance: 'Official "Dia da Saudade" celebrated in Brazil on January 30th; enshrined in Portuguese national literature.'
    },
    source: {
      name: 'Dicionário Houaiss da Língua Portuguesa & Carolina Michaëlis de Vasconcelos',
      isCurated: true,
      isExternal: false
    }
  },
  {
    id: 'waldeinsamkeit',
    word: 'Waldeinsamkeit',
    language: 'German',
    languageCode: 'de',
    partOfSpeech: 'noun, feminine',
    ipa: '/ˈvalt.ʔaɪ̯n.zaːm.kaɪ̯t/',
    shortDefinition: 'The feeling of being alone in the forest and the quiet connection to nature it evokes.',
    linguisticNote: 'Compound noun composed of Wald ("forest, woods") and Einsamkeit ("solitude, loneliness"). Prominently popularized by Romantic poet Ludwig Tieck in 1797.',
    existentialCategory: 'solitude-nature',
    morphemes: [
      {
        token: 'Wald',
        type: 'root',
        meaning: 'forest, wood, untamed tree canopy',
        ancestralForm: '*walþuz',
        ancestralLanguage: 'Proto-Germanic',
        cognateNotes: 'Cognate with English wold / weald.',
      },
      {
        token: 'ein',
        type: 'root',
        meaning: 'one, alone, solitary',
        ancestralForm: '*ainaz',
        ancestralLanguage: 'Proto-Germanic',
        cognateNotes: 'Cognate with English one and lone.',
      },
      {
        token: '-sam',
        type: 'suffix',
        meaning: 'characterized by, inclined to',
        ancestralForm: '*sama-',
        ancestralLanguage: 'Proto-Germanic',
        cognateNotes: 'Cognate with English -some in lonesome.',
      },
      {
        token: '-keit',
        type: 'suffix',
        meaning: 'abstract noun suffix denoting state',
        ancestralForm: '*kheitiz',
        ancestralLanguage: 'Proto-Germanic',
        cognateNotes: 'Equivalent to English -hood / -ness.',
      },
    ],
    phonaesthetics: {
      prosody: 'Dactylic rhythm followed by crisp diphthongs (/aɪ̯n/, /aɪ̯t/), producing an expansive yet enclosed acoustic feel.',
      symbolism: 'The hard dental /t/ at the compound boundaries mimics the crisp sound of dry twigs snapping beneath footfalls on moss.',
    },
    senses: [
      {
        definition: 'The contemplative state of tranquil solitude experienced while deep among trees in a quiet forest; woodland seclusion.',
        register: 'literary / poetic',
        examples: [
          {
            quote: 'Waldeinsamkeit, / Die mich erfreut, / So morgen wie heut.',
            translation: 'Woodland solitude, / Which brings me delight, / Tomorrow as today. (Ludwig Tieck, Der blonde Eckbert)'
          },
          {
            quote: 'In der tiefen Waldeinsamkeit verlor sich all sein Kummer.',
            translation: 'In the deep forest solitude, all his worries dissolved.'
          }
        ]
      }
    ],
    etymology: {
      protoRoot: 'Proto-Germanic *walþuz + *ainaz',
      origin: 'A Germanic nominal compound created by combining Wald ("wood, forest") with Einsamkeit ("solitude", from einsam + abstract suffix -keit).',
      certaintyLevel: 'established',
      centuryOfFirstAttestation: '1797 (Ludwig Tieck)',
      phoneticShifts: [
        'PIE *waldʰ- > Proto-Germanic *walþuz (Grimm\'s Law: *dʰ > *ð > *d)',
        'Old High German walt > Middle High German walt > New High German Wald [valt]',
        'Development of -keit from Middle High German -ic + -heit',
      ],
      roots: [
        { root: '*walþuz', language: 'Proto-Germanic', meaning: 'wooded area, woodland' },
        { root: '*ainaz', language: 'Proto-Germanic', meaning: 'one, alone' },
        { root: '*kheitiz', language: 'Proto-Germanic', meaning: 'manner, nature, appearance (suffix)' }
      ],
      historicalForms: [
        { period: 'Old High German (9th c.)', form: 'walt + einisam', meaning: 'forest + solitary' },
        { period: 'Middle High German (13th c.)', form: 'waldeinsam', meaning: 'isolated in deep woods' },
        { period: 'Romantic Era (1797)', form: 'Waldeinsamkeit', meaning: 'woodland solitude in Tieck\'s Der blonde Eckbert' }
      ],
      timeline: [
        {
          era: 'Germanic Antiquity',
          date: '~500 BCE',
          language: 'Proto-Germanic',
          form: '*walþuz',
          meaning: 'wild upland woodland',
          historicalContext: 'Denoted sacred oak and beech groves outside tribal settlements.',
        },
        {
          era: 'Old High German',
          date: 'c. 850',
          language: 'Old High German',
          form: 'walt',
          meaning: 'forest tract, wooded hill',
          historicalContext: 'Recorded in Otfrid of Weissenburg\'s Gospel Book and early glosses.',
        },
        {
          era: 'German Romanticism',
          date: '1797',
          language: 'New High German',
          form: 'Waldeinsamkeit',
          meaning: 'a sanctuary of poetic solitude restoring the human spirit',
          historicalContext: 'Coined as a lyrical refrain by Ludwig Tieck in his fairy tale Der blonde Eckbert.',
        },
        {
          era: 'American Transcendentalism',
          date: '1858',
          language: 'Transcendentalist English Loan',
          form: 'Waldeinsamkeit',
          meaning: 'mystical oneness with primeval American forests',
          historicalContext: 'Ralph Waldo Emerson titled his famous nature poem directly after the German word.',
        },
      ],
      semanticShifts: 'Originally an emotional neologism of German Romanticism, it captured nature as an antidote to urban fragmentation and industrial disenchantment.',
      notes: 'Ralph Waldo Emerson adopted the term for his 1858 poem "Waldeinsamkeit", bringing it into American transcendentalist thought.'
    },
    relatedWords: [
      {
        word: 'shinrin-yoku',
        language: 'Japanese',
        languageCode: 'ja',
        relationshipType: 'semantic',
        explanation: '"Forest bathing"; sensory immersion in the forest atmosphere, with health and mindfulness focus.',
        targetId: 'shinrin-yoku',
      },
      {
        word: 'Einsamkeit',
        language: 'German',
        languageCode: 'de',
        relationshipType: 'etymological',
        explanation: 'Solitude or loneliness; the morphological head of the compound.'
      },
      {
        word: 'komorebi',
        language: 'Japanese',
        languageCode: 'ja',
        relationshipType: 'semantic',
        explanation: 'Dappled sunlight through forest leaves; visual counterpart to woodland contemplation.',
        targetId: 'komorebi',
      }
    ],
    culturalContext: {
      summary: 'Central to German Romanticism (Deutsche Romantik), where forests are not menacing wilderness but sanctuaries of spiritual inwardness, folk memory, and philosophical contemplation.',
      nuances: [
        'Unlike mere isolation, Waldeinsamkeit carries a soothing, restorative quality.',
        'Intertwined with the German cultural affinity for walking (Wandern) and preservation of old-growth beech and fir forests.',
        'Philosophically associated with the sublime (das Erhabene).'
      ],
      socialSignificance: 'A cornerstone of Germanic aesthetic philosophy, inspiring composers like Schumann and painters like Caspar David Friedrich.'
    },
    source: {
      name: 'Deutsches Wörterbuch von Jacob und Wilhelm Grimm & Duden',
      isCurated: true,
      isExternal: false
    }
  },
  {
    id: 'komorebi',
    word: 'komorebi',
    script: '木漏れ日',
    transliteration: 'komorebi',
    language: 'Japanese',
    languageCode: 'ja',
    partOfSpeech: 'noun',
    ipa: '/ko̞mo̞ɾe̞bi/',
    shortDefinition: 'Sunlight filtering through the leaves of trees, creating dappled patterns of light and shadow.',
    linguisticNote: 'Compound noun composed of 木 (ko, archaic combining form of ki, "tree"), 漏れ (more, continuative stem of moreru, "to leak/filter through"), and 日 (hi/bi, "sun/sunlight").',
    existentialCategory: 'imperfection-transience',
    morphemes: [
      {
        token: 'ko (木)',
        type: 'root',
        meaning: 'tree, wood (archaic bound combining allomorph of ki)',
        ancestralForm: 'ko',
        ancestralLanguage: 'Old Japanese',
        cognateNotes: 'Preserved exclusively in archaic compounds like konoha (tree leaves) and kodachi (grove).',
      },
      {
        token: 'more (漏れ)',
        type: 'verb-stem',
        meaning: 'leaking, escaping through narrow fissures, filtering',
        ancestralForm: 'moru',
        ancestralLanguage: 'Old Japanese',
        cognateNotes: 'From Proto-Japonic *mər- (to seep, escape).',
      },
      {
        token: 'bi (日)',
        type: 'root',
        meaning: 'sun, daylight (voiced through rendaku from hi)',
        ancestralForm: 'pi',
        ancestralLanguage: 'Proto-Japonic',
        cognateNotes: 'Rendaku voicing converts voiceless /p/ > /h/ into /b/.',
      },
    ],
    phonaesthetics: {
      prosody: 'Alternating four-mora cadence (ko-mo-re-bi) with liquid /ɾ/ and soft labials, evoking a gentle rhythmic flicker.',
      symbolism: 'Sound mimics the undulating motion of wind gently shaking canopy leaves.',
    },
    senses: [
      {
        definition: 'Sunlight filtering through the canopy of trees, creating shifting patterns of light and shade on the ground.',
        register: 'aesthetic / nature',
        examples: [
          {
            quote: '森の中を歩いていると、木漏れ日が足元を照らした。',
            translation: 'Walking through the forest, the sunlight filtering through the canopy illuminated my steps.'
          },
          {
            quote: '初夏の木漏れ日は清々しい。',
            translation: 'The dappled sunlight of early summer is refreshing.'
          }
        ]
      }
    ],
    etymology: {
      protoRoot: 'Proto-Japonic *kə (tree) + *mər- (leak) + *pi (sun)',
      origin: 'Old Japanese morphosyntactic compound: ko- (allomorph of ki, "tree") + more (deverbal noun from moru, "to leak through") + bi (rendaku voicing of hi, "sun, day").',
      certaintyLevel: 'established',
      centuryOfFirstAttestation: '8th c. CE (Nara Period)',
      phoneticShifts: [
        'Allomorphic alternation: *kə > standalone ki vs bound ko- in compounds',
        'Proto-Japonic *pi > Old Japanese pi > Middle Japanese fi > Modern Japanese hi',
        'Rendaku voicing law: initial voiceless /h/ voiced to /b/ in non-initial compound slot',
      ],
      roots: [
        { root: 'ko (木)', language: 'Old Japanese', meaning: 'tree, wood (bound morpheme in compounds)' },
        { root: 'moru (漏る)', language: 'Old Japanese', meaning: 'to seep, leak, escape through narrow gaps' },
        { root: 'pi > bi (日)', language: 'Proto-Japonic', meaning: 'sun, daylight' }
      ],
      historicalForms: [
        { period: 'Old Japanese (8th c.)', form: 'ko-mori-pi', meaning: 'sun shining through tree leaves' },
        { period: 'Classical Japanese (Heian Period)', form: 'komorebi', meaning: 'light filtering through branches in waka poetry' },
        { period: 'Modern Japanese', form: '木漏れ日 (こもれび)', meaning: 'dappled forest canopy light' }
      ],
      timeline: [
        {
          era: 'Japonic Antiquity',
          date: 'Pre-700 CE',
          language: 'Proto-Japonic',
          form: '*kə-mər-pi',
          meaning: 'sunlight leaking through branches',
          historicalContext: 'Formed through agglutinative nominal compounding in early Yamato agriculture and Shinto grove observation.',
        },
        {
          era: 'Nara Period',
          date: 'c. 759 CE',
          language: 'Old Japanese',
          form: 'ko-mori-pi',
          meaning: 'sun filtering through foliage',
          historicalContext: 'Documented in Man\'yōshū waka poems praising seasonal nature changes.',
        },
        {
          era: 'Heian Court Culture',
          date: '10th–11th c.',
          language: 'Classical Japanese',
          form: 'komorebi',
          meaning: 'fleeting dappled sunlight in court gardens',
          historicalContext: 'Celebrated for its aesthetic of impermanence (mujōkan) in monogatari literature.',
        },
      ],
      semanticShifts: 'Remained steady across centuries; deeply rooted in classical seasonal poetry observing transient ephemera.',
      notes: 'Demonstrates the morphological phenomenon of rendaku where initial voiceless /h/ becomes voiced /b/ in compounds.'
    },
    relatedWords: [
      {
        word: 'waldeinsamkeit',
        language: 'German',
        languageCode: 'de',
        relationshipType: 'semantic',
        explanation: 'German forest solitude; captures the spatial forest presence where komorebi occurs.',
        targetId: 'waldeinsamkeit',
      },
      {
        word: 'yūgen',
        language: 'Japanese',
        languageCode: 'ja',
        relationshipType: 'semantic',
        explanation: 'A profound, mysterious sense of the beauty of the universe, often suggested by subtle natural cues.'
      }
    ],
    culturalContext: {
      summary: 'Exemplifies traditional Japanese aesthetics honoring fleeting natural phenomena and the visual interplay between light (yō) and darkness (in).',
      nuances: [
        'Associated with the Shinto perception of kami residing within natural landscapes and ancient groves.',
        'Often referenced in haiku and modern cinematography (such as Wim Wenders\' "Perfect Days").',
        'Not just a visual observation, but an emotional cue for quiet mindfulness and peaceful contemplation.'
      ],
      socialSignificance: 'Widely used in Japanese literature, song lyrics, and environmental design to evoke calm and connection to nature.'
    },
    source: {
      name: 'Nihon Kokugo Daijiten & Shinmeikai Kokugo Jiten',
      isCurated: true,
      isExternal: false
    }
  },
  {
    id: 'nostalgia',
    word: 'nostalgia',
    language: 'English',
    languageCode: 'en',
    partOfSpeech: 'noun',
    ipa: '/nɒˈstæl.dʒə/ (UK), /nɑːˈstæl.dʒə/ (US)',
    shortDefinition: 'A sentimental longing or affection for a period in the past, or homesickness.',
    linguisticNote: 'Coined as a medical term in 1688 by Swiss physician Johannes Hofer from Ancient Greek nóstos ("homecoming") and álgos ("pain, ache").',
    existentialCategory: 'longing-nostalgia',
    morphemes: [
      {
        token: 'nost-',
        type: 'root',
        meaning: 'return home, homecoming journey',
        ancestralForm: 'nóstos (νόστος)',
        ancestralLanguage: 'Ancient Greek',
        cognateNotes: 'From PIE *nes- (to return safely, to heal).',
      },
      {
        token: '-algia',
        type: 'suffix',
        meaning: 'pain, somatic or emotional ache',
        ancestralForm: 'álgos (ἄλγος)',
        ancestralLanguage: 'Ancient Greek',
        cognateNotes: 'Appears in medical terms: neuralgia, fibromyalgia, analgesic.',
      },
    ],
    phonaesthetics: {
      prosody: 'Three-syllable measure with sharp medial affricate /dʒ/ softened by liquid /l/, lending a reflective clinical melancholia.',
      symbolism: 'Sibilant into dental reflects the historical clinical diagnosis of yearning as an illness.',
    },
    senses: [
      {
        definition: 'A sentimental yearning for the happiness felt in a former place, time, or situation.',
        register: 'standard',
        examples: [
          {
            quote: 'Old photographs often arouse a gentle wave of nostalgia.',
            translation: 'Old photographs often arouse a gentle wave of nostalgia.'
          }
        ]
      },
      {
        definition: 'Severe homesickness, historically considered a potentially fatal psychological and physiological malady.',
        register: 'historical medical'
      }
    ],
    etymology: {
      protoRoot: 'PIE *nes- (to return safely) + *algh- (to ache)',
      origin: 'Modern Latin compound coined in 1688 in Basel by Johannes Hofer in his medical dissertation Dissertatio Medica de Nostalgia.',
      certaintyLevel: 'established',
      centuryOfFirstAttestation: '1688 (Johannes Hofer)',
      phoneticShifts: [
        'PIE *nes- > Ancient Greek nóstos (with nominalizing suffix -tos)',
        'Greek álgos borrowed into New Latin medical neo-formation -algia',
        'English phonetic naturalization from Latin /nostalɡia/ to /nɒˈstældʒə/',
      ],
      roots: [
        { root: 'nóstos (νόστος)', language: 'Ancient Greek', meaning: 'return home, homecoming journey' },
        { root: 'álgos (ἄλγος)', language: 'Ancient Greek', meaning: 'pain, grief, physical ache' },
        { root: '*nes-', language: 'Proto-Indo-European', meaning: 'to return safely, to survive' }
      ],
      historicalForms: [
        { period: 'Homeric Greek (c. 750 BCE)', form: 'nóstos (Odyssey)', meaning: 'the heroic voyage of returning home' },
        { period: 'New Latin (1688)', form: 'nostalgia', meaning: 'pathological homesickness of Swiss mercenary soldiers' },
        { period: '19th Century English', form: 'nostalgia', meaning: 'transferred from medical diagnosis to emotional yearning for the past' }
      ],
      timeline: [
        {
          era: 'Indo-European Antiquity',
          date: '~3000 BCE',
          language: 'Proto-Indo-European',
          form: '*nes-',
          meaning: 'to return home unharmed, to escape death',
          historicalContext: 'Vital root for pastoral wanderers returning safely to the hearth.',
        },
        {
          era: 'Homeric Epic',
          date: 'c. 750 BCE',
          language: 'Archaic Greek',
          form: 'nóstos (νόστος)',
          meaning: 'the epic homecoming voyage (theme of the Odyssey)',
          historicalContext: 'Core concept of Greek heroic poetry describing journeys back to Ithaca.',
        },
        {
          era: 'Early Modern Medicine',
          date: '1688',
          language: 'New Latin',
          form: 'nostalgia',
          meaning: 'a fatal brain lesion caused by yearning for native Swiss alpine valleys',
          historicalContext: 'Johannes Hofer coined the term in Basel to diagnose Swiss mercenaries fighting abroad.',
        },
        {
          era: 'Romantic Era to Present',
          date: '1850–1920',
          language: 'Modern English',
          form: 'nostalgia',
          meaning: 'sentimental yearning for a bygone era or childhood',
          historicalContext: 'Gradually lost its status as a bodily sickness and became a universal aesthetic mood.',
        },
      ],
      semanticShifts: 'Shifted from spatial dislocation (craving one\'s physical village) to temporal dislocation (craving a vanished era or youth).',
      notes: 'Cognate with German Heimweh ("home-woe"), which Hofer intended to translate into academic medical Latin.'
    },
    relatedWords: [
      {
        word: 'saudade',
        language: 'Portuguese',
        languageCode: 'pt',
        relationshipType: 'semantic',
        explanation: 'Portuguese melancholic longing for past moments and absent loved ones.',
        targetId: 'saudade',
      },
      {
        word: 'hiraeth',
        language: 'Welsh',
        languageCode: 'cy',
        relationshipType: 'semantic',
        explanation: 'Welsh grief-tinged homesickness.',
        targetId: 'hiraeth',
      }
    ],
    culturalContext: {
      summary: 'One of the most documented linguistic transitions from a clinical pathological illness (diagnosed during the Napoleonic and American Civil Wars) to a universal aesthetic sentiment.',
      nuances: [
        'Svetlana Boym distinguished between "restorative nostalgia" (which rebuilds lost monuments) and "reflective nostalgia" (which cherishes longing itself).',
        'Widely utilized in marketing, media, and retro aesthetic movements.'
      ],
      socialSignificance: 'A central theme in modern Western literature, music, and psychology.'
    },
    source: {
      name: 'Oxford English Dictionary & Johannes Hofer (1688) Dissertatio Medica',
      isCurated: true,
      isExternal: false
    }
  },
  {
    id: 'duende',
    word: 'duende',
    language: 'Spanish',
    languageCode: 'es',
    partOfSpeech: 'noun, masculine',
    ipa: '/ˈdwen.de/',
    shortDefinition: 'A mysterious power of intense artistic emotion and authentic soul, especially in flamenco.',
    linguisticNote: 'Originally an aphetic contraction of the phrase dueño de casa ("master of the house"), describing an impish household sprite, elevated into an aesthetic concept by Federico García Lorca.',
    existentialCategory: 'creative-possession',
    morphemes: [
      {
        token: 'duen',
        type: 'root',
        meaning: 'master, lord, owner (aphesis of dueño)',
        ancestralForm: 'dominus',
        ancestralLanguage: 'Classical Latin',
        cognateNotes: 'From PIE *demh₂- (to build/house).',
      },
      {
        token: 'de casa',
        type: 'particle',
        meaning: 'of the house, domestic',
        ancestralForm: 'de casa',
        ancestralLanguage: 'Vulgar Latin',
      },
    ],
    phonaesthetics: {
      prosody: 'Trochaic word with rising diphthong /we/ followed by voiced dental /nd/, landing with physical gravity.',
      symbolism: 'Resonant and earthy, reflecting Lorca\'s description of duende rising from the soles of the feet.',
    },
    senses: [
      {
        definition: 'In Andalusian folklore, an ethereal, goblin-like spirit or gnome dwelling in homes.',
        register: 'folklore',
        examples: [
          {
            quote: 'Los niños creían que un duende escondía los juguetes.',
            translation: 'The children believed a sprite was hiding the toys.'
          }
        ]
      },
      {
        definition: 'A heightened state of emotion, trance-like authenticity, and dark ecstasy in performance art (especially flamenco, bullfighting, and poetry).',
        register: 'artistic / aesthetic',
        examples: [
          {
            quote: 'Esa cantaora tiene duende; te eriza la piel con solo un verso.',
            translation: 'That flamenco singer has duende; she makes your hair stand on end with just one verse.'
          }
        ]
      }
    ],
    etymology: {
      protoRoot: 'PIE *demh₂- (to build, house) > Latin dominus',
      origin: 'Contracted from Old Spanish duen de casa ("master of the house"), from Latin dominus ("master, lord") + domus ("house").',
      certaintyLevel: 'established',
      centuryOfFirstAttestation: '15th c. (Old Spanish folklore)',
      phoneticShifts: [
        'Latin dominus > Old Spanish dueño (syncope of -m- and palatalization of -n-)',
        'Aphesis / apheresis: dueño > duen in construct state before genitive de',
        'Contraction of phrase [duen de casa] into single word duende',
      ],
      roots: [
        { root: 'dominus', language: 'Classical Latin', meaning: 'master, lord, owner' },
        { root: '*demh₂-', language: 'Proto-Indo-European', meaning: 'to build, house' }
      ],
      historicalForms: [
        { period: 'Medieval Spanish (14th c.)', form: 'duen de casa', meaning: 'household guardian sprite' },
        { period: 'Golden Age Spanish (16th c.)', form: 'duende', meaning: 'imp, fairy, nocturnal spirit' },
        { period: 'Modern Spanish (1933)', form: 'duende', meaning: 'aesthetic trance and mortal authentic power in Lorca' }
      ],
      timeline: [
        {
          era: 'Indo-European Antiquity',
          date: '~3500 BCE',
          language: 'Proto-Indo-European',
          form: '*demh₂-',
          meaning: 'to build, construct, house',
          historicalContext: 'Ancient root for structural shelter, giving Latin domus and English timber.',
        },
        {
          era: 'Roman Era',
          date: '1st c. BCE',
          language: 'Classical Latin',
          form: 'dominus',
          meaning: 'head of the household, master',
          historicalContext: 'Legal head possessing patria potestas over the Roman domestic sphere.',
        },
        {
          era: 'Medieval Iberia',
          date: '14th c.',
          language: 'Old Spanish',
          form: 'duen de casa',
          meaning: 'mischievous supernatural sprite inhabiting domestic spaces',
          historicalContext: 'Folk belief in invisible entities moving household utensils and cupboards.',
        },
        {
          era: '20th Century Poetics',
          date: '1933',
          language: 'Modern Spanish',
          form: 'duende',
          meaning: 'artistic possession in confrontation with mortality',
          historicalContext: 'Federico García Lorca delivered his famous Buenos Aires lecture "Juego y teoría del duende".',
        },
      ],
      semanticShifts: 'Shifted from folklore demonology to sublime aesthetic passion through 20th-century Andalusian poetry and flamenco theory.',
      notes: 'Lorca famously contrasted duende with the Angel (who inspires light) and the Muse (who dictates intellect).'
    },
    relatedWords: [
      {
        word: 'meraki',
        language: 'Greek',
        languageCode: 'el',
        relationshipType: 'semantic',
        explanation: 'Soulful devotion invested in creation.',
        targetId: 'meraki',
      }
    ],
    culturalContext: {
      summary: 'In flamenco culture, duende cannot be acquired by technical skill alone; it demands vulnerability, raw instinct, and intimate brush with mortality.',
      nuances: [
        'Lorca noted: "The duende does not come at all unless he sees that death is possible."',
        'It is accompanied by physical shivers, tears, or involuntary shouts of "¡Olé!" from listeners.'
      ],
      socialSignificance: 'Universal artistic concept in Spain and Latin American literature.'
    },
    source: {
      name: 'Federico García Lorca (1933) & Real Academia Española',
      isCurated: true,
      isExternal: false
    }
  },
  {
    id: 'water',
    word: 'water',
    language: 'English',
    languageCode: 'en',
    partOfSpeech: 'noun',
    ipa: '/ˈwɔː.tər/ (UK), /ˈwɑː.tɚ/ (US)',
    shortDefinition: 'A transparent, odorless, tasteless liquid essential for plant and animal life.',
    linguisticNote: 'Ancient heteroclitic r/n-stem noun tracing back to Proto-Indo-European *wódr̥. Its r/n alternation explains why English has water while Russian has voda and Greek has hydro-.',
    morphemes: [
      {
        token: 'wat-',
        type: 'root',
        meaning: 'water, moisture',
        ancestralForm: '*watōr (from PIE *wódr̥)',
        ancestralLanguage: 'Proto-Germanic',
      },
      {
        token: '-er',
        type: 'suffix',
        meaning: 'ancient heteroclitic nominative r-form',
        ancestralForm: '-r̥',
        ancestralLanguage: 'Proto-Indo-European',
      },
    ],
    senses: [
      {
        definition: 'The clear liquid that falls as rain and forms rivers, lakes, and seas.',
        register: 'standard',
        examples: [
          {
            quote: 'Clear water flowed from the mountain spring.',
            translation: 'Clear water flowed from the mountain spring.'
          }
        ]
      }
    ],
    etymology: {
      protoRoot: 'PIE *wódr̥ (heteroclitic *wed-)',
      origin: 'From Middle English water, from Old English wæter, from Proto-Germanic *watōr, from Proto-Indo-European *wódr̥ ("water").',
      certaintyLevel: 'established',
      centuryOfFirstAttestation: '8th c. CE (Old English)',
      phoneticShifts: [
        'PIE *d > Proto-Germanic *t (Grimm\'s Law voiceless stop shift)',
        'Heteroclitic r/n alternation: nominative *wódr̥ vs genitive *wédn̥s (yielding Greek hydro- and English wet)',
        'Proto-Germanic *watōr > Old English wæter (fronting of /a/ to /æ/)',
      ],
      roots: [
        { root: '*wódr̥', language: 'Proto-Indo-European', meaning: 'water (inanimate mass)' },
        { root: '*wed-', language: 'Proto-Indo-European', meaning: 'to wet, moisten' }
      ],
      historicalForms: [
        { period: 'Proto-Indo-European (~3500 BCE)', form: '*wódr̥', meaning: 'water' },
        { period: 'Proto-Germanic (~500 BCE)', form: '*watōr', meaning: 'water' },
        { period: 'Old English (c. 750 CE)', form: 'wæter', meaning: 'water (Beowulf)' },
        { period: 'Middle English (c. 1380)', form: 'water', meaning: 'water (Chaucer)' }
      ],
      timeline: [
        {
          era: 'Indo-European Antiquity',
          date: '~3500 BCE',
          language: 'Proto-Indo-European',
          form: '*wódr̥',
          meaning: 'inanimate natural freshwater',
          historicalContext: 'Distinguished from *h₂ep- (animate, flowing sacred water, as in Sanskrit āpas).',
        },
        {
          era: 'Germanic Prehistory',
          date: '~500 BCE',
          language: 'Proto-Germanic',
          form: '*watōr',
          meaning: 'water, sea, rain',
          historicalContext: 'Shifted *d > *t according to Grimm\'s Law across northern Europe.',
        },
        {
          era: 'Anglo-Saxon Britain',
          date: 'c. 750 CE',
          language: 'Old English',
          form: 'wæter',
          meaning: 'water, sea, lake',
          historicalContext: 'Occurs in epic poetry (Beowulf) and medical leechdoms.',
        },
        {
          era: 'Middle English Era',
          date: 'c. 1387',
          language: 'Middle English',
          form: 'water',
          meaning: 'fresh water, body of water',
          historicalContext: 'Recorded in Geoffrey Chaucer\'s Canterbury Tales.',
        },
      ],
      semanticShifts: 'Remained steady as the primal term for physical water across five millennia.',
    },
    relatedWords: [
      {
        word: 'hydrant / hydro-',
        language: 'Ancient Greek',
        relationshipType: 'etymological',
        explanation: 'From Greek ὕδωρ (húdōr), the direct sister cognate from PIE *wódr̥.'
      },
      {
        word: 'whisky',
        language: 'Scottish Gaelic',
        relationshipType: 'borrowing',
        explanation: 'From Gaelic uisce beatha ("water of life"), translating Latin aqua vitae; uisce is from the same Celtic root.'
      },
      {
        word: 'voda',
        language: 'Russian',
        relationshipType: 'etymological',
        explanation: 'Slavic cognate from PIE *wódr̥.'
      },
      {
        word: 'wet',
        language: 'English',
        relationshipType: 'etymological',
        explanation: 'From the same verbal root *wed-.'
      }
    ],
    culturalContext: {
      summary: 'One of the most stable linguistic fossils in the Indo-European lexicon, carrying an unbroken line of transmission from prehistoric steppes to modern speech.',
      nuances: ['Reflects the ancient distinction between animate (agentive) water and inanimate substance water.'],
    },
    source: {
      name: 'Oxford English Dictionary & Calvert Watkins "Roots of Indo-European"',
      isCurated: true,
      isExternal: false
    }
  },
  {
    id: 'mother',
    word: 'mother',
    language: 'English',
    languageCode: 'en',
    partOfSpeech: 'noun',
    ipa: '/ˈmʌð.ər/ (UK), /ˈmʌð.ɚ/ (US)',
    shortDefinition: 'A female parent; a woman in relation to her child.',
    linguisticNote: 'Direct descendant of Proto-Indo-European *méh₂tēr, one of the primary universal kinship terms preserved in virtually every branch of the Indo-European family.',
    morphemes: [
      {
        token: 'moth-',
        type: 'root',
        meaning: 'female progenitor, maternal nursing syllable (ma-)',
        ancestralForm: '*méh₂-',
        ancestralLanguage: 'Proto-Indo-European',
      },
      {
        token: '-er',
        type: 'suffix',
        meaning: 'kinship agent suffix',
        ancestralForm: '-tēr',
        ancestralLanguage: 'Proto-Indo-European',
        cognateNotes: 'Same kinship suffix as in father (*ph₂tḗr) and brother (*bʰréh₂tēr).',
      },
    ],
    senses: [
      {
        definition: 'A woman who has given birth to a child, or a female guardian/caregiver.',
        register: 'standard',
        examples: [
          {
            quote: 'She learned the old lullaby from her mother.',
            translation: 'She learned the old lullaby from her mother.'
          }
        ]
      }
    ],
    etymology: {
      protoRoot: 'PIE *méh₂tēr (nursing syllable *ma- + *-tēr)',
      origin: 'From Middle English moder, from Old English mōdor, from Proto-Germanic *mōdēr, from Proto-Indo-European *méh₂tēr ("mother").',
      certaintyLevel: 'established',
      centuryOfFirstAttestation: '8th c. BCE (Sanskrit/Greek) / 8th c. CE (Old English)',
      phoneticShifts: [
        'PIE *t > Proto-Germanic *þ > *d (Verner\'s Law voicing in unstressed syllable)',
        'Loss of laryngeal *h₂ causing compensatory lengthening: *meh₂- > Germanic *mō-',
        'Middle English moder > Early Modern mother (intervocalic /d/ spirantized to /ð/ under r-influence)',
      ],
      roots: [
        { root: '*méh₂tēr', language: 'Proto-Indo-European', meaning: 'mother (kinship term)' },
        { root: '*ma-', language: 'Proto-Indo-European', meaning: 'infant nursery call for the breast' }
      ],
      historicalForms: [
        { period: 'Proto-Indo-European (~3500 BCE)', form: '*méh₂tēr', meaning: 'mother' },
        { period: 'Vedic Sanskrit (c. 1500 BCE)', form: 'mātár (मातृ)', meaning: 'mother (Rigveda)' },
        { period: 'Classical Latin (1st c. BCE)', form: 'māter', meaning: 'mother, matron' },
        { period: 'Old English (c. 800 CE)', form: 'mōdor', meaning: 'mother' },
        { period: 'Middle English (c. 1300)', form: 'moder', meaning: 'mother' }
      ],
      timeline: [
        {
          era: 'Indo-European Antiquity',
          date: '~3500 BCE',
          language: 'Proto-Indo-European',
          form: '*méh₂tēr',
          meaning: 'maternal head of kinship group',
          historicalContext: 'Core kinship compound utilizing the nursery bilabial *ma- with the familial suffix *-tēr.',
        },
        {
          era: 'Vedic & Classical Antiquity',
          date: 'c. 1200 BCE',
          language: 'Vedic Sanskrit & Homeric Greek',
          form: 'mātṛ́ / mḗtēr (μήτηρ)',
          meaning: 'mother, divine earth mother',
          historicalContext: 'Invoked in hymns to the Earth Mother (Dyaus Pita and Prithvi Mata).',
        },
        {
          era: 'Roman Era',
          date: '1st c. BCE',
          language: 'Classical Latin',
          form: 'māter',
          meaning: 'mother, source, origin',
          historicalContext: 'Source of matrix, maternal, matrimony, and matter (māteria).',
        },
        {
          era: 'Anglo-Saxon England',
          date: 'c. 850 CE',
          language: 'Old English',
          form: 'mōdor',
          meaning: 'mother',
          historicalContext: 'Standard West Saxon form appearing in the Anglo-Saxon Chronicle.',
        },
      ],
      semanticShifts: 'Preserved core maternal meaning across thousands of years, while generating metaphorical senses of origin, matrix, and nurturing source.',
    },
    relatedWords: [
      {
        word: 'matrix / maternal',
        language: 'Classical Latin',
        relationshipType: 'etymological',
        explanation: 'From Latin māter.'
      },
      {
        word: 'mātár (मातृ)',
        language: 'Sanskrit',
        relationshipType: 'etymological',
        explanation: 'Direct sister cognate from PIE *méh₂tēr.'
      },
      {
        word: 'mutter',
        language: 'German',
        relationshipType: 'etymological',
        explanation: 'Germanic sister cognate.'
      }
    ],
    culturalContext: {
      summary: 'Regarded by historical linguists as one of the quintessential proofs of Indo-European genealogical relationship due to phonetic regularity across English, Latin, Greek, Sanskrit, Russian (mat\'), and Celtic (máthair).',
      nuances: ['Cross-linguistically mirrors the acoustic ease of infant bilabial nasal /m/ vocalization.'],
    },
    source: {
      name: 'Indo-European Etymological Dictionary (Leiden) & Oxford English Dictionary',
      isCurated: true,
      isExternal: false
    }
  },
  {
    id: 'night',
    word: 'night',
    language: 'English',
    languageCode: 'en',
    partOfSpeech: 'noun',
    ipa: '/naɪt/',
    shortDefinition: 'The period of darkness between sunset and sunrise.',
    linguisticNote: 'Traces directly back to PIE *nókʷts. Grimm\'s Law converted the labiovelar *kʷ into Germanic *h, and the silent English spelling -gh- preserves that ancient medieval velar fricative [x].',
    morphemes: [
      {
        token: 'nigh-',
        type: 'root',
        meaning: 'darkness, nocturnal cycle',
        ancestralForm: '*nahts (from PIE *nókʷts)',
        ancestralLanguage: 'Proto-Germanic',
      },
      {
        token: '-t',
        type: 'suffix',
        meaning: 'preserved Proto-Indo-European dental stop',
        ancestralForm: '*-ts',
        ancestralLanguage: 'Proto-Indo-European',
      },
    ],
    senses: [
      {
        definition: 'The time from sunset to sunrise when the sky is dark.',
        register: 'standard',
        examples: [
          {
            quote: 'The stars shone brightly in the quiet night.',
            translation: 'The stars shone brightly in the quiet night.'
          }
        ]
      }
    ],
    etymology: {
      protoRoot: 'PIE *nókʷts (night)',
      origin: 'From Middle English night, from Old English niht/neaht, from Proto-Germanic *nahts, from Proto-Indo-European *nókʷts ("night").',
      certaintyLevel: 'established',
      centuryOfFirstAttestation: '8th c. BCE (Homeric Greek) / 8th c. CE (Old English)',
      phoneticShifts: [
        'PIE *kʷ > Proto-Germanic *h (Grimm\'s Law voiceless stop shift)',
        'PIE *t is preserved after the fricative: *kʷt > *ht',
        'Old English niht [nixt] > Middle English night (Great Vowel Shift /iː/ > /aɪ/, velar fricative [x] silenced)',
      ],
      roots: [
        { root: '*nókʷts', language: 'Proto-Indo-European', meaning: 'night, dark phase of diurnal cycle' }
      ],
      historicalForms: [
        { period: 'Proto-Indo-European (~3500 BCE)', form: '*nókʷts', meaning: 'night' },
        { period: 'Classical Latin (1st c. BCE)', form: 'nox (gen. noctis)', meaning: 'night' },
        { period: 'Old English (c. 750 CE)', form: 'niht / neaht', meaning: 'night, darkness' },
        { period: 'Middle English (c. 1380)', form: 'night [niçt]', meaning: 'night' }
      ],
      timeline: [
        {
          era: 'Indo-European Antiquity',
          date: '~3500 BCE',
          language: 'Proto-Indo-European',
          form: '*nókʷts',
          meaning: 'the sacred nocturnal cycle',
          historicalContext: 'Ancient Indo-Europeans counted time in nights rather than days (preserved in English "fortnight").',
        },
        {
          era: 'Classical Antiquity',
          date: '1st c. BCE',
          language: 'Classical Latin',
          form: 'nox (noctem)',
          meaning: 'night, gloom, death',
          historicalContext: 'Personified as the primordial goddess Nox (Greek Nyx). Source of nocturnal and equinox.',
        },
        {
          era: 'Old English',
          date: 'c. 750 CE',
          language: 'Old English',
          form: 'niht',
          meaning: 'darkness, night',
          historicalContext: 'Pronounced with a rough guttural fricative [ç] or [x], like Scottish loch.',
        },
        {
          era: 'Great Vowel Shift',
          date: '1500–1650',
          language: 'Early Modern English',
          form: 'night',
          meaning: 'night [naɪt]',
          historicalContext: 'The fricative disappeared from spoken speech, while the spelling "gh" was permanently frozen in print.',
        },
      ],
      semanticShifts: 'Remained steady as the cosmic designation for darkness, generating metaphorical associations of secrecy, rest, and the subconscious.',
    },
    relatedWords: [
      {
        word: 'nocturnal / equinox',
        language: 'Classical Latin',
        relationshipType: 'etymological',
        explanation: 'From Latin nox / noctis, sister cognate from PIE *nókʷts.'
      },
      {
        word: 'Nacht',
        language: 'German',
        relationshipType: 'etymological',
        explanation: 'Direct Germanic cognate.'
      },
      {
        word: 'fortnight',
        language: 'English',
        relationshipType: 'etymological',
        explanation: 'Contraction of "fourteen nights", retaining the ancient Germanic custom of reckoning time by nights.'
      }
    ],
    culturalContext: {
      summary: 'Preserves the ancient Indo-European calendar custom of reckoning lunar time by nights rather than solar days, seen in words like fortnight and twelfth night.',
      nuances: ['The silent -gh- is a visual monument to the vanished Germanic velar fricative.'],
    },
    source: {
      name: 'Oxford English Dictionary & Julius Pokorny Indogermanisches etymologisches Wörterbuch',
      isCurated: true,
      isExternal: false
    }
  },
  {
    id: 'philosophy',
    word: 'philosophy',
    language: 'English',
    languageCode: 'en',
    partOfSpeech: 'noun',
    ipa: '/fɪˈlɒs.ə.fi/ (UK), /fɪˈlɑː.sə.fi/ (US)',
    shortDefinition: 'The study of fundamental questions regarding existence, knowledge, values, reason, mind, and language.',
    linguisticNote: 'Compound of Ancient Greek phílos (φίλος, "loving, dear") and sophía (σοφία, "wisdom, skill"). Famously attributed to Pythagoras, who humbly declined the title sophos ("wise man").',
    morphemes: [
      {
        token: 'philo-',
        type: 'prefix',
        meaning: 'loving, fond of, desiring',
        ancestralForm: 'phílos (φίλος)',
        ancestralLanguage: 'Ancient Greek',
      },
      {
        token: 'sophy',
        type: 'root',
        meaning: 'wisdom, deep discernment, higher insight',
        ancestralForm: 'sophía (σοφία)',
        ancestralLanguage: 'Ancient Greek',
      },
    ],
    senses: [
      {
        definition: 'The pursuit of wisdom through rigorous rational inquiry into the nature of reality and human life.',
        register: 'intellectual / academic',
        examples: [
          {
            quote: 'Philosophy begins in wonder. (Plato)',
            translation: 'Philosophy begins in wonder. (Plato)'
          }
        ]
      }
    ],
    etymology: {
      protoRoot: 'Ancient Greek phílos (loving) + sophía (wisdom)',
      origin: 'From Old French filosofie, from Latin philosophia, borrowed from Ancient Greek φιλοσοφία (philosophía, "love of wisdom").',
      certaintyLevel: 'established',
      centuryOfFirstAttestation: '5th c. BCE (Ancient Greek)',
      phoneticShifts: [
        'Greek aspirated stops /pʰ/ transcribed into Latin as digraph <ph>',
        'Greek /pʰ/ > /f/ in Hellenistic and Romance transmission',
        'Old French filosofie borrowed into Middle English, later respelled philosophie under classical renaissance scholarship',
      ],
      roots: [
        { root: 'phílos (φίλος)', language: 'Ancient Greek', meaning: 'beloved, dear, loving' },
        { root: 'sophía (σοφία)', language: 'Ancient Greek', meaning: 'wisdom, skill, sound judgment' }
      ],
      historicalForms: [
        { period: 'Classical Greek (5th c. BCE)', form: 'philosophía (φιλοσοφία)', meaning: 'love and pursuit of wisdom' },
        { period: 'Classical Latin (1st c. BCE)', form: 'philosophia', meaning: 'philosophy (Cicero, Seneca)' },
        { period: 'Old French (12th c.)', form: 'filosofie', meaning: 'moral and natural inquiry' },
        { period: 'Middle English (c. 1300)', form: 'philosophie', meaning: 'scholastic learning' }
      ],
      timeline: [
        {
          era: 'Classical Greece',
          date: 'c. 450 BCE',
          language: 'Ancient Greek',
          form: 'philosophía (φιλοσοφία)',
          meaning: 'passionate pursuit of truth and wisdom',
          historicalContext: 'Pythagoras and Socrates contrasted the philosopher (lover of wisdom) with the sophist (paid merchant of rhetoric).',
        },
        {
          era: 'Roman Republic',
          date: 'c. 45 BCE',
          language: 'Classical Latin',
          form: 'philosophia',
          meaning: 'study of ethics, physics, and logic',
          historicalContext: 'Cicero translated Greek philosophical treatises into Latin, establishing the Western academic vocabulary.',
        },
        {
          era: 'Medieval Scholasticism',
          date: '13th c.',
          language: 'Medieval Latin & Old French',
          form: 'philosophia / filosofie',
          meaning: 'the queen of the sciences beneath theology',
          historicalContext: 'Thomas Aquinas synthesized Aristotelian philosophy with Christian theology.',
        },
        {
          era: 'Scientific Revolution',
          date: '17th c.',
          language: 'Early Modern English',
          form: 'natural philosophy',
          meaning: 'what is now called physics and natural science',
          historicalContext: 'Newton\'s 1687 work was titled Philosophiae Naturalis Principia Mathematica.',
        },
      ],
      semanticShifts: 'Shifted from encompassing all intellectual inquiry (including physics and biology) into a distinct discipline focused on epistemology, metaphysics, and ethics.',
    },
    relatedWords: [
      {
        word: 'sophist',
        language: 'Ancient Greek',
        relationshipType: 'etymological',
        explanation: 'From the same root sophía.'
      },
      {
        word: 'philanthropy',
        language: 'Ancient Greek',
        relationshipType: 'etymological',
        explanation: 'Shares prefix phílos ("love of humanity").'
      }
    ],
    culturalContext: {
      summary: 'Represents the foundational Western intellectual shift from mythological narrative (mythos) to reasoned inquiry (logos).',
      nuances: ['Emphasizes that human wisdom is never a finished possession, but a perpetual act of loving pursuit.'],
    },
    source: {
      name: 'Liddell & Scott Greek-English Lexicon & Oxford English Dictionary',
      isCurated: true,
      isExternal: false
    }
  }
];

