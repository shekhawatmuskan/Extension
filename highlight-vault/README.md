# ⬡ HighlightVault

> Capture, organize, and AI-summarize web highlights — beautifully.

HighlightVault is a production-grade Chrome Extension that lets you save highlighted text from any webpage into a sleek, organized vault. Powered by OpenAI, it can summarize your entire reading history into bullet-point insights with a single click.

---

## ✨ Features

- **One-click saving** — Select any text on any webpage; a floating pill popup appears instantly
- **Vault UI** — A beautiful 420×580px dark-mode popup showing all highlights grouped by domain
- **AI Summarize All** — Calls GPT-3.5-turbo to summarize your entire vault into bullet points with a typewriter animation
- **AI Insight per highlight** — Get a contextual AI insight on any individual highlight
- **Real-time search** — Filter through all your highlights as you type
- **Smooth animations** — Fade-out on delete, hover lifts, micro-interactions everywhere
- **Context menu** — Right-click any selection → "Save to HighlightVault"
- **Badge count** — Toolbar icon badge shows total highlights saved
- **Secure API key storage** — Keys stored in `chrome.storage.local`, never sent anywhere except OpenAI
- **Empty state** — Friendly illustration when vault is empty

---

## 🖼 Screenshots

> Add screenshots of the popup, content script popup, and options page here.

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+
- npm 9+
- Google Chrome (or any Chromium browser)

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/highlight-vault.git
cd highlight-vault
npm install
```

### 2. Build

```bash
npm run build
```

This outputs a production-ready extension to the `/dist` folder.

For development with live rebuilding:

```bash
npm run dev
```

### 3. Load in Chrome

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **"Load unpacked"**
4. Select the `/dist` folder inside this project
5. The HighlightVault icon will appear in your Chrome toolbar

> **Tip:** Pin the extension by clicking the puzzle piece icon → pin HighlightVault

---

## 🔑 Adding Your OpenAI API Key

AI features (Summarize All, AI Insight) require an OpenAI API key.

1. Right-click the HighlightVault toolbar icon
2. Select **"Options"**
3. Paste your OpenAI API key (starts with `sk-`)
4. Click **"Save Key"**

**Don't have a key?**
- Visit [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Sign in → Create a new secret key
- Copy and paste it into the Options page

> GPT-3.5-turbo is very affordable — typical summaries cost less than $0.01.

---

## 🗂 Project Structure

```
highlight-vault/
├── manifest.json              # Chrome Extension Manifest V3
├── vite.config.js             # Multi-entry Vite build config
├── popup.html                 # Popup entry HTML
├── options.html               # Options page entry HTML
├── public/
│   └── icons/                 # Extension icons (16, 32, 48, 128px)
└── src/
    ├── popup/
    │   ├── main.jsx           # Popup React entry point
    │   └── App.jsx            # Main popup UI + all CSS-in-JS styles
    ├── options/
    │   ├── main.jsx           # Options React entry point
    │   └── App.jsx            # Options page UI
    ├── content/
    │   ├── content.js         # Content script — floating save popup
    │   └── content.css        # Injected styles for floating popup
    ├── background/
    │   └── background.js      # Service worker — messaging, badge, context menu
    ├── components/
    │   ├── HighlightCard.jsx  # Individual highlight card
    │   ├── SummarizeModal.jsx # AI summary modal with typewriter effect
    │   ├── EmptyState.jsx     # Empty vault illustration
    │   └── SearchBar.jsx      # Search/filter input
    ├── hooks/
    │   ├── useHighlights.js   # Hook for CRUD on highlights
    │   └── useOpenAI.js       # Hook for OpenAI API calls
    └── utils/
        ├── storage.js         # chrome.storage.local helpers
        ├── openai.js          # OpenAI API client
        └── helpers.js         # Formatting, domain, URL utils
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#0a0b0f` |
| Surface | `#141720` |
| Accent purple | `#7C3AED` |
| Accent light | `#a78bfa` |
| Text primary | `#e2e8f0` |
| Text secondary | `#94a3b8` |
| Display font | Syne (Google Fonts) |
| Body font | DM Sans (Google Fonts) |

Cards use glassmorphism (`backdrop-filter: blur(12px)`) with subtle purple gradients and border accents.

---

## ⚙️ Permissions Explained

| Permission | Reason |
|---|---|
| `storage` | Persist highlights and API key locally |
| `activeTab` | Access the current tab's URL and title |
| `scripting` | Inject content script programmatically if needed |
| `contextMenus` | Right-click "Save to HighlightVault" menu item |
| `host_permissions` | Allow content script on all HTTP/HTTPS pages |

---

## 🔒 Privacy

- **No backend** — everything runs locally in your browser
- **No analytics** — zero telemetry of any kind
- **API key** — stored only in `chrome.storage.local`, only sent to `api.openai.com` when you explicitly request AI features
- **Highlight data** — never leaves your device unless you trigger AI features

---

## 🛠 Development Notes

- Uses **React 18** + **Vite 5** with the `@vitejs/plugin-react` plugin
- Multi-entry build: `popup`, `options`, `background`, and `content` are separate bundles
- Content script is a plain IIFE (no React) for minimal footprint and fast injection
- Background service worker uses ES module syntax (`"type": "module"` in manifest)
- Storage listeners in `useHighlights` keep the popup in sync when the content script saves a highlight

---

## 📦 Building for Distribution

```bash
npm run build
cd dist
zip -r ../highlight-vault-v1.0.0.zip .
```

Upload the zip to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).

---

## 📄 License

MIT — free for personal and commercial use.

---

*Built with React, Vite, and a healthy appreciation for good typography.*
