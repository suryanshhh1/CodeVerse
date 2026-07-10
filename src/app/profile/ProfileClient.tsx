"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User as UserIcon, Trophy, Target, BookOpen, Flame, Map, Clock, FileText, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProfileClient({ initialData }: { initialData: any }) {
  const { user, profile, achievements, goals, stats, streak } = initialData;

  const totalStudyTimeHours = Math.round((Number(stats?.totalStudyTimeMs) || 0) / 3600000);

  return (
    <div className="container max-w-7xl px-4 py-10 mx-auto space-y-8 min-h-[calc(100vh-4rem)]">
      
      {/* Profile Header */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-8 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center shrink-0 border-4 border-background shadow-xl">
            {user?.image ? (
              <Image src={user.image} alt={user.name || 'User'} width={128} height={128} className="object-cover" />
            ) : (
              <UserIcon className="w-16 h-16 text-primary" />
            )}
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{user?.name || 'Developer'}</h1>
              <p className="text-muted-foreground mt-1">{user?.email}</p>
            </div>
            <p className="text-sm text-foreground max-w-2xl leading-relaxed">
              {profile?.bio || "A passionate developer on a journey to master programming, data structures, and system design."}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1">
                <Flame className="w-4 h-4 text-orange-500" /> {streak?.currentStreak || 0} Day Streak
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1">
                <Trophy className="w-4 h-4 text-yellow-500" /> {achievements?.length || 0} Achievements
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1">
                <Clock className="w-4 h-4 text-blue-500" /> {totalStudyTimeHours}h Studied
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Stats & Quick Links */}
        <div className="space-y-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2"><LayoutDashboard className="w-5 h-5 text-primary" /> Learning Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted-foreground flex items-center gap-2"><Map className="w-4 h-4" /> Roadmaps</span>
                <span className="font-semibold">{stats?.completedRoadmaps || 0} Completed</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted-foreground flex items-center gap-2"><BookOpen className="w-4 h-4" /> DSA Topics</span>
                <span className="font-semibold">{stats?.completedTopics || 0} Mastered</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted-foreground flex items-center gap-2"><FileText className="w-4 h-4" /> Quizzes</span>
                <span className="font-semibold">{stats?.averageQuizScore?.toFixed(1) || 0}% Accuracy</span>
              </div>
              <Link href="/analytics" className="block text-center text-sm text-primary hover:underline pt-2">
                View Full Analytics &rarr;
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Achievements & Goals */}
        <div className="md:col-span-2 space-y-8">
          
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2"><Target className="w-5 h-5 text-primary" /> Current Goals</CardTitle>
              <Link href="/goals" className="text-sm text-primary hover:underline">Manage</Link>
            </CardHeader>
            <CardContent>
              {goals?.length > 0 ? (
                <div className="space-y-4">
                  {goals.map((goal: any) => {
                    const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100)) || 0;
                    return (
                      <div key={goal.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{goal.title}</span>
                          <span className="text-muted-foreground">{percentage}%</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No active goals. <Link href="/goals" className="text-primary hover:underline">Set a goal</Link> to stay on track.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2"><Trophy className="w-5 h-5 text-primary" /> Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              {achievements?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {achievements.map((achievement: any) => (
                    <div key={achievement.id} className="bg-secondary/20 p-4 rounded-xl text-center border border-border/50 hover:border-primary/30 transition-colors">
                      <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-2xl mb-2">
                        {achievement.icon || "🏆"}
                      </div>
                      <h4 className="font-semibold text-sm line-clamp-1">{achievement.badgeName}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Keep learning to unlock achievements!
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
