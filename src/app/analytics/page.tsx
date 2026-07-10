import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import AnalyticsClient from "./AnalyticsClient";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Learning Analytics | CodeVerse",
  description: "Track your learning progress and statistics.",
};

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  // Pre-fetch data or fetch client-side. We can fetch it client side since there's a lot.
  // Actually, let's fetch it on the server and pass as initialData
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
      take: 10
    })
  ]);

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

  const analytics = await prisma.analytics.upsert({
    where: { userId },
    update: {},
    create: {
      userId,
      studyTimeDaily: [
        { name: "Mon", time: 30 },
        { name: "Tue", time: 45 },
        { name: "Wed", time: 60 },
        { name: "Thu", time: 20 },
        { name: "Fri", time: 90 },
        { name: "Sat", time: 120 },
        { name: "Sun", time: 60 }
      ],
      activityMonthly: [
        { name: "Jan", activity: 10 },
        { name: "Feb", activity: 20 },
        { name: "Mar", activity: 15 },
        { name: "Apr", activity: 30 }
      ],
      weakestTopics: ["Dynamic Programming", "Graphs"],
      strongestTopics: ["Arrays", "Strings"],
      favoriteCategories: ["Frontend", "Data Structures"]
    }
  });

  return (
    <AnalyticsClient 
      initialData={{
        stats: stats || { totalStudyTimeMs: 0, completedTopics: 0, completedRoadmaps: 0, averageQuizScore: 0 },
        streak: streak || { currentStreak: 0, longestStreak: 0 },
        calendar,
        analytics,
        history
      }} 
    />
  );
}
