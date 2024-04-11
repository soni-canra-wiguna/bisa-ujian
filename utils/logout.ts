"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export const handleLogout = () => {
  const router = useRouter()

  signOut({ redirect: false }).then(() => {
    router.push("/")

    toast({
      title: "logout succes!!",
    })
  })
}
