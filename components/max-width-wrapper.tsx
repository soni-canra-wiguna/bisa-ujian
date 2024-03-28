import { cn } from "@/lib/utils"

interface MaxWidthWrapperProps {
  children: React.ReactNode
  className?: string
}

const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperProps) => {
  return (
    <div className={cn("max-w-6xl w-full mx-auto", className)}>{children}</div>
  )
}

export default MaxWidthWrapper
