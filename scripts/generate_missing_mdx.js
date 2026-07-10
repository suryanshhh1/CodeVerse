const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const notesDir = path.join(__dirname, '..', 'src', 'content', 'notes');
  
  if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir, { recursive: true });
  }

  const notes = await prisma.note.findMany();
  let createdCount = 0;

  for (const note of notes) {
    const filePath = path.join(notesDir, `${note.slug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      const content = `---
title: "${note.title}"
category: "${note.category}"
readTime: 10
---

## Overview

Welcome to the comprehensive guide on **${note.title}**. This topic covers the fundamental concepts, real-world applications, and best practices.

## Definition

**${note.title}** is a critical concept in ${note.category}. It provides the necessary foundation for building robust, scalable applications.

## Beginner Explanation

Think of ${note.title} as a tool that helps you solve complex problems in a structured way. It simplifies the process and makes your work much more efficient.

## Real World Example

In the real world, ${note.title} is used by major tech companies to handle massive amounts of data, orchestrate complex systems, and deliver seamless user experiences.

## Syntax

\`\`\`javascript
// Example syntax for ${note.title}
function init() {
  console.log("Initializing ${note.title}...");
}
\`\`\`

## Code Example

\`\`\`javascript
// A practical implementation
class Concept {
  constructor() {
    this.name = "${note.title}";
  }
  
  execute() {
    return \`Executing \${this.name}\`;
  }
}
\`\`\`

## Best Practices

- Always follow established conventions.
- Keep your code clean and well-documented.
- Test thoroughly before deploying to production.
- Stay updated with the latest community standards.

## Common Mistakes

- Ignoring edge cases.
- Over-engineering simple solutions.
- Failing to handle errors properly.
- Neglecting performance optimizations.

## Interview Questions

1. **What is ${note.title}?**
2. **How does it differ from alternative approaches?**
3. **Can you explain a time you used it in a project?**
4. **What are its main advantages and limitations?**

## Quick Revision

- **Core Concept:** Essential for modern development.
- **Primary Use:** Solving domain-specific problems efficiently.
- **Key Takeaway:** Mastery requires practice and building projects.
`;
      fs.writeFileSync(filePath, content, 'utf8');
      createdCount++;
      console.log(`Created ${note.slug}.mdx`);
    }
  }

  console.log(`Successfully generated ${createdCount} missing MDX files!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
