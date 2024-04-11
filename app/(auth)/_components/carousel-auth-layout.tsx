"use client"

import Image from "next/image"
import { useMemo } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import AutoPlay from "embla-carousel-autoplay"

const carouselItems = [
  {
    img_src: "/rafiki/signin.svg",
    title: "Login ke akun anda",
    desc: "Selamat datang kembali! Masuk ke akun Anda untuk menjelajahi dunia sekolah kami dengan mudah.",
  },
  {
    img_src: "/rafiki/happy-student.svg",
    title: "Jelajahi sekolah kami",
    desc: "Temukan keunikan sekolah kami. Jelajahi untuk menemukan keistimewaan sekolah kami.",
  },
]

const CarouselAuthLayout = () => {
  const options = {
    loop: true,
    dots: true,
    orientation: "horizontal",
  }
  const carouselItem = useMemo(
    () =>
      carouselItems.map((item, i) => (
        <CarouselItem
          key={item.title}
          className="flex flex-col justify-center items-center w-full"
        >
          <Image
            alt={item.title}
            src={item.img_src}
            width={500}
            height={500}
            className="w-[500px] aspect-square grayscale"
          />
          <div className="flex flex-col gap-1.5 text-center">
            <h5 className="text-[#303030] text-2xl font-medium font-garamond mb-1.5">
              {i + 1}. {item.title}
            </h5>
            <p className="text-[#4f4f4f] max-w-xl">{item.desc}</p>
          </div>
        </CarouselItem>
      )),
    []
  )

  return (
    <div className="md:col-span-8 lg:flex h-full hidden items-center justify-center bg-primary/10 rounded-2xl border">
      <Carousel
        plugins={[
          AutoPlay({
            delay: 4500,
          }),
        ]}
        opts={options}
        className="w-full h-full flex items-center justify-center"
      >
        <CarouselContent className="ini-carousel-content">
          {carouselItem}
        </CarouselContent>
        <CarouselPrevious className="lg:left-12" />
        <CarouselNext className="lg:right-12" />
      </Carousel>
    </div>
  )
}

export default CarouselAuthLayout
