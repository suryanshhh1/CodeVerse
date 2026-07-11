"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, CheckCircle2, Circle, Clock, Trash2 } from "lucide-react";
import { createPlanner, createTask, toggleTaskStatus, deleteTask } from "./actions";
import { toast } from "sonner";
import { LayoutContainer } from "@/components/layout/LayoutContainer";

type StudyTask = {
  id: string;
  title: string;
  status: string;
  priority: string;
};

type StudyPlanner = {
  id: string;
  title: string;
  tasks: StudyTask[];
};

export default function PlannerClient({ initialPlanners }: { initialPlanners: StudyPlanner[] }) {
  const [planners, setPlanners] = useState(initialPlanners);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleCreatePlanner = async () => {
    const res = await createPlanner("My Study Plan");
    if (res.success && res.planner) {
      setPlanners([res.planner, ...planners]);
      toast.success("Study Planner created!");
    } else {
      toast.error("Failed to create planner");
    }
  };

  const handleAddTask = async (plannerId: string) => {
    if (!newTaskTitle.trim()) return;
    const title = newTaskTitle;
    setNewTaskTitle("");

    const res = await createTask(plannerId, title);
    if (res.success && res.task) {
      setPlanners(planners.map(p => {
        if (p.id === plannerId) {
          return { ...p, tasks: [...p.tasks, res.task] as StudyTask[] };
        }
        return p;
      }));
    }
  };

  const handleToggleTask = async (plannerId: string, taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Done" ? "Todo" : "Done";
    
    // Optimistic update
    setPlanners(planners.map(p => {
      if (p.id === plannerId) {
        return {
          ...p,
          tasks: p.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t)
        };
      }
      return p;
    }));

    await toggleTaskStatus(taskId, newStatus);
  };

  const handleDeleteTask = async (plannerId: string, taskId: string) => {
    setPlanners(planners.map(p => {
      if (p.id === plannerId) {
        return {
          ...p,
          tasks: p.tasks.filter(t => t.id !== taskId)
        };
      }
      return p;
    }));

    await deleteTask(taskId);
  };

  return (
    <LayoutContainer className="py-6 md:py-10 space-y-8 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Planner</h1>
          <p className="text-muted-foreground">Organize your goals, track tasks, and crush your learning targets.</p>
        </div>
        <Button onClick={handleCreatePlanner} className="gap-2 rounded-full">
          <Plus className="w-4 h-4" /> New Planner
        </Button>
      </div>

      {planners.length === 0 ? (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center py-20">
          <CardContent>
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">No Study Planners Found</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">Create your first study planner to start organizing your daily and weekly tasks.</p>
            <Button onClick={handleCreatePlanner}>Create Planner</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {planners.map(planner => (
            <Card key={planner.id} className="bg-card/50 backdrop-blur-sm border-border/50 h-fit max-h-[600px] flex flex-col group">
              <CardHeader className="border-b border-border/50 bg-background/50 pb-4">
                <CardTitle>{planner.title}</CardTitle>
                <CardDescription>
                  {planner.tasks.filter(t => t.status === "Done").length} of {planner.tasks.length} tasks completed
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 overflow-hidden flex-1 flex flex-col">
                <div className="p-4 overflow-y-auto flex-1 space-y-2">
                  <AnimatePresence>
                    {planner.tasks.map(task => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`flex items-center justify-between p-3 rounded-lg border ${task.status === "Done" ? 'bg-secondary/20 border-transparent opacity-60' : 'bg-background border-border/50 shadow-sm'}`}
                      >
                        <div className="flex items-center gap-3">
                          <button onClick={() => handleToggleTask(planner.id, task.id, task.status)}>
                            {task.status === "Done" ? (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                            )}
                          </button>
                          <span className={`text-sm font-medium ${task.status === "Done" ? 'line-through' : ''}`}>
                            {task.title}
                          </span>
                        </div>
                        <button onClick={() => handleDeleteTask(planner.id, task.id)} className="text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {planner.tasks.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-6">No tasks added yet.</p>
                  )}
                </div>
                
                <div className="p-4 border-t border-border/50 bg-background/50 mt-auto">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add a new task..." 
                      value={newTaskTitle}
                      onChange={e => setNewTaskTitle(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleAddTask(planner.id);
                      }}
                      className="bg-background"
                    />
                    <Button onClick={() => handleAddTask(planner.id)} size="icon" className="shrink-0">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </LayoutContainer>
  );
}
