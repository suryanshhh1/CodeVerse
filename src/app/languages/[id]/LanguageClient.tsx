"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Terminal, History, Lightbulb, Code2, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LanguageClient({ language, mdxContent }: any) {
  return (
    <div className="container max-w-4xl px-4 py-10 mx-auto space-y-8">
      <Link href="/languages" className={buttonVariants({ variant: "ghost", className: "mb-4 inline-flex items-center gap-2" })}>
        <ArrowLeft className="h-4 w-4" /> Back to Languages
      </Link>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight flex items-center gap-3">
            <Code2 className="h-10 w-10 text-primary" />
            {language.name} Documentation
          </h1>
          <Link href={`/chat?context=${encodeURIComponent(language.name + " Programming Language")}`}>
            <Button className="shrink-0 gap-2 rounded-full shadow-lg hover:shadow-xl transition-all" size="lg">
              <MessageSquare className="w-4 h-4" /> Ask AI Tutor
            </Button>
          </Link>
        </div>
        <p className="text-xl text-muted-foreground">
          {language.description}
        </p>
      </div>

      <div className="pt-10 prose prose-slate break-words dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:text-muted-foreground prose-pre:border prose-pre:border-border/50 overflow-hidden sm:overflow-visible">
        {mdxContent}
      </div>
    </div>
  );
}
