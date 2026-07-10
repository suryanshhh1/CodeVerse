const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. NOTES
  const notes = [
    { slug: 'java', title: 'Java', category: 'Backend', readTime: 10, description: 'Java is a statically-typed, object-oriented compiled language that runs on the JVM.' },
    { slug: 'python', title: 'Python', category: 'General Purpose', readTime: 8, description: 'Python is a dynamically typed, interpreted language known for its simplicity.' },
    { slug: 'javascript', title: 'JavaScript', category: 'Frontend', readTime: 9, description: 'JavaScript is a multi-paradigm, dynamic language of the web.' },
    { slug: 'cpp', title: 'C++', category: 'Backend', readTime: 12, description: 'C++ is a high-performance, compiled, object-oriented language.' },
    { slug: 'react', title: 'React', category: 'Frontend', readTime: 10, description: 'React is a declarative, component-based library for building user interfaces.' },
    { slug: 'sql', title: 'SQL', category: 'Database', readTime: 8, description: 'SQL is the standard language for querying relational databases.' },
    { slug: 'html', title: 'HTML', category: 'Frontend', readTime: 5, description: 'HTML is the standard markup language used to structure web content.' },
    { slug: 'css', title: 'CSS', category: 'Frontend', readTime: 7, description: 'CSS handles the look and feel of a web page.' },
    { slug: 'git', title: 'Git', category: 'DevOps', readTime: 6, description: 'Git is a free and open-source distributed version control system.' }
  ];

  for (const n of notes) {
    await prisma.note.upsert({
      where: { slug: n.slug },
      update: n,
      create: n,
    });
  }
  console.log('Seeded Notes');

  // 2. LANGUAGES
  const languages = [
    { slug: 'c', name: 'C', description: 'The mother of all languages.' },
    { slug: 'cplusplus', name: 'C++', description: 'High performance systems language.' },
    { slug: 'java', name: 'Java', description: 'Enterprise ready object oriented language.' },
    { slug: 'python', name: 'Python', description: 'Simple, readable, and powerful.' },
    { slug: 'javascript', name: 'JavaScript', description: 'The language of the web.' },
    { slug: 'typescript', name: 'TypeScript', description: 'JavaScript with syntax for types.' },
    { slug: 'go', name: 'Go', description: 'Concurrent, fast, and simple.' },
    { slug: 'rust', name: 'Rust', description: 'Safe, concurrent, and practical.' },
    { slug: 'php', name: 'PHP', description: 'Popular general-purpose scripting language.' },
    { slug: 'csharp', name: 'C#', description: 'Modern, object-oriented, and type-safe.' },
    { slug: 'kotlin', name: 'Kotlin', description: 'Modern programming language that makes developers happier.' },
    { slug: 'swift', name: 'Swift', description: 'Powerful and intuitive programming language for iOS.' },
    { slug: 'dart', name: 'Dart', description: 'Client-optimized language for fast apps on any platform.' }
  ];

  for (const l of languages) {
    await prisma.language.upsert({
      where: { slug: l.slug },
      update: l,
      create: l,
    });
  }
  console.log('Seeded Languages');

  // 3. ROADMAPS
  const roadmaps = [
    {
      slug: 'frontend-development',
      title: 'Frontend Development',
      description: 'Step by step guide to becoming a modern frontend developer.',
      difficulty: 'Intermediate',
      estimatedHours: 120,
      prerequisites: ['Basic computer skills', 'Logical thinking'],
      skillsGained: ['HTML/CSS', 'JavaScript', 'React', 'Web Performance'],
      recommendedProjects: ['Personal Portfolio', 'Weather App', 'E-commerce UI'],
      interviewQuestions: ['What is the Virtual DOM?', 'Explain CSS Specificity.'],
      resources: ['MDN Web Docs', 'React Beta Docs']
    },
    {
      slug: 'backend-development',
      title: 'Backend Development',
      description: 'Learn how to build scalable and secure backend systems.',
      difficulty: 'Advanced',
      estimatedHours: 150,
      prerequisites: ['Basic programming', 'Database concepts'],
      skillsGained: ['Node.js', 'SQL/NoSQL', 'API Design', 'Security'],
      recommendedProjects: ['REST API with Authentication', 'URL Shortener'],
      interviewQuestions: ['What is REST?', 'How do you handle SQL Injection?'],
      resources: ['Node.js Docs', 'PostgreSQL Tutorial']
    }
  ];

  for (const r of roadmaps) {
    const created = await prisma.roadmap.upsert({
      where: { slug: r.slug },
      update: r,
      create: r,
    });

    // Add nodes
    if (r.slug === 'frontend-development') {
      const nodes = [
        { title: 'Internet Fundamentals', description: 'How does the internet work? DNS, HTTP.', order: 1 },
        { title: 'HTML & CSS', description: 'Semantic HTML, CSS layouts (Flexbox, Grid).', order: 2 },
        { title: 'JavaScript', description: 'DOM manipulation, ES6+, async/await.', order: 3 },
        { title: 'React', description: 'Components, Hooks, State management.', order: 4 },
      ];
      for (const node of nodes) {
        const existingNode = await prisma.roadmapNode.findFirst({
          where: { roadmapId: created.id, title: node.title }
        });
        if (!existingNode) {
          await prisma.roadmapNode.create({
            data: { ...node, roadmapId: created.id }
          });
        }
      }
    }
  }
  console.log('Seeded Roadmaps');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
