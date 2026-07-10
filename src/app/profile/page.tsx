import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import ProfileClient from "./ProfileClient";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile | CodeVerse",
  description: "Your personal CodeVerse profile.",
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const [userProfile, achievements, goals, stats, streak] = await Promise.all([
    prisma.userProfile.findUnique({ where: { userId } }),
    prisma.achievement.findMany({ where: { userId }, orderBy: { unlockedAt: 'desc' } }),
    prisma.learningGoal.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 3 }),
    prisma.learningStats.findUnique({ where: { userId } }),
    prisma.learningStreak.findUnique({ where: { userId } })
  ]);

  const profileData = {
    user: session.user,
    profile: userProfile,
    achievements,
    goals,
    stats,
    streak
  };

  return <ProfileClient initialData={profileData} />;
}
