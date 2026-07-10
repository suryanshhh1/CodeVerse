export type LanguageItem = {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  features: string[];
};

export const languages: LanguageItem[] = [
  {
    id: "python",
    name: "Python",
    description: "A high-level, interpreted language known for its readability and widespread use in AI, Data Science, and Web Development.",
    icon: "🐍",
    difficulty: "Beginner",
    features: ["Simple Syntax", "Dynamically Typed", "Huge Ecosystem", "Object-Oriented"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    description: "The language of the web. Essential for creating interactive and dynamic websites.",
    icon: "⚡",
    difficulty: "Beginner",
    features: ["Event-Driven", "Asynchronous", "Functional", "Prototype-based OOP"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    description: "A typed superset of JavaScript that compiles to plain JavaScript. Adds static typing for better tooling.",
    icon: "📘",
    difficulty: "Intermediate",
    features: ["Static Typing", "Interfaces", "Generics", "Great IDE Support"],
  },
  {
    id: "cplusplus",
    name: "C++",
    description: "A powerful high-performance language used in game engines, OS development, and high-frequency trading.",
    icon: "⚙️",
    difficulty: "Advanced",
    features: ["Manual Memory Management", "Fast Execution", "Object-Oriented", "Standard Template Library (STL)"],
  },
  {
    id: "go",
    name: "Go (Golang)",
    description: "An open-source language developed by Google, known for its simplicity and excellent concurrency support.",
    icon: "🐹",
    difficulty: "Intermediate",
    features: ["Fast Compilation", "Goroutines", "Garbage Collected", "Static Typing"],
  }
];
