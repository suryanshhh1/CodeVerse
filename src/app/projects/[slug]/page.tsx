import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProjectClient from "./ProjectClient";
import { auth } from "@/lib/auth";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: `${project.title} | Projects | CodeVerse`,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();

  const project = await prisma.project.findUnique({
    where: { slug }
  });

  if (!project) {
    notFound();
  }

  let isCompleted = false;
  let isBookmarked = false;

  if (session?.user?.id) {
    const progress = await prisma.projectProgress.findUnique({
      where: { userId_projectId: { userId: session.user.id, projectId: project.id } }
    });
    isCompleted = !!progress?.completed;

    const bookmark = await prisma.bookmark.findUnique({
      where: { userId_itemType_itemId: { userId: session.user.id, itemType: "Project", itemId: project.id } }
    });
    isBookmarked = !!bookmark;
  }

  return (
    <ProjectClient 
      project={project} 
      initialCompleted={isCompleted} 
      initialBookmarked={isBookmarked}
      isLoggedIn={!!session?.user?.id}
    />
  );
}
