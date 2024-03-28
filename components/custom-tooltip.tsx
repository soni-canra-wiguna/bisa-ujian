"use client"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

interface CustomTooltipProps {
  children: React.ReactNode
  message: string
  className?: string
  side?: "top" | "bottom" | "left" | "right"
}

const CustomTooltip = ({
  children,
  message,
  className,
  side,
}: CustomTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          className={cn(
            "bg-muted text-foregroud dark:text-primary-foreground",
            className
          )}
        >
          {message}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CustomTooltip
