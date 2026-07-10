const fs = require('fs');
const path = require('path');

const notes = [
  {
    slug: 'html',
    title: 'HTML',
    category: 'Frontend',
    readTime: 5,
    content: `---
title: "HTML"
category: "Frontend"
readTime: 5
---

## Overview
HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.

## Definition
HTML is the standard markup language used to structure and display content on the World Wide Web.

## Beginner Explanation
HTML is the skeleton of a web page. It defines where the text goes, where the images go, and where the links point to. Without HTML, there is no web page.

## Real World Example
Every single website you visit, from Google to Wikipedia, uses HTML to define its basic structure before styling it with CSS or making it interactive with JavaScript.

## Syntax
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>
    <h1>This is a Heading</h1>
    <p>This is a paragraph.</p>
</body>
</html>
\`\`\`

## Code Example
\`\`\`html
<article>
    <header>
        <h2>The Basics of HTML</h2>
        <p>Published on: <time datetime="2023-10-25">October 25, 2023</time></p>
    </header>
    <section>
        <p>HTML elements are the building blocks of HTML pages. They are represented by tags.</p>
        <img src="html-logo.png" alt="HTML5 Logo" width="100">
    </section>
    <footer>
        <p>Written by Jane Doe</p>
    </footer>
</article>
\`\`\`

## Important Points
- **Semantic HTML:** Using tags that convey meaning (like \`<article>\`, \`<footer>\`) rather than just \`<div>\` improves accessibility and SEO.
- **Attributes:** Tags can have attributes (like \`href\` for links) that provide additional information.
- **Not a Programming Language:** HTML is a markup language; it does not have logic (if statements, loops).

## Best Practices
- Always use the \`alt\` attribute on images for screen readers.
- Ensure proper nesting of elements (don't close a parent tag before closing its children).
- Use semantic tags instead of nesting endless \`<div>\`s (Divitis).

## Common Mistakes
- Forgetting to close tags (e.g., \`<p>Text</p>\` instead of \`<p>Text\`).
- Using inline CSS (\`style="..."\`) instead of an external stylesheet.
- Using heading tags (\`<h1>\` to \`<h6>\`) for styling rather than structural hierarchy.

## Interview Questions
1. **What is the purpose of the DOCTYPE declaration?**
   - It tells the web browser what version of HTML the page is written in.
2. **What are Semantic Elements?**
   - Elements with a meaning (e.g., \`<form>\`, \`<table>\`, \`<article>\`) that clearly describe their meaning to both the browser and the developer.

## Quick Revision
HTML = Structure. Uses tags and attributes. Focus on semantic tags for accessibility.

## Summary
HTML is the fundamental building block of the Web. While simple to learn, mastering semantic HTML is crucial for creating accessible and SEO-friendly websites.
`
  },
  {
    slug: 'css',
    title: 'CSS',
    category: 'Frontend',
    readTime: 7,
    content: `---
title: "CSS"
category: "Frontend"
readTime: 7
---

## Overview
Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML.

## Definition
CSS handles the look and feel of a web page, controlling layout, colors, typography, and animations.

## Beginner Explanation
If HTML is the skeleton of the house, CSS is the interior design, paint, and architecture that makes it look beautiful.

## Real World Example
When a website switches smoothly from light mode to dark mode, or when a button elegantly scales up when you hover over it, that is CSS in action.

## Syntax
\`\`\`css
body {
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
}
\`\`\`

## Code Example
\`\`\`css
/* Flexbox Layout Example */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #222;
}

.card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-10px);
}
\`\`\`

## Important Points
- **The Box Model:** Every element is a rectangular box composed of margins, borders, padding, and the actual content.
- **Flexbox & Grid:** Modern layout systems that replace older hacky methods like floats and tables.
- **Specificity:** The rule determining which styles apply when multiple rules target the same element.

## Best Practices
- Prefer external stylesheets over inline styles.
- Use REM and EM for font sizes and spacing instead of static PX for better accessibility.
- Organize CSS using methodologies like BEM (Block Element Modifier).

## Common Mistakes
- Misunderstanding the Box Model (forgetting that padding adds to total width unless \`box-sizing: border-box\` is used).
- Overusing \`!important\`, which makes debugging specificity nightmares.
- Not designing mobile-first.

## Interview Questions
1. **What is the CSS Box Model?**
   - It is a box that wraps around every HTML element, consisting of margins, borders, padding, and the actual content.
2. **Difference between Flexbox and CSS Grid?**
   - Flexbox is designed for one-dimensional layouts (either a row or a column). Grid is for two-dimensional layouts (rows and columns simultaneously).

## Quick Revision
CSS = Styling. Box Model = Content + Padding + Border + Margin. Layouts = Flexbox & Grid.

## Summary
CSS transforms plain text documents into engaging user experiences. Mastering modern CSS layouts and animations is essential for any frontend developer.
`
  },
  {
    slug: 'git',
    title: 'Git',
    category: 'DevOps',
    readTime: 6,
    content: `---
title: "Git"
category: "DevOps"
readTime: 6
---

## Overview
Git is a free and open-source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.

## Definition
Git is a version control system that tracks changes in any set of computer files, usually used for coordinating work among programmers.

## Beginner Explanation
Git is like a time machine and a save point system for your code. If you make a mistake, you can instantly go back in time to when the code worked. It also lets multiple people work on the same project without overwriting each other's work.

## Real World Example
Every major tech company uses Git. Platforms like GitHub and GitLab host Git repositories, enabling open-source collaboration across the globe.

## Syntax
\`\`\`bash
# Initialize a new repository
git init

# Check the status of files
git status
\`\`\`

## Code Example
\`\`\`bash
# A typical Git workflow
git checkout -b feature/new-login-page
git add .
git commit -m "feat: implement new login page UI"
git push origin feature/new-login-page

# Later, merging into main
git checkout main
git pull origin main
git merge feature/new-login-page
\`\`\`

## Important Points
- **Distributed:** Every developer has a full copy of the repository history locally.
- **Branches:** Lightweight pointers to a specific commit, allowing isolated environments for new features.
- **Commits:** Snapshots of the repository at a specific point in time.

## Best Practices
- Commit often, and write clear, descriptive commit messages.
- Never commit secrets (API keys, passwords). Use \`.gitignore\`.
- Use feature branches instead of committing directly to \`main\` or \`master\`.

## Common Mistakes
- Forgetting to pull before pushing, resulting in merge conflicts.
- Committing large binaries or node_modules.
- Running \`git push --force\` on a shared branch, erasing coworkers' commits.

## Interview Questions
1. **What is the difference between git pull and git fetch?**
   - \`git fetch\` downloads changes from the remote without modifying your local working state. \`git pull\` fetches and then automatically merges them into your current branch.
2. **What is a merge conflict?**
   - It occurs when two branches have changed the same part of the same file differently, and Git cannot automatically determine which change to keep.

## Quick Revision
Git = Version Control. init -> add -> commit -> push. Branches allow isolated development.

## Summary
Git is an indispensable tool in modern software development. Without it, collaboration at scale and managing software versions would be chaotic and highly error-prone.
`
  }
];

const writeNotes = () => {
  const notesDir = path.join(process.cwd(), 'src', 'content', 'notes');
  if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir, { recursive: true });
  }

  notes.forEach(note => {
    fs.writeFileSync(path.join(notesDir, note.slug + '.mdx'), note.content);
    console.log('Generated ' + note.slug + '.mdx');
  });
};

writeNotes();
