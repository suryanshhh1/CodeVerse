"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Bookmark, CheckCircle2, Play } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProblemClient({ problem, initialSolved, initialBookmarked, isLoggedIn }: any) {
  const router = useRouter();
  const [code, setCode] = useState(`function solve() {\n  // Write your code here\n}\n`);
  const [language, setLanguage] = useState("javascript");
  const [isSolved, setIsSolved] = useState(initialSolved);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMarkSolved = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to track progress.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/progress/problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId: problem.id, code, language, title: problem.title })
      });
      if (res.ok) {
        setIsSolved(true);
        toast.success("Problem marked as solved!");
        router.refresh();
      } else {
        toast.error("Failed to mark solved.");
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
        body: JSON.stringify({ itemId: problem.id, itemType: "Problem" })
      });
      if (res.ok) {
        setIsBookmarked(!isBookmarked);
        toast.success(isBookmarked ? "Bookmark removed" : "Bookmarked!");
        router.refresh();
      }
    } catch (e) {}
  };

  return (
    <div className="container max-w-7xl px-4 py-8 mx-auto flex flex-col lg:flex-row gap-6 h-[calc(100vh-4rem)]">
      {/* Left Panel: Problem Description */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        <Link href={`/dsa/${problem.topic.slug}`} className="text-muted-foreground hover:text-primary flex items-center gap-1 text-sm w-fit transition-colors">
          <ChevronRight className="h-4 w-4 rotate-180" /> Back to {problem.topic.name}
        </Link>
        
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold">{problem.title}</h1>
          <Button variant="ghost" size="icon" onClick={handleBookmark}>
            <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
          </Button>
        </div>

        <div className="flex gap-3 items-center flex-wrap">
          <Badge variant={problem.difficulty === "Easy" ? "default" : problem.difficulty === "Medium" ? "secondary" : "destructive"}>
            {problem.difficulty}
          </Badge>
          {isSolved && (
            <Badge variant="outline" className="text-green-500 border-green-500 bg-green-500/10">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Solved
            </Badge>
          )}
          <span className="text-sm text-muted-foreground">{problem.timeEstimate} min</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {problem.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="bg-background">{tag}</Badge>
          ))}
        </div>

        <div className="prose prose-invert max-w-none pt-4">
          <p>
            Implement the solution for <strong>{problem.title}</strong>. This problem falls under the category of {problem.topic.name}.
          </p>
          <h3>Hints</h3>
          <ul>
            {problem.hints.map((hint: string, idx: number) => (
              <li key={idx}>{hint}</li>
            ))}
          </ul>
          {problem.companies && problem.companies.length > 0 && (
            <>
              <h3>Companies Asked</h3>
              <div className="flex gap-2">
                {problem.companies.map((c: string) => (
                  <Badge key={c} variant="secondary">{c}</Badge>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Panel: Code Editor */}
      <Card className="flex-1 flex flex-col bg-card/50 backdrop-blur-sm border-border/50 h-full overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-border/50 space-y-0">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-secondary text-secondary-foreground text-sm rounded-md px-3 py-1.5 border-none outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => toast.info("Running code feature coming soon!")}>
              <Play className="w-4 h-4 mr-1" /> Run
            </Button>
            <Button size="sm" onClick={handleMarkSolved} disabled={isSubmitting || isSolved}>
              {isSolved ? "Solved" : "Submit & Mark Solved"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full bg-background/50 p-4 font-mono text-sm outline-none resize-none text-muted-foreground focus:text-foreground transition-colors"
            spellCheck="false"
          />
        </CardContent>
      </Card>
    </div>
  );
}
