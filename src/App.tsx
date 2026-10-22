import React, { useState, useCallback, useEffect } from 'react';
import { ActiveNavTab, WordEntry } from './types/lexicon';
import { CURATED_WORDS } from './data/curatedWords';
import { getCuratedWordById, fetchExternalWord } from './services/dictionaryService';
import { reconstructEtymology } from './services/etymologyReconstructor';
import { useLexiconStorage } from './hooks/useLexiconStorage';
import { ExploreView } from './components/ExploreView';
import { SearchView } from './components/SearchView';
import { SavedView } from './components/SavedView';
import { HistoryView } from './components/HistoryView';
import { WordDetailView } from './components/WordDetailView';
import { AboutView } from './components/AboutView';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallButton } from './components/PWAInstallButton';
import {
  Compass,
  Search,
  Bookmark,
  Clock,
  Info,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('explore');
  const [selectedWord, setSelectedWord] = useState<WordEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLanguage, setSearchLanguage] = useState('all');
  const [isLoadingWord, setIsLoadingWord] = useState(false);

  const {
    savedIds,
    toggleSave,
    isSaved,
    history,
    addToHistory,
    clearHistory,
    removeHistoryItem,
  } = useLexiconStorage();

  // Keyboard shortcut '/' to search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        setSelectedWord(null);
        setActiveTab('search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle word selection
  const handleSelectWord = useCallback(
    async (wordStr: string) => {
      // 1. Check curated list
      const local = getCuratedWordById(wordStr);
      if (local) {
        setSelectedWord(local);
        addToHistory(local);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // 2. Fetch external dictionary or run comparative reconstruction
      setIsLoadingWord(true);
      try {
        const ext = await fetchExternalWord(wordStr);
        if (ext) {
          setSelectedWord(ext);
          addToHistory(ext);
        } else {
          const fallbackEntry = reconstructEtymology(wordStr);
          setSelectedWord(fallbackEntry);
          addToHistory(fallbackEntry);
        }
      } catch (err) {
        console.warn('Word resolution error, generating comparative reconstruction:', err);
        const fallbackEntry = reconstructEtymology(wordStr);
        setSelectedWord(fallbackEntry);
        addToHistory(fallbackEntry);
      } finally {
        setIsLoadingWord(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [addToHistory]
  );

  const handleSearchSubmit = (query: string, language: string) => {
    setSearchQuery(query);
    setSearchLanguage(language);
    setSelectedWord(null);
    setActiveTab('search');
  };

  const handleBackFromDetail = () => {
    setSelectedWord(null);
  };

  const handleClearAllData = () => {
    if (window.confirm('Reset all saved words and history?')) {
      clearHistory();
      try {
        localStorage.removeItem('lexicon_saved_words');
        localStorage.removeItem('lexicon_history');
        window.location.reload();
      } catch (e) {
        console.warn(e);
      }
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#000000] text-[#E8E8E8] overflow-hidden select-none font-hand">
      {/* Offline Status Badge */}
      <OfflineIndicator />

      {/* Desktop Sidebar (240px wide) */}
      <aside className="hidden md:flex flex-col w-60 border-r border-[#252525] bg-[#000000] shrink-0 justify-between">
        {/* Top brand & search shortcut */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setSelectedWord(null);
                setActiveTab('explore');
              }}
              className="text-left cursor-pointer group"
            >
              <span className="font-caveat text-3xl font-bold tracking-wider text-[#E8E8E8] group-hover:text-white transition-colors">
                lexicon
              </span>
            </button>
            <PWAInstallButton />
          </div>

          {/* Quick search button */}
          <button
            onClick={() => {
              setSelectedWord(null);
              setActiveTab('search');
            }}
            className="w-full flex items-center justify-between border border-[#252525] hover:border-[#606060] bg-[#0A0A0A] px-2.5 py-1.5 text-xs text-[#888888] hover:text-[#E8E8E8] rounded-sm transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Quick search...</span>
            </div>
            <kbd className="text-[10px] text-[#606060] font-mono border border-[#252525] px-1 rounded-xs">
              /
            </kbd>
          </button>

          {/* Main Navigation links (Explore, Search, Saved, History) */}
          <nav className="space-y-1 pt-1">
            <button
              onClick={() => {
                setSelectedWord(null);
                setActiveTab('explore');
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-sm transition-colors text-left cursor-pointer ${
                activeTab === 'explore' && !selectedWord
                  ? 'border border-[#252525] bg-[#151515] text-[#E8E8E8] font-medium'
                  : 'text-[#888888] hover:text-[#E8E8E8] hover:bg-[#101010]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#888888]" />
              <span>Explore</span>
            </button>

            <button
              onClick={() => {
                setSelectedWord(null);
                setActiveTab('search');
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-sm transition-colors text-left cursor-pointer ${
                activeTab === 'search' && !selectedWord
                  ? 'border border-[#252525] bg-[#151515] text-[#E8E8E8] font-medium'
                  : 'text-[#888888] hover:text-[#E8E8E8] hover:bg-[#101010]'
              }`}
            >
              <Search className="w-4 h-4 text-[#888888]" />
              <span>Search</span>
            </button>

            <button
              onClick={() => {
                setSelectedWord(null);
                setActiveTab('saved');
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-sm transition-colors text-left cursor-pointer ${
                activeTab === 'saved' && !selectedWord
                  ? 'border border-[#252525] bg-[#151515] text-[#E8E8E8] font-medium'
                  : 'text-[#888888] hover:text-[#E8E8E8] hover:bg-[#101010]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-4 h-4 text-[#888888]" />
                <span>Saved</span>
              </div>
              {savedIds.length > 0 && (
                <span className="text-[11px] text-[#606060] font-mono">
                  {savedIds.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setSelectedWord(null);
                setActiveTab('history');
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-sm transition-colors text-left cursor-pointer ${
                activeTab === 'history' && !selectedWord
                  ? 'border border-[#252525] bg-[#151515] text-[#E8E8E8] font-medium'
                  : 'text-[#888888] hover:text-[#E8E8E8] hover:bg-[#101010]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#888888]" />
                <span>History</span>
              </div>
              {history.length > 0 && (
                <span className="text-[11px] text-[#606060] font-mono">
                  {history.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Sidebar Footer with brand signature */}
        <div className="p-4 border-t border-[#252525] space-y-3">
          <button
            onClick={() => {
              setSelectedWord(null);
              setActiveTab('about');
            }}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-sm transition-colors text-left cursor-pointer ${
              activeTab === 'about' && !selectedWord
                ? 'border border-[#252525] bg-[#151515] text-[#E8E8E8]'
                : 'text-[#888888] hover:text-[#E8E8E8] hover:bg-[#101010]'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>About & Sources</span>
          </button>

          {/* Discreet brand signature */}
          <div className="text-[11px] text-[#606060] flex items-center justify-center gap-1">
            <span>made by</span>
            <a
              href="https://misiori.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-caveat text-sm text-[#888888] hover:text-[#E8E8E8] transition-colors"
            >
              misiori
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Top Header (compact) */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[#252525] bg-[#000000] shrink-0">
          <button
            onClick={() => {
              setSelectedWord(null);
              setActiveTab('explore');
            }}
            className="font-caveat text-2xl font-bold tracking-wider text-[#E8E8E8]"
          >
            lexicon
          </button>

          <div className="flex items-center gap-2">
            <PWAInstallButton />
            <button
              onClick={() => {
                setSelectedWord(null);
                setActiveTab('about');
              }}
              className="p-1.5 text-[#888888] hover:text-[#E8E8E8] border border-[#252525] rounded-sm"
              title="About & Settings"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8 pb-24 md:pb-8">
          {isLoadingWord ? (
            <div className="max-w-3xl mx-auto py-24 text-center space-y-2 text-xs text-[#888888]">
              <div className="inline-block w-4 h-4 border border-[#888888] border-t-transparent rounded-full animate-spin mb-2" />
              <p>Excavating linguistic roots and archives...</p>
            </div>
          ) : selectedWord ? (
            <WordDetailView
              entry={selectedWord}
              isSaved={isSaved(selectedWord.id)}
              onToggleSave={() => toggleSave(selectedWord.id)}
              onBack={handleBackFromDetail}
              onSelectWord={handleSelectWord}
            />
          ) : (
            <>
              {activeTab === 'explore' && (
                <ExploreView
                  onSelectWord={handleSelectWord}
                  onSearchSubmit={handleSearchSubmit}
                  history={history}
                />
              )}

              {activeTab === 'search' && (
                <SearchView
                  initialQuery={searchQuery}
                  initialLanguage={searchLanguage}
                  onSelectWord={handleSelectWord}
                  onUpdateQuery={(q, l) => {
                    setSearchQuery(q);
                    setSearchLanguage(l);
                  }}
                />
              )}

              {activeTab === 'saved' && (
                <SavedView
                  savedIds={savedIds}
                  onToggleSave={toggleSave}
                  onSelectWord={handleSelectWord}
                />
              )}

              {activeTab === 'history' && (
                <HistoryView
                  history={history}
                  onSelectWord={handleSelectWord}
                  onClearHistory={clearHistory}
                  onRemoveItem={removeHistoryItem}
                />
              )}

              {activeTab === 'about' && (
                <AboutView onClearAllData={handleClearAllData} />
              )}
            </>
          )}
        </main>

        {/* Mobile Bottom Navigation Bar (4 destinations: Explore, Search, Saved, History) */}
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden fixed bottom-0 left-0 right-0 border-t border-[#252525] bg-[#000000] flex items-center justify-around py-2 px-1 z-30"
          style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
        >
          <button
            onClick={() => {
              setSelectedWord(null);
              setActiveTab('explore');
            }}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-sm transition-colors ${
              activeTab === 'explore' && !selectedWord
                ? 'text-[#E8E8E8]'
                : 'text-[#606060] hover:text-[#888888]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="text-[11px]">Explore</span>
          </button>

          <button
            onClick={() => {
              setSelectedWord(null);
              setActiveTab('search');
            }}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-sm transition-colors ${
              activeTab === 'search' && !selectedWord
                ? 'text-[#E8E8E8]'
                : 'text-[#606060] hover:text-[#888888]'
            }`}
          >
            <Search className="w-4 h-4" />
            <span className="text-[11px]">Search</span>
          </button>

          <button
            onClick={() => {
              setSelectedWord(null);
              setActiveTab('saved');
            }}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-sm transition-colors relative ${
              activeTab === 'saved' && !selectedWord
                ? 'text-[#E8E8E8]'
                : 'text-[#606060] hover:text-[#888888]'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span className="text-[11px]">Saved</span>
            {savedIds.length > 0 && (
              <span className="absolute top-0 right-2 w-1.5 h-1.5 bg-[#E8E8E8] rounded-full" />
            )}
          </button>

          <button
            onClick={() => {
              setSelectedWord(null);
              setActiveTab('history');
            }}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-sm transition-colors ${
              activeTab === 'history' && !selectedWord
                ? 'text-[#E8E8E8]'
                : 'text-[#606060] hover:text-[#888888]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span className="text-[11px]">History</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
