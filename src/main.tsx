import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// JetBrains Mono servida pelo proprio site (antes vinha do Google Fonts e bloqueava a renderizacao).
// Importada aqui, e nao no index.css, pra o Vite reescrever os caminhos dos arquivos da fonte.
import '@fontsource-variable/jetbrains-mono/wght.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
