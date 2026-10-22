import React from 'react';
import { WordEntry } from '../types/lexicon';
import { playPronunciation } from '../services/dictionaryService';
import { EtymologicalTimeline } from './EtymologicalTimeline';
import { MorphologyLab } from './MorphologyLab';
import { LinguisticGraph } from './LinguisticGraph';
import {
  Bookmark,
  BookmarkCheck,
  Volume2,
  ArrowLeft,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

interface Props {
  entry: WordEntry;
  isSaved: boolean;
  onToggleSave: () => void;
  onBack: () => void;
  onSelectWord: (word: string) => void;
}

export const WordDetailView: React.FC<Props> = ({
  entry,
  isSaved,
  onToggleSave,
  onBack,
  onSelectWord,
}) => {
  const handlePronounce = () => {
    playPronunciation(entry.word, entry.languageCode, entry.audioUrl);
  };

  return (
    <div className="max-w-3xl mx-auto pb-16 space-y-7 animate-fadeIn">
      {/* Top action bar */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-[#888888] hover:text-[#EDEDED] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          onClick={onToggleSave}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs border rounded-sm transition-colors cursor-pointer ${
            isSaved
              ? 'border-[#EDEDED] text-[#EDEDED] bg-[#151515]'
              : 'border-[#252525] text-[#888888] hover:text-[#EDEDED] hover:border-[#606060]'
          }`}
        >
          {isSaved ? (
            <>
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>Saved</span>
            </>
          ) : (
            <>
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save word</span>
            </>
          )}
        </button>
      </div>

      {/* Word Header */}
      <div className="border-b border-[#222222] pb-5 space-y-2.5">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h1 className="font-caveat text-4xl sm:text-5xl font-bold text-[#EDEDED] tracking-wide">
            {entry.word}
          </h1>
          {entry.script && (
            <span className="text-xl sm:text-2xl text-[#888888] font-light">
              {entry.script}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-[#888888] flex-wrap">
          <span className="text-[#EDEDED] font-medium">{entry.language}</span>
          <span aria-hidden="true" className="text-[#555555]">·</span>
          <span>{entry.partOfSpeech}</span>
          {entry.ipa && (
            <>
              <span aria-hidden="true" className="text-[#555555]">·</span>
              <span className="font-mono text-[11px] text-[#A0A0A0]">{entry.ipa}</span>
            </>
          )}
          <button
            onClick={handlePronounce}
            className="p-1 text-[#888888] hover:text-[#EDEDED] transition-colors ml-1 cursor-pointer"
            title="Listen to pronunciation"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* WORD MEANINGS (Brought prominently back to top) */}
      <section className="space-y-3 bg-[#0A0A0A] border border-[#222222] p-5 rounded-sm">
        <div className="flex items-center gap-2 border-b border-[#1E1E1E] pb-2.5">
          <BookOpen className="w-4 h-4 text-[#EDEDED]" />
          <h2 className="font-caveat text-2xl text-[#EDEDED] font-semibold">
            Word Meaning
          </h2>
        </div>

        {/* Word Senses & Definitions */}
        {entry.senses && entry.senses.length > 1 ? (
          <div className="space-y-3 pt-1">
            {entry.senses.map((sense, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="text-xs text-[#666666] font-mono mt-0.5 shrink-0">{idx + 1}.</span>
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <p className={`text-sm leading-relaxed ${idx === 0 ? 'text-[#EDEDED] font-serif font-medium text-[15px]' : 'text-[#CCCCCC]'}`}>
                      {sense.definition}
                    </p>
                    {sense.register && (
                      <span className="text-[11px] text-[#666666] lowercase">
                        ({sense.register})
                      </span>
                    )}
                  </div>

                  {sense.examples && sense.examples.length > 0 && (
                    <div className="pl-3 border-l border-[#242424] space-y-1 text-xs mt-1">
                      {sense.examples.map((ex, exIdx) => (
                        <div key={exIdx} className="space-y-0.5">
                          <p className="text-[#999999] italic">"{ex.quote}"</p>
                          {ex.translation && (
                            <p className="text-[#666666]">{ex.translation}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-base sm:text-lg text-[#EDEDED] leading-relaxed font-serif">
              {entry.shortDefinition}
            </p>
            {entry.senses?.[0]?.examples && entry.senses[0].examples.length > 0 && (
              <div className="pl-3 border-l border-[#242424] space-y-1 text-xs mt-2">
                {entry.senses[0].examples.map((ex, exIdx) => (
                  <p key={exIdx} className="text-[#999999] italic">
                    "{ex.quote}"
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* CORE FEATURE: Etymological Timeline (Vertical Minimalist Progression) */}
      <section>
        <EtymologicalTimeline
          word={entry.word}
          etymology={entry.etymology}
          language={entry.language}
        />
      </section>


      {/* Morphological Breakdown (Concise) */}
      {entry.morphemes && entry.morphemes.length > 0 && (
        <section>
          <MorphologyLab word={entry.word} morphemes={entry.morphemes} />
        </section>
      )}

      {/* Cross-Language Cognate Graph */}
      <section className="space-y-3">
        <LinguisticGraph entry={entry} onSelectWord={onSelectWord} />
      </section>

      {/* Authority Citation */}
      <div className="border-t border-[#202020] pt-4 flex items-center justify-between text-[11px] text-[#666666]">
        <div className="flex items-center gap-1.5">
          <span>Philological Authority:</span>
          <span className="text-[#888888]">{entry.source.name}</span>
        </div>
        {entry.source.url && (
          <a
            href={entry.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#888888] hover:text-[#EDEDED] transition-colors"
          >
            <span>Source Archive</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        )}
      </div>
    </div>
  );
};
