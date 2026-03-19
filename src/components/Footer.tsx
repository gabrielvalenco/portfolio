import LogoGV from './LogoGV'

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-card/20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/8 via-transparent to-transparent"
      />
      <div className="container mx-auto px-6 py-12 relative">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 p-1.5">
                <LogoGV className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold">Gabriel Valenço</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Desenvolvedor full-stack focado em SaaS, automações e experiências modernas.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Contato
            </p>
            <a
              href="https://github.com/gabrielvalenco"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors no-underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/gabriel-valenço-480b43276"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors no-underline"
            >
              LinkedIn
            </a>
            <a
              href="mailto:gabrielvalencoofc@gmail.com"
              className="hover:text-foreground transition-colors no-underline"
            >
              Email
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-border/40 pt-6 text-xs text-muted-foreground">
          <p>© 2025 Gabriel Valenço. Todos os direitos reservados.</p>
          <p className="italic opacity-70">
            Every failure carries with it the seed of an equal or greater success.
          </p>
        </div>
      </div>
    </footer>
  )
}
