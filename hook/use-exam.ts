"use client"

import { ExamProps } from "@/type"
// single responsibility principle
import type { Answer, Exam, Question } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const useExamsData = () => {
  const {
    data: exams,
    isPending,
    isError,
    isLoading,
  } = useQuery<Exam[]>({
    queryKey: ["examsData"],
    queryFn: async () => {
      const { data } = await axios.get("/api/exams")
      return data.exams
    },
  })

  return { exams, isPending, isError, isLoading }
}

export default useExamsData

export const useExamData = (id?: string) => {
  const {
    data: exam,
    isPending,
    isError,
    isLoading,
  } = useQuery<ExamProps>({
    queryKey: ["singleExamData"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/exams/${id}`)
      return data.exam
    },
  })

  return { exam, isPending, isError, isLoading }
}
