import * as z from "zod"
import { inputOptions } from "./input-options"

const CLASSROOMS = inputOptions.classrooms.map((option) => option)
const ROLES = inputOptions.role.map((option) => option)

export const ExamSchema = z.object({
  title: z.string().min(6),
  description: z.string().optional(),
  classroom: z.enum([CLASSROOMS[0], ...CLASSROOMS]),
  date: z.date({
    required_error: "tanggal ujian wajib di isi",
  }),
})

export const SignInSchema = z.object({
  email: z.string().email().min(1, {
    message: "email is required",
  }),
  password: z.string().min(1, {
    message: "password is required",
  }),
})

export const RegisterFormSchema = z.object({
  image: z.string().optional(),
  username: z.string().min(1, {
    message: "username is required",
  }),
  email: z.string().email().min(1, {
    message: "email is required",
  }),
  password: z.string().optional(),
  role: z.enum([ROLES[0], ...ROLES]),
})
