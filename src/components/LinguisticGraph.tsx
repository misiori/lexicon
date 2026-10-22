import React, { useState, useRef, useEffect, useMemo } from 'react';
import { WordEntry, RelatedWord, RelationshipType } from '../types/lexicon';
import { ZoomIn, ZoomOut, RotateCcw, List, Network } from 'lucide-react';

interface Props {
  entry: WordEntry;
  onSelectWord: (word: string) => void;
}

interface NodePosition {
  word: string;
  language: string;
  relationshipType: RelationshipType;
  explanation: string;
  x: number;
  y: number;
}

export const LinguisticGraph: React.FC<Props> = ({ entry, onSelectWord }) => {
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [activeTooltip, setActiveTooltip] = useState<RelatedWord | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: Math.max(rect.width, 320),
          height: Math.max(Math.min(rect.width * 0.65, 420), 300),
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Calculate satellite nodes
  const nodes: NodePosition[] = useMemo(() => {
    const items = entry.relatedWords || [];
    const count = items.length;
    if (count === 0) return [];

    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2;
    const radius = Math.min(dimensions.width, dimensions.height) * 0.36;

    return items.map((item, index) => {
      const angle = (index * (2 * Math.PI)) / count - Math.PI / 2;
      return {
        ...item,
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      };
    });
  }, [entry.relatedWords, dimensions]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    setZoom((z) => Math.min(Math.max(z * factor, 0.6), 2.2));
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setActiveTooltip(null);
  };

  const getLineDash = (type: RelationshipType) => {
    switch (type) {
      case 'etymological':
        return 'none';
      case 'semantic':
        return '4 3';
      case 'borrowing':
        return '2 3';
      case 'translation':
        return '6 3 2 3';
      default:
        return 'none';
    }
  };

  const getBorderClass = (type: RelationshipType) => {
    switch (type) {
      case 'etymological':
        return 'border-solid border-[#E8E8E8]';
      case 'semantic':
        return 'border-dashed border-[#888888]';
      case 'borrowing':
        return 'border-dotted border-[#888888]';
      case 'translation':
        return 'border-double border-[#888888]';
      default:
        return 'border-[#252525]';
    }
  };

  return (
    <div className="border border-[#252525] bg-[#000000] p-4 rounded-sm">
      <div className="flex items-center justify-between pb-3 border-b border-[#252525] gap-2">
        <div className="flex items-center gap-2">
          <span className="font-caveat text-lg text-[#E8E8E8]">Linguistic Connections</span>
          <span className="text-xs text-[#606060]">({entry.relatedWords.length})</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#888888]">
          <button
            onClick={() => setViewMode('graph')}
            className={`p-1.5 border rounded-sm transition-colors ${
              viewMode === 'graph'
                ? 'border-[#E8E8E8] text-[#E8E8E8] bg-[#151515]'
                : 'border-[#252525] text-[#888888] hover:text-[#E8E8E8]'
            }`}
            title="Graph view"
          >
            <Network className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 border rounded-sm transition-colors ${
              viewMode === 'list'
                ? 'border-[#E8E8E8] text-[#E8E8E8] bg-[#151515]'
                : 'border-[#252525] text-[#888888] hover:text-[#E8E8E8]'
            }`}
            title="List view"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {entry.relatedWords.length === 0 ? (
        <div className="py-8 text-center text-xs text-[#606060]">
          No explicit cross-linguistic connections recorded for this word entry.
        </div>
      ) : viewMode === 'list' ? (
        <div className="divide-y divide-[#252525] mt-3 max-h-96 overflow-y-auto">
          {entry.relatedWords.map((rel, idx) => (
            <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => onSelectWord(rel.word)}
                    className="font-caveat text-base text-[#E8E8E8] hover:underline text-left cursor-pointer"
                  >
                    {rel.word}
                  </button>
                  <span className="text-xs text-[#888888]">({rel.language})</span>
                  <span className="text-[11px] text-[#606060] uppercase tracking-wider">
                    {rel.relationshipType}
                  </span>
                </div>
                <p className="text-xs text-[#888888] mt-0.5 leading-relaxed">{rel.explanation}</p>
              </div>
              <button
                onClick={() => onSelectWord(rel.word)}
                className="text-xs text-[#888888] hover:text-[#E8E8E8] border border-[#252525] hover:border-[#606060] px-2 py-0.5 rounded-sm shrink-0 self-start sm:self-auto"
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative mt-2" ref={containerRef}>
          {/* Controls overlay */}
          <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-[#000000]/80 p-1 border border-[#252525] rounded-sm">
            <button
              onClick={() => setZoom((z) => Math.min(z * 1.15, 2.2))}
              className="p-1 text-[#888888] hover:text-[#E8E8E8] transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z * 0.85, 0.6))}
              className="p-1 text-[#888888] hover:text-[#E8E8E8] transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={resetView}
              className="p-1 text-[#888888] hover:text-[#E8E8E8] transition-colors"
              title="Reset view"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* SVG Canvas */}
          <div
            className={`w-full overflow-hidden border border-[#252525] bg-[#050505] rounded-sm ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ height: dimensions.height }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
              className="select-none"
            >
              <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                {/* Connecting lines */}
                {nodes.map((node, i) => (
                  <line
                    key={`line-${i}`}
                    x1={dimensions.width / 2}
                    y1={dimensions.height / 2}
                    x2={node.x}
                    y2={node.y}
                    stroke="#383838"
                    strokeWidth="1.2"
                    strokeDasharray={getLineDash(node.relationshipType)}
                  />
                ))}

                {/* Central Node */}
                <g transform={`translate(${dimensions.width / 2}, ${dimensions.height / 2})`}>
                  <circle r="36" fill="#000000" stroke="#E8E8E8" strokeWidth="1.5" />
                  <text
                    textAnchor="middle"
                    dy="-4"
                    fill="#E8E8E8"
                    className="font-caveat text-sm font-bold"
                  >
                    {entry.word}
                  </text>
                  <text
                    textAnchor="middle"
                    dy="14"
                    fill="#888888"
                    className="text-[10px]"
                  >
                    {entry.language}
                  </text>
                </g>

                {/* Satellite Nodes */}
                {nodes.map((node, i) => (
                  <g
                    key={`node-${i}`}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectWord(node.word);
                    }}
                    onMouseEnter={() => setActiveTooltip(node)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <circle
                      r="28"
                      fill="#121212"
                      stroke={node.relationshipType === 'etymological' ? '#E8E8E8' : '#383838'}
                      strokeWidth="1"
                      strokeDasharray={getLineDash(node.relationshipType)}
                      className="group-hover:stroke-[#E8E8E8] group-hover:fill-[#1a1a1a] transition-colors"
                    />
                    <text
                      textAnchor="middle"
                      dy="-3"
                      fill="#E8E8E8"
                      className="font-caveat text-xs group-hover:underline"
                    >
                      {node.word.length > 10 ? `${node.word.slice(0, 9)}…` : node.word}
                    </text>
                    <text
                      textAnchor="middle"
                      dy="11"
                      fill="#888888"
                      className="text-[9px]"
                    >
                      {node.language}
                    </text>
                  </g>
                ))}
              </g>
            </svg>
          </div>

          {/* Active Hover Tooltip */}
          {activeTooltip && (
            <div className="mt-2 p-2.5 border border-[#252525] bg-[#0c0c0c] text-xs space-y-1 rounded-sm">
              <div className="flex items-center gap-2">
                <span className="font-caveat text-sm text-[#E8E8E8]">{activeTooltip.word}</span>
                <span className="text-[#888888]">({activeTooltip.language})</span>
                <span className="text-[10px] text-[#606060] uppercase tracking-wider">
                  {activeTooltip.relationshipType}
                </span>
              </div>
              <p className="text-[#888888]">{activeTooltip.explanation}</p>
              <p className="text-[10px] text-[#606060]">Click node to inspect word</p>
            </div>
          )}

          {/* Graph Legend */}
          <div className="mt-3 pt-2.5 border-t border-[#252525] flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-[#888888]">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-[1.5px] bg-[#E8E8E8] inline-block" />
              <span>Etymological</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-0 border-t border-dashed border-[#888888] inline-block" />
              <span>Semantic</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-0 border-t border-dotted border-[#888888] inline-block" />
              <span>Borrowing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-0 border-t-2 border-double border-[#888888] inline-block" />
              <span>Translation</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
