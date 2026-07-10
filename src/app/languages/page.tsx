import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function LanguagesPage() {
  const languages = await prisma.language.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <div className="container max-w-7xl px-4 py-10 mx-auto space-y-12">
      <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-lg ring-1 ring-primary/20">
            <Code2 className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Programming Languages</h1>
        <p className="text-xl text-muted-foreground">
          Master the syntax, architecture, and best practices of the industry's top programming languages.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8">
        {languages.map((language) => (
          <Link key={language.id} href={`/languages/${language.slug}`} className="group block">
            <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                  <span className="text-primary/50 text-lg">#</span>
                  {language.name}
                </CardTitle>
                <CardDescription className="line-clamp-2 mt-2">{language.description}</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <Button variant="ghost" className="w-full justify-between mt-2 group-hover:bg-primary/10">
                  Read Documentation
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
