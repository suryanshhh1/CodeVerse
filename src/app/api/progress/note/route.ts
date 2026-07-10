import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const { noteId, noteTitle } = await req.json();
    if (!noteId || !noteTitle) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // 1. Mark Note as Read
    await prisma.noteProgress.upsert({
      where: {
        userId_noteId: { userId, noteId },
      },
      update: {
        isRead: true,
        readAt: new Date()
      },
      create: {
        userId,
        noteId,
        isRead: true,
      }
    });

    // 2. Add to Recent Activity
    await prisma.recentActivity.create({
      data: {
        userId,
        title: `Read Note: ${noteTitle}`,
        type: "note"
      }
    });

    // 3. Update Learning Stats (Add some time)
    // Assume 15 minutes of study time for a note
    await prisma.learningStats.upsert({
      where: { userId },
      update: {
        totalStudyTimeMs: { increment: 900000 }
      },
      create: {
        userId,
        totalStudyTimeMs: 900000
      }
    });

    // 4. Update Streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const streak = await prisma.learningStreak.findUnique({ where: { userId } });
    if (streak) {
      const lastStudy = streak.lastStudyDate ? new Date(streak.lastStudyDate) : null;
      if (lastStudy) lastStudy.setHours(0, 0, 0, 0);

      if (!lastStudy || lastStudy < today) {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        let newStreak = 1;
        if (lastStudy && lastStudy.getTime() === yesterday.getTime()) {
          newStreak = streak.currentStreak + 1;
        }

        await prisma.learningStreak.update({
          where: { userId },
          data: {
            currentStreak: newStreak,
            longestStreak: Math.max(streak.longestStreak, newStreak),
            lastStudyDate: new Date()
          }
        });
      }
    } else {
      await prisma.learningStreak.create({
        data: {
          userId,
          currentStreak: 1,
          longestStreak: 1,
          lastStudyDate: new Date()
        }
      });
    }

    return NextResponse.json({ message: "Note marked as read" }, { status: 200 });

  } catch (error: any) {
    console.error("Progress error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
