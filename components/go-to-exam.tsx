"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { ArrowRightIcon, Copy } from "lucide-react"
import { Input } from "./ui/input"
import { ChangeEvent } from "react"
import CustomTooltip from "./custom-tooltip"
import { toast } from "./ui/use-toast"

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

  const copyExampleKey = () => {
    navigator.clipboard.writeText("6618e0156e7a54633f88438c")
    toast({
      title: "copied example key!",
    })
  }

  return (
    <div className="flex items-center gap-4 sm:max-w-sm lg:max-w-md mx-auto w-full">
      <div className="flex items-center gap-4 relative flex-1">
        <Input
          value={url}
          placeholder="masukkan key"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
          className="border-x-0 border-t-0 border-b focus-visible:ring-0 focus-visible:ring-transparent focus:border-primary focus:bg-primary/10 rounded-md pl-4 pr-10 focus:shadow-lg focus:shadow-primary/20"
        />
        {
          !disableButton && <button
          disabled={disableButton}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-max rounded-md p-2 hover:bg-primary/40 transition-all duration-300 disabled:cursor-not-allowed"
        >
          <Link href={`/exam/${url}`} className="flex items-center gap-2">
            <ArrowRightIcon className="size-4 text-foreground" />
          </Link>
        </button>
        }
      </div>
      <CustomTooltip message="copy example key">
        <Button
          onClick={copyExampleKey}
          className="flex items-center justify-center bg-transparent hover:bg-primary/10 border hover:border-primary/40 group transition-all duration-300"
          size="icon"
        >
          <Copy className="size-4 text-foreground group-hover:text-primary transition-all duration-300" />
        </Button>
      </CustomTooltip>
    </div>
  )
}

export default GoToExam
