// src/hooks/useHighlights.js
import { useState, useEffect, useCallback } from 'react';
import {
  getHighlights,
  saveHighlight,
  deleteHighlight,
  clearAllHighlights,
} from '../utils/storage';

export function useHighlights() {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState(new Set());

  const load = useCallback(async () => {
    try {
      const data = await getHighlights();
      setHighlights(data);
    } catch (err) {
      console.error('[HighlightVault] Failed to load highlights:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();

    // Listen for storage changes (e.g., content script saved a new highlight)
    const handleStorageChange = (changes) => {
      if (changes.highlights) {
        setHighlights(changes.highlights.newValue || []);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, [load]);

  const remove = useCallback(async (id) => {
    // Mark as deleting for fade-out animation
    setDeletingIds((prev) => new Set([...prev, id]));

    // Wait for animation
    await new Promise((r) => setTimeout(r, 350));

    try {
      const updated = await deleteHighlight(id);
      setHighlights(updated);
    } catch (err) {
      console.error('[HighlightVault] Failed to delete highlight:', err);
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }, []);

  const clearAll = useCallback(async () => {
    try {
      await clearAllHighlights();
      setHighlights([]);
    } catch (err) {
      console.error('[HighlightVault] Failed to clear highlights:', err);
    }
  }, []);

  const add = useCallback(async (highlight) => {
    try {
      const updated = await saveHighlight(highlight);
      setHighlights(updated);
      return true;
    } catch (err) {
      console.error('[HighlightVault] Failed to save highlight:', err);
      return false;
    }
  }, []);

  return {
    highlights,
    loading,
    deletingIds,
    remove,
    clearAll,
    add,
    reload: load,
  };
}
