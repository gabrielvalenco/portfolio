import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

type CommonProps = {
  icon?: LucideIcon
  children: ReactNode
  className?: string
}

const BASE =
  'inline-flex items-center gap-2 border border-[#9eff00]/40 bg-black/60 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.22em] text-zinc-200 no-underline transition-all hover:border-[#9eff00] hover:bg-[#9eff00]/10 hover:text-[#9eff00] hover:shadow-[0_0_28px_rgba(158,255,0,0.3)]'

export function TermLink({
  to, icon: Icon, children, className = '',
}: CommonProps & { to: string }) {
  return (
    <Link to={to} className={`${BASE} ${className}`}>
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </Link>
  )
}

export function TermAnchor({
  href, target, icon: Icon, children, className = '',
}: CommonProps & { href: string; target?: string }) {
  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      className={`${BASE} ${className}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </a>
  )
}
