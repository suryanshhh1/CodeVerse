import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import GoalsClient from "./GoalsClient";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Learning Goals | CodeVerse",
  description: "Set and track your learning goals.",
};

export default async function GoalsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const goals = await prisma.learningGoal.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  });

  return <GoalsClient initialGoals={goals} />;
}
