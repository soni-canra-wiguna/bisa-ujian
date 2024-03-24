import React from "react"
import { ThemeToggle } from "../theme-toggle"
import MaxWidthWrapper from "../max-width-wrapper"

const Navbar = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex items-center justify-between pt-10 pb-20">
        <h1
          className="font-grostekMd font-medium text-lg underline underline-offset-2 decoration-primary -rotate-6"
          data-aos="fade-up"
        >
          Bisa Ujian
        </h1>
        <ThemeToggle />
      </div>
    </MaxWidthWrapper>
  )
}

export default Navbar
