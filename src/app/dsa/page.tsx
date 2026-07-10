import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";
import Link from "next/link";
import DSAVisualizerBanner from "./DSAVisualizerBanner";

export const metadata = {
  title: "Data Structures & Algorithms | CodeVerse",
  description: "Master the fundamentals of computer science with interactive visualizations, code examples, and practice problems.",
};

export default async function DSAPage() {
  const topics = await prisma.dSATopic.findMany({
    orderBy: { order: "asc" },
    include: {
      _count: {
        select: { problems: true, quizzes: true }
      }
    }
  });

  return (
    <div className="container max-w-7xl px-4 py-10 mx-auto space-y-12">
      <div className="flex flex-col gap-4 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <Code className="h-8 w-8 text-primary" />
          Data Structures & Algorithms
        </h1>
        <p className="text-lg text-muted-foreground">
          Master the fundamentals of computer science with interactive visualizations, code examples, and practice problems.
        </p>
      </div>

      <DSAVisualizerBanner />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Explore Topics</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Link key={topic.id} href={`/dsa/${topic.slug}`} className="group block h-full">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-background">DSA Topic</Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{topic.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{topic.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex gap-4 text-sm text-muted-foreground pt-4 border-t border-border/50">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{topic._count.problems}</span>
                      <span className="text-xs">Problems</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{topic._count.quizzes}</span>
                      <span className="text-xs">Quizzes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
