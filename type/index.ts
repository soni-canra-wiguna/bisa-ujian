import { Answer, Exam, Question } from "@prisma/client"

export interface QuestionProps extends Question {
  options: Answer[]
}

export interface ExamProps extends Exam {
  questions: QuestionProps[]
}
