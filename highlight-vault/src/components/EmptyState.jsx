// src/components/EmptyState.jsx

export function EmptyState({ searchActive }) {
  if (searchActive) {
    return (
      <div className="hv-empty">
        <div className="hv-empty-icon">🔍</div>
        <p className="hv-empty-title">No matches found</p>
        <p className="hv-empty-desc">Try a different search term</p>
      </div>
    );
  }

  return (
    <div className="hv-empty">
      <div className="hv-empty-art">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Book/vault illustration */}
          <rect x="12" y="16" width="48" height="40" rx="5" fill="rgba(124,58,237,0.12)" stroke="rgba(124,58,237,0.4)" strokeWidth="1.5"/>
          <rect x="18" y="24" width="22" height="3" rx="1.5" fill="rgba(124,58,237,0.4)"/>
          <rect x="18" y="31" width="32" height="2" rx="1" fill="rgba(124,58,237,0.25)"/>
          <rect x="18" y="37" width="28" height="2" rx="1" fill="rgba(124,58,237,0.2)"/>
          <rect x="18" y="43" width="20" height="2" rx="1" fill="rgba(124,58,237,0.15)"/>
          {/* Sparkles */}
          <circle cx="56" cy="18" r="3" fill="rgba(124,58,237,0.6)"/>
          <circle cx="62" cy="26" r="2" fill="rgba(124,58,237,0.4)"/>
          <circle cx="58" cy="32" r="1.5" fill="rgba(124,58,237,0.3)"/>
          {/* Highlight indicator */}
          <rect x="18" y="24" width="22" height="3" rx="1.5" fill="rgba(124,58,237,0.5)"/>
          <rect x="44" y="22" width="8" height="7" rx="2" fill="rgba(124,58,237,0.3)" stroke="rgba(124,58,237,0.6)" strokeWidth="1"/>
          <path d="M46 26l1.5 1.5L51 24" stroke="rgba(124,58,237,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p className="hv-empty-title">Your vault is empty</p>
      <p className="hv-empty-desc">
        Select any text on a webpage and click the
        <strong> 💾 Save</strong> button to start collecting highlights.
      </p>
      <div className="hv-empty-tip">
        <span>💡</span>
        <span>Tip: Right-click selected text → "Save to HighlightVault"</span>
      </div>
    </div>
  );
}
