// src/components/SummarizeModal.jsx
import { useState, useEffect, useRef } from 'react';

export function SummarizeModal({ summary, loading, error, onClose, hasApiKey }) {
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(false);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  // Typewriter effect when summary arrives
  useEffect(() => {
    if (!summary) {
      setDisplayed('');
      return;
    }

    setTyping(true);
    setDisplayed('');
    let i = 0;

    intervalRef.current = setInterval(() => {
      if (i < summary.length) {
        setDisplayed(summary.slice(0, i + 1));
        i++;
        // Auto-scroll
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      } else {
        clearInterval(intervalRef.current);
        setTyping(false);
      }
    }, 12);

    return () => clearInterval(intervalRef.current);
  }, [summary]);

  // Close on escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="hv-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="hv-modal">
        {/* Header */}
        <div className="hv-modal-header">
          <div className="hv-modal-title">
            <span className="hv-modal-icon">✨</span>
            <span>Vault Summary</span>
          </div>
          <button className="hv-modal-close" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="hv-modal-body" ref={containerRef}>
          {loading && (
            <div className="hv-modal-loading">
              <div className="hv-spinner-lg" />
              <p>Analyzing your highlights…</p>
            </div>
          )}

          {!loading && error && (
            <div className="hv-modal-error">
              {error === 'NO_API_KEY' ? (
                <>
                  <div className="hv-error-icon">🔑</div>
                  <p className="hv-error-title">API Key Required</p>
                  <p className="hv-error-desc">
                    Right-click the extension icon → Options to add your OpenAI API key.
                  </p>
                </>
              ) : (
                <>
                  <div className="hv-error-icon">⚠️</div>
                  <p className="hv-error-title">Something went wrong</p>
                  <p className="hv-error-desc">{error}</p>
                </>
              )}
            </div>
          )}

          {!loading && !error && displayed && (
            <div className="hv-modal-summary">
              <div className="hv-summary-text">
                {displayed.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('•') ? 'hv-bullet' : 'hv-summary-line'}>
                    {line}
                  </p>
                ))}
                {typing && <span className="hv-cursor">|</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
