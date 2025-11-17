import { cn } from '../../lib/cn'

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={cn('inline-flex items-center rounded-md bg-neutral-800 px-2 py-1 text-xs', className)}>{children}</span>
}