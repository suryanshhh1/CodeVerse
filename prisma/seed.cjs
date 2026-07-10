const { PrismaClient } = require('@prisma/client');
const roadmaps = require('./data/roadmaps.json');
const languages = require('./data/languages.json');
const notes = require('./data/notes.json');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL
    }
  }
});

async function main() {
  console.log("Seeding Roadmaps...");
  for (const r of roadmaps) {
    const exists = await prisma.roadmap.findUnique({ where: { slug: r.slug } });
    if (!exists) {
      await prisma.roadmap.create({
        data: {
          slug: r.slug,
          title: r.title,
          description: r.description,
          difficulty: r.difficulty,
          estimatedHours: r.estimatedHours,
          prerequisites: r.prerequisites,
          skillsGained: r.skillsGained,
          nodes: {
            create: r.nodes.map(n => ({
              title: n.title,
              description: n.description,
              order: n.order
            }))
          }
        }
      });
    }
  }

  console.log("Seeding Languages...");
  for (const l of languages) {
    const exists = await prisma.language.findUnique({ where: { slug: l.slug } });
    if (!exists) {
      await prisma.language.create({
        data: {
          slug: l.slug,
          name: l.name,
          introduction: l.introduction,
          history: l.history,
          whyLearn: l.whyLearn,
          setupGuide: l.setupGuide,
          topics: {
            create: l.topics.map(t => ({
              title: t.title,
              content: t.content,
              codeExample: t.codeExample,
              order: t.order
            }))
          }
        }
      });
    }
  }

  console.log("Seeding Notes...");
  for (const n of notes) {
    const exists = await prisma.note.findUnique({ where: { slug: n.slug } });
    if (!exists) {
      await prisma.note.create({
        data: {
          slug: n.slug,
          title: n.title,
          category: n.category,
          overview: n.overview,
          definition: n.definition,
          simpleExplanation: n.simpleExplanation,
          realWorldExample: n.realWorldExample,
          syntax: n.syntax,
          codeExample: n.codeExample,
          bestPractices: n.bestPractices,
          commonMistakes: n.commonMistakes,
          interviewQuestions: n.interviewQuestions,
          quickRevision: n.quickRevision,
          readTime: n.readTime
        }
      });
    }
  }

  console.log("Seeding complete!");
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
