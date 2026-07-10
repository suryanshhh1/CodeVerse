import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import DSATopicClient from "./DSATopicClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = await prisma.dSATopic.findUnique({ where: { slug } });
  
  if (!topic) return { title: "Topic Not Found" };
  
  return {
    title: `${topic.name} | CodeVerse DSA`,
    description: topic.description,
  };
}

export default async function DSATopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const topic = await prisma.dSATopic.findUnique({
    where: { slug },
    include: {
      problems: {
        orderBy: { difficulty: 'asc' }
      },
      quizzes: true,
    }
  });

  if (!topic) {
    notFound();
  }

  return <DSATopicClient topic={topic} />;
}
