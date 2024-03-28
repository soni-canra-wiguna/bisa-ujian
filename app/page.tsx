import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import imageHero from "@/public/img-preview.svg"
import playButton from "@/public/play-button.svg"
import { cn } from "@/lib/utils"
import line from "@/public/line3.svg"
import Link from "next/link"

export default function Home() {
  return (
    <MaxWidthWrapper className="pb-40">
      <div className="w-full h-full items-center justify-center flex flex-col pt-5">
        <h1
          className="text-[80px] font-bold font-grostekBold -tracking-[1px] capitalize mb-2 relative selection:bg-transparent"
          data-aos="fade-up"
          data-aos-delay="50"
        >
          bisa ujian
          <Image
            alt="svg line"
            src={line}
            className="w-56 -right-6 absolute top-4"
          />
        </h1>
        <p
          className="text-muted-foreground mb-16"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Sebuah flatform yang di gunakan untuk mempermudah siswa/i dalam
          melakukan ujian.
        </p>
        <Link href="/exams">
          <Button
            size="lg"
            className="gap-2 capitalize shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            mulai ujian
            <ArrowRight className="w-4 aspect-square mt-0.5" />
          </Button>
        </Link>
        <DemoApp />
      </div>
    </MaxWidthWrapper>
  )
}

const DemoApp = () => {
  return (
    <div className="pt-[150px] flex justify-center">
      <div
        className={cn(
          "w-max h-full p-8 pb-10 bg-white/10 shadow-box dark:shadow-boxDark rounded-[30px] flex flex-col gap-6"
        )}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="flex items-center gap-3">
          <span className="w-[18.74px] aspect-square rounded-full bg-[#FC1F6F]" />
          <span className="w-[18.74px] aspect-square rounded-full bg-[#FFCC18]" />
          <span className="w-[18.74px] aspect-square rounded-full bg-[#1DF359]" />
        </div>
        <div className="relative w-[928px] h-full overflow-hidden rounded-lg border">
          <Image
            src={imageHero}
            alt="preview image"
            className="w-full h-full"
          />
          <button className="flex items-center justify-center w-[150px] aspect-square rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white">
            <Image
              src={playButton}
              alt="play pause button"
              className="ml-2.5"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
