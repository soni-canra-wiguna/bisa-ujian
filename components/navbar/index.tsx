"use client"

import React from "react"
import { ThemeToggle } from "../theme-toggle"
import MaxWidthWrapper from "../max-width-wrapper"
import Link from "next/link"
import UserProfile from "./user-profile"
import { handleLogout } from "@/utils/logout"
import { useUserClient } from "@/hook/use-user"
import { Button } from "../ui/button"
import { usePathname, useRouter } from "next/navigation"
import { disableNavWithFooter } from "@/utils/disable-nav-with-footer"

const Navbar = () => {
  const session = useUserClient()
  const pathname = usePathname()

  return (
    <>
      {!disableNavWithFooter.includes(pathname) && (
        <MaxWidthWrapper>
          <div className="flex items-center justify-between pt-10 pb-20">
            <Link
              href="/"
              className="font-grostekMd font-medium text-lg underline underline-offset-2 decoration-primary -rotate-6"
              data-aos="fade-up"
            >
              Bisa Ujian
            </Link>
            <div className="flex items-center gap-3">
              {!session ? (
                <Button variant="link" asChild>
                  <Link className="capitalize" href="/sign-in">
                    sign in
                  </Link>
                </Button>
              ) : (
                <UserProfile session={session} logout={handleLogout} />
              )}
              <ThemeToggle />
            </div>
          </div>
        </MaxWidthWrapper>
      )}
    </>
  )
}

export default Navbar
