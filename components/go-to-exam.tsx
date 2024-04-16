"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { Input } from "./ui/input"
import { ChangeEvent } from "react"

const GoToExam = () => {
  const [url, setUrl] = useState<string>("")
  const [disableButton, setDisableButton] = useState<boolean>(false)

  useEffect(() => {
    if (url === "" || url?.length <= 5) {
      setDisableButton(true)
    } else {
      setDisableButton(false)
    }
  }, [url])

  return (
    <div className="flex items-center sm:max-w-sm lg:max-w-md mx-auto w-full gap-4">
      <Input
        value={url}
        placeholder="masukkan key"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
        className="border-x-0 border-t-0 border-b rounded-none focus-visible:ring-0 focus-visible:ring-transparent focus:border-primary p-0"
      />
      <Button
        disabled={disableButton}
        className="gap-2 capitalize shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all"
      >
        <Link href={`/exam/${url}`} className="flex items-center gap-2">
          mulai ujian
          <ArrowRight className="w-4 aspect-square mt-0.5" />
        </Link>
      </Button>
    </div>
  )
}

export default GoToExam
