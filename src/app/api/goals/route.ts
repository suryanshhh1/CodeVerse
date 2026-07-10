import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const goals = await prisma.learningGoal.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ goals });
  } catch (error) {
    console.error("Failed to fetch goals:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, target, deadline } = await req.json();
    if (!title || !target) {
      return NextResponse.json({ error: "Title and target are required" }, { status: 400 });
    }

    const goal = await prisma.learningGoal.create({
      data: {
        userId: session.user.id,
        title,
        description,
        target: parseInt(target),
        current: 0,
        deadline: deadline ? new Date(deadline) : null,
      }
    });

    return NextResponse.json({ goal });
  } catch (error) {
    console.error("Failed to create goal:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
