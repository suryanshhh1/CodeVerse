export type Note = {
  id: string;
  title: string;
  category: "Computer Science" | "Web Development" | "DSA" | "System Design" | "AI";
  excerpt: string;
  readTime: number;
  date: string;
};

export const notes: Note[] = [
  {
    id: "big-o-notation",
    title: "Understanding Big O Notation",
    category: "DSA",
    excerpt: "A beginner-friendly guide to time and space complexity with examples in Python and Java.",
    readTime: 5,
    date: "2024-03-15",
  },
  {
    id: "react-hooks-deep-dive",
    title: "React Hooks Deep Dive",
    category: "Web Development",
    excerpt: "Master useState, useEffect, and custom hooks to build performant and clean React components.",
    readTime: 8,
    date: "2024-03-12",
  },
  {
    id: "system-design-basics",
    title: "System Design 101: Scaling from 0 to 1 Million Users",
    category: "System Design",
    excerpt: "Learn how to use load balancers, caching, and database replication to scale your app.",
    readTime: 12,
    date: "2024-03-10",
  },
  {
    id: "intro-to-llms",
    title: "How Large Language Models Work",
    category: "AI",
    excerpt: "The architecture behind transformers, self-attention mechanisms, and generative AI.",
    readTime: 10,
    date: "2024-03-05",
  },
  {
    id: "memory-management",
    title: "Memory Management: Heap vs Stack",
    category: "Computer Science",
    excerpt: "An essential guide to understanding how modern operating systems manage memory.",
    readTime: 6,
    date: "2024-02-28",
  }
];
