// src/components/SearchBar.jsx

export function SearchBar({ value, onChange, count }) {
  return (
    <div className="hv-search-wrapper">
      <div className="hv-search-bar">
        <SearchIcon />
        <input
          className="hv-search-input"
          type="text"
          placeholder="Search highlights…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          autoComplete="off"
        />
        {value && (
          <button className="hv-search-clear" onClick={() => onChange('')}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      {count > 0 && (
        <div className="hv-count-badge">{count}</div>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg className="hv-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
