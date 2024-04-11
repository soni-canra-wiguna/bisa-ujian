import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"

export const useUserClient = () => {
  const { data: session } = useSession()
  return session
}

export const useUserServer = async () => {
  const session = await getServerSession(authOptions)
  return session?.user
}
