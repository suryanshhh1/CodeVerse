"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreVertical, Edit, Trash, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RoadmapsCMSClient({ initialRoadmaps }: { initialRoadmaps: any[] }) {
  const [roadmaps, setRoadmaps] = useState(initialRoadmaps);
  const [search, setSearch] = useState("");

  const filteredRoadmaps = roadmaps.filter(r => 
    r.title?.toLowerCase().includes(search.toLowerCase()) || 
    r.slug?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Roadmaps CMS</h2>
          <p className="text-muted-foreground text-sm">Create and manage learning roadmaps and topics.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64 flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search roadmaps..." 
              className="pl-9 bg-background/50 border-border/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button className="shrink-0 gap-2">
            <Plus className="h-4 w-4" /> New Roadmap
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-border/50 overflow-hidden bg-card/30 backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Time (hrs)</TableHead>
              <TableHead>Nodes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoadmaps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No roadmaps found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRoadmaps.map((roadmap) => (
                <TableRow key={roadmap.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-primary hover:underline cursor-pointer">{roadmap.title}</span>
                      <span className="text-xs text-muted-foreground">/{roadmap.slug}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{roadmap.difficulty}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {roadmap.estimatedHours}h
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <LayoutList className="w-3.5 h-3.5" />
                      {roadmap.nodes?.length || 0} topics
                    </span>
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
