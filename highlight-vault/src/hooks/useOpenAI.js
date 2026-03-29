// src/hooks/useOpenAI.js
import { useState, useCallback } from 'react';
import { getApiKey } from '../utils/storage';
import { summarizeAllHighlights, getHighlightInsight } from '../utils/openai';

export function useOpenAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const summarizeAll = useCallback(async (highlights) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = await getApiKey();
      if (!apiKey) throw new Error('NO_API_KEY');
      const result = await summarizeAllHighlights(apiKey, highlights);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getInsight = useCallback(async (highlight) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = await getApiKey();
      if (!apiKey) throw new Error('NO_API_KEY');
      const result = await getHighlightInsight(apiKey, highlight);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { loading, error, summarizeAll, getInsight, clearError };
}
