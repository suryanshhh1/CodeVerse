export type QuizQuestion = {
  id: string;
  topicId: string; // Links to DSA, Languages, or Roadmaps
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};

export const quizzes: QuizQuestion[] = [
  {
    id: "q1",
    topicId: "arrays",
    question: "What is the time complexity of accessing an element in an array by its index?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    correctAnswerIndex: 0,
    explanation: "Arrays allow random access to elements via their index, which takes constant time O(1) assuming the memory address can be computed directly.",
  },
  {
    id: "q2",
    topicId: "python",
    question: "Which of the following is used to define a block of code in Python language?",
    options: ["Indentation", "Key", "Brackets", "All of the mentioned"],
    correctAnswerIndex: 0,
    explanation: "Python uses indentation (whitespace) to define code blocks, unlike many other languages that use curly braces.",
  },
  {
    id: "q3",
    topicId: "binary-search",
    question: "What is a mandatory condition for Binary Search to work?",
    options: ["The array must be sorted", "The array must be reversed", "The array must contain only integers", "There is no condition"],
    correctAnswerIndex: 0,
    explanation: "Binary search requires the input array to be sorted because it repeatedly checks the middle element and halves the search space based on whether the target is larger or smaller.",
  }
];
