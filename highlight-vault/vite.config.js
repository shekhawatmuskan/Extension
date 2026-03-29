import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

// Custom plugin to copy manifest and static assets
function chromeExtensionPlugin() {
  return {
    name: 'chrome-extension',
    closeBundle() {
      // Copy manifest
      copyFileSync('manifest.json', 'dist/manifest.json');

      // Copy icons
      const iconsDir = 'dist/icons';
      if (!existsSync(iconsDir)) {
        mkdirSync(iconsDir, { recursive: true });
      }
      for (const size of [16, 32, 48, 128]) {
        const src = `public/icons/icon${size}.png`;
        const dest = `dist/icons/icon${size}.png`;
        if (existsSync(src)) copyFileSync(src, dest);
      }

      // Copy content CSS
      if (existsSync('src/content/content.css')) {
        copyFileSync('src/content/content.css', 'dist/content.css');
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), chromeExtensionPlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        options: resolve(__dirname, 'options.html'),
        background: resolve(__dirname, 'src/background/background.js'),
        content: resolve(__dirname, 'src/content/content.js'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'background') return 'background.js';
          if (chunkInfo.name === 'content') return 'content.js';
          return 'assets/[name]-[hash].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'content.css') return 'content.css';
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
