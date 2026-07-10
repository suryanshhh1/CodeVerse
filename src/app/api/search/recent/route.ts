import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ recent: [] });
    }

    const recent = await prisma.recentSearch.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
      distinct: ['query']
    });

    return NextResponse.json({ recent: recent.map(r => r.query) });
  } catch (error) {
    console.error("Failed to fetch recent searches:", error);
    return NextResponse.json({ recent: [] });
  }
}
