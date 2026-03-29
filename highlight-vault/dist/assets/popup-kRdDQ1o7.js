import{r as n,j as e,c as O}from"./client-CTQ0Ju4c.js";import{g as R,d as M,c as D,s as P,a as z}from"./storage-Crr3JZ3e.js";import{t as Y,s as B,f as F,g as V}from"./helpers-BKm4HXQE.js";function $(){const[r,a]=n.useState([]),[s,l]=n.useState(!0),[d,h]=n.useState(new Set),c=n.useCallback(async()=>{try{const i=await R();a(i)}catch(i){console.error("[HighlightVault] Failed to load highlights:",i)}finally{l(!1)}},[]);n.useEffect(()=>{c();const i=t=>{t.highlights&&a(t.highlights.newValue||[])};return chrome.storage.onChanged.addListener(i),()=>chrome.storage.onChanged.removeListener(i)},[c]);const x=n.useCallback(async i=>{h(t=>new Set([...t,i])),await new Promise(t=>setTimeout(t,350));try{const t=await M(i);a(t)}catch(t){console.error("[HighlightVault] Failed to delete highlight:",t)}finally{h(t=>{const v=new Set(t);return v.delete(i),v})}},[]),o=n.useCallback(async()=>{try{await D(),a([])}catch(i){console.error("[HighlightVault] Failed to clear highlights:",i)}},[]),p=n.useCallback(async i=>{try{const t=await P(i);return a(t),!0}catch(t){return console.error("[HighlightVault] Failed to save highlight:",t),!1}},[]);return{highlights:r,loading:s,deletingIds:d,remove:x,clearAll:o,add:p,reload:c}}const W="https://api.openai.com/v1/chat/completions",_="gpt-3.5-turbo";async function C(r,a){var d,h,c,x,o;const s=await fetch(W,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({model:_,messages:a,max_tokens:800,temperature:.7})});if(!s.ok){const p=await s.json().catch(()=>({})),i=((d=p==null?void 0:p.error)==null?void 0:d.message)||`API error: ${s.status}`;throw new Error(i)}return((o=(x=(c=(h=(await s.json()).choices)==null?void 0:h[0])==null?void 0:c.message)==null?void 0:x.content)==null?void 0:o.trim())||""}async function K(r,a){if(!a||a.length===0)throw new Error("No highlights to summarize.");const s=a.map((d,h)=>`[${h+1}] From "${d.title||d.domain}": ${d.text}`).join(`

`),l=[{role:"system",content:"You are an expert research assistant. Analyze the provided web highlights and create a concise, insightful bullet-point summary. Focus on key themes, insights, and connections between the highlights. Format your response as clean bullet points starting with • "},{role:"user",content:`Please summarize these ${a.length} web highlights I saved:

${s}`}];return C(r,l)}async function G(r,a){const s=[{role:"system",content:"You are a knowledgeable assistant. Given a text snippet from a webpage, provide a concise, insightful analysis in 2-3 sentences. Explain why it might be important, provide relevant context, or highlight key implications."},{role:"user",content:`From the page "${a.title||a.domain}":

"${a.text}"

What's your insight on this?`}];return C(r,s)}function q(){const[r,a]=n.useState(!1),[s,l]=n.useState(null),d=n.useCallback(async x=>{a(!0),l(null);try{const o=await z();if(!o)throw new Error("NO_API_KEY");return await K(o,x)}catch(o){return l(o.message),null}finally{a(!1)}},[]),h=n.useCallback(async x=>{a(!0),l(null);try{const o=await z();if(!o)throw new Error("NO_API_KEY");return await G(o,x)}catch(o){return l(o.message),null}finally{a(!1)}},[]),c=n.useCallback(()=>l(null),[]);return{loading:r,error:s,summarizeAll:d,getInsight:h,clearError:c}}function U({highlight:r,onDelete:a,isDeleting:s,onInsight:l}){const[d,h]=n.useState(!1),[c,x]=n.useState(null),[o,p]=n.useState(!1),i=r.text.length>140,t=d?r.text:Y(r.text,140),v=async()=>{if(c){x(null);return}p(!0);const m=await l(r);p(!1),m&&x(m)};return e.jsxs("div",{className:`hv-card ${s?"hv-card-deleting":""}`,"data-id":r.id,children:[e.jsxs("div",{className:"hv-card-header",children:[e.jsxs("div",{className:"hv-card-site",children:[r.favicon&&e.jsx("img",{className:"hv-favicon",src:r.favicon,alt:"",onError:m=>{m.currentTarget.style.display="none"}}),e.jsxs("div",{className:"hv-card-meta",children:[e.jsx("span",{className:"hv-domain",children:r.domain}),e.jsx("span",{className:"hv-url",children:B(r.url)})]})]}),e.jsxs("div",{className:"hv-card-actions",children:[e.jsx("span",{className:"hv-timestamp",children:F(r.timestamp)}),e.jsx("button",{className:"hv-btn-icon hv-btn-delete",onClick:()=>a(r.id),title:"Delete highlight",children:e.jsx(X,{})})]})]}),e.jsxs("div",{className:"hv-card-text",children:[e.jsx("div",{className:"hv-quote-mark",children:'"'}),e.jsx("p",{className:"hv-text",children:t}),i&&e.jsx("button",{className:"hv-expand-btn",onClick:()=>h(!d),children:d?"Show less":"Show more"})]}),c&&e.jsxs("div",{className:"hv-insight-box",children:[e.jsx("div",{className:"hv-insight-header",children:e.jsx("span",{className:"hv-insight-label",children:"🤖 AI Insight"})}),e.jsx("p",{className:"hv-insight-text",children:c})]}),e.jsxs("div",{className:"hv-card-footer",children:[e.jsx("button",{className:`hv-btn-ai ${c?"hv-btn-ai-active":""}`,onClick:v,disabled:o,title:"Get AI insight for this highlight",children:o?e.jsx("span",{className:"hv-spinner-sm"}):e.jsx(e.Fragment,{children:e.jsx("span",{children:c?"✕ Hide Insight":"🤖 AI Insight"})})}),e.jsx("a",{href:r.url,target:"_blank",rel:"noopener noreferrer",className:"hv-btn-visit",title:"Open original page",children:e.jsx(J,{})})]})]})}function X(){return e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("polyline",{points:"3 6 5 6 21 6"}),e.jsx("path",{d:"M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"}),e.jsx("path",{d:"M10 11v6M14 11v6"}),e.jsx("path",{d:"M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"})]})}function J(){return e.jsxs("svg",{width:"11",height:"11",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),e.jsx("polyline",{points:"15 3 21 3 21 9"}),e.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]})}function Q({summary:r,loading:a,error:s,onClose:l,hasApiKey:d}){const[h,c]=n.useState(""),[x,o]=n.useState(!1),p=n.useRef(null),i=n.useRef(null);return n.useEffect(()=>{if(!r){c("");return}o(!0),c("");let t=0;return p.current=setInterval(()=>{t<r.length?(c(r.slice(0,t+1)),t++,i.current&&(i.current.scrollTop=i.current.scrollHeight)):(clearInterval(p.current),o(!1))},12),()=>clearInterval(p.current)},[r]),n.useEffect(()=>{const t=v=>{v.key==="Escape"&&l()};return document.addEventListener("keydown",t),()=>document.removeEventListener("keydown",t)},[l]),e.jsx("div",{className:"hv-modal-overlay",onClick:t=>t.target===t.currentTarget&&l(),children:e.jsxs("div",{className:"hv-modal",children:[e.jsxs("div",{className:"hv-modal-header",children:[e.jsxs("div",{className:"hv-modal-title",children:[e.jsx("span",{className:"hv-modal-icon",children:"✨"}),e.jsx("span",{children:"Vault Summary"})]}),e.jsx("button",{className:"hv-modal-close",onClick:l,children:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),e.jsxs("div",{className:"hv-modal-body",ref:i,children:[a&&e.jsxs("div",{className:"hv-modal-loading",children:[e.jsx("div",{className:"hv-spinner-lg"}),e.jsx("p",{children:"Analyzing your highlights…"})]}),!a&&s&&e.jsx("div",{className:"hv-modal-error",children:s==="NO_API_KEY"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"hv-error-icon",children:"🔑"}),e.jsx("p",{className:"hv-error-title",children:"API Key Required"}),e.jsx("p",{className:"hv-error-desc",children:"Right-click the extension icon → Options to add your OpenAI API key."})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"hv-error-icon",children:"⚠️"}),e.jsx("p",{className:"hv-error-title",children:"Something went wrong"}),e.jsx("p",{className:"hv-error-desc",children:s})]})}),!a&&!s&&h&&e.jsx("div",{className:"hv-modal-summary",children:e.jsxs("div",{className:"hv-summary-text",children:[h.split(`
`).map((t,v)=>e.jsx("p",{className:t.startsWith("•")?"hv-bullet":"hv-summary-line",children:t},v)),x&&e.jsx("span",{className:"hv-cursor",children:"|"})]})})]})]})})}function Z({searchActive:r}){return r?e.jsxs("div",{className:"hv-empty",children:[e.jsx("div",{className:"hv-empty-icon",children:"🔍"}),e.jsx("p",{className:"hv-empty-title",children:"No matches found"}),e.jsx("p",{className:"hv-empty-desc",children:"Try a different search term"})]}):e.jsxs("div",{className:"hv-empty",children:[e.jsx("div",{className:"hv-empty-art",children:e.jsxs("svg",{width:"72",height:"72",viewBox:"0 0 72 72",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("rect",{x:"12",y:"16",width:"48",height:"40",rx:"5",fill:"rgba(124,58,237,0.12)",stroke:"rgba(124,58,237,0.4)",strokeWidth:"1.5"}),e.jsx("rect",{x:"18",y:"24",width:"22",height:"3",rx:"1.5",fill:"rgba(124,58,237,0.4)"}),e.jsx("rect",{x:"18",y:"31",width:"32",height:"2",rx:"1",fill:"rgba(124,58,237,0.25)"}),e.jsx("rect",{x:"18",y:"37",width:"28",height:"2",rx:"1",fill:"rgba(124,58,237,0.2)"}),e.jsx("rect",{x:"18",y:"43",width:"20",height:"2",rx:"1",fill:"rgba(124,58,237,0.15)"}),e.jsx("circle",{cx:"56",cy:"18",r:"3",fill:"rgba(124,58,237,0.6)"}),e.jsx("circle",{cx:"62",cy:"26",r:"2",fill:"rgba(124,58,237,0.4)"}),e.jsx("circle",{cx:"58",cy:"32",r:"1.5",fill:"rgba(124,58,237,0.3)"}),e.jsx("rect",{x:"18",y:"24",width:"22",height:"3",rx:"1.5",fill:"rgba(124,58,237,0.5)"}),e.jsx("rect",{x:"44",y:"22",width:"8",height:"7",rx:"2",fill:"rgba(124,58,237,0.3)",stroke:"rgba(124,58,237,0.6)",strokeWidth:"1"}),e.jsx("path",{d:"M46 26l1.5 1.5L51 24",stroke:"rgba(124,58,237,0.9)",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})]})}),e.jsx("p",{className:"hv-empty-title",children:"Your vault is empty"}),e.jsxs("p",{className:"hv-empty-desc",children:["Select any text on a webpage and click the",e.jsx("strong",{children:" 💾 Save"})," button to start collecting highlights."]}),e.jsxs("div",{className:"hv-empty-tip",children:[e.jsx("span",{children:"💡"}),e.jsx("span",{children:'Tip: Right-click selected text → "Save to HighlightVault"'})]})]})}function ee({value:r,onChange:a,count:s}){return e.jsxs("div",{className:"hv-search-wrapper",children:[e.jsxs("div",{className:"hv-search-bar",children:[e.jsx(re,{}),e.jsx("input",{className:"hv-search-input",type:"text",placeholder:"Search highlights…",value:r,onChange:l=>a(l.target.value),spellCheck:!1,autoComplete:"off"}),r&&e.jsx("button",{className:"hv-search-clear",onClick:()=>a(""),children:e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),s>0&&e.jsx("div",{className:"hv-count-badge",children:s})]})}function re(){return e.jsxs("svg",{className:"hv-search-icon",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})]})}function te(){var f,N;const{highlights:r,loading:a,deletingIds:s,remove:l,clearAll:d}=$(),{loading:h,error:c,summarizeAll:x,getInsight:o,clearError:p}=q(),[i,t]=n.useState(""),[v,m]=n.useState(!1),[I,y]=n.useState(null),[b,j]=n.useState(!1),w=n.useMemo(()=>{if(!i.trim())return r;const g=i.toLowerCase();return r.filter(u=>{var A,S;return u.text.toLowerCase().includes(g)||((A=u.domain)==null?void 0:A.toLowerCase().includes(g))||((S=u.title)==null?void 0:S.toLowerCase().includes(g))})},[r,i]),k=n.useMemo(()=>V(w),[w]),L=Object.keys(k).sort(),E=n.useCallback(async()=>{y(null),p(),m(!0);const g=await x(r);g&&y(g)},[r,x,p]),T=n.useCallback(async g=>await o(g),[o]),H=n.useCallback(()=>{b?(d(),j(!1)):(j(!0),setTimeout(()=>j(!1),3e3))},[b,d]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:ne}),e.jsxs("div",{className:"hv-app",children:[e.jsxs("header",{className:"hv-header",children:[e.jsxs("div",{className:"hv-logo",children:[e.jsx("span",{className:"hv-logo-icon",children:"⬡"}),e.jsx("span",{className:"hv-logo-text",children:"HighlightVault"})]}),e.jsxs("div",{className:"hv-header-actions",children:[r.length>0&&e.jsx("button",{className:`hv-btn-clear ${b?"hv-btn-clear-confirm":""}`,onClick:H,title:b?"Click again to confirm":"Clear all highlights",children:b?"Confirm clear?":"Clear all"}),e.jsx("a",{href:((N=(f=chrome==null?void 0:chrome.runtime)==null?void 0:f.getURL)==null?void 0:N.call(f,"options.html"))||"#",target:"_blank",rel:"noopener noreferrer",className:"hv-btn-icon hv-btn-settings",title:"Settings",children:e.jsx(ae,{})})]})]}),e.jsxs("div",{className:"hv-toolbar",children:[e.jsx(ee,{value:i,onChange:t,count:r.length}),e.jsxs("button",{className:"hv-btn-summarize",onClick:E,disabled:r.length===0||h,title:"Summarize all highlights with AI",children:[h?e.jsx("span",{className:"hv-spinner-sm"}):"✨",e.jsx("span",{children:"Summarize All"})]})]}),e.jsx("main",{className:"hv-main",children:a?e.jsx("div",{className:"hv-loading-state",children:e.jsx("div",{className:"hv-spinner-lg"})}):w.length===0?e.jsx(Z,{searchActive:i.length>0}):e.jsx("div",{className:"hv-list",children:L.map(g=>e.jsxs("div",{className:"hv-domain-group",children:[e.jsxs("div",{className:"hv-domain-label",children:[e.jsx("span",{children:g}),e.jsx("span",{className:"hv-domain-count",children:k[g].length})]}),k[g].map(u=>e.jsx(U,{highlight:u,onDelete:l,isDeleting:s.has(u.id),onInsight:T},u.id))]},g))})}),v&&e.jsx(Q,{summary:I,loading:h,error:c,onClose:()=>{m(!1),y(null),p()},hasApiKey:!0})]})]})}function ae(){return e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"3"}),e.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]})}const ne=`
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
`,ie=document.getElementById("root");O(ie).render(e.jsx(n.StrictMode,{children:e.jsx(te,{})}));
