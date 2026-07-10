"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DSACMSClient({ initialTopics }: { initialTopics: any[] }) {
  const [topics, setTopics] = useState(initialTopics);
  const [search, setSearch] = useState("");

  const filteredTopics = topics.filter(t => 
    t.name?.toLowerCase().includes(search.toLowerCase()) || 
    t.slug?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">DSA CMS</h2>
          <p className="text-muted-foreground text-sm">Manage data structures, algorithms, and problems.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64 flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search DSA topics..." 
              className="pl-9 bg-background/50 border-border/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button className="shrink-0 gap-2">
            <Plus className="h-4 w-4" /> New Topic
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-border/50 overflow-hidden bg-card/30 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Topic</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Problems</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTopics.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No topics found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTopics.map((topic) => (
                <TableRow key={topic.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-primary hover:underline cursor-pointer flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-primary" /> {topic.name}
                      </span>
                      <span className="text-xs text-muted-foreground ml-6">/{topic.slug}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {topic.order}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {topic.problems?.length || 0} problems
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(topic.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive/80">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
