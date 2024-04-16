import { FileText, LucideIcon } from "lucide-react"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import React from "react"
import { cn } from "@/lib/utils"

interface PhoneMockupProps {
  image: string | StaticImport
  altImage: string
  icon1: React.ReactNode
  icon2: React.ReactNode
  className?: string
}

const PhoneMockup = ({
  icon1,
  icon2,
  image,
  altImage,
  className,
}: PhoneMockupProps) => {
  return (
    <div
      className={cn(
        "p-3 rounded-3xl w-max border-2 bg-background shadow-boxDark relative",
        className
      )}
    >
      <div className="w-[180px] md:w-[210px] lg:w-[250px] aspect-[9/16] rounded-2xl relative overflow-hidden border border-gray-300/20">
        <span className="w-14 h-4 md:w-20 md:h-6 flex items-center justify-end rounded-full bg-black absolute top-4 left-1/2 -translate-x-1/2 p-2 border border-gray-300/20">
          <span className="size-2 rounded-full bg-white/20" />
        </span>

        <Image
          alt={altImage}
          src={image}
          className="w-full h-full object-center object-cover"
        />
      </div>
      <div className="hidden lg:flex z-30 absolute items-center w-max bottom-3 -right-28">
        <span className="size-3 rounded-full bg-primary" />
        <hr className="w-24 border-b border-primary border-dashed" />
        <div className="p-5 rounded-md border-primary border-dashed border bg-primary/20 flex items-center justify-center shadow-lg shadow-primary/20">
          {icon1}
        </div>
      </div>

      <div className="hidden lg:flex z-30 absolute items-center w-max top-8 -left-28">
        <div className="p-5 rounded-md border-green-500 border-dashed border bg-green-500/20 flex items-center justify-center shadow-lg shadow-green-500/20">
          {icon2}
        </div>
        <hr className="w-24 border-b border-green-500 border-dashed" />
        <span className="size-3 rounded-full bg-green-500" />
      </div>
    </div>
  )
}

export default PhoneMockup
