import * as z from "zod"
import { inputOptions } from "./input-options"

const CLASSROOMS = inputOptions.classrooms.map((option) => option)

export const ExamSchema = z.object({
  title: z.string().min(6),
  description: z.string().optional(),
  classroom: z.enum([CLASSROOMS[0], ...CLASSROOMS]),
  date: z.date({
    required_error: "tanggal ujian wajib di isi",
  }),
})
