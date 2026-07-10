import { prisma } from "@/lib/prisma";
import AnnouncementsClient from "./AnnouncementsClient";

export const metadata = {
  title: "Announcements | Admin",
};

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" }
  });

  return <AnnouncementsClient initialAnnouncements={announcements} />;
}
