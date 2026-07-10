const fs = require('fs');
const path = require('path');

const notes = [
  {
    slug: 'java',
    title: 'Java',
    category: 'Backend',
    readTime: 10,
    content: `---
title: "Java"
category: "Backend"
readTime: 10
---

## Overview
Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let programmers write once, run anywhere (WORA).

## Definition
Java is a statically-typed, object-oriented compiled language that runs on the Java Virtual Machine (JVM).

## Beginner Explanation
Imagine you want to build a house, but you want to be able to move this house to any city in the world without rebuilding it. Java is like a magical blueprint (code) that gets turned into a universal house (bytecode) which can be placed on any foundation (JVM) anywhere.

## Real World Example
Android apps, large-scale enterprise systems like banking software, and high-frequency trading platforms are primarily built using Java due to its reliability, multithreading capabilities, and robust ecosystem.

## Syntax
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

## Code Example
\`\`\`java
public class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        }
    }

    public double getBalance() {
        return balance;
    }
}
\`\`\`

## Important Points
- **Platform Independent:** Bytecode runs on JVM, not directly on the OS.
- **Garbage Collection:** Automatic memory management.
- **Multithreading:** Built-in support for concurrent execution.

## Best Practices
- Always use descriptive naming conventions (CamelCase for classes, camelCase for variables).
- Use interface-based programming instead of concrete implementation inheritance.
- Leverage the \`final\` keyword for immutability whenever possible.

## Common Mistakes
- Comparing strings using \`==\` instead of \`.equals()\`.
- Forgetting to handle exceptions properly (swallowing exceptions).
- Creating memory leaks by holding onto object references unnecessarily.

## Interview Questions
1. **What is the difference between JVM, JRE, and JDK?**
   - JVM executes bytecode. JRE contains JVM + libraries. JDK contains JRE + development tools.
2. **How does Garbage Collection work in Java?**
   - It automatically identifies and discards objects that are no longer referenced by the program to free up memory.

## Quick Revision
Java is an OOP, statically-typed language running on JVM. It is strictly pass-by-value. It is widely used in enterprise and Android development.

## Summary
Java remains one of the most popular and powerful programming languages in the world. Its "write once, run anywhere" philosophy, combined with strong memory management and a massive ecosystem, makes it the go-to choice for complex, large-scale applications.
`
  },
  {
    slug: 'python',
    title: 'Python',
    category: 'General Purpose',
    readTime: 8,
    content: `---
title: "Python"
category: "General Purpose"
readTime: 8
---

## Overview
Python is a high-level, interpreted, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation.

## Definition
Python is a dynamically typed, interpreted language known for its simplicity and extensive standard library.

## Beginner Explanation
Python is like writing instructions in plain English. Instead of worrying about complex symbols and brackets, you just write what you want the computer to do, step by step.

## Real World Example
Instagram's backend is powered heavily by Python (Django). It is also the dominant language in Data Science, AI (ChatGPT was trained using Python libraries), and scripting.

## Syntax
\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("World")
\`\`\`

## Code Example
\`\`\`python
class DataAnalyzer:
    def __init__(self, data):
        self.data = data
        
    def get_average(self):
        if not self.data:
            return 0
        return sum(self.data) / len(self.data)

analyzer = DataAnalyzer([10, 20, 30])
print(f"Average: {analyzer.get_average()}")
\`\`\`

## Important Points
- **Dynamically Typed:** Variables don't need explicit type declarations.
- **Interpreted:** Code runs line-by-line, making debugging easier.
- **Indentation:** White-space is structurally significant.

## Best Practices
- Follow PEP 8 guidelines for code formatting.
- Use list comprehensions for cleaner loop constructs.
- Utilize virtual environments for dependency management.

## Common Mistakes
- Modifying a list while iterating over it.
- Misunderstanding mutable default arguments in functions (e.g., \`def func(items=[])\`).
- Mixing tabs and spaces for indentation.

## Interview Questions
1. **What is a Python decorator?**
   - A function that takes another function and extends its behavior without explicitly modifying it.
2. **What is the Global Interpreter Lock (GIL)?**
   - A mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes at once.

## Quick Revision
Python is an interpreted, dynamically typed language. It uses indentation for blocks. Perfect for scripting, backend (Django/FastAPI), and AI/Data Science.

## Summary
Python's elegant syntax and dynamic typing, together with its interpreted nature, make it an ideal language for scripting and rapid application development in many areas on most platforms.
`
  },
  {
    slug: 'javascript',
    title: 'JavaScript',
    category: 'Frontend',
    readTime: 9,
    content: `---
title: "JavaScript"
category: "Frontend"
readTime: 9
---

## Overview
JavaScript is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it.

## Definition
JavaScript is a multi-paradigm, dynamic language with types and operators, standard built-in objects, and methods.

## Beginner Explanation
If a website is a house, HTML is the structure (walls), CSS is the design (paint), and JavaScript is the electricity and plumbing that makes things actually work (buttons clicking, data loading).

## Real World Example
Every interactive website you use (Twitter, Facebook, YouTube) uses JavaScript to fetch new data without reloading the page, handle clicks, and play animations.

## Syntax
\`\`\`javascript
const greet = (name) => {
    console.log(\`Hello, \${name}!\`);
};
greet("World");
\`\`\`

## Code Example
\`\`\`javascript
class UserTracker {
    constructor() {
        this.users = new Set();
    }

    async fetchUsers() {
        try {
            const response = await fetch('https://api.example.com/users');
            const data = await response.json();
            data.forEach(user => this.users.add(user.name));
            return Array.from(this.users);
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    }
}
\`\`\`

## Important Points
- **Single-Threaded:** Runs on a single thread but handles concurrency via the Event Loop.
- **First-Class Functions:** Functions are treated like any other variable.
- **Prototypal Inheritance:** Objects inherit from other objects, not classes.

## Best Practices
- Always use \`const\` or \`let\` instead of \`var\`.
- Use strict equality (\`===\`) to avoid type coercion bugs.
- Prefer async/await over raw Promises for readability.

## Common Mistakes
- Misunderstanding how \`this\` binding works in different contexts.
- Forgetting to handle Promise rejections.
- Accidentally creating global variables by omitting variable declarations.

## Interview Questions
1. **Explain the Event Loop.**
   - It constantly checks the call stack and the task queue. If the stack is empty, it pushes the first task from the queue to the stack to execute.
2. **What is a closure?**
   - A function bundled together with its lexical environment, allowing it to remember the variables from its outer scope even after the outer function has finished executing.

## Quick Revision
JavaScript is single-threaded but asynchronous via the event loop. Uses prototypal inheritance. The standard language of the web.

## Summary
JavaScript has evolved from a simple client-side scripting language into a versatile, powerful tool capable of driving complex web applications, server-side backends (Node.js), and mobile applications.
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
