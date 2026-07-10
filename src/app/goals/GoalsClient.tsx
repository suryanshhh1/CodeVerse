"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Plus, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function GoalsClient({ initialGoals }: { initialGoals: any[] }) {
  const router = useRouter();
  const [goals, setGoals] = useState(initialGoals);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTarget, setNewTarget] = useState("100");

  const handleCreate = async () => {
    if (!newTitle || !newTarget) return;
    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, target: newTarget })
      });
      if (res.ok) {
        const { goal } = await res.json();
        setGoals([goal, ...goals]);
        setIsCreating(false);
        setNewTitle("");
        setNewTarget("100");
        toast.success("Goal created!");
        router.refresh();
      }
    } catch (e) {
      toast.error("Failed to create goal");
    }
  };

  return (
    <div className="container max-w-7xl px-4 py-10 mx-auto space-y-8 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/50 pb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            <Target className="h-8 w-8 text-primary" /> Learning Goals
          </h1>
          <p className="text-muted-foreground">Set targets and track your progress to stay motivated.</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="gap-2">
          <Plus className="w-4 h-4" /> New Goal
        </Button>
      </div>

      {isCreating && (
        <Card className="max-w-md bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Create Learning Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
               <label className="text-sm font-medium">Goal Title</label>
               <Input 
                 placeholder="E.g., Solve 100 DSA Problems" 
                 value={newTitle}
                 onChange={(e) => setNewTitle(e.target.value)}
               />
            </div>
            <div className="space-y-2">
               <label className="text-sm font-medium">Target Number</label>
               <Input 
                 type="number"
                 placeholder="100" 
                 value={newTarget}
                 onChange={(e) => setNewTarget(e.target.value)}
               />
            </div>
            <div className="flex justify-end gap-2 pt-2">
               <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
               <Button onClick={handleCreate}>Create</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {goals.length === 0 && !isCreating ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="flex flex-col items-center justify-center py-20 text-center space-y-6 premium-glass premium-shadow rounded-3xl border border-border/40 mt-10 max-w-2xl mx-auto"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center ring-8 ring-primary/5">
            <Target className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">No goals set yet</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Create a goal to start tracking your progress and hit your personal targets.</p>
          </div>
          <Button onClick={() => setIsCreating(true)} className="mt-4 rounded-full px-8">
            <Plus className="w-4 h-4 mr-2" /> Create First Goal
          </Button>
        </motion.div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => {
            const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100)) || 0;
            const isCompleted = goal.status === 'Completed' || percentage >= 100;
            
            return (
              <Card key={goal.id} className={`premium-glass premium-shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col ${isCompleted ? 'border-green-500/50' : 'border-border/40'}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant={isCompleted ? "default" : "secondary"} className={isCompleted ? "bg-green-500 hover:bg-green-600" : ""}>
                      {isCompleted ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2 text-xl">{goal.title}</CardTitle>
                  {goal.description && <CardDescription>{goal.description}</CardDescription>}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{goal.current} / {goal.target} ({percentage}%)</span>
                    </div>
                    <Progress value={percentage} className={`h-2 ${isCompleted ? '[&>div]:bg-green-500' : ''}`} />
                  </div>
                  {isCompleted ? (
                    <div className="flex items-center gap-2 text-sm text-green-500 pt-2 border-t border-border/50">
                      <CheckCircle2 className="w-4 h-4" /> Goal achieved!
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border/50">
                      <AlertCircle className="w-4 h-4" /> Keep pushing!
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
