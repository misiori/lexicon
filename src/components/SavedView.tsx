import React, { useState } from 'react';
import { CURATED_WORDS } from '../data/curatedWords';
import { WordEntry } from '../types/lexicon';
import { Bookmark, Search, Trash2, ArrowRight } from 'lucide-react';

interface Props {
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectWord: (word: string) => void;
}

export const SavedView: React.FC<Props> = ({
  savedIds,
  onToggleSave,
  onSelectWord,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  // Resolve saved words from curated dataset or fallback
  const savedEntries: WordEntry[] = savedIds
    .map((id) => CURATED_WORDS.find((w) => w.id === id || w.word.toLowerCase() === id.toLowerCase()))
    .filter((entry): entry is WordEntry => Boolean(entry));

  const filteredEntries = savedEntries.filter((entry) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      entry.word.toLowerCase().includes(q) ||
      entry.language.toLowerCase().includes(q) ||
      entry.shortDefinition.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="flex items-baseline justify-between border-b border-[#252525] pb-3">
        <div>
          <h1 className="font-caveat text-3xl sm:text-4xl text-[#E8E8E8]">Saved Words</h1>
        </div>
        <span className="text-xs text-[#606060]">{savedEntries.length} saved</span>
      </div>

      {savedEntries.length > 0 && (
        <div className="flex items-center border border-[#252525] focus-within:border-[#888888] bg-[#0A0A0A] px-3 py-1.5 rounded-sm transition-colors">
          <Search className="w-3.5 h-3.5 text-[#888888] mr-2 shrink-0" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter saved entries..."
            className="w-full bg-transparent text-[#E8E8E8] text-xs placeholder-[#606060] focus:outline-none"
          />
        </div>
      )}

      {savedEntries.length === 0 ? (
        <div className="py-16 text-center space-y-3 border border-[#252525] bg-[#050505] p-6 rounded-sm">
          <Bookmark className="w-6 h-6 text-[#606060] mx-auto" />
          <p className="text-sm text-[#E8E8E8]">No saved words yet.</p>
          <p className="text-xs text-[#888888] max-w-sm mx-auto">
            While exploring words, tap the "Save word" button in the upper corner of any word's detail view to keep it here for quick reference.
          </p>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="py-10 text-center text-xs text-[#888888]">
          No saved words match "{filterQuery}".
        </div>
      ) : (
        <div className="divide-y divide-[#252525]">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="py-3.5 flex items-start justify-between gap-4 hover:bg-[#101010] px-2.5 -mx-2.5 rounded-sm transition-colors group"
            >
              <div
                onClick={() => onSelectWord(entry.word)}
                className="cursor-pointer flex-1"
              >
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span className="font-caveat text-2xl text-[#E8E8E8] group-hover:underline">
                    {entry.word}
                  </span>
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
                <p className="text-xs text-[#888888] mt-1 line-clamp-2 leading-relaxed">
                  {entry.shortDefinition}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-1">
                <button
                  onClick={() => onToggleSave(entry.id)}
                  className="p-1 text-[#606060] hover:text-[#E8E8E8] transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSelectWord(entry.word)}
                  className="p-1 text-[#606060] group-hover:text-[#E8E8E8] transition-colors"
                  title="Open word"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
