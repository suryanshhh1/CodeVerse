const fs = require('fs');

const roadmapTitles = ["Programming Fundamentals", "Frontend Development", "Backend Development", "Full Stack Development", "Android Development", "iOS Development", "Flutter", "React Native", "Artificial Intelligence", "Machine Learning", "Deep Learning", "Generative AI", "Prompt Engineering", "Large Language Models", "AI Agents", "Natural Language Processing", "Computer Vision", "Data Science", "Data Analytics", "Data Engineering", "Cybersecurity", "Ethical Hacking", "Cloud Computing", "AWS", "Azure", "Google Cloud", "DevOps", "Docker", "Kubernetes", "System Design", "Software Engineering", "Database Engineering", "SQL", "NoSQL", "Operating Systems", "Computer Networks", "Linux", "Blockchain", "Game Development", "Embedded Systems", "IoT", "Competitive Programming", "Git & GitHub", "Open Source", "Interview Preparation", "Freelancing"];

const roadmaps = roadmapTitles.map((title, i) => {
  const slug = title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
  return {
    slug,
    title,
    description: `Complete guide and interactive roadmap for mastering ${title}. Learn the core concepts, advanced techniques, and practical applications required for industry-level proficiency.`,
    difficulty: i % 3 === 0 ? "Beginner" : i % 2 === 0 ? "Advanced" : "Intermediate",
    estimatedHours: Math.floor(Math.random() * 200) + 50,
    prerequisites: i % 3 === 0 ? [] : ["Basic Programming", "Computer Literacy"],
    skillsGained: [title + " Fundamentals", "Problem Solving", "Architecture"],
    nodes: [
      { title: "Introduction & Basics", description: `Understand the absolute fundamentals of ${title} and set up your environment.`, order: 1 },
      { title: "Core Concepts", description: "Deep dive into the main theoretical and practical building blocks.", order: 2 },
      { title: "Advanced Patterns", description: "Explore complex architectures and optimal design patterns.", order: 3 },
      { title: "Practical Implementation", description: "Build real-world projects applying what you have learned.", order: 4 },
      { title: "Interview Preparation", description: "Master the most common interview questions for this niche.", order: 5 }
    ]
  };
});

fs.writeFileSync('prisma/data/roadmaps.json', JSON.stringify(roadmaps, null, 2));

const languageNames = ["C", "C++", "Java", "Python", "JavaScript", "TypeScript", "Go", "Rust", "PHP", "C#", "Kotlin", "Swift", "Dart"];

const languages = languageNames.map((name) => {
  const slug = name.toLowerCase().replace(/\+/g, 'p').replace(/#/g, 'sharp');
  return {
    slug,
    name,
    introduction: `${name} is a powerful programming language widely used in the industry for building robust software applications.`,
    history: `Originally created decades ago, ${name} has evolved significantly, adding modern features and an expansive ecosystem.`,
    whyLearn: `Learning ${name} opens up massive career opportunities and gives you a strong foundation in algorithmic thinking.`,
    setupGuide: `1. Download the compiler/interpreter. \n2. Set up your IDE (VS Code or IntelliJ). \n3. Run your first Hello World program.`,
    topics: [
      { title: "Variables & Data Types", content: "Learn how to declare variables and manage primitive types.", order: 1, codeExample: "let x = 10;" },
      { title: "Control Flow & Loops", content: "Master if statements, switch cases, and loops (for, while).", order: 2, codeExample: "for(let i=0; i<10; i++) {}" },
      { title: "Functions & Scope", content: "Understand how to modularize your code using reusable functions.", order: 3, codeExample: "function greet() { return 'Hello'; }" },
      { title: "Object Oriented Programming", content: "Classes, Inheritance, Polymorphism, and Encapsulation.", order: 4, codeExample: "class Car {}" },
      { title: "Advanced Memory & Multithreading", content: "Handle complex operations securely and concurrently.", order: 5, codeExample: "// Complex implementation here" }
    ]
  };
});

fs.writeFileSync('prisma/data/languages.json', JSON.stringify(languages, null, 2));

console.log("JSON data generated successfully in prisma/data/");
