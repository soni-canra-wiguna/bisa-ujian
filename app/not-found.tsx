import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function NotFound() {
  return (
    <div className="w-screen h-screen top-0 left-0 flex items-center justify-center overflow-hidden z-50 fixed bg-background">
      <div className="absolute top-0 z-[-2] h-screen w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,155,80,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,155,80,0.2),rgba(255,255,255,0))]" />
      <div className="max-w-lg w-full mx-auto flex flex-col gap-4 items-center px-6 justify-center">
        <div className="flex items-end">
          <h1 className="text-[80px] font-grostekBold">4</h1>
          <Image
          alt="image not found"
          src="/herta-kurukuru.gif"
          width={500}
          height={500}
          className="size-32 selection:bg-transparent"
          unoptimized={true}
        />
          <h1 className="text-[80px] font-grostekBold">4</h1>
        </div>
        <h1 className="text-4xl font-grostekBold">page not found</h1>
        <Button variant="outline" asChild>
          <Link href="/"><ArrowLeft className="mr-2 size-4" />  ke halaman utama</Link>
        </Button>
      </div>
    </div>
  )
}