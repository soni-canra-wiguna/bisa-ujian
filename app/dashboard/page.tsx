import { ListExam } from "@/components/exam-comp"
import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import React from "react"

const DashboardPage = () => {
  return (
    <MaxWidthWrapper className="pt-5 flex flex-col gap-6">
      <div className="w-full flex items-center justify-end">
        <Button asChild>
          <Link
            href="/dashboard/create-exam"
            className="flex items-center gap-2"
          >
            create exam <Plus className="" />
          </Link>
        </Button>
      </div>
      <ListExam />
    </MaxWidthWrapper>
  )
}

export default DashboardPage
