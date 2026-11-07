import * as React from "react"

import { cn } from "@/lib/utils"

/** Tag neutra, em mono e texto pequeno. */
function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
