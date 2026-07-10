const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding missing content to fix 404s...');

  // 1. NOTES
  const notes = [
    { slug: 'programming-languages', title: 'Programming Languages', category: 'General' },
    { slug: 'dsa', title: 'Data Structures & Algorithms', category: 'Computer Science' },
    { slug: 'dbms', title: 'DBMS', category: 'Database' },
    { slug: 'operating-systems', title: 'Operating Systems', category: 'Computer Science' },
    { slug: 'computer-networks', title: 'Computer Networks', category: 'Computer Science' },
    { slug: 'oop', title: 'Object-Oriented Programming', category: 'Programming' },
    { slug: 'software-engineering', title: 'Software Engineering', category: 'Computer Science' },
    { slug: 'next-js', title: 'Next.js', category: 'Frontend' },
    { slug: 'node-js', title: 'Node.js', category: 'Backend' },
    { slug: 'express', title: 'Express', category: 'Backend' },
    { slug: 'mongodb', title: 'MongoDB', category: 'Database' },
    { slug: 'postgresql', title: 'PostgreSQL', category: 'Database' },
    { slug: 'docker', title: 'Docker', category: 'DevOps' },
    { slug: 'linux', title: 'Linux', category: 'Operating Systems' },
    { slug: 'cybersecurity', title: 'Cybersecurity', category: 'Security' },
    { slug: 'artificial-intelligence', title: 'Artificial Intelligence', category: 'AI' },
    { slug: 'machine-learning', title: 'Machine Learning', category: 'AI' },
    { slug: 'rest-apis', title: 'REST APIs', category: 'Backend' },
    { slug: 'authentication', title: 'Authentication', category: 'Security' },
    { slug: 'cloud-computing', title: 'Cloud Computing', category: 'Cloud' }
  ];

  for (const n of notes) {
    await prisma.note.upsert({
      where: { slug: n.slug },
      update: { title: n.title, category: n.category },
      create: { ...n, description: `Comprehensive notes on ${n.title}`, readTime: 10 }
    });
  }
  console.log('Seeded missing Notes');

  // 2. ROADMAPS
  const roadmaps = [
    'Full Stack', 'Android', 'Flutter', 'React Native', 'Artificial Intelligence', 'Machine Learning',
    'Deep Learning', 'Generative AI', 'Prompt Engineering', 'LLMs', 'AI Agents', 'Data Science',
    'Cybersecurity', 'Cloud Computing', 'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes',
    'DevOps', 'Git', 'System Design', 'Operating Systems', 'Computer Networks', 'DBMS',
    'Software Engineering', 'Blockchain', 'Game Development', 'IoT', 'Competitive Programming'
  ];

  for (const r of roadmaps) {
    const slug = r.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await prisma.roadmap.upsert({
      where: { slug },
      update: { title: r },
      create: {
        slug,
        title: r,
        description: `Complete roadmap for ${r}`,
        difficulty: 'Intermediate',
        estimatedHours: 100,
        prerequisites: [],
        skillsGained: [],
        recommendedProjects: [],
        interviewQuestions: [],
        resources: []
      }
    });
  }
  console.log('Seeded missing Roadmaps');

  // 3. DSA TOPICS
  const dsaTopics = [
    'HashMap', 'Heap', 'Trie', 'Recursion', 'Backtracking', 'Greedy', 'Binary Search', 'BFS', 'DFS'
  ];

  for (const t of dsaTopics) {
    const slug = t.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await prisma.dSATopic.upsert({
      where: { slug },
      update: { name: t },
      create: { slug, name: t, description: `Master ${t}`, order: 20 }
    });
  }
  console.log('Seeded missing DSA Topics');

  console.log('All missing content seeded successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
