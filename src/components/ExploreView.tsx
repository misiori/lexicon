import React, { useState } from 'react';
import { WordEntry } from '../types/lexicon';
import { CURATED_WORDS } from '../data/curatedWords';
import { HistoryItem } from '../hooks/useLexiconStorage';
import {
  Search,
  ArrowRight,
  Clock,
  Globe,
  GitBranch,
} from 'lucide-react';

interface Props {
  onSelectWord: (word: string) => void;
  onSearchSubmit: (query: string, language: string) => void;
  history: HistoryItem[];
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

export const ExploreView: React.FC<Props> = ({
  onSelectWord,
  onSearchSubmit,
  history,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim(), selectedLanguage);
    }
  };

  // Filter curated words
  const displayedCurated = CURATED_WORDS.filter((w) => {
    if (selectedLanguage !== 'all') {
      return w.languageCode.toLowerCase() === selectedLanguage.toLowerCase();
    }
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 animate-fadeIn">
      {/* Top Heading */}
      <div className="border-b border-[#252525] pb-4">
        <h1 className="font-caveat text-3xl sm:text-4xl text-[#E8E8E8]">Explore Ancient Roots</h1>
      </div>

      {/* Prominent Search Field */}
      <form onSubmit={handleSearch} className="space-y-2.5">
        <div className="flex items-center border border-[#252525] focus-within:border-[#888888] bg-[#0A0A0A] px-3 py-2 rounded-sm transition-colors">
          <Search className="w-4 h-4 text-[#888888] mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words..."
            className="w-full bg-transparent text-[#E8E8E8] text-sm placeholder-[#606060] focus:outline-none"
          />
          <button
            type="submit"
            className="ml-2 text-xs text-[#888888] hover:text-[#E8E8E8] border border-[#252525] hover:border-[#606060] px-2.5 py-1 rounded-sm shrink-0 cursor-pointer"
          >
            Search
          </button>
        </div>

        {/* Compact Language Selector */}
        <div className="flex items-center gap-2 text-xs text-[#888888] overflow-x-auto pb-1 scrollbar-none">
          <Globe className="w-3.5 h-3.5 text-[#606060] shrink-0" />
          <div className="flex items-center gap-1.5 flex-nowrap">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.value}
                type="button"
                onClick={() => setSelectedLanguage(lang.value)}
                className={`px-2 py-0.5 text-xs rounded-sm whitespace-nowrap transition-colors cursor-pointer ${
                  selectedLanguage === lang.value
                    ? 'border border-[#E8E8E8] text-[#E8E8E8] bg-[#151515]'
                    : 'border border-[#252525] text-[#888888] hover:text-[#E8E8E8] hover:bg-[#121212]'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </form>

      {/* Recently Viewed (only if history exists) */}
      {history.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-[#888888]">
            <Clock className="w-3.5 h-3.5 text-[#606060]" />
            <h2 className="font-caveat text-lg text-[#E8E8E8]">Recently Examined</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {history.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectWord(item.word)}
                className="border border-[#252525] hover:border-[#606060] bg-[#050505] hover:bg-[#121212] p-3 rounded-sm cursor-pointer transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-caveat text-base text-[#E8E8E8]">{item.word}</span>
                    <span className="text-[11px] text-[#606060]">{item.language}</span>
                  </div>
                  <p className="text-xs text-[#888888] line-clamp-1 mt-0.5">
                    {item.shortDefinition}
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#606060] shrink-0 ml-2" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lexical Repository with Prominent Historical Roots */}
      <section className="space-y-3">
        <div className="flex items-baseline justify-between border-b border-[#252525] pb-2">
          <div className="flex items-center gap-2">
            <GitBranch className="w-3.5 h-3.5 text-[#E8E8E8]" />
            <h2 className="font-caveat text-xl text-[#E8E8E8]">Etymological Lineages</h2>
          </div>
          <span className="text-xs text-[#606060]">{displayedCurated.length} documented words</span>
        </div>

        <div className="divide-y divide-[#252525]">
          {displayedCurated.map((entry: WordEntry) => (
            <article
              key={entry.id}
              onClick={() => onSelectWord(entry.word)}
              className="py-4 hover:bg-[#101010] px-2.5 -mx-2.5 rounded-sm transition-colors cursor-pointer group space-y-2"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <h3 className="font-caveat text-2xl text-[#E8E8E8] group-hover:underline">
                    {entry.word}
                  </h3>
                  {entry.script && (
                    <span className="text-base text-[#888888]">{entry.script}</span>
                  )}
                  <span className="text-xs text-[#606060]">{entry.language}</span>
                  {entry.ipa && (
                    <span className="text-[11px] font-mono text-[#606060]">
                      {entry.ipa}
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#606060] group-hover:text-[#E8E8E8] shrink-0 font-mono">
                  Trace history →
                </span>
              </div>

              {/* Ancient Proto-Root Lineage Pill */}
              {entry.etymology.protoRoot && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#606060] font-mono text-[11px]">Ancestral Root:</span>
                  <span className="text-[#E8E8E8] font-mono font-medium border border-[#252525] bg-[#0c0c0c] px-1.5 py-0.5 rounded-xs">
                    {entry.etymology.protoRoot}
                  </span>
                  {entry.etymology.centuryOfFirstAttestation && (
                    <span className="text-[#606060] text-[11px]">
                      · Attested: {entry.etymology.centuryOfFirstAttestation}
                    </span>
                  )}
                </div>
              )}

              {/* Brief Etymology summary */}
              <p className="text-xs text-[#888888] leading-relaxed">
                {entry.etymology.origin}
              </p>

              {/* Concise Definition */}
              <p className="text-[11px] text-[#606060] leading-relaxed">
                Sense: {entry.shortDefinition}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
