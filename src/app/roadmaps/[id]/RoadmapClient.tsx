"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Map, Clock, ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RoadmapClient({ roadmap, initialCompletedNodes, isLoggedIn }: any) {
  const router = useRouter();
  const [completedNodes, setCompletedNodes] = useState<Set<string>>(new Set(initialCompletedNodes));
  const [loadingNode, setLoadingNode] = useState<string | null>(null);

  const handleComplete = async (nodeId: string, nodeTitle: string) => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (completedNodes.has(nodeId)) return;

    setLoadingNode(nodeId);
    try {
      const res = await fetch("/api/progress/node", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodeId, roadmapId: roadmap.id, nodeTitle }),
      });
      if (res.ok) {
        setCompletedNodes(new Set([...completedNodes, nodeId]));
        router.refresh(); // Refresh to update server-side stats like the dashboard
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingNode(null);
    }
  };

  return (
    <div className="container max-w-4xl px-4 py-10 mx-auto space-y-8">
      <Link href="/roadmaps" className={buttonVariants({ variant: "ghost", className: "mb-4 inline-flex items-center gap-2" })}>
        <ArrowLeft className="h-4 w-4" /> Back to Roadmaps
      </Link>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 mb-2">
          <Badge variant={roadmap.difficulty === "Beginner" ? "default" : roadmap.difficulty === "Intermediate" ? "secondary" : "destructive"}>
            {roadmap.difficulty}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground gap-1">
            <Clock className="h-4 w-4" />
            <span>Estimated {roadmap.estimatedHours} Hours</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <Map className="h-8 w-8 text-primary" />
          {roadmap.title} Roadmap
        </h1>
        <p className="text-xl text-muted-foreground">
          {roadmap.description}
        </p>
      </div>

      <div className="pt-8">
        <h2 className="text-2xl font-bold mb-6">Learning Path</h2>
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {roadmap.nodes.map((node: any, idx: number) => {
            const isCompleted = completedNodes.has(node.id);
            return (
              <motion.div 
                key={node.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors ${isCompleted ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground'}`}>
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                
                <Card className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors ${isCompleted ? 'opacity-70' : ''}`}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className={`h-4 w-4 ${isCompleted ? 'text-green-500' : 'text-primary'}`} />
                      {node.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {node.description}
                    </p>
                    <Button 
                      size="sm" 
                      variant={isCompleted ? "secondary" : "outline"} 
                      className="w-full"
                      onClick={() => handleComplete(node.id, node.title)}
                      disabled={isCompleted || loadingNode === node.id}
                    >
                      {loadingNode === node.id ? "Updating..." : isCompleted ? "Completed" : "Mark as Complete"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="pt-12 grid md:grid-cols-2 gap-8">
        {roadmap.prerequisites && roadmap.prerequisites.length > 0 && (
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Prerequisites</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {roadmap.prerequisites.map((p: string, i: number) => <li key={i}>{p}</li>)}
              </ul>
            </CardContent>
          </Card>
        )}

        {roadmap.skillsGained && roadmap.skillsGained.length > 0 && (
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Skills Gained</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {roadmap.skillsGained.map((s: string, i: number) => (
                  <Badge key={i} variant="secondary">{s}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {roadmap.recommendedProjects && roadmap.recommendedProjects.length > 0 && (
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Recommended Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {roadmap.recommendedProjects.map((p: string, i: number) => <li key={i}>{p}</li>)}
              </ul>
            </CardContent>
          </Card>
        )}

        {roadmap.resources && roadmap.resources.length > 0 && (
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Resources & Links</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {roadmap.resources.map((r: string, i: number) => <li key={i}>{r}</li>)}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

    </div>
  );
}
