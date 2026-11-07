import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fontes servidas pelo proprio site. Importadas aqui, e nao no index.css, pra o Vite reescrever os caminhos.
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
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
