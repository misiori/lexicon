import React from 'react';

interface Props {
  onClearAllData?: () => void;
}

export const AboutView: React.FC<Props> = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[#252525] pb-3">
        <h1 className="font-caveat text-3xl sm:text-4xl text-[#E8E8E8]">About & Sources</h1>
      </div>

      {/* Purpose & Philosophy */}
      <div className="space-y-3 text-xs sm:text-sm text-[#888888] leading-relaxed">
        <p>
          Lexicon is a simple tool for discovering ancient roots on some languages for linguists, philologists, translators, and curious readers. You can also see a meaning of any word in any of the supported languages.
        </p>
      </div>

      {/* Sources & References */}
      <div className="space-y-3 border-t border-[#252525] pt-6">
        <h2 className="font-caveat text-xl text-[#E8E8E8]">Linguistic Sources & Philology</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#888888]">
          <div className="border border-[#252525] p-3 rounded-sm space-y-1">
            <span className="text-[#E8E8E8] font-medium block">Real Academia Española (DLE)</span>
            <p className="text-[#606060] leading-relaxed">
              Standard authority for Spanish lexical and historical etymological data.
            </p>
          </div>
          <div className="border border-[#252525] p-3 rounded-sm space-y-1">
            <span className="text-[#E8E8E8] font-medium block">Deutsches Wörterbuch (Grimm) & Duden</span>
            <p className="text-[#606060] leading-relaxed">
              Comprehensive historical records of the German language and Romantic neologisms.
            </p>
          </div>
          <div className="border border-[#252525] p-3 rounded-sm space-y-1">
            <span className="text-[#E8E8E8] font-medium block">Nihon Kokugo Daijiten (Shogakukan)</span>
            <p className="text-[#606060] leading-relaxed">
              Unabridged dictionary of historical Japanese vocabulary and Sino-Japanese roots.
            </p>
          </div>
          <div className="border border-[#252525] p-3 rounded-sm space-y-1">
            <span className="text-[#E8E8E8] font-medium block">Dicionário Houaiss & Oxford Philology</span>
            <p className="text-[#606060] leading-relaxed">
              Portuguese etymology, Proto-Indo-European roots, and historical Germanic philology.
            </p>
          </div>
        </div>
      </div>

      {/* Brand Signature - Centered, no portfolio link */}
      <div className="border-t border-[#252525] pt-6 flex items-center justify-center text-xs text-[#606060]">
        <div className="flex items-center gap-1.5">
          <span>made by</span>
          <a
            href="https://misiori.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-caveat text-base text-[#888888] hover:text-[#E8E8E8] transition-colors"
          >
            misiori
          </a>
        </div>
      </div>
    </div>
  );
};
