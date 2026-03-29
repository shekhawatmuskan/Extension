// src/utils/storage.js
// All chrome.storage.local interactions

export const STORAGE_KEYS = {
  HIGHLIGHTS: 'highlights',
  OPENAI_KEY: 'openai_api_key',
};

/**
 * Get all saved highlights
 * @returns {Promise<Array>}
 */
export async function getHighlights() {
  return new Promise((resolve) => {
    chrome.storage.local.get([STORAGE_KEYS.HIGHLIGHTS], (result) => {
      resolve(result[STORAGE_KEYS.HIGHLIGHTS] || []);
    });
  });
}

/**
 * Save a new highlight
 * @param {Object} highlight - { text, url, title, timestamp, domain, favicon }
 * @returns {Promise<Array>} updated highlights array
 */
export async function saveHighlight(highlight) {
  const highlights = await getHighlights();
  const newHighlight = {
    id: `hv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...highlight,
    timestamp: Date.now(),
  };
  const updated = [newHighlight, ...highlights];
  await new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEYS.HIGHLIGHTS]: updated }, resolve);
  });
  return updated;
}

/**
 * Delete a highlight by id
 * @param {string} id
 * @returns {Promise<Array>} updated highlights array
 */
export async function deleteHighlight(id) {
  const highlights = await getHighlights();
  const updated = highlights.filter((h) => h.id !== id);
  await new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEYS.HIGHLIGHTS]: updated }, resolve);
  });
  return updated;
}

/**
 * Clear all highlights
 * @returns {Promise<void>}
 */
export async function clearAllHighlights() {
  await new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEYS.HIGHLIGHTS]: [] }, resolve);
  });
}

/**
 * Get the stored OpenAI API key
 * @returns {Promise<string|null>}
 */
export async function getApiKey() {
  return new Promise((resolve) => {
    chrome.storage.local.get([STORAGE_KEYS.OPENAI_KEY], (result) => {
      resolve(result[STORAGE_KEYS.OPENAI_KEY] || null);
    });
  });
}

/**
 * Save the OpenAI API key
 * @param {string} key
 * @returns {Promise<void>}
 */
export async function saveApiKey(key) {
  await new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEYS.OPENAI_KEY]: key }, resolve);
  });
}

/**
 * Remove the stored API key
 * @returns {Promise<void>}
 */
export async function clearApiKey() {
  await new Promise((resolve) => {
    chrome.storage.local.remove([STORAGE_KEYS.OPENAI_KEY], resolve);
  });
}
