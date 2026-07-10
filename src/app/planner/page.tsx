import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PlannerClient from "./PlannerClient";
import { redirect } from "next/navigation";

export default async function PlannerPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch user's planners
  const planners = await prisma.studyPlanner.findMany({
    where: { userId: session.user.id },
    include: {
      tasks: {
        orderBy: { order: "asc" }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  // If they don't have a planner, we'll create a default one in the UI later
  return <PlannerClient initialPlanners={planners} />;
}
