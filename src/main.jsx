import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LanguageProvider } from './i18n.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
)
