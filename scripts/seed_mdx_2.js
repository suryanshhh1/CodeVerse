const fs = require('fs');
const path = require('path');

const notes = [
  {
    slug: 'cpp',
    title: 'C++',
    category: 'Backend',
    readTime: 12,
    content: `---
title: "C++"
category: "Backend"
readTime: 12
---

## Overview
C++ is a high-performance, compiled, general-purpose programming language. It is an extension of the C programming language that includes object-oriented, generic, and functional features.

## Definition
C++ is a statically typed, compiled, object-oriented language known for its system-level access and high performance.

## Beginner Explanation
If C is a manual transmission car, C++ is a manual car but with autopilot options, an upgraded stereo, and cup holders. You still have full control over the engine (memory), but you have a lot of tools to make driving (programming) easier.

## Real World Example
Game engines (Unreal Engine), high-frequency trading systems, operating systems, and web browsers (Chrome V8 engine) are written in C++ due to its raw speed and memory control.

## Syntax
\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
\`\`\`

## Code Example
\`\`\`cpp
#include <iostream>
#include <vector>

class Inventory {
private:
    std::vector<std::string> items;
public:
    void addItem(std::string item) {
        items.push_back(item);
    }
    void showInventory() {
        for(const auto& item : items) {
            std::cout << "- " << item << "\\n";
        }
    }
};

int main() {
    Inventory myInv;
    myInv.addItem("Sword");
    myInv.showInventory();
    return 0;
}
\`\`\`

## Important Points
- **Manual Memory Management:** You must manage memory manually using \`new\` and \`delete\` (or smart pointers).
- **STL (Standard Template Library):** Provides a rich set of methods for manipulating data structures.
- **Pointers:** Variables that store memory addresses.

## Best Practices
- Prefer smart pointers (\`std::unique_ptr\`, \`std::shared_ptr\`) over raw pointers.
- Use \`const\` and references wherever possible to prevent unnecessary copying.
- Use auto keyword when the type is obvious.

## Common Mistakes
- Forgetting to free dynamically allocated memory (Memory Leaks).
- Accessing out-of-bounds array elements (Segmentation Fault).
- Using uninitialized variables.

## Interview Questions
1. **What is a virtual function?**
   - A member function in a base class that you redefine in a derived class. It tells the compiler to perform dynamic linkage or late binding.
2. **What is the difference between malloc() and new?**
   - \`new\` allocates memory and calls the constructor, whereas \`malloc\` only allocates memory.

## Quick Revision
C++ = C + Classes. Highly performant, requires manual memory management, supports pointers and multiple inheritance.

## Summary
C++ remains the king of performance-critical applications. Mastering C++ gives you a profound understanding of how computers work at a fundamental level.
`
  },
  {
    slug: 'react',
    title: 'React',
    category: 'Frontend',
    readTime: 10,
    content: `---
title: "React"
category: "Frontend"
readTime: 10
---

## Overview
React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta (formerly Facebook).

## Definition
React is a declarative, component-based library for building interactive user interfaces.

## Beginner Explanation
Imagine building a house with Lego blocks. Instead of building the whole house as one piece, you build windows, doors, and walls separately, and then assemble them. React lets you build websites exactly like that using "Components".

## Real World Example
Facebook, Instagram, Netflix, and Airbnb use React to build fast, interactive user interfaces that update without reloading the page.

## Syntax
\`\`\`jsx
function Greeting({ name }) {
    return <h1>Hello, {name}!</h1>;
}
\`\`\`

## Code Example
\`\`\`jsx
import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className="p-4 border rounded">
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}
\`\`\`

## Important Points
- **Virtual DOM:** React keeps a lightweight representation of the real DOM in memory, making updates extremely fast.
- **JSX:** A syntax extension for JavaScript that looks like HTML.
- **State & Props:** Data is managed locally via State, and passed down to children via Props.

## Best Practices
- Keep components small and focused on a single responsibility.
- Use functional components and Hooks instead of class components.
- Lift state up only when necessary to avoid excessive re-renders.

## Common Mistakes
- Mutating state directly instead of using the setter function (e.g., \`state = newValue\`).
- Forgetting to include a unique \`key\` prop when rendering arrays.
- Missing dependencies in the \`useEffect\` dependency array.

## Interview Questions
1. **What is the Virtual DOM?**
   - A programming concept where an ideal, or "virtual", representation of a UI is kept in memory and synced with the "real" DOM.
2. **Explain useEffect.**
   - A Hook that lets you perform side effects in function components, like fetching data or subscribing to events.

## Quick Revision
React = UI Library, uses JSX, Virtual DOM, Components, Props, and State. Data flows one way (downwards).

## Summary
React revolutionized frontend development by introducing the component-based architecture and Virtual DOM. It remains the industry standard for modern web development.
`
  },
  {
    slug: 'sql',
    title: 'SQL',
    category: 'Database',
    readTime: 8,
    content: `---
title: "SQL"
category: "Database"
readTime: 8
---

## Overview
SQL (Structured Query Language) is a domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS).

## Definition
SQL is the standard language for querying, updating, and managing relational databases.

## Beginner Explanation
Imagine an Excel spreadsheet with thousands of rows. SQL is a way to speak to the computer and say, "Give me all the rows where the user is older than 25 and lives in New York," and it instantly fetches exactly that.

## Real World Example
Every time you log into a website, a SQL query checks if your username and password exist in the Users database table. E-commerce sites use SQL to track inventory and orders.

## Syntax
\`\`\`sql
SELECT first_name, last_name 
FROM employees 
WHERE department = 'Sales';
\`\`\`

## Code Example
\`\`\`sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email) 
VALUES ('johndoe', 'john@example.com');

SELECT * FROM users WHERE username = 'johndoe';
\`\`\`

## Important Points
- **Relational Data:** Data is stored in tables consisting of rows and columns.
- **ACID Properties:** Ensures database transactions are processed reliably (Atomicity, Consistency, Isolation, Durability).
- **Primary/Foreign Keys:** Used to uniquely identify rows and link tables together.

## Best Practices
- Always use parameterized queries in your application code to prevent SQL Injection.
- Index columns that are frequently used in WHERE clauses to speed up reads.
- Avoid using \`SELECT *\` in production; specify only the columns you need.

## Common Mistakes
- Forgetting the WHERE clause in an UPDATE or DELETE statement (updating/deleting the entire table).
- Creating too many indexes, which slows down write operations.
- Storing sensitive data like passwords in plain text.

## Interview Questions
1. **What is a JOIN?**
   - A clause used to combine rows from two or more tables, based on a related column between them (e.g., INNER JOIN, LEFT JOIN).
2. **What is normalization?**
   - The process of organizing data in a database to reduce redundancy and improve data integrity.

## Quick Revision
SQL is for relational databases. DDL (Data Definition: CREATE/ALTER), DML (Data Manipulation: SELECT/INSERT/UPDATE). Uses Primary and Foreign keys.

## Summary
SQL is a foundational skill for any backend or full-stack developer. Relational databases remain the backbone of the vast majority of software applications worldwide.
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
