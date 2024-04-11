import { useUserServer } from "@/hook/use-user"
import SignInForm from "../_components/signin-form"
import { redirect } from "next/navigation"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In untuk buat soal ujian",
}

const SignInPage = async () => {
  const session = await useUserServer()
  if (session) {
    redirect("/")
  }
  return <SignInForm />
}

export default SignInPage
