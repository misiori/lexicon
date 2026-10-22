import React, { useState } from 'react';
import { Morpheme } from '../types/lexicon';
import { Layers, ChevronRight } from 'lucide-react';

interface Props {
  word: string;
  morphemes?: Morpheme[];
}

export const MorphologyLab: React.FC<Props> = ({ word, morphemes }) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  if (!morphemes || morphemes.length === 0) {
    return null;
  }

  const activeMorpheme = morphemes[selectedIdx] || morphemes[0];

  return (
    <div className="border border-[#252525] bg-[#000000] p-4 rounded-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[#252525] pb-2.5">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-[#E8E8E8]" />
          <span className="font-caveat text-lg text-[#E8E8E8]">Morphological Deconstruction</span>
        </div>
        <span className="text-[11px] text-[#606060] uppercase tracking-wider">
          {morphemes.length} constituent {morphemes.length === 1 ? 'morpheme' : 'morphemes'}
        </span>
      </div>

      {/* Interactive Morpheme Segments Strip */}
      <div className="space-y-2">
        <span className="text-[11px] text-[#888888] block">
          Select an etymon to inspect its grammatical origin:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap p-2 border border-[#252525] bg-[#080808] rounded-sm">
          {morphemes.map((m, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <React.Fragment key={idx}>
                <button
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`px-3 py-1.5 rounded-sm transition-all text-left cursor-pointer border ${
                    isSelected
                      ? 'border-[#E8E8E8] bg-[#1a1a1a] text-[#E8E8E8]'
                      : 'border-[#252525] bg-[#0c0c0c] text-[#888888] hover:border-[#606060] hover:text-[#E8E8E8]'
                  }`}
                >
                  <span className="font-mono text-sm block">{m.token}</span>
                  <span className="text-[10px] text-[#606060] uppercase tracking-wider block">
                    {m.type}
                  </span>
                </button>
                {idx < morphemes.length - 1 && (
                  <span className="text-xs text-[#383838] font-mono px-0.5">+</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Inspected Morpheme Card */}
      {activeMorpheme && (
        <div className="border border-[#252525] bg-[#0a0a0a] p-3.5 rounded-sm space-y-2 animate-fadeIn">
          <div className="flex items-baseline justify-between border-b border-[#202020] pb-2 flex-wrap gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-caveat text-xl text-[#E8E8E8]">
                {activeMorpheme.token}
              </span>
              <span className="text-[11px] text-[#606060] uppercase tracking-wider">
                ({activeMorpheme.type})
              </span>
            </div>
            <div className="text-xs text-[#888888]">
              Ancestral form: <span className="font-mono text-[#E8E8E8]">{activeMorpheme.ancestralForm}</span>{' '}
              <span className="text-[#606060]">({activeMorpheme.ancestralLanguage})</span>
            </div>
          </div>

          <div className="text-xs text-[#888888] space-y-1 pt-1">
            <p>
              <span className="text-[#606060]">Archaic Meaning: </span>
              <span className="text-[#E8E8E8]">{activeMorpheme.meaning}</span>
            </p>
            {activeMorpheme.cognateNotes && (
              <p className="text-[#888888] leading-relaxed">
                <span className="text-[#606060]">Cross-Lingual Cognates: </span>
                {activeMorpheme.cognateNotes}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
