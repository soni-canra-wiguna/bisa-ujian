"use client"

// single responsibility principle
import type { Exam } from "@prisma/client"
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
