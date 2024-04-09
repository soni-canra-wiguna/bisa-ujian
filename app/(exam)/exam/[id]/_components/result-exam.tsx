"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { secondsToTime } from "@/lib/seconds-to-time"
import { QuestionProps } from "@/type"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ExamDataProps } from "./exam-test"
import { useRouter } from "next/navigation"

interface ResultExamProps {
  examData: ExamDataProps
  questions?: QuestionProps[]
  id?: string
}

const ResultExam = ({ examData, questions, id }: ResultExamProps) => {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 w-full">
        <h1 className="font-grostekBold text-3xl text-center">
          {examData?.name}
        </h1>
        <p className="flex items-center text-muted-foreground justify-center">
          Kelas : {examData?.classroom} <span className="mx-4">|</span> No absen
          : {examData?.noAbsen}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card className="border bg-background p-4 flex flex-col gap-3 items-center">
          <h4 className="font-grostekBold text-4xl">
            {secondsToTime(examData?.timeRemainings)}
          </h4>
          <p className="text-muted-foreground capitalize">durasi pengerjaan</p>
        </Card>
        <Card className="border bg-background p-4 flex flex-col gap-1.5 items-center">
          <h4 className="font-grostekBold text-4xl">{questions?.length}</h4>
          <p className="text-muted-foreground capitalize">total soal</p>
        </Card>
        <Card className="border bg-background p-4 flex flex-col gap-1.5 items-center">
          <h4 className="font-grostekBold text-4xl">
            {examData?.correctAnswer}
          </h4>
          <p className="text-muted-foreground capitalize">jawaban benar</p>
        </Card>
        <Card className="border bg-background p-4 flex flex-col gap-1.5 items-center">
          <h4 className="font-grostekBold text-4xl">{examData?.wrongAnswer}</h4>
          <p className="text-muted-foreground capitalize">jawaban salah</p>
        </Card>
      </div>
      <div className="flex items-center justify-between w-full">
        <Button variant="outline">
          <ArrowLeft className="size-4 mr-2" />
          <Link href="/">halaman utama</Link>
        </Button>
        <Button
          onClick={() => {
            router.push("?tabs=leaderboard")
            router.refresh()
          }}
        >
          lihat peringkat
          <ArrowRight className="size-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default ResultExam
