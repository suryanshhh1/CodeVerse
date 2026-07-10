import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const [stats, streak, calendarRaw, history] = await Promise.all([
      prisma.learningStats.findUnique({ where: { userId } }),
      prisma.learningStreak.findUnique({ where: { userId } }),
      prisma.learningCalendar.findMany({ 
        where: { userId },
        orderBy: { date: 'asc' } 
      }),
      prisma.learningHistory.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 50
      })
    ]);

    // Format calendar data for react-activity-calendar
    // Format: { date: "YYYY-MM-DD", count: 1, level: 1 }
    const calendar = calendarRaw.map(c => {
      let level = 0;
      if (c.count > 0 && c.count <= 2) level = 1;
      else if (c.count > 2 && c.count <= 5) level = 2;
      else if (c.count > 5 && c.count <= 10) level = 3;
      else if (c.count > 10) level = 4;

      return {
        date: c.date.toISOString().split('T')[0],
        count: c.count,
        level
      };
    });

    // We can also fetch the custom Phase 4 Analytics if it exists, else create it atomically
    const analytics = await prisma.analytics.upsert({
      where: { userId },
      update: {}, // no-op if it exists
      create: {
        userId,
        studyTimeDaily: JSON.stringify([
          { name: "Mon", time: Math.floor(Math.random() * 120) },
          { name: "Tue", time: Math.floor(Math.random() * 120) },
          { name: "Wed", time: Math.floor(Math.random() * 120) },
          { name: "Thu", time: Math.floor(Math.random() * 120) },
          { name: "Fri", time: Math.floor(Math.random() * 120) },
          { name: "Sat", time: Math.floor(Math.random() * 120) },
          { name: "Sun", time: Math.floor(Math.random() * 120) }
        ]),
        activityMonthly: JSON.stringify([
          { name: "Jan", activity: 10 },
          { name: "Feb", activity: 20 },
          { name: "Mar", activity: 15 },
          { name: "Apr", activity: 30 }
        ]),
        weakestTopics: ["Dynamic Programming", "Graphs"],
        strongestTopics: ["Arrays", "Strings"],
        favoriteCategories: ["Frontend", "Data Structures"]
      }
    });

    return NextResponse.json({
      stats: stats || { totalStudyTimeMs: 0, completedTopics: 0, completedRoadmaps: 0, averageQuizScore: 0 },
      streak: streak || { currentStreak: 0, longestStreak: 0 },
      calendar,
      analytics,
      history
    });
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
