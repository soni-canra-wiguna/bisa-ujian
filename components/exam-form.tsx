// @ts-nocheck

"use client"

import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import axios from "axios"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { CalendarIcon, PlusCircle, Trash2Icon, X } from "lucide-react"
import { Card } from "./ui/card"
import { useToast } from "./ui/use-toast"
import { useMutation } from "@tanstack/react-query"
import { ExamProps } from "@/type"
import LoadingButton from "./loading-button"
import { cn } from "@/lib/utils"
import { inputOptions } from "@/schema/input-options"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import CustomTooltip from "./custom-tooltip"

export default function ExamFormPost() {
  const { toast } = useToast()
  const [title, setTitle] = useState(
    // localStorage.getItem("title") ||
    ""
  )
  const [description, setDescription] = useState("")
  const [classroom, setClassroom] = useState("all")
  const [questions, setQuestions] = useState(
    // JSON.parse(localStorage.getItem("questions")) ||
    [
      {
        content: "",
        points: "10",
        options: [{ content: "", isCorrectAnswer: false }],
      },
    ]
  )
  const [dateSelected, setDateSelected] = useState<Date>()

  // useEffect(() => {
  //   localStorage.setItem("title", title)
  //   localStorage.setItem("questions", JSON.stringify(questions))
  // }, [title, questions])

  function handleAddQuestion() {
    setQuestions([
      ...questions,
      {
        content: "",
        points: "10",
        options: [{ content: "", isCorrectAnswer: false }],
      },
    ])
  }

  const handleDeleteQuestion = (questionIndex: number) => {
    const newQuestions = [...questions]
    // disini .splice berfungsi buat ngehapus dan 1 itu berapa item yang mau di hapus
    // juga untuk questionIndex itu kita mau hapus questionnya berdasarkan index pake methode .splice
    newQuestions.splice(questionIndex, 1)
    setQuestions(newQuestions)
  }

  const handleAddOption = (questionIndex: number) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options.push({
      content: "",
      isCorrectAnswer: false,
    })
    setQuestions(newQuestions)
  }

  const handleDeleteOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options.splice(optionIndex, 1)
    setQuestions(newQuestions)
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ExamProps) => {
      await axios.post("/api/exams", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    },
    onSuccess: () => {
      toast({
        title: "ujian ditambahkan.",
        description: "ujian berhasil di tambahkan!!",
      })
      // Reset form
      setTitle("")
      setDescription("")
      setClassroom("")
      setDateSelected(Date | undefined)
      setQuestions([
        { content: "", options: [{ content: "", isCorrectAnswer: false }] },
      ])
      // localStorage.removeItem("title")
      // localStorage.removeItem("questions")
    },
    onError: () => {
      toast({
        title: "gagal ditambahkan.",
        description: "ujian gagal di tambahkan!!",
        variant: "destruction",
      })
    },
  })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    try {
      mutate({
        title,
        description,
        date: dateSelected,
        classroom,
        questions,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const borderBottom =
    "border-x-0 border-t-0 border-b rounded-none focus-visible:ring-0 focus-visible:ring-transparent focus:border-primary p-0"

  return (
    <div className="max-w-3xl w-full mx-auto mb-20">
      <form onSubmit={onSubmit} className="w-full">
        <Card className="flex flex-col gap-6 p-6 relative overflow-hidden">
          <span className="absolute w-full h-2 top-0 bg-primary left-0" />
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Judul ujian"
            className={cn("h-12 text-xl font-medium", borderBottom)}
          />
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="deskripsi ujian"
            className={cn("", borderBottom)}
          />
          <div className="flex flex-row w-full h-full items-center justify-between my-4">
            <Select onValueChange={(value) => setClassroom(value)}>
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

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left font-normal flex-1 w-full",
                    !dateSelected && "text-muted-foreground"
                  )}
                >
                  {dateSelected ? (
                    format(dateSelected, "dd MMMM yyyy", { locale: id })
                  ) : (
                    <span>tanggal ujian</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={dateSelected}
                  onSelect={setDateSelected}
                  // disabled={(date) => {
                  //   const today = new Date()
                  //   const nextWeek = new Date(today)
                  //   nextWeek.setDate(today.getDate() + 7)

                  //   return date < new Date() || date > nextWeek
                  // }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </Card>
        <div className="w-full flex items-center justify-end my-8">
          <Button type="button" onClick={handleAddQuestion}>
            Add Question <PlusCircle className="size-4 ml-2" />
          </Button>
        </div>
        {/* question */}
        {questions.map((question, questionIndex) => (
          <Card key={questionIndex} className="w-full flex flex-col mb-4">
            <div className="w-full items-center justify-end py-2 flex border-b px-6 mb-4 rounded-t-xl">
              <div className="flex items-center gap-4">
                <Select
                  defaultValue={questions[questionIndex]?.points?.toString()}
                  onValueChange={(value) => {
                    const newQuestions = [...questions]
                    newQuestions[questionIndex].points = value
                    setQuestions(newQuestions)
                  }}
                >
                  <CustomTooltip message="poin soal" side="left">
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="point" />
                    </SelectTrigger>
                  </CustomTooltip>
                  <SelectContent>
                    <SelectGroup>
                      {inputOptions.points.map((value) => (
                        <SelectItem
                          key={value.toString()}
                          value={value.toString()}
                        >
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {/* select point */}
                <CustomTooltip message="hapus soal">
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => handleDeleteQuestion(questionIndex)}
                    className="p-[0.01px]"
                  >
                    <Trash2Icon className="w-4 h-4 xt-muted-foreground" />
                  </Button>
                </CustomTooltip>
              </div>
            </div>
            <div className="flex flex-col p-6 w-full gap-4">
              <Input
                type="text"
                placeholder="pertanyaan"
                value={question.content}
                onChange={(e) => {
                  const newQuestions = [...questions]
                  newQuestions[questionIndex].content = e.target.value
                  setQuestions(newQuestions)
                }}
                required
                className="h-12"
              />
              <div className="w-full py-4 flex items-center justify-center">
                <span className="h-px bg-muted-foreground w-20" />
              </div>

              {/* answer options */}
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex gap-4 items-center mb-3">
                  <Input
                    type="text"
                    placeholder={`opsi ${optionIndex + 1}`}
                    value={option.content}
                    onChange={(e) => {
                      const newQuestions = [...questions]
                      newQuestions[questionIndex].options[optionIndex].content =
                        e.target.value
                      setQuestions(newQuestions)
                    }}
                    required
                    className={cn("flex-1", borderBottom)}
                  />
                  <Input
                    type="checkbox"
                    checked={option.isCorrectAnswer}
                    onChange={(e) => {
                      const newQuestions = [...questions]
                      newQuestions[questionIndex].options[
                        optionIndex
                      ].isCorrectAnswer = e.target.checked
                      setQuestions(newQuestions)
                    }}
                    className="w-max shadow-none"
                  />
                  <CustomTooltip message="hapus opsi">
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      onClick={() =>
                        handleDeleteOption(questionIndex, optionIndex)
                      }
                      className=""
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </CustomTooltip>
                </div>
              ))}
              <p
                className="cursor-pointer underline underline-offset-4 text-sm text-muted-foreground w-max"
                onClick={() => handleAddOption(questionIndex)}
              >
                tambahkan opsi
              </p>
            </div>
          </Card>
        ))}

        <br />
        <LoadingButton
          className="w-full"
          loading={isPending}
          disabled={isPending || questions.length < 2}
          type="submit"
        >
          Create Exam
        </LoadingButton>
      </form>
    </div>
  )
}
