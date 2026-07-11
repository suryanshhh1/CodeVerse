import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderGit2 } from "lucide-react";
import Link from "next/link";
import { LayoutContainer } from "@/components/layout/LayoutContainer";
import { AmbientLighting } from "@/components/layout/AmbientLighting";

export const metadata = {
  title: "Projects | CodeVerse",
  description: "Build real-world projects to solidify your coding skills.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AmbientLighting variant="projects" />
      <LayoutContainer className="py-10 space-y-12 min-h-[calc(100vh-4rem)]">
        <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
          <FolderGit2 className="h-8 w-8 text-primary" />
          Projects Library
        </h1>
        <p className="text-lg text-muted-foreground">
          Apply what you've learned by building real-world applications. Choose a project that matches your skill level.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.slug}`} className="group block h-full outline-none focus-ring rounded-xl">
            <Card className="premium-glass border-border/40 premium-shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={project.difficulty === "Beginner" ? "default" : project.difficulty === "Intermediate" ? "secondary" : "destructive"}>
                    {project.difficulty}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{project.estimatedHours}h</span>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs bg-background">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      </LayoutContainer>
    </>
  );
}
