import{r,j as e,c as h}from"./client-CTQ0Ju4c.js";import{a as u,b as m,e as v}from"./storage-Crr3JZ3e.js";function y(){const[a,p]=r.useState(""),[d,c]=r.useState(!1),[i,l]=r.useState(!1),[o,n]=r.useState(!0),[x,s]=r.useState("");r.useEffect(()=>{u().then(t=>{t&&(l(!0),p(t))})},[]);const g=async()=>{const t=a.trim();if(!t){s("Please enter an API key.");return}if(!t.startsWith("sk-")){s('API key should start with "sk-". Please check your key.');return}s(""),await m(t),l(!0),c(!0),setTimeout(()=>c(!1),2500)},b=async()=>{await v(),p(""),l(!1),n(!0)},f=i&&o?a.slice(0,7)+"••••••••••••••••••••"+a.slice(-4):a;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:w}),e.jsxs("div",{className:"opt-app",children:[e.jsx("div",{className:"opt-bg-orb opt-bg-orb-1"}),e.jsx("div",{className:"opt-bg-orb opt-bg-orb-2"}),e.jsxs("div",{className:"opt-container",children:[e.jsx("div",{className:"opt-header",children:e.jsxs("div",{className:"opt-logo",children:[e.jsx("span",{className:"opt-logo-icon",children:"⬡"}),e.jsxs("div",{children:[e.jsx("h1",{className:"opt-title",children:"HighlightVault"}),e.jsx("p",{className:"opt-subtitle",children:"Settings & Configuration"})]})]})}),e.jsxs("div",{className:"opt-card",children:[e.jsxs("div",{className:"opt-card-header",children:[e.jsx("div",{className:"opt-card-icon",children:"🔑"}),e.jsxs("div",{children:[e.jsx("h2",{className:"opt-card-title",children:"OpenAI API Key"}),e.jsx("p",{className:"opt-card-desc",children:"Required for AI Summarization and Insights features. Your key is stored locally and never sent to any server other than OpenAI."})]})]}),e.jsxs("div",{className:"opt-field",children:[e.jsx("label",{className:"opt-label",children:"API Key"}),e.jsx("div",{className:"opt-input-row",children:e.jsxs("div",{className:"opt-input-wrapper",children:[e.jsx("input",{className:"opt-input",type:o&&i?"text":"password",value:o&&i?f:a,onChange:t=>{p(t.target.value),s(""),o&&n(!1)},onFocus:()=>n(!1),placeholder:"sk-proj-...",spellCheck:!1,autoComplete:"off"}),e.jsx("button",{className:"opt-toggle-mask",onClick:()=>n(!o),title:o?"Reveal key":"Hide key",type:"button",children:o?e.jsx(k,{}):e.jsx(j,{})})]})}),x&&e.jsx("p",{className:"opt-error",children:x})]}),e.jsxs("div",{className:"opt-actions",children:[e.jsx("button",{className:`opt-btn-save ${d?"opt-btn-saved":""}`,onClick:g,children:d?"✓ Saved!":"Save Key"}),i&&e.jsx("button",{className:"opt-btn-clear",onClick:b,children:"Remove Key"})]}),i&&e.jsxs("div",{className:"opt-status",children:[e.jsx("span",{className:"opt-status-dot"}),e.jsx("span",{children:"API key configured"})]})]}),e.jsxs("div",{className:"opt-card opt-card-info",children:[e.jsx("h3",{className:"opt-info-title",children:"How to get an OpenAI API Key"}),e.jsxs("ol",{className:"opt-info-list",children:[e.jsxs("li",{children:["Visit ",e.jsx("a",{href:"https://platform.openai.com/api-keys",target:"_blank",rel:"noopener noreferrer",className:"opt-link",children:"platform.openai.com/api-keys"})]}),e.jsx("li",{children:"Sign in or create an OpenAI account"}),e.jsxs("li",{children:["Click ",e.jsx("strong",{children:'"Create new secret key"'})]}),e.jsx("li",{children:"Copy the key and paste it above"})]}),e.jsx("p",{className:"opt-info-note",children:"⚡ GPT-3.5-turbo is very affordable — summaries typically cost less than $0.01 each."})]}),e.jsxs("div",{className:"opt-privacy",children:[e.jsx("span",{className:"opt-privacy-icon",children:"🔒"}),e.jsxs("p",{children:["Your API key is stored exclusively in ",e.jsx("code",{children:"chrome.storage.local"})," on your device. HighlightVault does not collect or transmit your data to any external service other than OpenAI when you explicitly request an AI summary."]})]})]})]})]})}function k(){return e.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),e.jsx("circle",{cx:"12",cy:"12",r:"3"})]})}function j(){return e.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),e.jsx("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})}const w=`
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
`,N=document.getElementById("root");h(N).render(e.jsx(r.StrictMode,{children:e.jsx(y,{})}));
