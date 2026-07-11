"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Trophy, Clock, CheckCircle2, Code2, FolderGit2, Calendar as CalendarIcon, Zap, BookOpen } from "lucide-react";
import dynamic from "next/dynamic";
import { ThemeInput } from 'react-activity-calendar';

const ActivityCalendar = dynamic(() => import('react-activity-calendar').then(mod => mod.ActivityCalendar), { 
  ssr: false, 
  loading: () => <div className="w-full h-full min-h-[150px] flex items-center justify-center text-muted-foreground animate-pulse">Loading Calendar...</div> 
});

const StatCard = React.memo(({ title, icon: Icon, value, subtitle, iconColor }: { title: string, icon: any, value: string | number, subtitle: string, iconColor: string }) => {
  return (
    <Card className="premium-glass premium-shadow hover:shadow-lg hover:-translate-y-1 hover:border-primary/40 transition-all duration-300 h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
});
StatCard.displayName = "StatCard";

export function DashboardShowcase() {
  const explicitTheme: ThemeInput = {
    light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
    dark: ['#1e1e24', '#3c3c44', '#71717a', '#a1a1aa', '#f4f4f5'],
  };

  const calendarData = React.useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (59 - i));
      return {
        date: d.toISOString().split('T')[0],
        count: (i * 7) % 5, // deterministic mock data
        level: (i * 3) % 4  // deterministic mock data
      };
    });
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto rounded-xl overflow-hidden border border-border/50 premium-shadow bg-background/50 backdrop-blur-3xl transform transition-transform">
      {/* Fake macOS Titlebar */}
      <div className="h-10 bg-muted/20 border-b border-border/50 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <div className="flex-1 flex justify-center text-xs font-medium text-muted-foreground/50">app.codeverse.com</div>
      </div>
      
      {/* Mock Dashboard Content */}
      <div className="p-4 md:p-8 space-y-6 md:space-y-8 pointer-events-none select-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex!</h1>
            <p className="text-muted-foreground">Here is a summary of your learning progress.</p>
          </div>
          <div className="flex items-center gap-4 premium-glass px-6 py-3 rounded-2xl premium-shadow">
            <div className="flex items-center justify-center bg-primary/20 p-3 rounded-full">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground font-medium">Level 42 Developer</div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">14,250 XP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          <StatCard title="Study Streak" icon={Flame} value="14 Days" subtitle="Personal best is 21." iconColor="text-orange-500" />
          <StatCard title="Solved Problems" icon={Code2} value={342} subtitle="DSA problems solved." iconColor="text-green-500" />
          <StatCard title="Projects" icon={FolderGit2} value={12} subtitle="Projects built." iconColor="text-purple-500" />
          <StatCard title="Completed Topics" icon={CheckCircle2} value={48} subtitle="Topics mastered." iconColor="text-indigo-500" />
          <StatCard title="Time Studied" icon={Clock} value="124h" subtitle="Across all roadmaps." iconColor="text-blue-500" />
          <StatCard title="Quiz Score" icon={Trophy} value="92%" subtitle="Average accuracy." iconColor="text-yellow-500" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4 space-y-8">
            <Card className="premium-glass premium-shadow overflow-hidden">
              <CardHeader className="border-b border-border/50 bg-background/50">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  Learning Heatmap
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 overflow-x-auto">
                <div className="w-full min-w-max flex justify-start md:justify-center min-h-[150px] items-center opacity-80">
                  <ActivityCalendar 
                    data={calendarData} 
                    theme={explicitTheme} 
                    labels={{
                      totalCount: "{{count}} activities in the last year",
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3 space-y-8">
            <Card className="premium-glass premium-shadow h-full max-h-[300px] flex flex-col">
              <CardHeader className="border-b border-border/50 bg-background/50">
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest achievements and studies.</CardDescription>
              </CardHeader>
              <CardContent className="p-0 overflow-y-auto flex-1">
                <div className="p-6 space-y-6">
                  {[
                    { title: "Completed Linked Lists Quiz", time: "2 hours ago" },
                    { title: "Solved 'Two Sum'", time: "5 hours ago" },
                    { title: "Read 'System Design Basics'", time: "Yesterday" }
                  ].map((activity, i, arr) => (
                    <div key={i} className="flex items-center gap-4 relative group">
                      {i !== arr.length - 1 && (
                        <div className="absolute left-[3px] top-5 bottom-[-24px] w-0.5 bg-border/50" />
                      )}
                      <div className="mt-1 w-2 h-2 rounded-full bg-primary ring-4 ring-background z-10 shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                      <div className="flex-1 space-y-1 bg-background/50 p-3 rounded-lg border border-transparent">
                        <p className="text-sm font-medium leading-none">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
