"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  LayoutPanelLeft,
  ArrowRightToLineIcon,
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
// import EditProfile from "./EditProfile"
import { useState } from "react"

interface UserProfileProps {
  logout: () => void
  session: any
}

const UserProfile = ({ logout, session }: UserProfileProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function closePopover() {
    setIsOpen(false)
  }

  const avatar = (className: string) => {
    return (
      <Avatar
        className={cn(
          "ring-4 ring-transparent hover:ring-primary/20 transition duration-500 ease-in-out",
          className
        )}
      >
        <AvatarImage
          src={session?.user.image || "/default-user-profile.jpg"}
          className="object-cover object-center shimmer"
          width={500}
          height={500}
        />
        <AvatarFallback>{session?.user.username.slice(0, 2)}</AvatarFallback>
      </Avatar>
    )
  }

  const contentByRole = () => {
    if (session?.user.role === "admin") {
      return (
        <Button className="w-full" variant="ghost">
          <Link
            href="/dashboard"
            onClick={closePopover}
            className="w-full flex items-center justify-between capitalize"
          >
            Dashboard
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </Button>
      )
    }

    if (session?.user.role === "teacher") {
      return (
        <Button className="w-full" variant="ghost">
          <Link
            href="/dashboard"
            onClick={closePopover}
            className="w-full flex items-center justify-between capitalize"
          >
            dashboard
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </Button>
      )
    }

    if (session?.user.role === "student") {
      return (
        <Button className="w-full" variant="ghost">
          <Link
            href="/e/student"
            onClick={closePopover}
            className="w-full flex items-center justify-between capitalize"
          >
            student dashboard
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </Button>
      )
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>{avatar("w-8 h-8 md:w-9 md:h-9")}</PopoverTrigger>
      <PopoverContent align="end" className="p-6 relative">
        {/* edit profile in here */}
        {/* <EditProfile /> */}
        {/* edit profile in here */}
        <div className="flex flex-col gap-2">
          <div className="py-3 flex items-center justify-center">
            {avatar("h-20 w-20")}
          </div>
          <div className="items-center flex flex-col">
            <h2 className="text-xl font-medium capitalize text-center">
              {session.user.username}
            </h2>
            <p className="text-muted-foreground text-xs">
              {session?.user.email}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 mt-6">
            {contentByRole()}
            <Button
              className="w-full gap-4"
              onClick={logout}
              variant="destructive"
            >
              Logout
              <ArrowRightToLineIcon className="w-4 h-4" strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default UserProfile
