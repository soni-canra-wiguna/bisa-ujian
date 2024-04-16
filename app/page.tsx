import MaxWidthWrapper from "@/components/max-width-wrapper"
import GoToExam from "@/components/go-to-exam"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  FileText,
  ListMinus,
  ClipboardSignature,
  ClipboardList,
  UserSquare2Icon,
  LucideTrophy,
} from "lucide-react"
import Image from "next/image"
import imageHero from "@/public/thumb-demoapp.png"
import { cn } from "@/lib/utils"
import line from "@/public/line3.svg"
import { FaPlay, FaWhatsapp } from "react-icons/fa"
import createExam from "@/public/create-exam.png"
import doExam from "@/public/doexam.png"
import PhoneMockup from "@/components/phone-mockup"

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="w-full h-full items-center justify-center flex flex-col pt-5">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold font-grostekBold -tracking-[1px] capitalize mb-2 lg:mb-4 relative selection:bg-transparent"
          data-aos="fade-up"
          data-aos-delay="50"
        >
          bisa ujian
          <Image
            alt="svg line"
            src={line}
            className="absolute w-32 sm:w-40 md:w-48 lg:w-52 -right-4 lg:-right-6 top-0"
          />
        </h1>
        <p
          className="text-muted-foreground mb-16 text-sm sm:text-base md:max-w-lg text-center sm:max-w-md leading-6 lg:leading-7"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Sebuah flatform yang di gunakan untuk mempermudah siswa/i dalam
          melakukan ujian.
        </p>
        <GoToExam />
        <DemoApp />
        <SectionCreateExam />
        <SectionDoExam />
        <Contact />
      </div>
    </MaxWidthWrapper>
  )
}

const DemoApp = () => {
  return (
    <div className="mt-28 lg:mt-[150px] mb-10 md:mb-20 flex justify-center w-full h-full">
      <div
        className={cn(
          "w-full md:w-max h-full p-3 sm:p-5 md:p-6 lg:p-8 bg-background shadow-box dark:shadow-boxDark rounded-lg md:rounded-[30px] flex flex-col gap-3 lg:gap-6 border"
        )}
      >
        <div className="flex items-center gap-2 md:gap-3">
          <span className="size-3 sm:size-3.5 lg:size-[18px] rounded-full bg-[#FC1F6F]" />
          <span className="size-3 sm:size-3.5 lg:size-[18px] rounded-full bg-[#FFCC18]" />
          <span className="size-3 sm:size-3.5 lg:size-[18px] rounded-full bg-[#1DF359]" />
        </div>
        <div className="relative w-full md:max-w-[640px] lg:max-w-[928px] h-full overflow-hidden rounded-lg border">
          <Image
            src={imageHero}
            alt="preview image"
            className="w-full h-full"
          />
          <button className="flex items-center justify-center p-4 md:p-6 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-background shadow-box dark:shadow-boxDark">
            <FaPlay className="size-6 sm:size-8 md:size-10 fill-primary translate-x-[0.15rem] lg:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  )
}

const SectionCreateExam = () => {
  const settingsMockup = {
    image: createExam,
    altImage: "image demo buat ulangan/ujian",
    icon1: <FileText className="size-6 text-primary" strokeWidth={1.5} />,
    icon2: <ListMinus className="size-6 text-green-500" strokeWidth={1.5} />,
  }

  return (
    <section className="my-10 md:my-20 grid grid-cols-1 sm:grid-cols-2 w-full gap-10 smgap-6 lg:gap-14">
      <div className="w-full h-full rounded-md relative flex items-center justify-center">
        <PhoneMockup {...settingsMockup} />
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center sm:items-start">
        <ClipboardSignature
          className="text-primary size-6 mb-2"
          strokeWidth={1.5}
        />
        <h1 className="text-xl md:text-2xl lg:text-3xl font-grostekBold mb-3 text-center sm:text-start lg:leading-10">
          Login, Buat Soal
          <br /> dan Bagikan{" "}
          <span className="underline underline-offset-2 decoration-primary">
            Link
          </span>
          -nya
        </h1>
        <p className="text-sm md:text-base text-muted-foreground w-full sm:max-w-lg mb-7 text-center sm:text-start leading-6 lg:leading-7">
          Jika ingin membuat soal anda harus login terlebih dahulu. Lalu,
          sebelum membuat soal lengkapi data seperti judul, deskripsi, kelas,
          dan tanggal ujian. Setelah itu anda bisa membuat soal, tambahkan opsi
          jawaban, dan pilih opsi jawaban yang benar. Terakhir, submit soal
          dengan click tombol buat ujian dan bagikan link ujian.
        </p>
      </div>
    </section>
  )
}

const SectionDoExam = () => {
  const settingsMockup = {
    image: doExam,
    altImage: "image demo ngerjain ulangan/ujian",
    icon1: <LucideTrophy className="size-6 text-primary" strokeWidth={1.5} />,
    icon2: (
      <UserSquare2Icon className="size-6 text-green-500" strokeWidth={1.5} />
    ),
  }

  return (
    <section className="my-10 md:my-20 grid grid-cols-1 sm:grid-cols-2 w-full gap-10 sm:gap-6 lg:gap-14">
      <div className="w-full h-full flex flex-col justify-center items-center sm:items-start order-2 sm:order-1">
        <ClipboardList
          className="text-primary size-6 mb-3.5"
          strokeWidth={1.5}
        />
        <h1 className="text-xl md:text-2xl lg:text-3xl font-grostekBold mb-3 text-center sm:text-start lg:leading-10">
          Kerjakan Soal <br /> dan Lihat{" "}
          <span className="underline underline-offset-2 decoration-primary">
            Peringkat
          </span>
          -mu
        </h1>
        <p className="text-sm md:text-base text-muted-foreground w-full sm:max-w-lg mb-7 text-center sm:text-start leading-6 lg:leading-7">
          Sebelum mengerjakan soal, masukkan data diri kamu seperti nama
          lengkap, kelas, dan nomor absen. Setelah itu, klik tombol mulai
          ujian,lalu kerjakan soal dan pilih opsi jawaban yang menurut kamu
          benar. Terakhir, submit dan lihat peringkatmu.
        </p>
      </div>
      <div className="w-full h-full rounded-md relative flex items-center justify-center order-1 sm:order-2">
        <PhoneMockup {...settingsMockup} />
      </div>
    </section>
  )
}

const Contact = () => {
  return (
    <section className="my-10 md:my-20 w-full flex flex-col gap-6 items-center justify-center">
      <p className="font-grostekBold text-2xl">informasi lebih lanjut?</p>
      <div className="flex items-center gap-3 text-muted-foreground font-grostekNormal text-sm">
        Hubungi Saya -{" "}
        <Button
          asChild
          className="flex items-center gap-2 border border-dashed border-green-500 rounded-full w-max bg-green-500/20 hover:bg-green-500/30 rounded-bl-none text-green-500 text-base"
        >
          <a target="_blank" href="https://wa.me/083822462241">
            What&apos;s App
            <FaWhatsapp className="text-lg" />
          </a>
        </Button>
      </div>
    </section>
  )
}
