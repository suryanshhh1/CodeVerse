"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Trophy, Clock, CheckCircle2, Code2, FolderGit2, Calendar as CalendarIcon, Zap, BookOpen } from "lucide-react";
import Link from "next/link";
import { ThemeInput } from 'react-activity-calendar';

// Lazy load the heavy chart widget and disable SSR to prevent hydration errors completely
const ActivityCalendar = dynamic(() => import('react-activity-calendar').then(mod => mod.ActivityCalendar), { 
  ssr: false, 
  loading: () => <div className="w-full h-full min-h-[150px] flex items-center justify-center text-muted-foreground animate-pulse">Loading Calendar...</div> 
});

type DashboardProps = {
  user: { name: string; email: string };
  stats: {
    totalStudyTimeHours: number;
    completedTopics: number;
    completedRoadmaps: number;
    averageQuizScore: number;
    solvedProblemsCount?: number;
    completedProjectsCount?: number;
    xp: number;
    level: number;
    levelProgress: number;
  };
  streak: {
    currentStreak: number;
    longestStreak: number;
  };
  recentActivities: { title: string; time: string; type: string }[];
  calendarData: { date: string; count: number; level: number }[];
  continueLearning: { id: string; title: string; category: string; link: string }[];
};

// 1. Memoize expensive sub-components to prevent unnecessary re-renders
const StatCard = React.memo(({ title, icon: Icon, value, subtitle, iconColor }: { title: string, icon: any, value: string | number, subtitle: string, iconColor: string }) => {
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } }
  };
  return (
    <motion.div variants={item} viewport={{ once: true }}>
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-primary/40 transition-all duration-300 h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
});
StatCard.displayName = "StatCard";

export default function DashboardClient({ user, stats, streak, recentActivities, calendarData, continueLearning }: DashboardProps) {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const safeCalendarData = calendarData.length > 0 ? calendarData : [{ date: new Date().toISOString().split('T')[0], count: 0, level: 0 }];

  const explicitTheme: ThemeInput = {
    light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
    dark: ['#1e1e24', '#3c3c44', '#71717a', '#a1a1aa', '#f4f4f5'],
  };

  return (
    <div className="container max-w-7xl px-4 py-6 md:py-10 mx-auto space-y-6 md:space-y-8 min-h-[calc(100vh-4rem)] overflow-hidden sm:overflow-visible">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name || "Student"}!</h1>
          <p className="text-muted-foreground">Here is a summary of your learning progress.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-card/50 backdrop-blur-sm border border-border/50 px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-center bg-primary/20 p-3 rounded-full">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground font-medium">Level {stats.level} Developer</div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">{stats.xp} XP</span>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        variants={container} 
        initial="hidden" 
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      >
        <StatCard title="Study Streak" icon={Flame} value={`${streak.currentStreak} Days`} subtitle={`Personal best is ${streak.longestStreak}.`} iconColor="text-orange-500" />
        <StatCard title="Solved Problems" icon={Code2} value={stats.solvedProblemsCount || 0} subtitle="DSA problems solved." iconColor="text-green-500" />
        <StatCard title="Projects" icon={FolderGit2} value={stats.completedProjectsCount || 0} subtitle="Projects built." iconColor="text-purple-500" />
        <StatCard title="Completed Topics" icon={CheckCircle2} value={stats.completedTopics} subtitle="Topics mastered." iconColor="text-indigo-500" />
        <StatCard title="Time Studied" icon={Clock} value={`${stats.totalStudyTimeHours}h`} subtitle="Across all roadmaps." iconColor="text-blue-500" />
        <StatCard title="Quiz Score" icon={Trophy} value={`${stats.averageQuizScore}%`} subtitle="Average accuracy." iconColor="text-yellow-500" />
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-4 space-y-8"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="border-b border-border/50 bg-background/50">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                Learning Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 overflow-x-auto">
              <div className="w-full min-w-max flex justify-start md:justify-center min-h-[150px] items-center">
                <ActivityCalendar 
                  data={safeCalendarData} 
                  theme={explicitTheme}
                  labels={{
                    totalCount: "{{count}} activities in the last year",
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-3 border-b border-border/50 bg-background/50">
                <CardTitle className="text-lg">Continue Learning</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {continueLearning.length === 0 ? (
                   <p className="text-sm text-muted-foreground">You don't have any incomplete notes. Explore the library!</p>
                ) : (
                  continueLearning.map(item => (
                    <Link key={item.id} href={item.link}>
                      <div className="flex justify-between items-center bg-background p-3 rounded-lg hover:border-primary/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 border border-border/50 shadow-sm hover:shadow-md group mb-3 last:mb-0">
                        <div className="space-y-1">
                          <p className="text-sm font-medium group-hover:text-primary transition-colors">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-3 border-b border-border/50 bg-background/50">
                <CardTitle className="text-lg">Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <Link href="/projects/todo-list-app">
                  <div className="flex justify-between items-center bg-background p-3 rounded-lg hover:border-primary/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 border border-border/50 shadow-sm hover:shadow-md group mb-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">Build a Task Manager</p>
                      <p className="text-xs text-muted-foreground">Project</p>
                    </div>
                    <FolderGit2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
                <Link href="/roadmaps/backend-development">
                  <div className="flex justify-between items-center bg-background p-3 rounded-lg hover:border-primary/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 border border-border/50 shadow-sm hover:shadow-md group">
                    <div className="space-y-1">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">Backend Development</p>
                      <p className="text-xs text-muted-foreground">Roadmap</p>
                    </div>
                    <BookOpen className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 space-y-8"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full max-h-[600px] flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="border-b border-border/50 bg-background/50">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest achievements and studies.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto flex-1">
              <div className="p-6 space-y-6">
                {recentActivities.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-10">No recent activity. Start learning!</p>
                ) : (
                  recentActivities.map((activity, i) => (
                    <div key={i} className="flex items-center gap-4 relative group">
                      {i !== recentActivities.length - 1 && (
                        <div className="absolute left-[3px] top-5 bottom-[-24px] w-0.5 bg-border/50 group-hover:bg-primary/30 transition-colors duration-300" />
                      )}
                      <div className="mt-1 w-2 h-2 rounded-full bg-primary ring-4 ring-background z-10 shadow-[0_0_10px_rgba(var(--primary),0.5)] group-hover:scale-125 transition-transform duration-300" />
                      <div className="flex-1 space-y-1 bg-background/50 p-3 rounded-lg border border-transparent group-hover:border-primary/20 transition-all duration-300">
                        <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
