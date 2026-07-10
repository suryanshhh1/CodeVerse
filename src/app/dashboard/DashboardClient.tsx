"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Flame, Trophy, Clock, CheckCircle2, Code2, FolderGit2, Calendar as CalendarIcon, Zap } from "lucide-react";
import Link from "next/link";
import { ActivityCalendar, ThemeInput } from 'react-activity-calendar';

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

export default function DashboardClient({ user, stats, streak, recentActivities, calendarData, continueLearning }: DashboardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } }
  };

  // Ensure calendar has at least today's date if empty
  const safeCalendarData = calendarData.length > 0 ? calendarData : [{ date: new Date().toISOString().split('T')[0], count: 0, level: 0 }];

  const explicitTheme: ThemeInput = {
    light: ['#f0f0f0', '#c4edde', '#7ac7c4', '#f73859', '#384259'],
    dark: ['#1e1e24', '#3c3c44', '#71717a', '#a1a1aa', '#f4f4f5'],
  };

  return (
    <div className="container max-w-7xl px-4 py-10 mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name || "Student"}!</h1>
          <p className="text-muted-foreground">Here is a summary of your learning progress.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-card/50 backdrop-blur-sm border border-border/50 px-6 py-3 rounded-2xl shadow-sm">
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
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      >
        <motion.div variants={item}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:border-primary/30 transition-all h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{streak.currentStreak} Days</div>
              <p className="text-xs text-muted-foreground">Personal best is {streak.longestStreak}.</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:border-primary/30 transition-all h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Solved Problems</CardTitle>
              <Code2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.solvedProblemsCount || 0}</div>
              <p className="text-xs text-muted-foreground">DSA problems solved.</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:border-primary/30 transition-all h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects</CardTitle>
              <FolderGit2 className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedProjectsCount || 0}</div>
              <p className="text-xs text-muted-foreground">Projects built.</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:border-primary/30 transition-all h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Topics</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedTopics}</div>
              <p className="text-xs text-muted-foreground">Topics mastered.</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:border-primary/30 transition-all h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Studied</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudyTimeHours}h</div>
              <p className="text-xs text-muted-foreground">Across all roadmaps</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm hover:border-primary/30 transition-all h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Score</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageQuizScore}%</div>
              <p className="text-xs text-muted-foreground">Average accuracy</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.3 }}
          className="lg:col-span-4 space-y-6"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
            <CardHeader className="border-b border-border/50 bg-background/50">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                Learning Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 overflow-x-auto">
              <div className="min-w-[700px] flex justify-center min-h-[150px] items-center">
                {mounted ? (
                  <ActivityCalendar 
                    data={safeCalendarData} 
                    theme={explicitTheme}
                    labels={{
                      totalCount: "{{count}} activities in the last year",
                    }}
                    hideColorLegend
                    hideMonthLabels={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">Loading Calendar...</div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-3 border-b border-border/50 bg-background/50">
                <CardTitle className="text-lg">Continue Learning</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {continueLearning.length === 0 ? (
                   <p className="text-sm text-muted-foreground">You don't have any incomplete notes. Explore the library!</p>
                ) : (
                  continueLearning.map(item => (
                    <Link key={item.id} href={item.link}>
                      <div className="flex justify-between items-center bg-background p-3 rounded-lg hover:border-primary/50 cursor-pointer transition-all border border-border/50 group">
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

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-3 border-b border-border/50 bg-background/50">
                <CardTitle className="text-lg">Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <Link href="/projects/todo-list-app">
                  <div className="flex justify-between items-center bg-background p-3 rounded-lg hover:border-primary/50 cursor-pointer transition-all border border-border/50 group mb-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">Build a Task Manager</p>
                      <p className="text-xs text-muted-foreground">Project</p>
                    </div>
                    <FolderGit2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
                <Link href="/roadmaps/backend-development">
                  <div className="flex justify-between items-center bg-background p-3 rounded-lg hover:border-primary/50 cursor-pointer transition-all border border-border/50 group">
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
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.4 }}
          className="lg:col-span-3 space-y-6"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full max-h-[600px] flex flex-col">
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
                    <div key={i} className="flex items-center gap-4 relative">
                      {i !== recentActivities.length - 1 && (
                        <div className="absolute left-[3px] top-5 bottom-[-24px] w-0.5 bg-border/50" />
                      )}
                      <div className="mt-1 w-2 h-2 rounded-full bg-primary ring-4 ring-background z-10" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.title}</p>
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
