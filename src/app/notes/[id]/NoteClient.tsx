"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Terminal, CheckCircle2, AlertTriangle, Lightbulb, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NoteClient({ note, isReadInitially, isLoggedIn }: any) {
  const router = useRouter();
  const [isRead, setIsRead] = useState(isReadInitially);
  const [isLoading, setIsLoading] = useState(false);

  const handleMarkAsRead = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (isRead) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/progress/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId: note.id, noteTitle: note.title }),
      });
      if (res.ok) {
        setIsRead(true);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl px-4 py-10 mx-auto space-y-10">
      <Link href="/notes" className={buttonVariants({ variant: "ghost", className: "mb-4 inline-flex items-center gap-2" })}>
        <ArrowLeft className="h-4 w-4" /> Back to Notes Library
      </Link>
      
        <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 mb-2">
          <Badge variant="outline" className="text-primary border-primary/50">
            {note.category}
          </Badge>
          <span className="text-sm text-muted-foreground">{note.readTime} min read</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {note.title}
          </h1>
          <Link href={`/chat?context=${encodeURIComponent(note.title + " in " + note.category)}`}>
            <Button className="shrink-0 gap-2 rounded-full shadow-lg hover:shadow-xl transition-all" size="lg">
              <MessageSquare className="w-4 h-4" /> Ask AI Tutor
            </Button>
          </Link>
        </div>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {note.overview}
        </p>
      </div>

      <div className="space-y-8 pt-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" /> Core Definition
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{note.definition}</p>
          <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-primary">
              <Lightbulb className="h-5 w-5" /> Simple Explanation
            </h3>
            <p className="text-muted-foreground">{note.simpleExplanation}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Real World Example</h2>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <p className="text-muted-foreground italic">"{note.realWorldExample}"</p>
            </CardContent>
          </Card>
        </section>

        {note.syntax && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Terminal className="h-6 w-6 text-primary" /> Implementation & Syntax
            </h2>
            <div className="rounded-lg overflow-hidden border border-border/50">
              <div className="bg-muted px-4 py-2 text-xs font-mono text-muted-foreground border-b border-border/50">
                syntax.txt
              </div>
              <pre className="p-4 bg-background overflow-x-auto">
                <code className="text-sm font-mono text-foreground whitespace-pre-wrap">
                  {note.syntax}
                </code>
              </pre>
            </div>
          </section>
        )}

        {note.codeExample && (
          <section className="space-y-4 pt-4">
            <h2 className="text-2xl font-bold">Code Example</h2>
            <div className="rounded-lg overflow-hidden border border-border/50">
              <div className="bg-muted px-4 py-2 text-xs font-mono text-muted-foreground border-b border-border/50">
                example.ts
              </div>
              <pre className="p-4 bg-background overflow-x-auto">
                <code className="text-sm font-mono text-foreground whitespace-pre-wrap">
                  {note.codeExample}
                </code>
              </pre>
            </div>
          </section>
        )}

        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-green-500">
                <CheckCircle2 className="h-5 w-5" /> Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {note.bestPractices.map((bp: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-green-500 mt-0.5">•</span> {bp}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                <AlertTriangle className="h-5 w-5" /> Common Mistakes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {note.commonMistakes.map((cm: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-destructive mt-0.5">•</span> {cm}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <section className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" /> Interview Questions
          </h2>
          <div className="space-y-3">
            {note.interviewQuestions.map((iq: string, i: number) => (
              <div key={i} className="p-4 rounded-lg bg-card/50 border border-border/50 font-medium">
                Q: {iq}
              </div>
            ))}
          </div>
        </section>

        <section className="pt-10 border-t border-border/50 flex flex-col items-center justify-center gap-6 text-center">
          <div>
            <h3 className="font-bold text-lg mb-2">Quick Revision</h3>
            <p className="text-muted-foreground max-w-lg mx-auto">{note.quickRevision}</p>
          </div>
          
          <Button 
            size="lg" 
            className="w-full max-w-sm rounded-full h-14 text-lg font-bold"
            variant={isRead ? "secondary" : "default"}
            onClick={handleMarkAsRead}
            disabled={isRead || isLoading}
          >
            {isLoading ? "Saving Progress..." : isRead ? "Marked as Read ✓" : "Mark as Read"}
          </Button>
        </section>
      </div>
    </div>
  );
}
