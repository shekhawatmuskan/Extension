// src/options/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { OptionsApp } from './App.jsx';

const root = document.getElementById('root');
createRoot(root).render(
  <StrictMode>
    <OptionsApp />
  </StrictMode>
);
