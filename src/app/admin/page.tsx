import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Code2, FolderGit2, Map, Trophy } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Admin Dashboard | CodeVerse",
};

export default async function AdminDashboardPage() {
  const [
    totalUsers,
    totalNotes,
    totalRoadmaps,
    totalProblems,
    totalProjects
  ] = await Promise.all([
    prisma.user.count(),
    prisma.note.count(),
    prisma.roadmap.count(),
    prisma.problem.count(),
    prisma.project.count()
  ]);

  const stats = [
    { name: "Total Users", value: totalUsers, icon: Users, color: "text-blue-500" },
    { name: "Roadmaps", value: totalRoadmaps, icon: Map, color: "text-purple-500" },
    { name: "Notes", value: totalNotes, icon: BookOpen, color: "text-green-500" },
    { name: "DSA Problems", value: totalProblems, icon: Code2, color: "text-orange-500" },
    { name: "Projects", value: totalProjects, icon: FolderGit2, color: "text-indigo-500" },
    { name: "Quizzes", value: "TBD", icon: Trophy, color: "text-yellow-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the CodeVerse Admin Panel. Here is a high-level overview of the platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Additional Analytics can go here later */}
    </div>
  );
}
