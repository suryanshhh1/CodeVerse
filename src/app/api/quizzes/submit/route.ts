import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { quizId, score, accuracy, title } = await req.json();
    if (!quizId || score === undefined || accuracy === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const userId = session.user.id;

    // Record quiz result
    await prisma.quizResult.create({
      data: { userId, quizId, score, accuracy }
    });

    // Log Activity
    await prisma.learningHistory.create({
      data: {
        userId,
        action: `Completed Quiz: ${title || 'Topic Quiz'}`,
        type: "quiz",
        targetId: quizId
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to submit quiz:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
