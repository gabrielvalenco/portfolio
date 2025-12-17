import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Certificates from '@/pages/Certificates'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-dvh bg-gradient-to-b from-background to-background flex flex-col">
        <a href="#home" className="sr-only focus:not-sr-only fixed top-2 left-2 z-[60] px-3 py-2 rounded bg-primary text-primary-foreground">Ir para conteúdo</a>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/certificates" element={<Certificates />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
