export type DSATopic = {
  id: string;
  title: string;
  category: "Data Structures" | "Algorithms";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
};

export const dsaTopics: DSATopic[] = [
  {
    id: "arrays",
    title: "Arrays",
    category: "Data Structures",
    difficulty: "Beginner",
    description: "A collection of items stored at contiguous memory locations. Used to store multiple items of the same type together.",
    timeComplexity: "O(1) Access",
    spaceComplexity: "O(n)",
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    category: "Data Structures",
    difficulty: "Beginner",
    description: "A linear data structure where elements are not stored at contiguous location; every element is a separate object with a data part and address part.",
    timeComplexity: "O(n) Access",
    spaceComplexity: "O(n)",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    category: "Algorithms",
    difficulty: "Beginner",
    description: "A search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    category: "Algorithms",
    difficulty: "Advanced",
    description: "An algorithmic technique for solving an optimization problem by breaking it down into simpler subproblems and utilizing the fact that the optimal solution to the overall problem depends upon the optimal solution to its subproblems.",
    timeComplexity: "Varies",
    spaceComplexity: "Varies",
  },
  {
    id: "graphs",
    title: "Graphs",
    category: "Data Structures",
    difficulty: "Advanced",
    description: "A non-linear data structure consisting of nodes and edges. Used to represent networks.",
    timeComplexity: "Varies based on operation",
    spaceComplexity: "O(V + E)",
  }
];
