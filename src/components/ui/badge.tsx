import * as React from "react"

import { cn } from "@/lib/utils"

/** Tag neutra, em mono e texto pequeno. */
function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-foreground/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
