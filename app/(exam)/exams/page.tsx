import { ListExam } from "@/components/exam-comp"
import MaxWidthWrapper from "@/components/max-width-wrapper"
import { GlowCapture, Glow } from "@codaworks/react-glow"
import {Card} from "@/components/ui/card"

const ExamsPage = () => {
  return (
    <MaxWidthWrapper className="pt-5">
      <ListExam />
      {/* <GlowCapture>
        <Glow color="hsl(338.69 100% 48.04%)">
          <Card className="w-[400px] aspect-video cursor-pointer glow:bg-orange-400/10">
            This will glow pink when the mouse is passed over
          </Card>
        </Glow>
      </GlowCapture> */}
    </MaxWidthWrapper>
  )
}

export default ExamsPage
