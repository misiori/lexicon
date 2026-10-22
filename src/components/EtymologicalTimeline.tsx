import React, { useState } from 'react';
import { EtymologyData, HistoricalTimelineNode } from '../types/lexicon';
import {
  GitBranch,
  ArrowDown,
  Clock,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Props {
  word: string;
  etymology: EtymologyData;
  language?: string;
}

export const EtymologicalTimeline: React.FC<Props> = ({
  word,
  etymology,
  language = 'English',
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Record<number, boolean>>({});

  const toggleExpand = (idx: number) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Compile timeline stages: use etymology.timeline if available,
  // or construct fallback stages from historicalForms or origin
  const timelineStages: HistoricalTimelineNode[] = React.useMemo(() => {
    if (etymology.timeline && etymology.timeline.length > 0) {
      return etymology.timeline;
    }

    if (etymology.historicalForms && etymology.historicalForms.length > 0) {
      return etymology.historicalForms.map((hf, i) => ({
        era: hf.period,
        date: i === 0 ? 'Ancient' : 'Historical',
        language: hf.period,
        form: hf.form,
        meaning: hf.meaning || 'Core ancestral sense',
        historicalContext: `Attested historical development in ${hf.period}.`,
      }));
    }

    // Default 3-stage minimal reconstruction
    const root = etymology.protoRoot || `*${word.toLowerCase()}`;
    return [
      {
        era: 'Ancient Ancestor',
        date: 'c. 3000 BCE',
        language: 'Proto-Indo-European / Ancient Root',
        form: root,
        meaning: 'Original root concept',
        historicalContext: 'Hypothetical reconstructed ancestor preserved through comparative linguistics.',
      },
      {
        era: 'Historical Form',
        date: etymology.centuryOfFirstAttestation || 'Medieval Period',
        language: 'Classical / Historical Ancestor',
        form: word.toLowerCase(),
        meaning: 'Transitional morphological sense',
        historicalContext: etymology.origin || 'Documented historical lineage.',
      },
      {
        era: 'Contemporary',
        date: 'Present Era',
        language: language,
        form: word,
        meaning: 'Modern attested sense',
        historicalContext: 'Modern usage in contemporary lexicon.',
      },
    ];
  }, [etymology, word, language]);

  return (
    <div className="border border-[#222222] bg-[#0A0A0A] p-5 sm:p-6 rounded-sm space-y-6">
      {/* Header & Lineage Summary */}
      <div className="border-b border-[#202020] pb-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#EDEDED]" />
            <h2 className="font-caveat text-2xl text-[#EDEDED] font-semibold tracking-wide">
              Etymological Timeline
            </h2>
          </div>

          {etymology.centuryOfFirstAttestation && (
            <div className="flex items-center gap-1.5 text-xs text-[#888888] font-mono">
              <Clock className="w-3.5 h-3.5 text-[#606060]" />
              <span>Attestation: {etymology.centuryOfFirstAttestation}</span>
            </div>
          )}
        </div>

        {/* Minimal horizontal language chain banner: PIE -> Latin -> Old French -> English */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none text-xs">
          <span className="text-[#606060] uppercase tracking-wider text-[10px] shrink-0">
            Progression:
          </span>
          <div className="flex items-center gap-1.5 flex-nowrap">
            {timelineStages.map((stage, i) => (
              <React.Fragment key={i}>
                <span className="px-2 py-0.5 rounded-xs bg-[#121212] border border-[#252525] text-[#D0D0D0] font-mono text-[11px] whitespace-nowrap">
                  {stage.language}
                </span>
                {i < timelineStages.length - 1 && (
                  <span className="text-[#555555] font-mono text-xs">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Reconstructed Root Callout if present */}
        {etymology.protoRoot && (
          <div className="text-xs text-[#888888] flex items-baseline gap-2 pt-1">
            <span className="text-[#606060]">Ancestral Root:</span>
            <span className="font-mono text-[#EDEDED] font-bold tracking-wider">
              {etymology.protoRoot}
            </span>
          </div>
        )}
      </div>

      {/* Vertical Minimalist Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2.5 sm:before:left-3 before:top-3 before:bottom-3 before:w-[1px] before:bg-gradient-to-b before:from-[#555555] before:via-[#333333] before:to-[#222222]">
        {timelineStages.map((stage, idx) => {
          const isLast = idx === timelineStages.length - 1;
          const isFirst = idx === 0;
          const isExpanded = expandedNodes[idx] ?? true;

          return (
            <div key={idx} className="relative group">
              {/* Timeline Node Bullet on the vertical line */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                  isLast
                    ? 'bg-[#181818] border border-[#EDEDED] text-[#EDEDED]'
                    : isFirst
                    ? 'bg-[#141414] border border-[#888888] text-[#888888]'
                    : 'bg-[#0E0E0E] border border-[#3A3A3A] group-hover:border-[#888888]'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isLast ? 'bg-[#EDEDED]' : isFirst ? 'bg-[#888888]' : 'bg-[#555555]'
                  }`}
                />
              </div>

              {/* Node Card */}
              <div className="border border-[#202020] hover:border-[#333333] bg-[#0E0E0E] p-3.5 sm:p-4 rounded-sm transition-colors space-y-2">
                {/* Language & Era Header */}
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#EDEDED] uppercase tracking-wider">
                        {stage.language}
                      </span>
                      {isFirst && (
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 text-[#888888] border border-[#2A2A2A] rounded-2xs">
                          Earliest
                        </span>
                      )}
                      {isLast && (
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 text-[#EDEDED] border border-[#444444] rounded-2xs bg-[#1A1A1A]">
                          Current Form
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#666666] font-mono block">
                      {stage.era} {stage.date && `(${stage.date})`}
                    </span>
                  </div>

                  {/* Ancestral Form Pill */}
                  <div className="text-right">
                    <span className="font-mono text-sm sm:text-base font-bold text-[#EDEDED] tracking-wide px-2 py-0.5 bg-[#141414] border border-[#282828] rounded-xs inline-block">
                      {stage.form}
                    </span>
                  </div>
                </div>

                {/* Historical Meaning */}
                {stage.meaning && (
                  <div className="text-xs text-[#CCCCCC] flex items-baseline gap-1.5 pt-0.5">
                    <span className="text-[#666666] text-[11px] uppercase tracking-wider shrink-0">
                      Meaning:
                    </span>
                    <span className="italic font-serif">"{stage.meaning}"</span>
                  </div>
                )}

                {/* Context & Sound Shifts */}
                {stage.historicalContext && (
                  <p className="text-xs text-[#888888] leading-relaxed pt-1 border-t border-[#1A1A1A]">
                    {stage.historicalContext}
                  </p>
                )}
              </div>

              {/* Downward transition indicator between steps */}
              {!isLast && (
                <div className="flex items-center gap-2 pl-3 py-1 text-[11px] text-[#555555]">
                  <ArrowDown className="w-3 h-3 text-[#444444]" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#666666]">
                    Phonetic & Morphological Transition
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Phonetic Shifts summary if available */}
      {etymology.phoneticShifts && etymology.phoneticShifts.length > 0 && (
        <div className="border-t border-[#1F1F1F] pt-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-[#888888]">
            <Sparkles className="w-3.5 h-3.5 text-[#EDEDED]" />
            <span className="uppercase tracking-wider text-[11px] text-[#EDEDED] font-mono">
              Key Historical Sound Laws & Shifts
            </span>
          </div>
          <ul className="space-y-1 pl-4 list-disc text-xs text-[#888888]">
            {etymology.phoneticShifts.map((shift, i) => (
              <li key={i} className="leading-relaxed">
                <span className="font-mono text-[#BBBBBB]">{shift}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
