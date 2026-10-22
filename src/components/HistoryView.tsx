import React from 'react';
import { HistoryItem } from '../hooks/useLexiconStorage';
import { Clock, Trash2, ArrowRight } from 'lucide-react';

interface Props {
  history: HistoryItem[];
  onSelectWord: (word: string) => void;
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
}

export const HistoryView: React.FC<Props> = ({
  history,
  onSelectWord,
  onClearHistory,
  onRemoveItem,
}) => {
  const formatTime = (ts: number) => {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="flex items-baseline justify-between border-b border-[#252525] pb-3">
        <div>
          <h1 className="font-caveat text-3xl sm:text-4xl text-[#E8E8E8]">History</h1>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1 text-xs text-[#888888] hover:text-[#E8E8E8] border border-[#252525] hover:border-[#606060] px-2.5 py-1 rounded-sm transition-colors cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear history</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="py-16 text-center space-y-3 border border-[#252525] bg-[#050505] p-6 rounded-sm">
          <Clock className="w-6 h-6 text-[#606060] mx-auto" />
          <p className="text-sm text-[#E8E8E8]">No exploration history yet.</p>
          <p className="text-xs text-[#888888] max-w-sm mx-auto">
            Words you view in the Explore or Search sections will be recorded here automatically.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-[#252525]">
          {history.map((item) => (
            <div
              key={`${item.id}-${item.timestamp}`}
              className="py-3 flex items-start justify-between gap-4 hover:bg-[#101010] px-2.5 -mx-2.5 rounded-sm transition-colors group"
            >
              <div
                onClick={() => onSelectWord(item.word)}
                className="cursor-pointer flex-1"
              >
                <div className="flex items-baseline gap-2.5">
                  <span className="font-caveat text-xl text-[#E8E8E8] group-hover:underline">
                    {item.word}
                  </span>
                  <span className="text-xs text-[#606060]">{item.language}</span>
                  <span className="text-[11px] text-[#606060] font-mono">
                    {formatTime(item.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-[#888888] mt-0.5 line-clamp-1 leading-relaxed">
                  {item.shortDefinition}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-1">
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1 text-[#606060] hover:text-[#888888] transition-colors"
                  title="Remove entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onSelectWord(item.word)}
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
