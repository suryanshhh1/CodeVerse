import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Search as SearchIcon, Map, Code2, BookText, ArrowRight, FolderGit2, Dumbbell, History, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q || "";
  const session = await auth();

  let roadmaps: any[] = [];
  let languages: any[] = [];
  let notes: any[] = [];
  let dsaTopics: any[] = [];
  let problems: any[] = [];
  let projects: any[] = [];
  let recentSearches: string[] = [];

  if (q.trim()) {
    const queryStr = q.toLowerCase();
    const take = 5;

    [roadmaps, languages, notes, dsaTopics, problems, projects] = await Promise.all([
      prisma.roadmap.findMany({
        where: {
          OR: [
            { title: { contains: queryStr, mode: 'insensitive' } },
            { description: { contains: queryStr, mode: 'insensitive' } },
          ]
        }, take
      }),
      prisma.language.findMany({
        where: {
          OR: [
            { name: { contains: queryStr, mode: 'insensitive' } },
            { description: { contains: queryStr, mode: 'insensitive' } },
          ]
        }, take
      }),
      prisma.note.findMany({
        where: {
          OR: [
            { title: { contains: queryStr, mode: 'insensitive' } },
            { category: { contains: queryStr, mode: 'insensitive' } },
            { description: { contains: queryStr, mode: 'insensitive' } },
          ]
        }, take
      }),
      prisma.dSATopic.findMany({
        where: {
          OR: [
            { name: { contains: queryStr, mode: 'insensitive' } },
            { description: { contains: queryStr, mode: 'insensitive' } },
          ]
        }, take
      }),
      prisma.problem.findMany({
        where: {
          OR: [
            { title: { contains: queryStr, mode: 'insensitive' } },
          ]
        }, take
      }),
      prisma.project.findMany({
        where: {
          OR: [
            { title: { contains: queryStr, mode: 'insensitive' } },
            { description: { contains: queryStr, mode: 'insensitive' } },
          ]
        }, take
      })
    ]);
  } else if (session?.user?.id) {
    const recent = await prisma.recentSearch.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
      distinct: ['query']
    });
    recentSearches = recent.map(r => r.query);
  }

  const hasResults = roadmaps.length > 0 || languages.length > 0 || notes.length > 0 || dsaTopics.length > 0 || problems.length > 0 || projects.length > 0;

  return (
    <div className="container max-w-7xl px-4 py-10 mx-auto space-y-12">
      <div className="flex flex-col gap-4 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <SearchIcon className="h-8 w-8 text-primary" />
          {q ? `Search Results for "${q}"` : "Global Search"}
        </h1>
        <p className="text-xl text-muted-foreground">
          {!q ? "Search across roadmaps, topics, problems, and more." : hasResults ? "Here is what we found across the platform." : "No results found. Try a different term."}
        </p>
      </div>

      {!q && (
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><History className="w-5 h-5 text-primary"/> Recent Searches</CardTitle>
            </CardHeader>
            <CardContent>
              {recentSearches.length > 0 ? (
                <ul className="space-y-2">
                  {recentSearches.map((search, i) => (
                    <li key={i}>
                      <Link href={`/search?q=${search}`} className="text-muted-foreground hover:text-primary transition-colors block py-1">
                        {search}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No recent searches.</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary"/> Popular Searches</CardTitle>
            </CardHeader>
            <CardContent>
               <ul className="space-y-2">
                  <li><Link href={`/search?q=react`} className="text-muted-foreground hover:text-primary transition-colors block py-1">react</Link></li>
                  <li><Link href={`/search?q=binary search`} className="text-muted-foreground hover:text-primary transition-colors block py-1">binary search</Link></li>
                  <li><Link href={`/search?q=javascript`} className="text-muted-foreground hover:text-primary transition-colors block py-1">javascript</Link></li>
                  <li><Link href={`/search?q=system design`} className="text-muted-foreground hover:text-primary transition-colors block py-1">system design</Link></li>
               </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {hasResults && (
        <div className="space-y-12">
          {dsaTopics.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b border-border/50 pb-2">
                <Code2 className="h-6 w-6 text-primary" /> DSA Topics
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {dsaTopics.map(t => (
                  <Link key={t.id} href={`/dsa/${t.slug}`} className="group block">
                    <Card className="h-full bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <CardTitle className="group-hover:text-primary transition-colors">{t.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{t.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {problems.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b border-border/50 pb-2">
                <Dumbbell className="h-6 w-6 text-primary" /> Practice Problems
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {problems.map(p => (
                  <Link key={p.id} href={`/problems/${p.slug}`} className="group block">
                    <Card className="h-full bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <CardTitle className="group-hover:text-primary transition-colors">{p.title}</CardTitle>
                        <CardDescription className="line-clamp-2">Practice Problem</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b border-border/50 pb-2">
                <FolderGit2 className="h-6 w-6 text-primary" /> Projects
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map(p => (
                  <Link key={p.id} href={`/projects/${p.slug}`} className="group block">
                    <Card className="h-full bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <CardTitle className="group-hover:text-primary transition-colors">{p.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{p.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {roadmaps.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b border-border/50 pb-2">
                <Map className="h-6 w-6 text-primary" /> Roadmaps
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {roadmaps.map(r => (
                  <Link key={r.id} href={`/roadmaps/${r.slug}`} className="group block">
                    <Card className="h-full bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <CardTitle className="group-hover:text-primary transition-colors">{r.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{r.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b border-border/50 pb-2">
                <Code2 className="h-6 w-6 text-primary" /> Languages
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {languages.map(l => (
                  <Link key={l.id} href={`/languages/${l.slug}`} className="group block">
                    <Card className="h-full bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <CardTitle className="group-hover:text-primary transition-colors">{l.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{l.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {notes.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2 border-b border-border/50 pb-2">
                <BookText className="h-6 w-6 text-primary" /> Notes
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {notes.map(n => (
                  <Link key={n.id} href={`/notes/${n.slug}`} className="group block">
                    <Card className="h-full bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <CardTitle className="group-hover:text-primary transition-colors">{n.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{n.category}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
