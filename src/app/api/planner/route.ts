import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const planners = await prisma.studyPlanner.findMany({
      where: { userId: session.user.id },
      include: {
        tasks: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ planners });
  } catch (error) {
    console.error("Failed to fetch planners:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, startDate, endDate } = await req.json();
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const planner = await prisma.studyPlanner.create({
      data: {
        userId: session.user.id,
        title,
        description,
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: endDate ? new Date(endDate) : null,
      },
      include: { tasks: true }
    });

    return NextResponse.json({ planner });
  } catch (error) {
    console.error("Failed to create planner:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
