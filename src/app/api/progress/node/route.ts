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

    const { nodeId, roadmapId, nodeTitle } = await req.json();
    if (!nodeId || !roadmapId || !nodeTitle) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // 1-3. Mark Node, Add Activity, and Update Stats in parallel
    const [progress] = await Promise.all([
      prisma.nodeProgress.upsert({
        where: { userId_nodeId: { userId, nodeId } },
        update: { completed: true, completedAt: new Date() },
        create: { userId, nodeId, completed: true }
      }),
      prisma.recentActivity.create({
        data: { userId, title: `Completed: ${nodeTitle}`, type: "roadmap" }
      }),
      prisma.learningStats.upsert({
        where: { userId },
        update: { completedTopics: { increment: 1 }, totalStudyTimeMs: { increment: 7200000 } },
        create: { userId, completedTopics: 1, totalStudyTimeMs: 7200000 }
      })
    ]);

    // 4. Update Streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const streak = await prisma.learningStreak.findUnique({ where: { userId } });
    if (streak) {
      const lastStudy = streak.lastStudyDate ? new Date(streak.lastStudyDate) : null;
      if (lastStudy) lastStudy.setHours(0, 0, 0, 0);

      if (!lastStudy || lastStudy < today) {
        // Did not study today yet, check if studied yesterday
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

    // 5. Update Roadmap Progress Pct
    const [allNodes, completedNodes] = await Promise.all([
      prisma.roadmapNode.count({ where: { roadmapId } }),
      prisma.nodeProgress.count({ 
        where: { userId, node: { roadmapId }, completed: true } 
      })
    ]);
    const pct = allNodes > 0 ? (completedNodes / allNodes) * 100 : 0;

    await prisma.roadmapProgress.upsert({
      where: { userId_roadmapId: { userId, roadmapId } },
      update: {
        progressPct: pct,
        completed: pct === 100
      },
      create: {
        userId,
        roadmapId,
        progressPct: pct,
        completed: pct === 100
      }
    });

    if (pct === 100) {
      await prisma.learningStats.update({
        where: { userId },
        data: { completedRoadmaps: { increment: 1 } }
      });
    }

    return NextResponse.json({ message: "Progress updated successfully", progressPct: pct }, { status: 200 });

  } catch (error: any) {
    console.error("Progress error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
