import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import NoteClient from "./NoteClient";

import { getNoteData } from "@/lib/noteParser";

export default async function NoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const [dbNote, mdxData, session] = await Promise.all([
    prisma.note.findUnique({ where: { slug: resolvedParams.id } }),
    getNoteData(resolvedParams.id),
    auth()
  ]);

  if (!dbNote || !mdxData) {
    notFound();
  }

  const note = {
    ...dbNote,
    ...mdxData,
    id: dbNote.id,
  };

  let isRead = false;

  if (session?.user?.id) {
    const progress = await prisma.noteProgress.findUnique({
      where: {
        userId_noteId: {
          userId: session.user.id,
          noteId: note.id
        }
      }
    });
    if (progress?.isRead) {
      isRead = true;
    }
  }

  return (
    <NoteClient 
      note={note} 
      isReadInitially={isRead}
      isLoggedIn={!!session?.user?.id}
    />
  );
}
