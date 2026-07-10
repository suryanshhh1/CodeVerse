import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { itemId, itemType } = await req.json();
    if (!itemId || !itemType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const userId = session.user.id;

    // Check if exists
    const existing = await prisma.bookmark.findUnique({
      where: { userId_itemType_itemId: { userId, itemType, itemId } }
    });

    if (existing) {
      await prisma.bookmark.delete({ where: { id: existing.id } });
      return NextResponse.json({ action: "removed" });
    } else {
      await prisma.bookmark.create({
        data: { userId, itemType, itemId }
      });
      return NextResponse.json({ action: "added" });
    }
  } catch (error) {
    console.error("Failed to toggle bookmark:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
