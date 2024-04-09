"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "./ui/button"
import { CalendarIcon, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ExamSchema } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input"
import { inputOptions } from "@/schema/input-options"
import { useState } from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useToast } from "./ui/use-toast"
import LoadingButton from "./loading-button"
import useExamsData from "@/hook/use-exam"
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "./ui/card"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export const CreateExamDialog = () => {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)

  function closeDialog() {
    setIsOpenDialog(false)
  }

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button
          className="gap-2 capitalize shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          buat ujian
          <PlusCircle className="w-4 aspect-square mt-0.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <FormExam closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  )
}

const FormExam = ({ closeDialog }: { closeDialog: () => void }) => {
  const today = new Date()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof ExamSchema>>({
    resolver: zodResolver(ExamSchema),
    defaultValues: {
      title: "",
      description: "",
      classroom: "all",
      date: today,
    },
  })

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: z.infer<typeof ExamSchema>) => {
      await axios.post("/api/exams", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    },
    onSuccess: () => {
      form.reset({
        title: "",
        description: "",
        classroom: "all",
        date: today,
      })

      closeDialog()

      toast({
        title: "ujian ditambahkan.",
        description: "ujian berhasil didi tambahkan!!",
      })

      // router.push("/dashboard/siswa")
      queryClient.invalidateQueries({ queryKey: ["examsData"] })
    },
    onError: () => {
      toast({
        title: "failed to post data",
        description: "failed to post data, see your connection or something.",
        variant: "destructive",
      })
    },
  })

  async function onSubmit(data: z.infer<typeof ExamSchema>) {
    try {
      mutate(data)
    } catch (error) {
      throw new Error("failed to post data")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>judul ujian</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="judul ujian" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>deskripsi ujian</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="deskripsi ujian" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="classroom"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>kelas</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="kelas" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {inputOptions.classrooms.map((value) => (
                        <SelectItem
                          className="uppercase"
                          key={value}
                          value={value}
                        >
                          {value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>
                  pilih kelas yang boleh ikut dalam ujian
                </FormDescription>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>tanggal ujian</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd MMMM yyyy", { locale: id })
                      ) : (
                        <span>tanggal ujian</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      const today = new Date()
                      const nextWeek = new Date(today)
                      nextWeek.setDate(today.getDate() + 7)

                      return date < new Date() || date > nextWeek
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                pilih tanggal berapa ujian akan di laksanakan
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex justify-end items-center gap-4 mt-3">
          <Button
            type="button"
            variant="ghost"
            className="hover:bg-gray-400/20"
            onClick={closeDialog}
          >
            kembali
          </Button>
          <LoadingButton type="submit" loading={isPending} disabled={isPending}>
            tambahkan
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}

export const ListExam = () => {
  const { exams, isPending, isError } = useExamsData()
  const router = useRouter()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {isPending ? (
        <p data-aos="fade-up" data-aos-delay="150">
          loading <Loader2 className="ml-2 h-4 w-4 animate-spin" />
        </p>
      ) : !isError ? (
        exams?.map((exam) => (
          <ExamCard
            key={exam.id}
            title={exam.title}
            description={exam.description}
            id={exam.id}
            classroom={exam.classroom}
            date={exam.date}
          />
        ))
      ) : (
        <div className="flex flex-col gap-3 items-center justify-center w-full">
          <p>waduh error nih, coba refresh lagi deh...</p>
          <Button variant="outline" onClick={() => router.refresh()}>
            refresh
          </Button>
        </div>
      )}
    </div>
  )
}

interface ExamCardProps {
  title: string
  description: string | null
  id: string
  classroom: string | null
  date: Date | null
}

export const ExamCard = ({
  title,
  description,
  id,
  classroom,
  date,
}: ExamCardProps) => {
  //date -> 2024-04-01T17:00:00.000Z
  if (date === null) return
  const formatDate = format(date, "d MMMM yyyy")

  return (
    <Link href={`/exam/${id}`} data-aos="fade-right" data-aos-delay="150">
      <article>
        <Card className="hover:ring-primary/30 hover:ring-2">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            <CardDescription className="uppercase">{classroom}</CardDescription>
          </CardContent>
          <CardFooter>
            <CardDescription>tanggal : {formatDate}</CardDescription>
          </CardFooter>
        </Card>
      </article>
    </Link>
  )
}
