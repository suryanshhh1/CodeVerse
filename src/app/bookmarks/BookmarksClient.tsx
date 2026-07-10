"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, FolderGit2, Code2, BookText, Map, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function BookmarksClient({ initialBookmarks }: { initialBookmarks: any[] }) {
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [filter, setFilter] = useState("All");

  const types = ["All", ...Array.from(new Set(initialBookmarks.map(b => b.itemType)))];

  const filteredBookmarks = filter === "All" ? bookmarks : bookmarks.filter(b => b.itemType === filter);

  const handleRemove = async (id: string, type: string) => {
    try {
      const res = await fetch("/api/bookmarks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: id, itemType: type })
      });
      if (res.ok) {
        setBookmarks(bookmarks.filter(b => b.itemId !== id));
        toast.success("Bookmark removed");
        router.refresh();
      }
    } catch (e) {
      toast.error("Failed to remove bookmark");
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Note': return <BookText className="w-5 h-5 text-blue-500" />;
      case 'Roadmap': return <Map className="w-5 h-5 text-purple-500" />;
      case 'Problem': return <Code2 className="w-5 h-5 text-green-500" />;
      case 'Project': return <FolderGit2 className="w-5 h-5 text-orange-500" />;
      default: return <Bookmark className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="container max-w-7xl px-4 py-10 mx-auto space-y-8 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col gap-4 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <Bookmark className="h-8 w-8 text-primary" /> Your Bookmarks
        </h1>
        <p className="text-xl text-muted-foreground">
          Quickly access your saved roadmaps, notes, problems, and projects.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {types.map(t => (
          <Button 
            key={t} 
            variant={filter === t ? "default" : "outline"}
            onClick={() => setFilter(t)}
            className="rounded-full"
          >
            {t}
          </Button>
        ))}
      </div>

      {filteredBookmarks.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="flex flex-col items-center justify-center py-20 text-center space-y-6 premium-glass premium-shadow rounded-3xl border border-border/40 mt-10 max-w-2xl mx-auto"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center ring-8 ring-primary/5">
            <Bookmark className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">No bookmarks found</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Start exploring the platform and save items for later to build your personal library.</p>
          </div>
          <Link href="/projects" className="mt-4">
            <Button className="rounded-full px-8">Explore Projects</Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBookmarks.map((bookmark) => (
            <Card key={bookmark.id} className="premium-glass premium-shadow border-border/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="flex items-center gap-1.5">
                    {getIcon(bookmark.itemType)} {bookmark.itemType}
                  </Badge>
                  <Button variant="ghost" size="icon" onClick={() => handleRemove(bookmark.itemId, bookmark.itemType)} className="h-8 w-8 text-primary">
                    <Bookmark className="w-4 h-4 fill-primary" />
                  </Button>
                </div>
                <CardTitle className="mt-4 text-xl line-clamp-1">{bookmark.details.title || bookmark.details.name}</CardTitle>
                {bookmark.details.description && (
                  <CardDescription className="line-clamp-2">{bookmark.details.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="mt-auto pt-4 border-t border-border/50 flex justify-between items-center">
                <Link href={bookmark.url} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                  Go to {bookmark.itemType} <ArrowRight className="w-3 h-3" />
                </Link>
                <span className="text-xs text-muted-foreground">
                  Saved {new Date(bookmark.createdAt).toLocaleDateString()}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
