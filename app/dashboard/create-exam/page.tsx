import ExamFormPost from "@/components/exam-form"
import MaxWidthWrapper from "@/components/max-width-wrapper"

const ExamsPage = () => {
  return (
    <MaxWidthWrapper className="pt-5 flex flex-col gap-10">
      <ExamFormPost />
    </MaxWidthWrapper>
  )
}

export default ExamsPage
