import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import BookmarksClient from "./BookmarksClient";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Bookmarks | CodeVerse",
  description: "Manage your saved resources.",
};

export default async function BookmarksPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const rawBookmarks = await prisma.bookmark.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  });

  // We have itemId and itemType. Let's fetch the actual items based on the type.
  const notesIds = rawBookmarks.filter(b => b.itemType === 'Note').map(b => b.itemId);
  const roadmapsIds = rawBookmarks.filter(b => b.itemType === 'Roadmap').map(b => b.itemId);
  const problemsIds = rawBookmarks.filter(b => b.itemType === 'Problem').map(b => b.itemId);
  const projectsIds = rawBookmarks.filter(b => b.itemType === 'Project').map(b => b.itemId);
  const languageIds = rawBookmarks.filter(b => b.itemType === 'Language').map(b => b.itemId);
  const dsaTopicIds = rawBookmarks.filter(b => b.itemType === 'DSATopic').map(b => b.itemId);

  const [notes, roadmaps, problems, projects, languages, dsaTopics] = await Promise.all([
    notesIds.length ? prisma.note.findMany({ where: { id: { in: notesIds } } }) : Promise.resolve([]),
    roadmapsIds.length ? prisma.roadmap.findMany({ where: { id: { in: roadmapsIds } } }) : Promise.resolve([]),
    problemsIds.length ? prisma.problem.findMany({ where: { id: { in: problemsIds } } }) : Promise.resolve([]),
    projectsIds.length ? prisma.project.findMany({ where: { id: { in: projectsIds } } }) : Promise.resolve([]),
    languageIds.length ? prisma.language.findMany({ where: { id: { in: languageIds } } }) : Promise.resolve([]),
    dsaTopicIds.length ? prisma.dSATopic.findMany({ where: { id: { in: dsaTopicIds } } }) : Promise.resolve([]),
  ]);

  const bookmarks = rawBookmarks.map(b => {
    let itemDetails = null;
    let url = "#";
    
    switch (b.itemType) {
      case 'Note':
        itemDetails = notes.find(n => n.id === b.itemId);
        url = itemDetails ? `/notes/${itemDetails.slug}` : "#";
        break;
      case 'Roadmap':
        itemDetails = roadmaps.find(r => r.id === b.itemId);
        url = itemDetails ? `/roadmaps/${itemDetails.slug}` : "#";
        break;
      case 'Problem':
        itemDetails = problems.find(p => p.id === b.itemId);
        url = itemDetails ? `/problems/${itemDetails.slug}` : "#";
        break;
      case 'Project':
        itemDetails = projects.find(p => p.id === b.itemId);
        url = itemDetails ? `/projects/${itemDetails.slug}` : "#";
        break;
      case 'Language':
        itemDetails = languages.find(l => l.id === b.itemId);
        url = itemDetails ? `/languages/${itemDetails.slug}` : "#";
        break;
      case 'DSATopic':
        itemDetails = dsaTopics.find(d => d.id === b.itemId);
        url = itemDetails ? `/dsa/${itemDetails.slug}` : "#";
        break;
    }

    return {
      ...b,
      details: itemDetails,
      url
    };
  }).filter(b => b.details !== null); // Remove if the underlying item was deleted

  return <BookmarksClient initialBookmarks={bookmarks} />;
}
