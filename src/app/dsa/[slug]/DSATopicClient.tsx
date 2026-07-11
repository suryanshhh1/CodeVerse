"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Code, BookOpen, MonitorPlay, Brain, ChevronRight, MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { LayoutContainer } from "@/components/layout/LayoutContainer";
import ArrayVisualizer from "@/components/visualizers/ArrayVisualizer";
import StackVisualizer from "@/components/visualizers/StackVisualizer";

export default function DSATopicClient({ topic }: any) {
  const [activeTab, setActiveTab] = useState("overview");

  const renderVisualizer = () => {
    switch(topic.slug) {
      case 'arrays':
        return <ArrayVisualizer />;
      case 'stacks':
        return <StackVisualizer />;
      default:
        return (
          <div className="w-full h-80 bg-background/50 rounded-xl border border-border flex items-center justify-center flex-col gap-4 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
             <MonitorPlay className="w-12 h-12 text-muted-foreground opacity-50" />
             <p className="text-muted-foreground">Interactive visualization for {topic.name} is coming soon...</p>
          </div>
        );
    }
  };

  return (
    <LayoutContainer className="py-6 md:py-10 space-y-6 md:space-y-8 overflow-hidden sm:overflow-visible">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <Link href="/dsa" className={buttonVariants({ variant: "ghost", className: "mb-2 md:mb-4 inline-flex items-center gap-2 w-fit" })}>
            <ArrowLeft className="h-4 w-4" /> Back to DSA Track
          </Link>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{topic.name}</h1>
            <Link href={`/chat?context=${encodeURIComponent(topic.name + " Data Structure/Algorithm")}`}>
              <Button className="shrink-0 gap-2 rounded-full shadow-lg hover:shadow-xl transition-all" size="lg">
                <MessageSquare className="w-4 h-4" /> Ask AI Tutor
              </Button>
            </Link>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {topic.description}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 max-w-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-1 rounded-xl h-auto">
            <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><BookOpen className="w-4 h-4 mr-2 hidden sm:inline-block"/>Overview</TabsTrigger>
            <TabsTrigger value="visualizer" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><MonitorPlay className="w-4 h-4 mr-2 hidden sm:inline-block"/>Visualizer</TabsTrigger>
            <TabsTrigger value="problems" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Code className="w-4 h-4 mr-2 hidden sm:inline-block"/>Problems</TabsTrigger>
            <TabsTrigger value="quiz" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Brain className="w-4 h-4 mr-2 hidden sm:inline-block"/>Quiz</TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="overview" className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Introduction to {topic.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {topic.description}
                  </p>
                  <h3 className="text-lg font-semibold text-foreground pt-4">Why Learn It?</h3>
                  <p>
                    Understanding {topic.name} is crucial for solving real-world problems efficiently. It forms the backbone of many advanced algorithms and systems.
                  </p>
                  <h3 className="text-lg font-semibold text-foreground pt-4">Real-world Applications</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Data storage and retrieval</li>
                    <li>Efficient searching and sorting</li>
                    <li>Networking and routing</li>
                  </ul>
                  <div className="flex flex-col gap-4 pt-6 md:flex-row">
                    <div className="flex-1 bg-secondary/20 p-4 rounded-xl border border-secondary/50">
                      <h4 className="font-semibold text-foreground mb-2">Time Complexity</h4>
                      <p className="font-mono text-sm">Average: O(n)</p>
                      <p className="font-mono text-sm">Worst: O(n^2)</p>
                    </div>
                    <div className="flex-1 bg-secondary/20 p-4 rounded-xl border border-secondary/50">
                      <h4 className="font-semibold text-foreground mb-2">Space Complexity</h4>
                      <p className="font-mono text-sm">Worst: O(n)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visualizer" className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>{topic.name} Visualizer</CardTitle>
                  <CardDescription>Interactive playground to understand {topic.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderVisualizer()}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="problems" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
              <div className="grid gap-4 md:grid-cols-2">
                {topic.problems.map((prob: any) => (
                  <Link key={prob.id} href={`/problems/${prob.slug}`} className="group block">
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all h-full">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant={prob.difficulty === "Easy" ? "default" : prob.difficulty === "Medium" ? "secondary" : "destructive"}>
                            {prob.difficulty}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{prob.timeEstimate} min</span>
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">{prob.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {prob.tags.slice(0,3).map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-xs bg-background">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                {topic.problems.length === 0 && (
                  <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed border-border rounded-xl">
                      No practice problems available yet for this topic.
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="quiz" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
              {topic.quizzes && topic.quizzes.length > 0 ? (
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle>{topic.quizzes[0].title}</CardTitle>
                    <CardDescription>Test your understanding of {topic.name} with {topic.quizzes[0].questions?.length || 0} questions.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Link href={`/quizzes/${topic.quizzes[0].id}`}>
                        <Button>Start Quiz</Button>
                      </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="py-12 text-center text-muted-foreground border border-dashed border-border rounded-xl">
                    No quizzes available yet for this topic.
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </LayoutContainer>
  );
}
