import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch all user stats from Database in parallel to drastically improve Time to First Byte
  const [
    userStats,
    userStreak,
    recentActs,
    learningCalendar,
    incompleteNotes,
    solvedProblemsCount,
    completedProjectsCount,
    learningHistories
  ] = await Promise.all([
    prisma.learningStats.findUnique({ where: { userId: session.user.id } }),
    prisma.learningStreak.findUnique({ where: { userId: session.user.id } }),
    prisma.recentActivity.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5
    }),
    prisma.learningCalendar.findMany({
      where: { userId: session.user.id },
      orderBy: { date: "asc" }
    }),
    prisma.noteProgress.findMany({
      where: { userId: session.user.id, isRead: false },
      include: { note: true },
      take: 2
    }),
    prisma.solvedProblem.count({ where: { userId: session.user.id } }),
    prisma.projectProgress.count({ where: { userId: session.user.id, completed: true } }),
    prisma.learningHistory.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5
    })
  ]);

  // Format calendar for react-activity-calendar
  const calendarData = learningCalendar.map(c => ({
    date: c.date.toISOString().split('T')[0],
    count: c.count,
    level: Math.min(4, Math.ceil(c.count / 2))
  }));

  const continueLearning = incompleteNotes.map(n => ({
    id: n.note.id,
    title: n.note.title,
    category: "Notes",
    link: `/notes/${n.note.slug}`
  }));

  // Calculate streaks logic if they studied today
  let currentStreak = userStreak?.currentStreak || 0;
  const longestStreak = userStreak?.longestStreak || 0;
  
  if (userStreak?.lastStudyDate) {
    const today = new Date();
    const lastDate = new Date(userStreak.lastStudyDate);
    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
      currentStreak = 0; // Streak broken
    }
  }

  // Calculate XP and Level
  const studyMinutes = userStats ? Math.floor(Number(userStats.totalStudyTimeMs) / 60000) : 0;
  const completedTopicsCount = userStats?.completedTopics || 0;
  const xp = (studyMinutes * 2) + (completedTopicsCount * 50) + (solvedProblemsCount * 100) + (completedProjectsCount * 500);
  const level = Math.floor(Math.sqrt(xp / 100)) + 1;
  const xpForNextLevel = Math.pow(level, 2) * 100;
  const currentLevelXp = Math.pow(level - 1, 2) * 100;
  const levelProgress = Math.max(0, Math.min(100, Math.floor(((xp - currentLevelXp) / (xpForNextLevel - currentLevelXp)) * 100)));

  const mappedStats = {
    totalStudyTimeHours: userStats ? Math.floor(Number(userStats.totalStudyTimeMs) / (1000 * 60 * 60)) : 0,
    completedTopics: completedTopicsCount,
    completedRoadmaps: userStats?.completedRoadmaps || 0,
    averageQuizScore: userStats?.averageQuizScore || 0,
    solvedProblemsCount,
    completedProjectsCount,
    xp,
    level,
    levelProgress
  };

  const mappedStreak = {
    currentStreak,
    longestStreak,
  };

  // Combine recent Acts and Learning History
  const allActs = [
    ...recentActs.map(a => ({ title: a.title, type: a.type, createdAt: a.createdAt })),
    ...learningHistories.map(a => ({ title: a.action, type: a.type, createdAt: a.createdAt }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const formattedActivities = allActs.map(act => {
    const diffMs = Date.now() - new Date(act.createdAt).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    let timeStr = "Just now";
    if (diffDays > 0) timeStr = `${diffDays}d ago`;
    else if (diffHours > 0) timeStr = `${diffHours}h ago`;
    else if (diffMins > 0) timeStr = `${diffMins}m ago`;

    return {
      title: act.title,
      time: timeStr,
      type: act.type
    };
  });

  return (
    <DashboardClient 
      user={{ name: session.user.name || "", email: session.user.email || "" }}
      stats={mappedStats}
      streak={mappedStreak}
      recentActivities={formattedActivities}
      calendarData={calendarData}
      continueLearning={continueLearning}
    />
  );
}
