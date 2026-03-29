// src/background/background.js
// Service worker for HighlightVault

import { saveHighlight } from '../utils/storage.js';
import { getDomain, getFaviconUrl } from '../utils/helpers.js';

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SAVE_HIGHLIGHT') {
    const { text, url, title } = message.payload;

    const highlight = {
      text,
      url,
      title,
      domain: getDomain(url),
      favicon: getFaviconUrl(url),
    };

    saveHighlight(highlight)
      .then(() => {
        sendResponse({ success: true });
        // Update badge count
        updateBadge();
      })
      .catch((err) => {
        console.error('[HighlightVault] Save failed:', err);
        sendResponse({ success: false, error: err.message });
      });

    return true; // Keep channel open for async response
  }
});

// Update badge with current highlight count
async function updateBadge() {
  try {
    const result = await chrome.storage.local.get(['highlights']);
    const count = (result.highlights || []).length;
    const text = count > 0 ? (count > 99 ? '99+' : String(count)) : '';
    await chrome.action.setBadgeText({ text });
    await chrome.action.setBadgeBackgroundColor({ color: '#7C3AED' });
  } catch (err) {
    console.error('[HighlightVault] Badge update failed:', err);
  }
}

// Update badge on storage changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.highlights) {
    updateBadge();
  }
});

// Initialize badge on startup
updateBadge();

// Context menu — right-click to save selection
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'save-highlight',
    title: 'Save to HighlightVault',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'save-highlight' && info.selectionText) {
    const highlight = {
      text: info.selectionText,
      url: tab.url || '',
      title: tab.title || '',
      domain: getDomain(tab.url || ''),
      favicon: getFaviconUrl(tab.url || ''),
    };

    try {
      await saveHighlight(highlight);
      await updateBadge();
      // Notify the tab that save succeeded
      chrome.tabs.sendMessage(tab.id, { type: 'HIGHLIGHT_SAVED_CONTEXT_MENU' }).catch(() => {});
    } catch (err) {
      console.error('[HighlightVault] Context menu save failed:', err);
    }
  }
});
