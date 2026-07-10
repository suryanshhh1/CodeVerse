"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ActivityCalendar } from 'react-activity-calendar';
import { Flame, Clock, Target, Trophy, TrendingUp, History, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function AnalyticsClient({ initialData }: { initialData: any }) {
  const { stats, streak, calendar, analytics, history } = initialData;

  const studyTimeDaily = Array.isArray(analytics.studyTimeDaily) ? analytics.studyTimeDaily : JSON.parse(analytics.studyTimeDaily || '[]');
  const activityMonthly = Array.isArray(analytics.activityMonthly) ? analytics.activityMonthly : JSON.parse(analytics.activityMonthly || '[]');

  return (
    <div className="container max-w-7xl px-4 py-10 mx-auto space-y-8 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col gap-4 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-primary" /> Learning Analytics
        </h1>
        <p className="text-xl text-muted-foreground">
          Track your progress, view your study habits, and identify areas for improvement.
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <Flame className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streak.currentStreak} Days</div>
            <p className="text-xs text-muted-foreground mt-1">Longest: {streak.longestStreak} days</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(Number(stats.totalStudyTimeMs) / 3600000)}h</div>
            <p className="text-xs text-muted-foreground mt-1">Total time spent</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Topics Completed</CardTitle>
            <BookOpen className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedTopics}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all roadmaps</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Quiz Score</CardTitle>
            <Target className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageQuizScore.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Overall accuracy</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Charts */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Daily Study Time (mins)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyTimeDaily}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                <Bar dataKey="time" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityMonthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <RechartsTooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }} />
                <Line type="monotone" dataKey="activity" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* GitHub Style Calendar */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
        <CardHeader>
          <CardTitle>Learning Calendar</CardTitle>
          <CardDescription>Your daily contributions and study activity.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto pb-4">
          <div className="min-w-[800px] p-4">
            <ActivityCalendar 
              data={calendar.length > 0 ? calendar : [{ date: new Date().toISOString().split('T')[0], count: 0, level: 0 }]}
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
              labels={{
                legend: { less: 'Less', more: 'More' },
                months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                totalCount: '{{count}} contributions in the last year',
              }}
              colorScheme="dark"
            />
          </div>
        </CardContent>
      </Card>

      {/* Topics & Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-green-500">Strongest Topics</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {analytics.strongestTopics.map((topic: string) => (
              <Badge key={topic} variant="secondary" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">{topic}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-red-500">Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {analytics.weakestTopics.map((topic: string) => (
              <Badge key={topic} variant="secondary" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">{topic}</Badge>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-blue-500">Favorite Categories</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {analytics.favoriteCategories.map((category: string) => (
              <Badge key={category} variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">{category}</Badge>
            ))}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
