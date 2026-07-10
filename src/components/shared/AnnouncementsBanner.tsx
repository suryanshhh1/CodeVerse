"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Info, PartyPopper, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
}

export default function AnnouncementsBanner() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [visibleId, setVisibleId] = useState<string | null>(null);

  useEffect(() => {
    // In a real scenario, this would fetch from /api/announcements
    // Currently fetching mock data for demo purposes, or we could fetch from actual API once implemented.
    fetch("/api/announcements/active")
      .then((res) => {
        if (!res.ok) return [];
        return res.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setAnnouncements(data);
          // Check local storage to see if user dismissed it
          const dismissed = localStorage.getItem(`dismissed_announcement_${data[0].id}`);
          if (!dismissed) {
            setVisibleId(data[0].id);
          }
        }
      })
      .catch((e) => console.error("Failed to fetch announcements", e));
  }, []);

  if (!visibleId) return null;

  const activeAnnouncement = announcements.find((a) => a.id === visibleId);
  if (!activeAnnouncement) return null;

  const dismiss = () => {
    localStorage.setItem(`dismissed_announcement_${visibleId}`, "true");
    setVisibleId(null);
  };

  const getIcon = () => {
    switch (activeAnnouncement.type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "success":
        return <PartyPopper className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (activeAnnouncement.type) {
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/20";
      case "success":
        return "bg-green-500/10 border-green-500/20";
      default:
        return "bg-blue-500/10 border-blue-500/20";
    }
  };

  return (
    <div className={`relative border-b ${getBgColor()} px-4 py-3 sm:px-6 lg:px-8`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-x-6">
        <div className="flex items-center gap-x-4">
          {getIcon()}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <strong className="font-semibold text-sm">{activeAnnouncement.title}</strong>
            <span className="hidden sm:inline text-muted-foreground">&middot;</span>
            <span className="text-sm text-muted-foreground">{activeAnnouncement.content}</span>
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          <Button variant="ghost" size="icon" onClick={dismiss} className="h-6 w-6 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
