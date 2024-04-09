"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Leaderboard from "./leaderboard"
import ExamTest from "./exam-test"
import { useExamData } from "@/hook/use-exam"
import { ExamProps } from "@/type"
import { Result } from "@prisma/client"

export interface ExamType {
  exam:
    | (ExamProps & {
        resultsExam?: Result[] | undefined
      })
    | undefined
  isPending: boolean
  isError: boolean
}

const ExamComp = ({ id }: { id: string }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabs: any = searchParams.get("tabs")
  const [activeTabs, setActiveTabs] = useState(tabs || "exam")
  const { exam, isPending, isError } = useExamData(id)

  return (
    <Tabs
      defaultValue={activeTabs}
      // @ts-ignore
      onChangeValue={(value: any) => setActiveTabs(value)}
    >
      <div className="flex items-center justify-center w-full">
        <TabsList className="w-full max-w-max">
          <TabsTrigger onClick={() => router.push("?tabs=exam")} value="exam">
            exam
          </TabsTrigger>
          <TabsTrigger
            onClick={() => router.push("?tabs=leaderboard")}
            value="leaderboard"
          >
            leaderboard
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="exam" className="mt-10">
        <ExamTest id={id} exam={exam} isPending={isPending} isError={isError} />
      </TabsContent>
      <TabsContent value="leaderboard" className="mt-10">
        <Leaderboard exam={exam} isPending={isPending} isError={isError} />
      </TabsContent>
    </Tabs>
  )
}

export default ExamComp
