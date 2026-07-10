import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { problemId, code, language, title } = await req.json();
    if (!problemId || !title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const userId = session.user.id;

    // Record solved problem
    await prisma.solvedProblem.upsert({
      where: { userId_problemId: { userId, problemId } },
      update: { code, language },
      create: { userId, problemId, code, language }
    });

    // Log Activity
    await prisma.learningHistory.create({
      data: {
        userId,
        action: `Solved ${title}`,
        type: "problem",
        targetId: problemId
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to mark problem as solved:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
