import { CreateExamDialog, ListExam } from "@/components/exam-comp"
import ExamFormPost from "@/components/exam-form"
import MaxWidthWrapper from "@/components/max-width-wrapper"

const ExamsPage = () => {
  return (
    <MaxWidthWrapper className="pt-5 flex flex-col gap-10">
      {/* <div className="w-full flex items-center justify-end">
        <CreateExamDialog />
      </div>
      <ListExam /> */}
      <ExamFormPost />
    </MaxWidthWrapper>
  )
}

export default ExamsPage
