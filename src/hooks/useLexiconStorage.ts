import { useState, useEffect, useCallback } from 'react';
import { WordEntry } from '../types/lexicon';
import { getCuratedWordById } from '../services/dictionaryService';

const SAVED_STORAGE_KEY = 'lexicon_saved_words';
const HISTORY_STORAGE_KEY = 'lexicon_history';

export interface HistoryItem {
  id: string;
  word: string;
  language: string;
  shortDefinition: string;
  timestamp: number;
}

export function useLexiconStorage() {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['sobremesa', 'saudade', 'komorebi'];
    } catch {
      return ['sobremesa', 'saudade', 'komorebi'];
    }
  });

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Keep localStorage updated
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedIds));
    } catch (e) {
      console.warn('Failed to save savedIds to localStorage', e);
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save history to localStorage', e);
    }
  }, [history]);

  const toggleSave = useCallback((wordId: string) => {
    setSavedIds((prev) => {
      if (prev.includes(wordId)) {
        return prev.filter((id) => id !== wordId);
      } else {
        return [wordId, ...prev];
      }
    });
  }, []);

  const isSaved = useCallback((wordId: string) => {
    return savedIds.includes(wordId);
  }, [savedIds]);

  const addToHistory = useCallback((entry: WordEntry) => {
    setHistory((prev) => {
      // Prevent consecutive duplicate
      if (prev.length > 0 && prev[0].id === entry.id) {
        return prev;
      }
      // Remove any existing instance of this word to bubble it to top
      const filtered = prev.filter((item) => item.id !== entry.id);
      const newItem: HistoryItem = {
        id: entry.id,
        word: entry.word,
        language: entry.language,
        shortDefinition: entry.shortDefinition,
        timestamp: Date.now(),
      };
      return [newItem, ...filtered].slice(0, 50); // Keep last 50
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const removeHistoryItem = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    savedIds,
    toggleSave,
    isSaved,
    history,
    addToHistory,
    clearHistory,
    removeHistoryItem,
  };
}
