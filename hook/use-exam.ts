"use client"

import { ExamProps } from "@/type"
// single responsibility principle
import type { Answer, Exam, Question } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useUserClient } from "./use-user"

const useExamsData = () => {
  const session = useUserClient()
  const {
    data: exams,
    isPending,
    isError,
    isLoading,
  } = useQuery<Exam[]>({
    queryKey: ["examsData"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/register/${session?.user.id}`)
      return data.user.exams
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
    queryKey: ["singleExamData", id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/exams/${id}`)
      return data.exam
    },
  })

  return { exam, isPending, isError, isLoading }
}
