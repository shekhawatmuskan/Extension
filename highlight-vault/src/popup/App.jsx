// src/popup/App.jsx
import { useState, useMemo, useCallback } from 'react';
import { useHighlights } from '../hooks/useHighlights';
import { useOpenAI } from '../hooks/useOpenAI';
import { HighlightCard } from '../components/HighlightCard';
import { SummarizeModal } from '../components/SummarizeModal';
import { EmptyState } from '../components/EmptyState';
import { SearchBar } from '../components/SearchBar';
import { groupByDomain } from '../utils/helpers';

export function App() {
  const { highlights, loading, deletingIds, remove, clearAll } = useHighlights();
  const { loading: aiLoading, error: aiError, summarizeAll, getInsight, clearError } = useOpenAI();

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [summaryText, setSummaryText] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Filter highlights based on search
  const filtered = useMemo(() => {
    if (!search.trim()) return highlights;
    const q = search.toLowerCase();
    return highlights.filter(
      (h) =>
        h.text.toLowerCase().includes(q) ||
        h.domain?.toLowerCase().includes(q) ||
        h.title?.toLowerCase().includes(q)
    );
  }, [highlights, search]);

  const grouped = useMemo(() => groupByDomain(filtered), [filtered]);
  const domains = Object.keys(grouped).sort();

  const handleSummarize = useCallback(async () => {
    setSummaryText(null);
    clearError();
    setShowModal(true);
    const result = await summarizeAll(highlights);
    if (result) setSummaryText(result);
  }, [highlights, summarizeAll, clearError]);

  const handleInsight = useCallback(
    async (highlight) => {
      return await getInsight(highlight);
    },
    [getInsight]
  );

  const handleClearAll = useCallback(() => {
    if (showClearConfirm) {
      clearAll();
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
      setTimeout(() => setShowClearConfirm(false), 3000);
    }
  }, [showClearConfirm, clearAll]);

  return (
    <>
      <style>{CSS}</style>
      <div className="hv-app">
        {/* Header */}
        <header className="hv-header">
          <div className="hv-logo">
            <span className="hv-logo-icon">⬡</span>
            <span className="hv-logo-text">HighlightVault</span>
          </div>
          <div className="hv-header-actions">
            {highlights.length > 0 && (
              <button
                className={`hv-btn-clear ${showClearConfirm ? 'hv-btn-clear-confirm' : ''}`}
                onClick={handleClearAll}
                title={showClearConfirm ? 'Click again to confirm' : 'Clear all highlights'}
              >
                {showClearConfirm ? 'Confirm clear?' : 'Clear all'}
              </button>
            )}
            <a
              href={chrome?.runtime?.getURL?.('options.html') || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="hv-btn-icon hv-btn-settings"
              title="Settings"
            >
              <SettingsIcon />
            </a>
          </div>
        </header>

        {/* Search + Summarize bar */}
        <div className="hv-toolbar">
          <SearchBar value={search} onChange={setSearch} count={highlights.length} />
          <button
            className="hv-btn-summarize"
            onClick={handleSummarize}
            disabled={highlights.length === 0 || aiLoading}
            title="Summarize all highlights with AI"
          >
            {aiLoading ? <span className="hv-spinner-sm" /> : '✨'}
            <span>Summarize All</span>
          </button>
        </div>

        {/* Main content area */}
        <main className="hv-main">
          {loading ? (
            <div className="hv-loading-state">
              <div className="hv-spinner-lg" />
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState searchActive={search.length > 0} />
          ) : (
            <div className="hv-list">
              {domains.map((domain) => (
                <div key={domain} className="hv-domain-group">
                  <div className="hv-domain-label">
                    <span>{domain}</span>
                    <span className="hv-domain-count">{grouped[domain].length}</span>
                  </div>
                  {grouped[domain].map((highlight) => (
                    <HighlightCard
                      key={highlight.id}
                      highlight={highlight}
                      onDelete={remove}
                      isDeleting={deletingIds.has(highlight.id)}
                      onInsight={handleInsight}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </main>

        {/* AI Modal */}
        {showModal && (
          <SummarizeModal
            summary={summaryText}
            loading={aiLoading}
            error={aiError}
            onClose={() => {
              setShowModal(false);
              setSummaryText(null);
              clearError();
            }}
            hasApiKey={true}
          />
        )}
      </div>
    </>
  );
}

function SettingsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

const CSS = `
  :root {
    --bg: #0a0b0f;
    --bg-2: #0f1117;
    --bg-3: #141720;
    --bg-4: #1a1f2e;
    --border: rgba(255,255,255,0.06);
    --border-accent: rgba(124,58,237,0.35);
    --purple: #7C3AED;
    --purple-light: #a78bfa;
    --purple-dim: rgba(124,58,237,0.15);
    --purple-glow: rgba(124,58,237,0.08);
    --text: #e2e8f0;
    --text-2: #94a3b8;
    --text-3: #4a5568;
    --cyan: #06b6d4;
    --green: #86efac;
    --red: #fca5a5;
    --radius: 12px;
    --radius-sm: 8px;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .hv-app {
    width: 420px;
    height: 580px;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 13px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  /* ── HEADER ──────────────────────────────────────────── */
  .hv-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px 12px;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(180deg, rgba(124,58,237,0.05) 0%, transparent 100%);
    flex-shrink: 0;
  }

  .hv-logo {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .hv-logo-icon {
    font-size: 18px;
    color: var(--purple-light);
    filter: drop-shadow(0 0 8px rgba(124,58,237,0.7));
    line-height: 1;
  }

  .hv-logo-text {
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text);
    background: linear-gradient(135deg, #e2e8f0 0%, #a78bfa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hv-header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .hv-btn-clear {
    font-size: 11px;
    font-family: var(--font-body);
    color: var(--text-3);
    background: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
    padding: 4px 8px;
    cursor: pointer;
    transition: all 0.15s ease;
    letter-spacing: 0.01em;
  }

  .hv-btn-clear:hover {
    color: var(--red);
    border-color: rgba(252,165,165,0.3);
    background: rgba(252,165,165,0.05);
  }

  .hv-btn-clear.hv-btn-clear-confirm {
    color: var(--red);
    border-color: rgba(252,165,165,0.5);
    background: rgba(252,165,165,0.1);
    animation: hv-pulse 0.5s ease;
  }

  .hv-btn-icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 7px;
    color: var(--text-2);
    cursor: pointer;
    text-decoration: none;
    transition: all 0.15s ease;
  }

  .hv-btn-icon:hover {
    background: var(--bg-3);
    border-color: var(--border-accent);
    color: var(--purple-light);
  }

  /* ── TOOLBAR ──────────────────────────────────────────── */
  .hv-toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .hv-search-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
  }

  .hv-search-bar {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--bg-3);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 7px 10px;
    transition: border-color 0.15s ease;
  }

  .hv-search-bar:focus-within {
    border-color: var(--border-accent);
    background: var(--bg-4);
  }

  .hv-search-icon {
    color: var(--text-3);
    flex-shrink: 0;
  }

  .hv-search-input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: var(--text);
    font-size: 12.5px;
    font-family: var(--font-body);
  }

  .hv-search-input::placeholder {
    color: var(--text-3);
  }

  .hv-search-clear {
    background: none;
    border: none;
    color: var(--text-3);
    cursor: pointer;
    padding: 1px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    transition: color 0.15s ease;
  }

  .hv-search-clear:hover {
    color: var(--text-2);
  }

  .hv-count-badge {
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    background: var(--purple-dim);
    border: 1px solid var(--border-accent);
    border-radius: 100px;
    font-size: 11px;
    font-weight: 600;
    color: var(--purple-light);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-family: var(--font-display);
  }

  .hv-btn-summarize {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 7px 12px;
    background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.1));
    border: 1px solid var(--border-accent);
    border-radius: 8px;
    color: var(--purple-light);
    font-size: 12px;
    font-weight: 600;
    font-family: var(--font-display);
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
    letter-spacing: 0.01em;
  }

  .hv-btn-summarize:hover:not(:disabled) {
    background: linear-gradient(135deg, rgba(124,58,237,0.35), rgba(124,58,237,0.2));
    border-color: rgba(124,58,237,0.6);
    box-shadow: 0 0 16px rgba(124,58,237,0.2);
    transform: translateY(-1px);
  }

  .hv-btn-summarize:active:not(:disabled) {
    transform: translateY(0);
  }

  .hv-btn-summarize:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* ── MAIN SCROLL AREA ──────────────────────────────────── */
  .hv-main {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 8px;
    scroll-behavior: smooth;
  }

  .hv-main::-webkit-scrollbar {
    width: 4px;
  }

  .hv-main::-webkit-scrollbar-track {
    background: transparent;
  }

  .hv-main::-webkit-scrollbar-thumb {
    background: rgba(124,58,237,0.25);
    border-radius: 2px;
  }

  .hv-main::-webkit-scrollbar-thumb:hover {
    background: rgba(124,58,237,0.45);
  }

  /* ── DOMAIN GROUP ──────────────────────────────────────── */
  .hv-domain-group {
    margin-bottom: 4px;
  }

  .hv-domain-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px 4px;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--text-3);
    font-family: var(--font-display);
  }

  .hv-domain-count {
    background: var(--bg-3);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 1px 6px;
    font-size: 10px;
    color: var(--text-3);
  }

  /* ── HIGHLIGHT CARD ──────────────────────────────────────── */
  .hv-card {
    background: rgba(20, 23, 32, 0.8);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 12px;
    margin-bottom: 6px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
  }

  .hv-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius);
    background: linear-gradient(135deg, rgba(124,58,237,0.04) 0%, transparent 60%);
    pointer-events: none;
  }

  .hv-card:hover {
    border-color: var(--border-accent);
    background: rgba(26, 31, 46, 0.9);
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.3), 0 0 0 1px rgba(124,58,237,0.1);
  }

  .hv-card.hv-card-deleting {
    opacity: 0;
    transform: translateX(-12px) scale(0.97);
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hv-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
    gap: 8px;
  }

  .hv-card-site {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex: 1;
  }

  .hv-favicon {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    flex-shrink: 0;
    object-fit: contain;
  }

  .hv-card-meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .hv-domain {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-2);
    font-family: var(--font-display);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hv-url {
    font-size: 10.5px;
    color: var(--text-3);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hv-card-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .hv-timestamp {
    font-size: 10.5px;
    color: var(--text-3);
    white-space: nowrap;
  }

  .hv-btn-delete {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    border: 1px solid transparent;
    background: transparent;
    color: var(--text-3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
    flex-shrink: 0;
  }

  .hv-btn-delete:hover {
    background: rgba(252,165,165,0.1);
    border-color: rgba(252,165,165,0.3);
    color: var(--red);
    transform: scale(1.05);
  }

  /* ── CARD TEXT ───────────────────────────────────────────── */
  .hv-card-text {
    position: relative;
    padding-left: 14px;
    margin-bottom: 10px;
  }

  .hv-quote-mark {
    position: absolute;
    left: 0;
    top: -4px;
    font-size: 22px;
    color: rgba(124,58,237,0.4);
    font-family: Georgia, serif;
    line-height: 1;
    user-select: none;
  }

  .hv-text {
    font-size: 12.5px;
    line-height: 1.65;
    color: var(--text);
    font-weight: 300;
    letter-spacing: 0.005em;
    word-break: break-word;
  }

  .hv-expand-btn {
    background: none;
    border: none;
    color: var(--purple-light);
    font-size: 11px;
    font-family: var(--font-body);
    cursor: pointer;
    padding: 3px 0;
    margin-top: 4px;
    display: block;
    transition: opacity 0.15s ease;
    letter-spacing: 0.01em;
  }

  .hv-expand-btn:hover {
    opacity: 0.8;
  }

  /* ── AI INSIGHT BOX ─────────────────────────────────────── */
  .hv-insight-box {
    background: rgba(124,58,237,0.06);
    border: 1px solid rgba(124,58,237,0.2);
    border-radius: var(--radius-sm);
    padding: 10px 12px;
    margin-bottom: 10px;
    animation: hv-fade-in 0.3s ease;
  }

  .hv-insight-header {
    margin-bottom: 6px;
  }

  .hv-insight-label {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--purple-light);
    font-family: var(--font-display);
  }

  .hv-insight-text {
    font-size: 12px;
    line-height: 1.6;
    color: var(--text-2);
    font-style: italic;
  }

  /* ── CARD FOOTER ─────────────────────────────────────────── */
  .hv-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .hv-btn-ai {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-3);
    font-size: 11.5px;
    font-family: var(--font-body);
    cursor: pointer;
    transition: all 0.15s ease;
    letter-spacing: 0.01em;
  }

  .hv-btn-ai:hover:not(:disabled) {
    background: var(--purple-dim);
    border-color: var(--border-accent);
    color: var(--purple-light);
  }

  .hv-btn-ai.hv-btn-ai-active {
    background: var(--purple-dim);
    border-color: var(--border-accent);
    color: var(--purple-light);
  }

  .hv-btn-ai:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .hv-btn-visit {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text-3);
    text-decoration: none;
    transition: all 0.15s ease;
  }

  .hv-btn-visit:hover {
    background: var(--bg-3);
    border-color: var(--border-accent);
    color: var(--purple-light);
  }

  /* ── EMPTY STATE ─────────────────────────────────────────── */
  .hv-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
    text-align: center;
    height: 100%;
    min-height: 360px;
    gap: 10px;
  }

  .hv-empty-art {
    margin-bottom: 6px;
    opacity: 0.8;
    animation: hv-float 3s ease-in-out infinite;
  }

  .hv-empty-icon {
    font-size: 36px;
    margin-bottom: 6px;
  }

  .hv-empty-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--text-2);
    font-family: var(--font-display);
    letter-spacing: -0.01em;
  }

  .hv-empty-desc {
    font-size: 12.5px;
    color: var(--text-3);
    line-height: 1.6;
    max-width: 260px;
  }

  .hv-empty-desc strong {
    color: var(--text-2);
    font-weight: 500;
  }

  .hv-empty-tip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    background: var(--bg-3);
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 11px;
    color: var(--text-3);
    margin-top: 6px;
  }

  /* ── LOADING STATE ────────────────────────────────────────── */
  .hv-loading-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 300px;
  }

  /* ── SPINNERS ─────────────────────────────────────────────── */
  .hv-spinner-sm {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 2px solid rgba(124,58,237,0.3);
    border-top-color: var(--purple-light);
    border-radius: 50%;
    animation: hv-spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  .hv-spinner-lg {
    display: inline-block;
    width: 28px;
    height: 28px;
    border: 3px solid rgba(124,58,237,0.2);
    border-top-color: var(--purple-light);
    border-radius: 50%;
    animation: hv-spin 0.8s linear infinite;
  }

  /* ── MODAL ────────────────────────────────────────────────── */
  .hv-modal-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10, 11, 15, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation: hv-fade-in 0.2s ease;
    padding: 20px;
  }

  .hv-modal {
    background: var(--bg-3);
    border: 1px solid var(--border-accent);
    border-radius: 16px;
    width: 100%;
    max-height: 460px;
    display: flex;
    flex-direction: column;
    box-shadow:
      0 24px 64px rgba(0,0,0,0.5),
      0 0 0 1px rgba(124,58,237,0.1),
      0 0 40px rgba(124,58,237,0.1);
    animation: hv-slide-up 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .hv-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 18px 14px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .hv-modal-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.01em;
  }

  .hv-modal-icon {
    font-size: 16px;
    filter: drop-shadow(0 0 6px rgba(124,58,237,0.6));
  }

  .hv-modal-close {
    width: 26px;
    height: 26px;
    background: var(--bg-4);
    border: 1px solid var(--border);
    border-radius: 7px;
    color: var(--text-2);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
  }

  .hv-modal-close:hover {
    border-color: rgba(252,165,165,0.4);
    color: var(--red);
    background: rgba(252,165,165,0.08);
  }

  .hv-modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 16px 18px;
    scroll-behavior: smooth;
  }

  .hv-modal-body::-webkit-scrollbar {
    width: 3px;
  }

  .hv-modal-body::-webkit-scrollbar-thumb {
    background: rgba(124,58,237,0.3);
    border-radius: 2px;
  }

  .hv-modal-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    padding: 32px 0;
    color: var(--text-3);
    font-size: 13px;
  }

  .hv-modal-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 24px 0;
    text-align: center;
  }

  .hv-error-icon {
    font-size: 28px;
    margin-bottom: 4px;
  }

  .hv-error-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
    font-family: var(--font-display);
  }

  .hv-error-desc {
    font-size: 12px;
    color: var(--text-3);
    line-height: 1.6;
    max-width: 240px;
  }

  .hv-modal-summary {
    animation: hv-fade-in 0.3s ease;
  }

  .hv-summary-text {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .hv-bullet {
    font-size: 13px;
    line-height: 1.65;
    color: var(--text);
    padding-left: 4px;
    border-left: 2px solid rgba(124,58,237,0.4);
    padding-left: 10px;
    margin-left: 2px;
  }

  .hv-summary-line {
    font-size: 12.5px;
    line-height: 1.6;
    color: var(--text-2);
  }

  .hv-cursor {
    color: var(--purple-light);
    animation: hv-blink 0.7s step-end infinite;
    font-weight: 200;
  }

  /* ── ANIMATIONS ────────────────────────────────────────────── */
  @keyframes hv-spin {
    to { transform: rotate(360deg); }
  }

  @keyframes hv-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes hv-slide-up {
    from { opacity: 0; transform: translateY(16px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes hv-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }

  @keyframes hv-pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.04); }
    100% { transform: scale(1); }
  }

  @keyframes hv-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;
