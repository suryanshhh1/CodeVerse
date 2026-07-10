import { prisma } from "@/lib/prisma";
import NotesCMSClient from "./NotesCMSClient";

export const metadata = {
  title: "Notes CMS | Admin",
};

export default async function AdminNotesPage() {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: "desc" }
  });

  return <NotesCMSClient initialNotes={notes} />;
}
