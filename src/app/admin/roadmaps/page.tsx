import { prisma } from "@/lib/prisma";
import RoadmapsCMSClient from "./RoadmapsCMSClient";

export const metadata = {
  title: "Roadmaps CMS | Admin",
};

export default async function AdminRoadmapsPage() {
  const roadmaps = await prisma.roadmap.findMany({
    include: {
      nodes: true,
    },
    orderBy: { createdAt: "desc" }
  });

  return <RoadmapsCMSClient initialRoadmaps={roadmaps} />;
}
