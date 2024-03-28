import prisma from "@/lib/prismadb"
import { ExamProps } from "@/type"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, date, description, classroom, questions }: ExamProps = body

    await prisma.exam.create({
      data: {
        title,
        date,
        description,
        classroom,
        questions: {
          create: questions.map(({ content, points, options }) => ({
            content,
            points,
            options: {
              create: options.map(({ content, isCorrectAnswer }) => ({
                content,
                isCorrectAnswer,
              })),
            },
          })),
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

    return NextResponse.json({
      status: 201,
      message: "exam created",
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: 500,
      message: error,
    })
  }
}

export async function GET(req: NextRequest) {
  try {
    const exams = await prisma.exam.findMany({
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const query = req.nextUrl.searchParams.get("query")
    const decodeQuery = query?.replace(/-/g, " ").toLowerCase()

    if (query) {
      const findExamByQuery = await prisma.exam.findMany({
        where: {
          title: {
            contains: decodeQuery,
          },
        },
      })

      return NextResponse.json({
        message: "exam here",
        exam: findExamByQuery,
        status: 200,
      })
    } else {
      if (exams.length > 0) {
        return NextResponse.json({
          message: "Data retrieved successfully",
          exams,
          status: 200,
        })
      } else {
        return NextResponse.json({
          message: "data nof found",
          status: 404,
        })
      }
    }
  } catch (error) {
    return NextResponse.json({
      message: "failed to fetch data, see your connection",
      status: 500,
    })
  }
}
