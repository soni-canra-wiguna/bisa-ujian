import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import AOSInit from "@/components/aos"
import TanstackProvider from "@/components/tanstask-provider"
import NextTopLoader from "nextjs-toploader"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "bisa ujian",
  description: "flatform yang mempermudah siswa dalam melakukan ujian",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* <AOSInit /> */}
      <TanstackProvider>
        <body className={`${inter.className} relative min-h-screen h-full`}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <div className="absolute top-0 z-[-2] h-screen w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,155,80,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,155,80,0.2),rgba(255,255,255,0))]" />
            <Navbar />
            <NextTopLoader color="#f97316" height={3} showSpinner={false} />
            <main className="w-full h-full">{children}</main>
          </ThemeProvider>
          <Toaster />
        </body>
      </TanstackProvider>
    </html>
  )
}
