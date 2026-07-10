"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Bookmark, CheckCircle2, FolderGit2, Code2, Rocket } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProjectClient({ project, initialCompleted, initialBookmarked, isLoggedIn }: any) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMarkCompleted = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to track progress.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/progress/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id, title: project.title })
      });
      if (res.ok) {
        setIsCompleted(true);
        toast.success("Project marked as completed!");
        router.refresh();
      } else {
        toast.error("Failed to mark completed.");
      }
    } catch (e) {
      toast.error("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookmark = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to bookmark.");
      return;
    }
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: project.id, itemType: "Project" })
      });
      if (res.ok) {
        setIsBookmarked(!isBookmarked);
        toast.success(isBookmarked ? "Bookmark removed" : "Bookmarked!");
        router.refresh();
      }
    } catch (e) {}
  };

  return (
    <div className="container max-w-4xl px-4 py-10 mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <Link href="/projects" className="text-muted-foreground hover:text-primary flex items-center gap-1 text-sm w-fit transition-colors">
          <ChevronRight className="h-4 w-4 rotate-180" /> Back to Projects
        </Link>
        
        <div className="flex justify-between items-start gap-4 flex-wrap">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleBookmark}>
              <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
            </Button>
            <Button onClick={handleMarkCompleted} disabled={isSubmitting || isCompleted} className="gap-2">
              {isCompleted ? <><CheckCircle2 className="w-4 h-4" /> Completed</> : "Mark as Completed"}
            </Button>
          </div>
        </div>

        <div className="flex gap-3 items-center flex-wrap">
          <Badge variant={project.difficulty === "Beginner" ? "default" : project.difficulty === "Intermediate" ? "secondary" : "destructive"}>
            {project.difficulty}
          </Badge>
          <span className="text-sm text-muted-foreground flex items-center gap-1"><FolderGit2 className="w-4 h-4" /> Project</span>
          <span className="text-sm text-muted-foreground">{project.estimatedHours} Hours</span>
        </div>
      </div>

      <p className="text-lg text-muted-foreground leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl"><Code2 className="w-5 h-5 text-primary" /> Tech Stack</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {project.techStack.map((tech: string) => (
            <Badge key={tech} variant="secondary" className="px-3 py-1 text-sm">{tech}</Badge>
          ))}
        </CardContent>
      </Card>

      {/* Learning Outcomes */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl"><Rocket className="w-5 h-5 text-primary" /> Learning Outcomes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            {project.learningOutcomes.map((outcome: string, idx: number) => (
              <li key={idx}>{outcome}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Implementation Guide Placeholder */}
      <div className="space-y-6 pt-6">
        <h2 className="text-2xl font-bold border-b border-border/50 pb-4">Implementation Guide</h2>
        <div className="prose prose-invert max-w-none">
          <h3>1. Setup</h3>
          <p>Initialize your project and install the necessary dependencies using your preferred package manager (npm, yarn, or pnpm).</p>
          <pre><code>mkdir {project.slug}\ncd {project.slug}\nnpm init -y</code></pre>
          
          <h3>2. Folder Structure</h3>
          <p>Organize your project files logically. A common pattern is separating components, utilities, and assets.</p>
          
          <h3>3. Core Features</h3>
          <p>Start by implementing the core features mentioned in the description. Focus on functionality before perfecting the UI.</p>
          
          <h3>4. Deployment</h3>
          <p>Once your project is working locally, deploy it to a platform like Vercel, Netlify, or GitHub Pages.</p>
        </div>
      </div>
    </div>
  );
}
