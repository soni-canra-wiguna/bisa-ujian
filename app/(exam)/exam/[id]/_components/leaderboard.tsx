import Image from "next/image"
import badge1st from "@/public/badge-1st.png"
import badge2nd from "@/public/badge-2nd.png"
import badge3rd from "@/public/badge-3rd.png"
import { ExamType } from "./index"
import { Result } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { format } from "date-fns"
import { SecondsToTimeMinutes } from "@/lib/seconds-to-time"

const Leaderboard = ({ exam, isPending, isError }: ExamType) => {
  const sortDataByCorrectAnswerAndTimeRemainings = exam?.resultsExam?.sort(
    // @ts-ignore
    (a, b) => {
      if (a.correctAnswer > b.correctAnswer) return -1
      if (a.correctAnswer < b.correctAnswer) return 1
      if (
        a.correctAnswer === b.correctAnswer &&
        a.timeRemainings < b.timeRemainings
      ) {
        // di compare time remaining pake <, semakin kecil data maka data akan ada di atas
        return -1
      }
      if (
        a.correctAnswer === b.correctAnswer &&
        a.timeRemainings > b.timeRemainings
      ) {
        return 1
      }
    }
  )

  return (
    <>
      {isPending ? (
        <div className="w-full items-center flex justify-center lg:mt-10">
          <Loader2 strokeWidth={3} className="animate-spin w-10 h-10" />
        </div>
      ) : isError ? (
        <div className="w-full items-center flex justify-center lg:mt-10">
          error
        </div>
      ) : (
        <div className="w-full h-full overflow-x-auto">
          <table className="border max-w-6xl w-full">
            <thead>
              <tr className=" bg-muted-foreground/20">
                <th
                  scope="col"
                  className="border p-4 text-center capitalize font-grostekRg tracking-wide"
                >
                  rank
                </th>
                <th
                  scope="col"
                  className="border p-4 w-[270px] text-left capitalize font-grostekRg tracking-wide"
                >
                  nama peserta
                </th>
                <th
                  scope="col"
                  className="border p-4 text-left capitalize font-grostekRg tracking-wide"
                >
                  kelas
                </th>
                <th
                  scope="col"
                  className="border p-4 text-center capitalize font-grostekRg tracking-wide"
                >
                  jawaban
                </th>
                <th
                  scope="col"
                  className="border p-4 text-center capitalize font-grostekRg tracking-wide"
                >
                  waktu pengerjaan
                </th>
                <th
                  scope="col"
                  className="border p-4 text-center capitalize font-grostekRg tracking-wide"
                >
                  tanggal
                </th>
              </tr>
            </thead>
            <tbody>
              {sortDataByCorrectAnswerAndTimeRemainings?.map(
                (
                  {
                    name,
                    classroom,
                    noAbsen,
                    correctAnswer,
                    wrongAnswer,
                    totalQuestion,
                    updatedAt,
                    createdAt,
                    timeRemainings,
                  },
                  index
                ) => {
                  const indexFromOne = index + 1
                  const formatDate = format(createdAt, "dd/MM/yyyy")
                  return (
                    <tr
                      key={indexFromOne}
                      className={`${
                        indexFromOne % 2 === 0 && "bg-muted-foreground/10"
                      }`}
                    >
                      <td
                        scope="col"
                        className="border p-4 text-center font-grostekNormal relative"
                      >
                        {indexFromOne === 1 ? (
                          <Image
                            src={badge1st}
                            alt="bagde juara 1"
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10"
                          />
                        ) : indexFromOne === 2 ? (
                          <Image
                            src={badge2nd}
                            alt="bagde juara 2"
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10"
                          />
                        ) : indexFromOne === 3 ? (
                          <Image
                            src={badge3rd}
                            alt="bagde juara 3"
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10"
                          />
                        ) : (
                          indexFromOne
                        )}
                      </td>
                      <td
                        scope="col"
                        className="border p-4 text-left font-grostekNormal capitalize"
                      >
                        {name}
                      </td>
                      <td
                        scope="col"
                        className="border p-4 text-left font-grostekNormal uppercase"
                      >
                        {classroom}
                      </td>
                      <td
                        scope="col"
                        className="border p-4 text-center font-grostekNormal"
                      >
                        {correctAnswer} / {totalQuestion}
                      </td>
                      <td
                        scope="col"
                        className="border p-4 text-center font-grostekNormal"
                      >
                        {SecondsToTimeMinutes(timeRemainings)}
                      </td>
                      <td
                        scope="col"
                        className="border p-4 text-center font-grostekNormal"
                      >
                        {formatDate}
                      </td>
                    </tr>
                  )
                }
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default Leaderboard
