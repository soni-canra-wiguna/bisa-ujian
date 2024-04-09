import prisma from "@/lib/prismadb"
import { Result } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name,
      classroom,
      noAbsen,
      wrongAnswer,
      correctAnswer,
      totalQuestion,
      timeRemainings,
      examId,
    }: Result = body

    const isExam = await prisma.exam.findFirst({
      where: {
        id: examId,
      },
    })

    if (!isExam) {
      return NextResponse.json({
        status: 400,
        message: "cannot post result exam, exam not found",
      })
    }

    await prisma.result.create({
      data: {
        name,
        classroom,
        noAbsen,
        wrongAnswer,
        correctAnswer,
        totalQuestion,
        timeRemainings,
        exam: { connect: { id: examId } },
      },
    })

    return NextResponse.json({
      status: 201,
      message: "result created",
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: 500,
      message: "internal server error",
    })
  }
}
