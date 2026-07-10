import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProblemClient from "./ProblemClient";
import { auth } from "@/lib/auth";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const problem = await prisma.problem.findUnique({ where: { slug } });
  
  if (!problem) return { title: "Problem Not Found" };
  
  return {
    title: `${problem.title} | Practice | CodeVerse`,
  };
}

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();

  const problem = await prisma.problem.findUnique({
    where: { slug },
    include: {
      topic: true
    }
  });

  if (!problem) {
    notFound();
  }

  let isSolved = false;
  let isBookmarked = false;

  if (session?.user?.id) {
    const solved = await prisma.solvedProblem.findUnique({
      where: { userId_problemId: { userId: session.user.id, problemId: problem.id } }
    });
    isSolved = !!solved;

    const bookmark = await prisma.bookmark.findUnique({
      where: { userId_itemType_itemId: { userId: session.user.id, itemType: "Problem", itemId: problem.id } }
    });
    isBookmarked = !!bookmark;
  }

  return (
    <ProblemClient 
      problem={problem} 
      initialSolved={isSolved} 
      initialBookmarked={isBookmarked}
      isLoggedIn={!!session?.user?.id}
    />
  );
}
