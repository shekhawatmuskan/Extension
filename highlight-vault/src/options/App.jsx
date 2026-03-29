// src/options/App.jsx
import { useState, useEffect } from 'react';
import { getApiKey, saveApiKey, clearApiKey } from '../utils/storage';

export function OptionsApp() {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [hasKey, setHasKey] = useState(false);
  const [masked, setMasked] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getApiKey().then((key) => {
      if (key) {
        setHasKey(true);
        setApiKey(key);
      }
    });
  }, []);

  const handleSave = async () => {
    const trimmed = apiKey.trim();
    if (!trimmed) {
      setError('Please enter an API key.');
      return;
    }
    if (!trimmed.startsWith('sk-')) {
      setError('API key should start with "sk-". Please check your key.');
      return;
    }
    setError('');
    await saveApiKey(trimmed);
    setHasKey(true);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClear = async () => {
    await clearApiKey();
    setApiKey('');
    setHasKey(false);
    setMasked(true);
  };

  const maskedValue = hasKey && masked
    ? apiKey.slice(0, 7) + '••••••••••••••••••••' + apiKey.slice(-4)
    : apiKey;

  return (
    <>
      <style>{CSS}</style>
      <div className="opt-app">
        {/* Background decoration */}
        <div className="opt-bg-orb opt-bg-orb-1" />
        <div className="opt-bg-orb opt-bg-orb-2" />

        <div className="opt-container">
          {/* Header */}
          <div className="opt-header">
            <div className="opt-logo">
              <span className="opt-logo-icon">⬡</span>
              <div>
                <h1 className="opt-title">HighlightVault</h1>
                <p className="opt-subtitle">Settings & Configuration</p>
              </div>
            </div>
          </div>

          {/* OpenAI API Key Card */}
          <div className="opt-card">
            <div className="opt-card-header">
              <div className="opt-card-icon">🔑</div>
              <div>
                <h2 className="opt-card-title">OpenAI API Key</h2>
                <p className="opt-card-desc">
                  Required for AI Summarization and Insights features. Your key is stored
                  locally and never sent to any server other than OpenAI.
                </p>
              </div>
            </div>

            <div className="opt-field">
              <label className="opt-label">API Key</label>
              <div className="opt-input-row">
                <div className="opt-input-wrapper">
                  <input
                    className="opt-input"
                    type={masked && hasKey ? 'text' : 'password'}
                    value={masked && hasKey ? maskedValue : apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      setError('');
                      if (masked) setMasked(false);
                    }}
                    onFocus={() => setMasked(false)}
                    placeholder="sk-proj-..."
                    spellCheck={false}
                    autoComplete="off"
                  />
                  <button
                    className="opt-toggle-mask"
                    onClick={() => setMasked(!masked)}
                    title={masked ? 'Reveal key' : 'Hide key'}
                    type="button"
                  >
                    {masked ? <EyeIcon /> : <EyeOffIcon />}
                  </button>
                </div>
              </div>
              {error && <p className="opt-error">{error}</p>}
            </div>

            <div className="opt-actions">
              <button
                className={`opt-btn-save ${saved ? 'opt-btn-saved' : ''}`}
                onClick={handleSave}
              >
                {saved ? '✓ Saved!' : 'Save Key'}
              </button>
              {hasKey && (
                <button className="opt-btn-clear" onClick={handleClear}>
                  Remove Key
                </button>
              )}
            </div>

            {hasKey && (
              <div className="opt-status">
                <span className="opt-status-dot" />
                <span>API key configured</span>
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="opt-card opt-card-info">
            <h3 className="opt-info-title">How to get an OpenAI API Key</h3>
            <ol className="opt-info-list">
              <li>Visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="opt-link">platform.openai.com/api-keys</a></li>
              <li>Sign in or create an OpenAI account</li>
              <li>Click <strong>"Create new secret key"</strong></li>
              <li>Copy the key and paste it above</li>
            </ol>
            <p className="opt-info-note">
              ⚡ GPT-3.5-turbo is very affordable — summaries typically cost less than $0.01 each.
            </p>
          </div>

          {/* Privacy note */}
          <div className="opt-privacy">
            <span className="opt-privacy-icon">🔒</span>
            <p>
              Your API key is stored exclusively in <code>chrome.storage.local</code> on your device.
              HighlightVault does not collect or transmit your data to any external service other than
              OpenAI when you explicitly request an AI summary.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
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
    --border-accent: rgba(124,58,237,0.4);
    --purple: #7C3AED;
    --purple-light: #a78bfa;
    --purple-dim: rgba(124,58,237,0.15);
    --text: #e2e8f0;
    --text-2: #94a3b8;
    --text-3: #4a5568;
    --green: #86efac;
    --red: #fca5a5;
    --radius: 14px;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    min-height: 100vh;
  }

  .opt-app {
    min-height: 100vh;
    background: var(--bg);
    position: relative;
    overflow: hidden;
  }

  .opt-bg-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }

  .opt-bg-orb-1 {
    width: 400px;
    height: 400px;
    background: rgba(124,58,237,0.08);
    top: -100px;
    right: -100px;
  }

  .opt-bg-orb-2 {
    width: 300px;
    height: 300px;
    background: rgba(6,182,212,0.05);
    bottom: -50px;
    left: -80px;
  }

  .opt-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 48px 24px;
    position: relative;
    z-index: 1;
  }

  /* Header */
  .opt-header {
    margin-bottom: 32px;
  }

  .opt-logo {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .opt-logo-icon {
    font-size: 36px;
    color: var(--purple-light);
    filter: drop-shadow(0 0 16px rgba(124,58,237,0.7));
    line-height: 1;
  }

  .opt-title {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #e2e8f0 0%, #a78bfa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;
  }

  .opt-subtitle {
    font-size: 13px;
    color: var(--text-3);
    margin-top: 3px;
    font-weight: 400;
  }

  /* Cards */
  .opt-card {
    background: var(--bg-3);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
  }

  .opt-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius);
    background: linear-gradient(135deg, rgba(124,58,237,0.04) 0%, transparent 60%);
    pointer-events: none;
  }

  .opt-card-header {
    display: flex;
    gap: 14px;
    margin-bottom: 20px;
  }

  .opt-card-icon {
    font-size: 22px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .opt-card-title {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.01em;
    margin-bottom: 6px;
  }

  .opt-card-desc {
    font-size: 13px;
    color: var(--text-2);
    line-height: 1.6;
  }

  /* Field */
  .opt-field {
    margin-bottom: 16px;
  }

  .opt-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-3);
    margin-bottom: 8px;
    font-family: var(--font-display);
  }

  .opt-input-row {
    display: flex;
    gap: 8px;
  }

  .opt-input-wrapper {
    flex: 1;
    position: relative;
  }

  .opt-input {
    width: 100%;
    background: var(--bg-4);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 11px 44px 11px 14px;
    color: var(--text);
    font-size: 13px;
    font-family: 'Courier New', monospace;
    letter-spacing: 0.03em;
    outline: none;
    transition: border-color 0.15s ease, background 0.15s ease;
  }

  .opt-input::placeholder {
    color: var(--text-3);
    font-family: var(--font-body);
    letter-spacing: 0;
  }

  .opt-input:focus {
    border-color: var(--border-accent);
    background: rgba(26, 31, 46, 0.8);
  }

  .opt-toggle-mask {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: var(--text-3);
    cursor: pointer;
    padding: 2px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    transition: color 0.15s ease;
  }

  .opt-toggle-mask:hover {
    color: var(--text-2);
  }

  .opt-error {
    font-size: 12px;
    color: var(--red);
    margin-top: 8px;
  }

  /* Actions */
  .opt-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .opt-btn-save {
    padding: 10px 20px;
    background: linear-gradient(135deg, rgba(124,58,237,0.4), rgba(124,58,237,0.25));
    border: 1px solid var(--border-accent);
    border-radius: 10px;
    color: var(--purple-light);
    font-size: 13px;
    font-weight: 700;
    font-family: var(--font-display);
    cursor: pointer;
    letter-spacing: 0.01em;
    transition: all 0.2s ease;
  }

  .opt-btn-save:hover {
    background: linear-gradient(135deg, rgba(124,58,237,0.55), rgba(124,58,237,0.35));
    box-shadow: 0 0 20px rgba(124,58,237,0.25);
    transform: translateY(-1px);
  }

  .opt-btn-save.opt-btn-saved {
    background: rgba(134,239,172,0.15);
    border-color: rgba(134,239,172,0.4);
    color: var(--green);
  }

  .opt-btn-clear {
    padding: 10px 16px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text-3);
    font-size: 13px;
    font-family: var(--font-body);
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .opt-btn-clear:hover {
    border-color: rgba(252,165,165,0.4);
    color: var(--red);
    background: rgba(252,165,165,0.06);
  }

  /* Status */
  .opt-status {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 14px;
    font-size: 12px;
    color: var(--green);
    padding: 7px 12px;
    background: rgba(134,239,172,0.06);
    border: 1px solid rgba(134,239,172,0.2);
    border-radius: 8px;
    width: fit-content;
  }

  .opt-status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 8px rgba(134,239,172,0.6);
    animation: opt-pulse 2s ease-in-out infinite;
  }

  /* Info card */
  .opt-card-info {
    background: var(--bg-2);
  }

  .opt-info-title {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    color: var(--text-2);
    margin-bottom: 14px;
    letter-spacing: -0.01em;
  }

  .opt-info-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 14px;
    counter-reset: steps;
  }

  .opt-info-list li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px;
    color: var(--text-2);
    line-height: 1.5;
    counter-increment: steps;
  }

  .opt-info-list li::before {
    content: counter(steps);
    min-width: 20px;
    height: 20px;
    background: var(--purple-dim);
    border: 1px solid var(--border-accent);
    border-radius: 50%;
    font-size: 10px;
    font-weight: 700;
    font-family: var(--font-display);
    color: var(--purple-light);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .opt-link {
    color: var(--purple-light);
    text-decoration: none;
  }

  .opt-link:hover {
    text-decoration: underline;
  }

  .opt-info-list strong {
    color: var(--text);
    font-weight: 600;
  }

  .opt-info-note {
    font-size: 12px;
    color: var(--text-3);
    padding: 8px 12px;
    background: var(--bg-3);
    border-radius: 8px;
    border-left: 3px solid rgba(124,58,237,0.4);
  }

  /* Privacy */
  .opt-privacy {
    display: flex;
    gap: 12px;
    padding: 14px 18px;
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: 10px;
    align-items: flex-start;
  }

  .opt-privacy-icon {
    font-size: 16px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .opt-privacy p {
    font-size: 12px;
    color: var(--text-3);
    line-height: 1.6;
  }

  .opt-privacy code {
    font-family: 'Courier New', monospace;
    font-size: 11px;
    background: var(--bg-3);
    padding: 1px 5px;
    border-radius: 4px;
    color: var(--purple-light);
  }

  @keyframes opt-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.85); }
  }
`;
