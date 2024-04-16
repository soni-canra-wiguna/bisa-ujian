"use client"

import { disableNavWithFooter } from "@/utils/disable-nav-with-footer"
import { usePathname } from "next/navigation"

const Footer = () => {
  const pathname = usePathname()
  return (
    <>
      {!disableNavWithFooter.includes(pathname) && (
        <footer className="my-10 w-full items-center justify-center text-center">
          <p className="text-muted-foreground text-sm font-grostekNormal">
            build with 💖 by soni canra wiguna
          </p>
        </footer>
      )}
    </>
  )
}

export default Footer
