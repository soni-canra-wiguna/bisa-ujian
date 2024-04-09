import prisma from "@/lib/prismadb"
import { ExamProps } from "@/type"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const exam = await prisma.exam.findUnique({
      where: {
        id,
      },
      include: {
        resultsExam: true,
        questions: {
          include: {
            options: true,
          },
        },
      },
    })

    if (!exam) {
      return NextResponse.json({ message: "exam not found", status: 404 })
    }

    return NextResponse.json({
      message: "exam data retrieval successful",
      exam,
      status: 200,
    })
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await req.json()
    const { title, classroom, date, description, questions }: ExamProps = body

    const updateStudent = await prisma.exam.update({
      where: {
        id,
      },
      data: {
        title,
        date,
        description,
        classroom,
        questions: {
          create: questions.map(
            ({ content, points, correctAnswer, options }) => ({
              content,
              points,
              correctAnswer,
              options: {
                create: options.map(({ content }) => ({
                  content,
                })),
              },
            })
          ),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    })

    if (!updateStudent) {
      return NextResponse.json({
        message: "exam not found, can't updated",
        status: 404,
      })
    }

    return NextResponse.json({
      message: "exam successfully updated.",
      status: 200,
    })
  } catch (error) {
    return NextResponse.json({
      message: "failed to update, something went wrong",
      status: 500,
    })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await prisma.exam.delete({
      where: {
        id,
      },
      include: {
        resultsExam: true,
        questions: {
          include: {
            options: true,
          },
        },
      },
    })

    return NextResponse.json({ status: 200, message: "exam was deleted" })
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "can't deleted, something went wrong",
    })
  }
}
