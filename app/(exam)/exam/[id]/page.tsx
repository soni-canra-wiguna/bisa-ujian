import MaxWidthWrapper from "@/components/max-width-wrapper"
import ExamComp from "./_components"

const ExamPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  return (
    <MaxWidthWrapper className="mb-32">
      <ExamComp id={id} />
    </MaxWidthWrapper>
  )
}

export default ExamPage
