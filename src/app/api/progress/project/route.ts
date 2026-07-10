import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { projectId, title } = await req.json();
    if (!projectId || !title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const userId = session.user.id;

    // Record completed project
    await prisma.projectProgress.upsert({
      where: { userId_projectId: { userId, projectId } },
      update: { completed: true },
      create: { userId, projectId, completed: true }
    });

    // Log Activity
    await prisma.learningHistory.create({
      data: {
        userId,
        action: `Completed Project: ${title}`,
        type: "project",
        targetId: projectId
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to mark project as completed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
