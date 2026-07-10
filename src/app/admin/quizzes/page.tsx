import { prisma } from "@/lib/prisma";
import QuizzesCMSClient from "./QuizzesCMSClient";

export const metadata = {
  title: "Quizzes CMS | Admin",
};

export default async function AdminQuizzesPage() {
  const quizzes = await prisma.quiz.findMany({
    include: {
      topic: true,
    },
    orderBy: { createdAt: "desc" }
  });

  return <QuizzesCMSClient initialQuizzes={quizzes} />;
}
