import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookText, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutContainer } from "@/components/layout/LayoutContainer";

export default async function NotesPage() {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <LayoutContainer className="py-10 space-y-12 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-lg ring-1 ring-primary/20">
            <BookText className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Notes Library</h1>
        <p className="text-xl text-muted-foreground">
          Professional, concise, and interview-ready documentation for all computer science topics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8">
        {notes.map((note) => (
          <Link key={note.id} href={`/notes/${note.slug}`} className="group block outline-none focus-ring rounded-xl">
            <Card className="h-full premium-glass border-border/40 premium-shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-primary/80 uppercase tracking-wider">{note.category}</span>
                  <div className="flex items-center text-xs text-muted-foreground gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{note.readTime} min read</span>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{note.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-2">{note.description}</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <Button variant="ghost" className="w-full justify-between mt-2 group-hover:bg-primary/10">
                  Read Note
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </LayoutContainer>
  );
}
