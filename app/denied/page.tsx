import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import React from "react"

const DeniedPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden z-50 fixed">
      <div className="max-w-lg w-full mx-auto flex flex-col gap-4 items-center px-6 justify-center">
        <Image
          alt="image not found"
          src="/popcorn-anime.gif"
          width={500}
          height={500}
          className="size-32 selection:bg-transparent"
          unoptimized={true}
        />
        <h1 className="text-4xl font-grostekBold">mau ngapain kamu?</h1>
        <Button variant="outline" asChild>
          <Link href="/"><ArrowLeft className="mr-2 size-4" />  ke halaman utama</Link>
        </Button>
      </div>
    </div>
  )
}

export default DeniedPage
