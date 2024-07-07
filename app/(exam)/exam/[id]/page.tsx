"use client"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Leaderboard from "./_components/leaderboard"
import ExamTest from "./_components/exam-test"
import { useExamData } from "@/hook/use-exam"

const ExamPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabs: any = searchParams.get("tabs")
  const [activeTabs, setActiveTabs] = useState(tabs || "exam")
  const { exam, isPending, isError } = useExamData(id)
  return (
    <MaxWidthWrapper className="mb-32 min-h-screen">
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
          <ExamTest
            id={id}
            exam={exam}
            isPending={isPending}
            isError={isError}
          />
        </TabsContent>
        <TabsContent value="leaderboard" className="mt-10">
          <Leaderboard exam={exam} isPending={isPending} isError={isError} />
        </TabsContent>
      </Tabs>
    </MaxWidthWrapper>
  )
}

export default ExamPage
