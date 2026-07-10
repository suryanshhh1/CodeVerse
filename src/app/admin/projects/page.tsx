import { prisma } from "@/lib/prisma";
import ProjectsCMSClient from "./ProjectsCMSClient";

export const metadata = {
  title: "Projects CMS | Admin",
};

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" }
  });

  return <ProjectsCMSClient initialProjects={projects} />;
}
