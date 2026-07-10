import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import RoadmapClient from "./RoadmapClient";

export default async function RoadmapDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const roadmap = await prisma.roadmap.findUnique({
    where: { slug: resolvedParams.id },
    include: {
      nodes: {
        orderBy: { order: 'asc' }
      }
    }
  });

  if (!roadmap) {
    notFound();
  }

  const session = await auth();
  let completedNodeIds: string[] = [];

  if (session?.user?.id) {
    const progress = await prisma.nodeProgress.findMany({
      where: {
        userId: session.user.id,
        node: { roadmapId: roadmap.id },
        completed: true
      }
    });
    completedNodeIds = progress.map(p => p.nodeId);
  }

  return (
    <RoadmapClient 
      roadmap={roadmap} 
      initialCompletedNodes={completedNodeIds} 
      isLoggedIn={!!session?.user?.id}
    />
  );
}
