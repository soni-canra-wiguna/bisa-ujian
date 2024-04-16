"use client"

import React from "react"
import { ThemeToggle } from "../theme-toggle"
import MaxWidthWrapper from "../max-width-wrapper"
import Link from "next/link"
import UserProfile from "./user-profile"
import { useUserClient } from "@/hook/use-user"
import { Button } from "../ui/button"
import { usePathname, useRouter } from "next/navigation"
import { disableNavWithFooter } from "@/utils/disable-nav-with-footer"
import { signOut } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"

const Navbar = () => {
  const session = useUserClient()
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/")
  
      toast({
        title: "logout succes!!",
      })
    })
  }
  

  return (
    <>
      {!disableNavWithFooter.includes(pathname) && (
        <MaxWidthWrapper>
          <div className="flex items-center justify-between pt-6 pb-16 lg:pt-10 lg:pb-20">
            <Link
              href="/"
              className="font-grostekMd font-medium text-lg underline underline-offset-2 decoration-primary -rotate-6"
              data-aos="fade-up"
            >
              Bisa Ujian
            </Link>
            <div className="flex items-center gap-3 lg:gap-5">
              <ThemeToggle />
              {!session ? (
                <Button asChild>
                  <Link className="capitalize" href="/sign-in">
                    sign in
                  </Link>
                </Button>
              ) : (
                <UserProfile session={session} logout={handleLogout} />
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      )}
    </>
  )
}

export default Navbar
