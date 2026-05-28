export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative z-10 border-t border-[#9eff00]/15 bg-black">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: '#9eff00', opacity: 0.35, boxShadow: '0 0 12px #9eff00' }}
      />
      <div className="container mx-auto px-6 py-10 font-mono">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#9eff00]">
              Gabriel Valenço
            </p>
            <p className="text-xs text-zinc-400">
              Desenvolvedor Full-Stack — disponível para projetos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-wider">
            <a
              href="https://github.com/gabrielvalenco"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-[#9eff00] no-underline transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/gabriel-valenço-480b43276"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-[#9eff00] no-underline transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:gabrielvalencoofc@gmail.com"
              className="text-zinc-400 hover:text-[#9eff00] no-underline transition-colors"
            >
              Email
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-dashed border-[#9eff00]/15 pt-5 text-[11px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Gabriel Valenço — Todos os direitos reservados.</p>
          <p className="opacity-70 italic">
            Toda falha carrega em si a semente de um sucesso igual ou maior.
          </p>
        </div>
      </div>
    </footer>
  )
}
