import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import imageHero from "@/public/img-preview.svg"
import playButton from "@/public/play-button.svg"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <main className="w-full min-h-screen h-full pb-40">
      <div className="absolute top-0 z-[-2] h-screen w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,155,80,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,155,80,0.2),rgba(255,255,255,0))]" />
      <MaxWidthWrapper>
        <Hero />
      </MaxWidthWrapper>
    </main>
  )
}

const Hero = () => {
  return (
    <div className="w-full h-full items-center justify-center flex flex-col pt-5">
      <h1 className="text-[80px] font-bold font-grostekBold -tracking-[1px] capitalize mb-2">
        bisa ujian
      </h1>
      <p className="text-muted-foreground mb-16">
        Sebuah flatform yang di gunakan untuk mempermudah siswa/i dalam
        melakukan ujian.
      </p>
      <Button size="lg" className="gap-2 capitalize">
        mulai ujian
        <ArrowRight className="w-4 aspect-square mt-0.5" />
      </Button>
      {/*  */}
      <div className="pt-[150px] flex justify-center">
        <div
          className={cn(
            "w-max h-full p-8 pb-10 bg-white/10 shadow-box dark:shadow-boxDark rounded-[30px] flex flex-col gap-6"
          )}
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
    </div>
  )
}
