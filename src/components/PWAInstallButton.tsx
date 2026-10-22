import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share2, X } from 'lucide-react';

interface Props {
  className?: string;
  variant?: 'compact' | 'full';
}

export const PWAInstallButton: React.FC<Props> = ({ className = '', variant = 'compact' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#888888] hover:text-[#E8E8E8] hover:bg-[#151515] border border-[#252525] rounded-sm transition-colors ${className}`}
        title="Install Lexicon as Progressive Web App"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSModal(true)}
          className={`flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#888888] hover:text-[#E8E8E8] hover:bg-[#151515] border border-[#252525] rounded-sm transition-colors ${className}`}
          title="Install on iOS"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install App</span>
        </button>

        {showIOSModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/80 p-4 backdrop-blur-xs"
            onClick={() => setShowIOSModal(false)}
          >
            <div
              className="w-full max-w-sm border border-[#252525] bg-[#000000] p-5 shadow-lg rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#252525]">
                <span className="font-caveat text-lg text-[#E8E8E8]">Install Lexicon</span>
                <button
                  onClick={() => setShowIOSModal(false)}
                  className="text-[#888888] hover:text-[#E8E8E8] p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="py-4 text-xs text-[#888888] space-y-2.5">
                <p className="text-[#E8E8E8]">To install Lexicon on iPhone or iPad:</p>
                <div className="flex items-start gap-2">
                  <Share2 className="w-3.5 h-3.5 mt-0.5 text-[#E8E8E8] shrink-0" />
                  <span>1. Tap the <strong>Share</strong> button in Safari's bottom toolbar.</span>
                </div>
                <div>
                  <span>2. Scroll down the menu and choose <strong>Add to Home Screen</strong>.</span>
                </div>
                <div>
                  <span>3. Tap <strong>Add</strong> in the top right corner.</span>
                </div>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="w-full mt-2 py-1.5 text-xs border border-[#252525] text-[#E8E8E8] hover:bg-[#151515] rounded-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
