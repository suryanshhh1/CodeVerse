const fs = require('fs');

const noteTitles = ["Programming Languages", "DSA", "Operating Systems", "Computer Networks", "DBMS", "OOP", "Software Engineering", "Web Development", "React", "Next.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "SQL", "Git", "GitHub", "Docker", "Linux", "Cloud Computing", "Cybersecurity", "Artificial Intelligence", "Machine Learning", "Prompt Engineering", "System Design", "REST APIs", "Authentication", "JSON", "HTTP", "HTML", "CSS", "Tailwind CSS", "JavaScript ES6", "TypeScript"];

const notes = noteTitles.map(title => {
  const slug = title.toLowerCase().replace(/ /g, '-').replace(/\./g, 'dot');
  return {
    slug,
    title,
    category: "Computer Science",
    overview: `A comprehensive professional guide on ${title}.`,
    definition: `${title} is a critical component of modern software architecture and development.`,
    simpleExplanation: `Think of ${title} as a tool that helps you solve complex problems efficiently and securely.`,
    realWorldExample: `When you use your smartphone to order food, the backend relies heavily on ${title} to ensure your order is processed.`,
    syntax: `// Standard Implementation\nimport { feature } from '${title.toLowerCase()}';\n\nfeature.initialize();`,
    codeExample: `function demonstrate() {\n  console.log("Mastering ${title}");\n}`,
    bestPractices: ["Always keep security in mind.", "Optimize for performance.", "Write clean, readable code.", "Document your architecture."],
    commonMistakes: ["Ignoring edge cases.", "Over-engineering simple problems.", "Forgetting to handle exceptions."],
    interviewQuestions: [`Explain the core mechanism of ${title}?`, `How does ${title} scale in production?`, `What are the alternatives to ${title}?`],
    quickRevision: `Remember: ${title} is used for building scalable, efficient systems. Master the basics first.`,
    readTime: Math.floor(Math.random() * 10) + 5
  };
});

fs.writeFileSync('prisma/data/notes.json', JSON.stringify(notes, null, 2));
console.log("Notes JSON data generated successfully in prisma/data/");
