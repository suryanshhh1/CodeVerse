import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const achievements = await prisma.achievement.findMany({
      where: { userId: session.user.id },
      orderBy: { unlockedAt: 'desc' }
    });

    return NextResponse.json({ achievements });
  } catch (error) {
    console.error("Failed to fetch achievements:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
