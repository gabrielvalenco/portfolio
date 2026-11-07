import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fontes servidas pelo proprio site (ver fonts.css).
import './fonts.css'
import './index.css'
import App from './App.tsx'
import LangProvider from './i18n/LangProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
)
