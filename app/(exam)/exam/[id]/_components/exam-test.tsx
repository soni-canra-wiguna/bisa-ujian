"use client"

import { useExamData } from "@/hook/use-exam"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { inputOptions } from "@/schema/input-options"
import { Loader2, TimerIcon } from "lucide-react"
import { format } from "date-fns"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import LoadingButton from "@/components/loading-button"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import ResultExam from "./result-exam"
import { ExamProps } from "@/type"
import { ExamType } from "./index"

export interface ExamDataProps {
  name: string
  classroom: string
  noAbsen: number
  timeRemainings: number
  correctAnswer: number
  wrongAnswer: number
  totalQuestion: number
}

export interface SubmitResultProps extends ExamDataProps {
  examId: string
}

export interface UserProps {
  name: string
  classroom: string
  noAbsen: number
}

interface ExamTestProps extends ExamType {
  id: string
}

const ExamTest = ({ exam, isPending, isError, id }: ExamTestProps) => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const [user, setUser] = useState({
    name: "",
    classroom: "",
    noAbsen: 0,
  })
  const [startExam, setStartExam] = useState(false)
  const [examResult, setExamResult] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
  })
  const [activeOptions, setActiveOptions] = useState(
    Array(exam?.questions?.length).fill(null)
  )
  const [timeRemaining, setTimeRemaining] = useState(30 * 60)
  const [submitResult, setSubmitResult] = useState(false)
  const [examData, setExamData] = useState<ExamDataProps>({
    name: "",
    classroom: "",
    noAbsen: 0,
    timeRemainings: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
    totalQuestion: 0,
  })
  const { questions } = exam || {}

  useEffect(() => {
    let timer: number
    if (startExam && timeRemaining > 0) {
      // @ts-ignore
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1)
      }, 1000)
      // Kurangi waktu setiap 1 detik
    }
    return () => clearTimeout(timer)
  }, [startExam, timeRemaining])

  const handleOptionClick = (
    questionIndex: number,
    optionIndex: number,
    isCorrect: boolean
  ) => {
    if (!startExam) return // Tidak melakukan apa-apa jika ujian belum dimulai

    // Menandai opsi yang dipilih oleh pengguna
    const updatedActiveOptions = [...activeOptions]
    updatedActiveOptions[questionIndex] = optionIndex
    setActiveOptions(updatedActiveOptions)

    // Menambahkan poin jika jawaban benar
    if (isCorrect) {
      setExamResult((prevCount) => ({
        ...prevCount,
        correctAnswers: prevCount.correctAnswers + 1,
      }))
    }
  }

  const timeRemine = 30 * 60 - timeRemaining
  const questionLength = questions?.length || 0
  const wrongAnswers = questionLength - examResult.correctAnswers

  const { isPending: pendingPost, mutate } = useMutation({
    mutationFn: async (data: SubmitResultProps) => {
      await axios.post("/api/result-exam", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    },
    onSuccess: () => {
      toast({
        title: "submit ujian berhasil",
        description: "ujian berhasil di submit, lihat peringkatmu!!",
      })

      setSubmitResult(true)
      queryClient.invalidateQueries({ queryKey: ["singleExamData"] })
    },
    onError: () => {
      toast({
        title: "gagal submit ujian",
        description: "gagal submit ujian, coba submit ulang.",
        variant: "destructive",
      })
    },
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const dataToSubmit = {
        name: user.name,
        classroom: user.classroom,
        noAbsen: user.noAbsen,
        timeRemainings: timeRemine,
        correctAnswer: examResult.correctAnswers,
        wrongAnswer: wrongAnswers,
        totalQuestion: questionLength,
        examId: id,
      }
      setExamData(dataToSubmit)

      mutate(dataToSubmit)
    } catch (error) {
      console.log(error)
    }
  }

  if (exam?.date === null) return

  return (
    <>
      {isPending ? (
        <div className="w-full items-center flex justify-center lg:mt-10">
          <Loader2 strokeWidth={3} className="animate-spin w-10 h-10" />
        </div>
      ) : isError ? (
        <div className="w-full items-center flex justify-center lg:mt-10">
          error
        </div>
      ) : (
        <div className="max-w-2xl w-full mx-auto">
          {!submitResult ? (
            <form onSubmit={onSubmit} className="w-full">
              <HeadingExamTest
                exam={exam}
                user={user}
                setUser={setUser}
                startExam={startExam}
                setStartExam={setStartExam}
                timeRemaining={timeRemaining}
              />
              <div className="w-full my-8 flex items-center justify-center">
                <span className="w-10 h-[2px] bg-primary rounded-full" />
              </div>

              <div className="w-full flex flex-col gap-6">
                {questions?.map(
                  (
                    { content, correctAnswer, points, options },
                    questionIndex
                  ) => {
                    return (
                      <Card
                        key={content}
                        className="w-full p-6 flex flex-col gap-4 overflow-hidden relative"
                      >
                        {/* blur effect */}
                        {!startExam && (
                          <div className="w-full h-full absolute left-0 top-0 bg-muted-foreground/10 backdrop-blur-lg z-20" />
                        )}
                        {/* blur effect */}
                        <div className="px-4 py-2 mb-3 rounded-md bg-muted">
                          <h1 className="font-grostekMd text-lg">{content}</h1>
                        </div>
                        <div className="flex flex-col gap-3">
                          {options?.map(({ content }, optionIndex) => (
                            <ExamOption
                              key={optionIndex}
                              activeOptions={activeOptions}
                              correctAnswer={correctAnswer}
                              optionIndex={optionIndex}
                              questionIndex={questionIndex}
                              content={content}
                              handleOptionClick={handleOptionClick}
                            />
                          ))}
                        </div>
                      </Card>
                    )
                  }
                )}
              </div>

              {startExam === true && (
                <LoadingButton
                  type="submit"
                  className="w-full mt-6 capitalize font-grostekMd"
                  loading={pendingPost}
                  disabled={pendingPost}
                >
                  submit ujian
                </LoadingButton>
              )}
            </form>
          ) : (
            <ResultExam
              id={exam?.id}
              examData={examData}
              questions={questions}
            />
          )}
        </div>
      )}
    </>
  )
}

export default ExamTest

interface HeadingExamTestProps {
  exam: ExamProps | undefined
  user: UserProps
  setUser: Dispatch<
    SetStateAction<{
      name: string
      classroom: string
      noAbsen: number
    }>
  >
  startExam: boolean
  setStartExam: (startExam: boolean) => void
  timeRemaining: number
}

const HeadingExamTest = ({
  exam,
  user,
  setUser,
  startExam,
  setStartExam,
  timeRemaining,
}: HeadingExamTestProps) => {
  // @ts-ignore
  const formatDate = format(exam?.date, "d MMMM yyyy")

  return (
    <Card className="flex flex-col gap-6 p-6 relative overflow-hidden">
      <span className="absolute w-full h-2 top-0 bg-primary left-0" />
      <h1 className="font-grostekBold text-4xl pt-4 capitalize">
        {exam?.title}
      </h1>
      <p className="text-muted-foreground">{exam?.description}</p>
      <p>{formatDate}</p>
      <div className="w-full mb-2 mt-4 border-b" />
      <h3 className="font-grostekMd text-xl mb-2">masukkan data diri anda</h3>
      <div className="flex flex-col gap-3">
        <Label>nama lengkap</Label>
        <Input
          type="text"
          value={user.name}
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value,
            })
          }
          required
          placeholder="nama lengkap"
        />
      </div>
      <div className="flex flex-row w-full h-full items-center justify-between my-4">
        <Select
          onValueChange={(value) =>
            setUser({
              ...user,
              classroom: value,
            })
          }
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="kelas" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {inputOptions.classrooms.map((value) => (
                <SelectItem className="uppercase" key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <span className="w-[2px] h-5 bg-muted border-none mx-4" />

        <Select
          onValueChange={(value) =>
            setUser({
              ...user,
              noAbsen: parseInt(value),
            })
          }
        >
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="nomor absen" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {inputOptions.noAbsen.map((value) => (
                <SelectItem className="uppercase" key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button
        type="button"
        onClick={() => setStartExam(!startExam)}
        disabled={startExam === true}
        className="capitalize font-grostekMd w-full"
      >
        mulai ujian <TimerIcon className="size-4 ml-2" />
      </Button>
      {startExam && timeRemaining > 0 && (
        <div>
          Waktu Tersisa: {Math.floor(timeRemaining / 60)} menit{" "}
          {timeRemaining % 60} detik
        </div>
      )}
    </Card>
  )
}

interface ExamOptionsProps {
  activeOptions: any[]
  correctAnswer: string
  optionIndex: number
  questionIndex: number
  content: string
  handleOptionClick: (
    questionIndex: number,
    optionIndex: number,
    isCorrect: boolean
  ) => void
}

const ExamOption = ({
  activeOptions,
  correctAnswer,
  optionIndex,
  questionIndex,
  content,
  handleOptionClick,
}: ExamOptionsProps) => {
  return (
    <div
      className={`flex justify-between items-center p-2 rounded-md ${
        activeOptions[questionIndex] === optionIndex && "bg-primary/10"
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="cursor-pointer relative border border-muted-foreground rounded-full w-5 h-5 group"
          onClick={() =>
            handleOptionClick(
              questionIndex,
              optionIndex,
              content === correctAnswer
            )
          }
        >
          <span className="absolute hidden group-hover:inline transition-all w-2.5 h-2.5 bg-primary rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          {activeOptions[questionIndex] === optionIndex && (
            <span className="absolute w-2.5 h-2.5 bg-primary rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          )}
        </button>
        <p className="font-grostekNormal">{content}</p>
      </div>
    </div>
  )
}
