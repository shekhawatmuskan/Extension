// src/utils/helpers.js

/**
 * Extract domain from a URL
 * @param {string} url
 * @returns {string}
 */
export function getDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

/**
 * Get favicon URL for a domain
 * @param {string} url
 * @returns {string}
 */
export function getFaviconUrl(url) {
  try {
    const { origin } = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${origin}&sz=32`;
  } catch {
    return '';
  }
}

/**
 * Format a timestamp to a relative or absolute time string
 * @param {number} timestamp
 * @returns {string}
 */
export function formatTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: days > 365 ? 'numeric' : undefined,
  });
}

/**
 * Truncate text to a given length
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(text, maxLength = 150) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

/**
 * Group highlights by domain
 * @param {Array} highlights
 * @returns {Object} { domain: [highlights] }
 */
export function groupByDomain(highlights) {
  return highlights.reduce((groups, highlight) => {
    const domain = highlight.domain || getDomain(highlight.url);
    if (!groups[domain]) groups[domain] = [];
    groups[domain].push(highlight);
    return groups;
  }, {});
}

/**
 * Short display URL — removes protocol and trailing slash
 * @param {string} url
 * @returns {string}
 */
export function shortUrl(url) {
  try {
    const u = new URL(url);
    const path = u.pathname === '/' ? '' : u.pathname;
    const display = u.hostname.replace('www.', '') + path;
    return display.length > 40 ? display.slice(0, 40) + '…' : display;
  } catch {
    return url;
  }
}
