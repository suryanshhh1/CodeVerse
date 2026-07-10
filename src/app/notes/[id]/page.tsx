import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import NoteClient from "./NoteClient";

import { getNoteData } from "@/lib/noteParser";

export default async function NoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const dbNote = await prisma.note.findUnique({
    where: { slug: resolvedParams.id }
  });

  if (!dbNote) {
    notFound();
  }

  const mdxData = await getNoteData(resolvedParams.id);
  
  if (!mdxData) {
    notFound();
  }

  const note = {
    ...dbNote,
    ...mdxData,
    id: dbNote.id,
  };

  const session = await auth();
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
