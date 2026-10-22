import React, { useState, useEffect } from 'react';
import { WordEntry } from '../types/lexicon';
import { searchCuratedWords, fetchExternalWord } from '../services/dictionaryService';
import { Search, Loader2, BookOpen, Globe2, AlertCircle } from 'lucide-react';

interface Props {
  initialQuery?: string;
  initialLanguage?: string;
  onSelectWord: (word: string) => void;
  onUpdateQuery: (query: string, language: string) => void;
}

const LANGUAGES = [
  { value: 'all', label: 'All Languages' },
  { value: 'es', label: 'Spanish' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'de', label: 'German' },
  { value: 'ja', label: 'Japanese' },
  { value: 'fr', label: 'French' },
  { value: 'en', label: 'English' },
  { value: 'el', label: 'Greek' },
  { value: 'cy', label: 'Welsh' },
];

export const SearchView: React.FC<Props> = ({
  initialQuery = '',
  initialLanguage = 'all',
  onSelectWord,
  onUpdateQuery,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [language, setLanguage] = useState(initialLanguage);
  const [localResults, setLocalResults] = useState<WordEntry[]>([]);
  const [externalResult, setExternalResult] = useState<WordEntry | null>(null);
  const [isLoadingExternal, setIsLoadingExternal] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = async (searchTerm: string, lang: string) => {
    if (!searchTerm.trim()) {
      setLocalResults([]);
      setExternalResult(null);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    onUpdateQuery(searchTerm, lang);

    // 1. Search local curated entries
    const local = searchCuratedWords(searchTerm, lang);
    setLocalResults(local);

    // 2. If no exact word match locally, fetch external dictionary
    const exactLocalMatch = local.some(
      (w) => w.word.toLowerCase() === searchTerm.toLowerCase().trim()
    );

    if (!exactLocalMatch) {
      setIsLoadingExternal(true);
      try {
        const ext = await fetchExternalWord(searchTerm);
        setExternalResult(ext);
      } catch (err) {
        console.warn('External search error:', err);
        setExternalResult(null);
      } finally {
        setIsLoadingExternal(false);
      }
    } else {
      setExternalResult(null);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery, initialLanguage);
    }
  }, [initialQuery, initialLanguage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query, language);
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    if (query.trim()) {
      performSearch(query, newLang);
    }
  };

  const totalResults = localResults.length + (externalResult ? 1 : 0);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-fadeIn">
      {/* Search Header */}
      <div>
        <h1 className="font-caveat text-3xl sm:text-4xl text-[#E8E8E8]">Search</h1>
      </div>

      {/* Search Input & Controls */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex items-center border border-[#252525] focus-within:border-[#888888] bg-[#0A0A0A] px-3 py-2 rounded-sm transition-colors">
          <Search className="w-4 h-4 text-[#888888] mr-2 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search words..."
            className="w-full bg-transparent text-[#E8E8E8] text-sm placeholder-[#606060] focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setLocalResults([]);
                setExternalResult(null);
                setHasSearched(false);
              }}
              className="text-xs text-[#606060] hover:text-[#888888] mr-2"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            className="text-xs text-[#888888] hover:text-[#E8E8E8] border border-[#252525] hover:border-[#606060] px-3 py-1 rounded-sm shrink-0 cursor-pointer"
          >
            Search
          </button>
        </div>

        {/* Language Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
          <span className="text-[#606060] shrink-0 mr-1">Language:</span>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.value}
              type="button"
              onClick={() => handleLanguageChange(lang.value)}
              className={`px-2 py-0.5 text-xs rounded-sm whitespace-nowrap transition-colors cursor-pointer ${
                language === lang.value
                  ? 'border border-[#E8E8E8] text-[#E8E8E8] bg-[#151515]'
                  : 'border border-[#252525] text-[#888888] hover:text-[#E8E8E8]'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </form>

      {/* Loading state */}
      {isLoadingExternal && (
        <div className="flex items-center gap-2 py-6 text-xs text-[#888888]">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Consulting open linguistic repositories for "{query}"...</span>
        </div>
      )}

      {/* Results Section */}
      {hasSearched && (
        <div className="space-y-6">
          <div className="text-xs text-[#606060] border-b border-[#252525] pb-2">
            Found {totalResults} {totalResults === 1 ? 'entry' : 'entries'} for "{query}"
          </div>

          {/* Local curated results */}
          {localResults.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs text-[#888888]">
                <BookOpen className="w-3.5 h-3.5 text-[#E8E8E8]" />
                <span className="uppercase tracking-wider text-[11px] text-[#E8E8E8]">
                  Curated Lexicon Archive
                </span>
              </div>

              <div className="divide-y divide-[#252525]">
                {localResults.map((entry) => (
                  <article
                    key={entry.id}
                    onClick={() => onSelectWord(entry.word)}
                    className="py-3 hover:bg-[#101010] px-2.5 -mx-2.5 rounded-sm transition-colors cursor-pointer group"
                  >
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-caveat text-xl text-[#E8E8E8] group-hover:underline">
                          {entry.word}
                        </span>
                        {entry.script && (
                          <span className="text-sm text-[#888888]">{entry.script}</span>
                        )}
                        <span className="text-xs text-[#606060]">{entry.language}</span>
                        {entry.ipa && (
                          <span className="text-[11px] font-mono text-[#606060]">
                            {entry.ipa}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#606060] group-hover:text-[#E8E8E8]">
                        View →
                      </span>
                    </div>
                    {entry.etymology.protoRoot && (
                      <div className="flex items-center gap-1.5 text-[11px] text-[#606060] mt-1 font-mono">
                        <span>Root:</span>
                        <span className="text-[#E8E8E8]">{entry.etymology.protoRoot}</span>
                        {entry.etymology.centuryOfFirstAttestation && (
                          <span>· {entry.etymology.centuryOfFirstAttestation}</span>
                        )}
                      </div>
                    )}
                    <p className="text-xs text-[#888888] mt-1 leading-relaxed">
                      {entry.shortDefinition}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* External Dictionary result */}
          {externalResult && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-[#888888]">
                <Globe2 className="w-3.5 h-3.5 text-[#888888]" />
                <span className="uppercase tracking-wider text-[11px] text-[#888888]">
                  External Linguistic Record ({externalResult.source.name})
                </span>
              </div>

              <article
                onClick={() => onSelectWord(externalResult.word)}
                className="border border-[#252525] hover:border-[#606060] bg-[#080808] hover:bg-[#121212] p-4 rounded-sm transition-colors cursor-pointer group"
              >
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-caveat text-xl text-[#E8E8E8] group-hover:underline">
                      {externalResult.word}
                    </span>
                    <span className="text-xs text-[#606060]">{externalResult.language}</span>
                    {externalResult.ipa && (
                      <span className="text-[11px] font-mono text-[#606060]">
                        {externalResult.ipa}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#606060] group-hover:text-[#E8E8E8]">
                    View →
                  </span>
                </div>
                {externalResult.etymology?.protoRoot && (
                  <div className="flex items-center gap-1.5 text-[11px] text-[#606060] mt-1 font-mono">
                    <span>Root:</span>
                    <span className="text-[#E8E8E8]">{externalResult.etymology.protoRoot}</span>
                    {externalResult.etymology.centuryOfFirstAttestation && (
                      <span>· {externalResult.etymology.centuryOfFirstAttestation}</span>
                    )}
                  </div>
                )}
                <p className="text-xs text-[#888888] mt-1.5 leading-relaxed">
                  {externalResult.shortDefinition}
                </p>
              </article>
            </div>
          )}

          {/* Empty state */}
          {!isLoadingExternal && totalResults === 0 && (
            <div className="py-12 text-center space-y-2 border border-[#252525] bg-[#050505] p-6 rounded-sm">
              <AlertCircle className="w-5 h-5 text-[#606060] mx-auto" />
              <p className="text-sm text-[#E8E8E8]">No linguistic records found for "{query}".</p>
              <p className="text-xs text-[#888888] max-w-sm mx-auto">
                Try checking spelling, searching without accents, or switching the language filter to "All Languages".
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
