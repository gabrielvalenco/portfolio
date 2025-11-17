import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'

type Project = {
  title: string
  desc: string
  href: string
}

export default function ProjectCarousel() {
  const projects: Project[] = useMemo(
    () => [
      { title: 'Audio Downloader & Transcriber', desc: 'yt-dlp + FFmpeg + IA', href: 'https://github.com/gabrielvalenco/Audio-Downloader-Transcriber-Web-CLI' },
      { title: 'EnfantIA', desc: 'Plataforma educacional interativa', href: 'https://enfantia.com.br/' },
      { title: 'WebhookControl', desc: 'Entrega resiliente de webhooks', href: 'https://github.com/gabrielvalenco/WebhookControl-Resilient-Webhook-Delivery-Platform' },
      { title: 'Intelligent Inventory Management', desc: 'Gestão de estoque com IA + n8n', href: 'https://github.com/gabrielvalenco/Intelligent-Inventory-Management-System-with-AI-Integration' },
      { title: 'UI Experiments', desc: 'Interações e micro animações', href: '#' },
      { title: 'Data Tools', desc: 'Pipelines e ETL', href: '#' },
    ],
    []
  )

  const [index, setIndex] = useState(0)
  const size = projects.length
  const next = useCallback(() => setIndex(i => (i + 1) % size), [size])
  const prev = useCallback(() => setIndex(i => (i - 1 + size) % size), [size])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  return (
    <div className="relative">
      <div
        className="mx-auto h-[18rem] md:h-[22rem] perspective-[1200px]"
        aria-roledescription="carrossel"
      >
        <ul className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 ease-out"
            style={{ transform: `translateZ(-420px) rotateY(${(360 / size) * index}deg)` }}>
          {projects.map((p, i) => (
            <li key={p.title}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] max-w-[26rem]"
                style={{ transform: `rotateY(${(360 / size) * i}deg) translateZ(420px)` }}>
              <div className="rounded-xl border bg-card/80 backdrop-blur shadow-md px-6 py-5 transition-transform hover:scale-[1.02]">
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                <p className="mt-1 text-lg font-semibold">{p.title}</p>
                {(p.title === 'UI Experiments' || p.title === 'Data Tools') && (
                  <span className="mt-2 inline-flex items-center text-xs px-2 py-1 rounded border border-primary/50 bg-primary/10 text-white">Em breve</span>
                )}
                <Button asChild variant="outline" className="mt-3 border-primary hover:bg-primary/20 hover:text-primary dark:hover:text-primary">
                  <a href={p.href} target="_blank" rel="noreferrer">Abrir</a>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <Button aria-label="Anterior" variant="outline" className="border-primary hover:bg-primary/20 hover:text-primary dark:hover:text-primary" onClick={prev}>←</Button>
        <Button aria-label="Próximo" variant="outline" className="border-primary hover:bg-primary/20 hover:text-primary dark:hover:text-primary" onClick={next}>→</Button>
      </div>
    </div>
  )
}