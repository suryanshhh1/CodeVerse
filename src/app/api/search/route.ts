import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const session = await auth();

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const query = q.toLowerCase();

  // Track recent search if user is logged in
  if (session?.user?.id) {
    try {
      await prisma.recentSearch.create({
        data: { userId: session.user.id, query: q }
      });
    } catch (e) {
      console.error("Failed to track recent search", e);
    }
  }

  try {
    const [notes, roadmaps, languages, dsaTopics, problems, projects] = await Promise.all([
      prisma.note.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { category: { contains: query, mode: 'insensitive' } }
          ]
        },
        take: 5,
        select: { id: true, slug: true, title: true, category: true, description: true }
      }),
      prisma.roadmap.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ]
        },
        take: 5,
        select: { id: true, slug: true, title: true, description: true }
      }),
      prisma.language.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ]
        },
        take: 5,
        select: { id: true, slug: true, name: true, description: true }
      }),
      prisma.dSATopic.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ]
        },
        take: 5,
        select: { id: true, slug: true, name: true, description: true }
      }),
      prisma.problem.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } }
          ]
        },
        take: 5,
        select: { id: true, slug: true, title: true }
      }),
      prisma.project.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ]
        },
        take: 5,
        select: { id: true, slug: true, title: true, description: true }
      })
    ]);

    const results = [
      ...notes.map(n => ({ ...n, type: 'note', href: `/notes/${n.slug}` })),
      ...roadmaps.map(r => ({ ...r, type: 'roadmap', href: `/roadmaps/${r.slug}` })),
      ...languages.map(l => ({ ...l, title: l.name, type: 'language', href: `/languages/${l.slug}` })),
      ...dsaTopics.map(t => ({ ...t, title: t.name, type: 'dsa', href: `/dsa/${t.slug}` })),
      ...problems.map(p => ({ ...p, type: 'problem', href: `/problems/${p.slug}` })),
      ...projects.map(p => ({ ...p, type: 'project', href: `/projects/${p.slug}` }))
    ];

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
