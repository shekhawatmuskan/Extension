// src/components/HighlightCard.jsx
import { useState } from 'react';
import { formatTime, shortUrl, truncate } from '../utils/helpers';

export function HighlightCard({ highlight, onDelete, isDeleting, onInsight }) {
  const [expanded, setExpanded] = useState(false);
  const [insightText, setInsightText] = useState(null);
  const [insightLoading, setInsightLoading] = useState(false);

  const isLong = highlight.text.length > 140;
  const displayText = expanded ? highlight.text : truncate(highlight.text, 140);

  const handleInsight = async () => {
    if (insightText) {
      setInsightText(null);
      return;
    }
    setInsightLoading(true);
    const result = await onInsight(highlight);
    setInsightLoading(false);
    if (result) setInsightText(result);
  };

  return (
    <div
      className={`hv-card ${isDeleting ? 'hv-card-deleting' : ''}`}
      data-id={highlight.id}
    >
      {/* Card header */}
      <div className="hv-card-header">
        <div className="hv-card-site">
          {highlight.favicon && (
            <img
              className="hv-favicon"
              src={highlight.favicon}
              alt=""
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          )}
          <div className="hv-card-meta">
            <span className="hv-domain">{highlight.domain}</span>
            <span className="hv-url">{shortUrl(highlight.url)}</span>
          </div>
        </div>
        <div className="hv-card-actions">
          <span className="hv-timestamp">{formatTime(highlight.timestamp)}</span>
          <button
            className="hv-btn-icon hv-btn-delete"
            onClick={() => onDelete(highlight.id)}
            title="Delete highlight"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      {/* Highlight text */}
      <div className="hv-card-text">
        <div className="hv-quote-mark">"</div>
        <p className="hv-text">{displayText}</p>
        {isLong && (
          <button
            className="hv-expand-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {/* AI Insight section */}
      {insightText && (
        <div className="hv-insight-box">
          <div className="hv-insight-header">
            <span className="hv-insight-label">🤖 AI Insight</span>
          </div>
          <p className="hv-insight-text">{insightText}</p>
        </div>
      )}

      {/* Card footer */}
      <div className="hv-card-footer">
        <button
          className={`hv-btn-ai ${insightText ? 'hv-btn-ai-active' : ''}`}
          onClick={handleInsight}
          disabled={insightLoading}
          title="Get AI insight for this highlight"
        >
          {insightLoading ? (
            <span className="hv-spinner-sm" />
          ) : (
            <>
              <span>{insightText ? '✕ Hide Insight' : '🤖 AI Insight'}</span>
            </>
          )}
        </button>
        <a
          href={highlight.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hv-btn-visit"
          title="Open original page"
        >
          <ExternalLinkIcon />
        </a>
      </div>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
