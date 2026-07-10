const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Starting Phase 3 Full Seeding...");

  // 1. Seed DSA Topics
  const topicsData = [
    { slug: "arrays", name: "Arrays", description: "Learn about array data structures, static vs dynamic arrays, and basic operations. Arrays are a collection of items stored at contiguous memory locations.", order: 1 },
    { slug: "strings", name: "Strings", description: "Master string manipulation, anagrams, and palindrome checks. Strings are immutable arrays of characters in many languages.", order: 2 },
    { slug: "linked-lists", name: "Linked Lists", description: "Understand singly and doubly linked lists, and traversal algorithms. Elements are stored in nodes with pointers to the next node.", order: 3 },
    { slug: "stacks", name: "Stacks", description: "LIFO (Last In First Out) data structures, stack implementations, and expression evaluation like valid parentheses.", order: 4 },
    { slug: "queues", name: "Queues", description: "FIFO (First In First Out) data structures, queues, circular queues, and priority queues used in BFS.", order: 5 },
    { slug: "trees", name: "Trees", description: "Hierarchical data structures, binary trees, BSTs, and traversals (inorder, preorder, postorder).", order: 6 },
    { slug: "graphs", name: "Graphs", description: "Nodes and edges, directed and undirected graphs. Graph traversal algorithms like BFS and DFS.", order: 7 },
    { slug: "two-pointers", name: "Two Pointers", description: "Optimize array and string traversal using multiple pointers to reduce time complexity to O(n).", order: 8 },
    { slug: "sliding-window", name: "Sliding Window", description: "Find subsets of data that satisfy certain criteria. Used heavily in substring and subarray problems.", order: 9 },
    { slug: "dynamic-programming", name: "Dynamic Programming", description: "Solve complex problems by breaking them down into simpler overlapping subproblems and memoizing results.", order: 10 },
  ];

  const topics = [];
  for (const t of topicsData) {
    const topic = await prisma.dSATopic.upsert({
      where: { slug: t.slug },
      update: t,
      create: t
    });
    topics.push(topic);
    console.log(`Seeded topic: ${topic.name}`);
  }

  const topicMap = topics.reduce((acc, t) => {
    acc[t.slug] = t.id;
    return acc;
  }, {});

  // 2. Seed Problems
  const problemsData = [
    // Arrays
    { slug: "two-sum", title: "Two Sum", difficulty: "Easy", timeEstimate: 15, tags: ["Array", "Hash Table"], companies: ["Google", "Amazon", "Facebook"], hints: ["Can we do it in one pass?", "Use a hash map to store complements."], topicId: topicMap["arrays"] },
    { slug: "product-of-array-except-self", title: "Product of Array Except Self", difficulty: "Medium", timeEstimate: 30, tags: ["Array", "Prefix Sum"], companies: ["Apple", "Amazon"], hints: ["Calculate prefix and suffix products."], topicId: topicMap["arrays"] },
    { slug: "first-missing-positive", title: "First Missing Positive", difficulty: "Hard", timeEstimate: 45, tags: ["Array", "Hash Table"], companies: ["Amazon", "Microsoft"], hints: ["Think about cyclic sort."], topicId: topicMap["arrays"] },
    
    // Strings
    { slug: "valid-anagram", title: "Valid Anagram", difficulty: "Easy", timeEstimate: 15, tags: ["String", "Hash Table"], companies: ["Uber", "Google"], hints: ["Count character frequencies."], topicId: topicMap["strings"] },
    { slug: "group-anagrams", title: "Group Anagrams", difficulty: "Medium", timeEstimate: 25, tags: ["String", "Hash Table"], companies: ["Amazon", "Facebook"], hints: ["Sort the string to use as a hash key."], topicId: topicMap["strings"] },
    { slug: "minimum-window-substring", title: "Minimum Window Substring", difficulty: "Hard", timeEstimate: 45, tags: ["String", "Sliding Window"], companies: ["LinkedIn", "Airbnb"], hints: ["Use sliding window with two pointers."], topicId: topicMap["strings"] },
    
    // Linked Lists
    { slug: "reverse-linked-list", title: "Reverse Linked List", difficulty: "Easy", timeEstimate: 15, tags: ["Linked List"], companies: ["Apple", "Microsoft"], hints: ["Use three pointers: prev, curr, next."], topicId: topicMap["linked-lists"] },
    { slug: "lru-cache", title: "LRU Cache", difficulty: "Medium", timeEstimate: 35, tags: ["Linked List", "Design"], companies: ["Amazon", "Google"], hints: ["Use a doubly linked list and a hash map."], topicId: topicMap["linked-lists"] },
    { slug: "reverse-nodes-in-k-group", title: "Reverse Nodes in k-Group", difficulty: "Hard", timeEstimate: 40, tags: ["Linked List"], companies: ["Microsoft", "Facebook"], hints: ["Reverse the groups iteratively or recursively."], topicId: topicMap["linked-lists"] },
    
    // Stacks
    { slug: "valid-parentheses", title: "Valid Parentheses", difficulty: "Easy", timeEstimate: 15, tags: ["Stack", "String"], companies: ["Facebook", "Amazon"], hints: ["Use a stack to keep track of open brackets."], topicId: topicMap["stacks"] },
    { slug: "daily-temperatures", title: "Daily Temperatures", difficulty: "Medium", timeEstimate: 30, tags: ["Stack", "Monotonic Stack"], companies: ["Google", "LinkedIn"], hints: ["Use a monotonic decreasing stack."], topicId: topicMap["stacks"] },
    { slug: "largest-rectangle-in-histogram", title: "Largest Rectangle in Histogram", difficulty: "Hard", timeEstimate: 45, tags: ["Stack", "Monotonic Stack"], companies: ["Amazon", "Google"], hints: ["Maintain a monotonic increasing stack."], topicId: topicMap["stacks"] },

    // Queues
    { slug: "number-of-recent-calls", title: "Number of Recent Calls", difficulty: "Easy", timeEstimate: 15, tags: ["Queue"], companies: ["Google"], hints: ["Use a queue to store timestamps."], topicId: topicMap["queues"] },
    { slug: "design-circular-queue", title: "Design Circular Queue", difficulty: "Medium", timeEstimate: 30, tags: ["Queue", "Design"], companies: ["Apple"], hints: ["Use an array with a fixed size and modulo operator."], topicId: topicMap["queues"] },
    { slug: "sliding-window-maximum", title: "Sliding Window Maximum", difficulty: "Hard", timeEstimate: 45, tags: ["Queue", "Sliding Window", "Monotonic Queue"], companies: ["Amazon", "Google"], hints: ["Use a deque to store indices."], topicId: topicMap["queues"] },

    // Trees
    { slug: "maximum-depth-of-binary-tree", title: "Maximum Depth of Binary Tree", difficulty: "Easy", timeEstimate: 10, tags: ["Tree", "DFS"], companies: ["Google", "Apple"], hints: ["Use recursion."], topicId: topicMap["trees"] },
    { slug: "lowest-common-ancestor-of-a-binary-search-tree", title: "Lowest Common Ancestor of a Binary Search Tree", difficulty: "Medium", timeEstimate: 25, tags: ["Tree", "BST"], companies: ["LinkedIn"], hints: ["Use the properties of BST."], topicId: topicMap["trees"] },
    { slug: "binary-tree-maximum-path-sum", title: "Binary Tree Maximum Path Sum", difficulty: "Hard", timeEstimate: 45, tags: ["Tree", "DFS"], companies: ["Facebook", "Amazon"], hints: ["Keep track of the max sum globally."], topicId: topicMap["trees"] },

    // Graphs
    { slug: "find-the-town-judge", title: "Find the Town Judge", difficulty: "Easy", timeEstimate: 15, tags: ["Graph"], companies: ["Amazon"], hints: ["Count in-degrees and out-degrees."], topicId: topicMap["graphs"] },
    { slug: "number-of-islands", title: "Number of Islands", difficulty: "Medium", timeEstimate: 30, tags: ["Array", "Graph", "BFS"], companies: ["Amazon", "Microsoft"], hints: ["Use BFS or DFS to traverse islands."], topicId: topicMap["graphs"] },
    { slug: "word-ladder", title: "Word Ladder", difficulty: "Hard", timeEstimate: 45, tags: ["Graph", "BFS"], companies: ["Amazon", "Facebook"], hints: ["Use BFS for shortest path in an unweighted graph."], topicId: topicMap["graphs"] },

    // Two Pointers
    { slug: "valid-palindrome", title: "Valid Palindrome", difficulty: "Easy", timeEstimate: 15, tags: ["Two Pointers", "String"], companies: ["Facebook", "Microsoft"], hints: ["Use two pointers starting from both ends."], topicId: topicMap["two-pointers"] },
    { slug: "container-with-most-water", title: "Container With Most Water", difficulty: "Medium", timeEstimate: 25, tags: ["Two Pointers", "Array"], companies: ["Google", "Amazon"], hints: ["Move the pointer pointing to the shorter line."], topicId: topicMap["two-pointers"] },
    { slug: "trapping-rain-water", title: "Trapping Rain Water", difficulty: "Hard", timeEstimate: 40, tags: ["Two Pointers", "Array"], companies: ["Amazon", "Google"], hints: ["Calculate left max and right max arrays."], topicId: topicMap["two-pointers"] },

    // Sliding Window
    { slug: "best-time-to-buy-and-sell-stock", title: "Best Time to Buy and Sell Stock", difficulty: "Easy", timeEstimate: 15, tags: ["Array", "Sliding Window"], companies: ["Amazon", "Microsoft"], hints: ["Track the minimum price seen so far."], topicId: topicMap["sliding-window"] },
    { slug: "longest-substring-without-repeating-characters", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", timeEstimate: 30, tags: ["String", "Sliding Window"], companies: ["Amazon", "Bloomberg"], hints: ["Use a sliding window with a set."], topicId: topicMap["sliding-window"] },
    { slug: "sliding-window-maximum-2", title: "Sliding Window Maximum 2", difficulty: "Hard", timeEstimate: 45, tags: ["Queue", "Sliding Window"], companies: ["Google", "Amazon"], hints: ["Use Monotonic Queue."], topicId: topicMap["sliding-window"] },

    // Dynamic Programming
    { slug: "climbing-stairs", title: "Climbing Stairs", difficulty: "Easy", timeEstimate: 15, tags: ["Dynamic Programming", "Math"], companies: ["Amazon", "Apple"], hints: ["Fibonacci sequence."], topicId: topicMap["dynamic-programming"] },
    { slug: "coin-change", title: "Coin Change", difficulty: "Medium", timeEstimate: 30, tags: ["Dynamic Programming", "BFS"], companies: ["Amazon", "Microsoft"], hints: ["Bottom-up DP table."], topicId: topicMap["dynamic-programming"] },
    { slug: "edit-distance", title: "Edit Distance", difficulty: "Hard", timeEstimate: 45, tags: ["Dynamic Programming", "String"], companies: ["Google", "Amazon"], hints: ["2D DP table matching characters."], topicId: topicMap["dynamic-programming"] },
  ];

  for (const p of problemsData) {
    await prisma.problem.upsert({
      where: { slug: p.slug },
      update: p,
      create: p
    });
    console.log(`Seeded problem: ${p.title}`);
  }

  // 3. Seed Quizzes
  const quizzesData = topics.map(t => ({
    topicId: t.id,
    title: `${t.name} Mastery Quiz`,
    questions: [
      {
        question: `What is the primary advantage of ${t.name}?`,
        options: ["O(1) access time", "Dynamic sizing", "Easy traversal", "Hierarchical structure"],
        correctOption: 0
      },
      {
        question: `Which algorithm is best suited for ${t.name}?`,
        options: ["Binary Search", "DFS", "Two Pointers", "Sliding Window"],
        correctOption: 2
      },
      {
        question: `What is the worst-case time complexity of finding an element in ${t.name}?`,
        options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
        correctOption: 2
      }
    ]
  }));

  for (const q of quizzesData) {
    // Check if quiz exists for topic
    const existing = await prisma.quiz.findFirst({ where: { topicId: q.topicId }});
    if (existing) {
      await prisma.quiz.update({ where: { id: existing.id }, data: q });
    } else {
      await prisma.quiz.create({ data: q });
    }
    console.log(`Seeded quiz for topicId: ${q.topicId}`);
  }

  // 4. Seed Projects
  const projectsData = [
    // Beginner
    { slug: "todo-list-app", title: "Todo List App", description: "Build a simple Todo list application with full CRUD capabilities. Focus on state management and UI interactions.", difficulty: "Beginner", techStack: ["HTML", "CSS", "JavaScript"], estimatedHours: 4, learningOutcomes: ["DOM Manipulation", "Event Listeners", "Local Storage"] },
    { slug: "weather-app", title: "Weather App", description: "Fetch weather data from an external API and display it in a beautiful UI.", difficulty: "Beginner", techStack: ["React", "CSS", "Fetch API"], estimatedHours: 5, learningOutcomes: ["API Integration", "Promises"] },
    { slug: "calculator-clone", title: "Calculator Clone", description: "Build an iOS calculator clone. Great for practicing complex state and logic.", difficulty: "Beginner", techStack: ["HTML", "CSS", "JavaScript"], estimatedHours: 6, learningOutcomes: ["CSS Grid", "JS Logic"] },
    { slug: "markdown-previewer", title: "Markdown Previewer", description: "Type markdown in an editor and preview it live. Focus on two-way data binding.", difficulty: "Beginner", techStack: ["React", "Marked.js"], estimatedHours: 4, learningOutcomes: ["Controlled Components", "Libraries"] },
    
    // Intermediate
    { slug: "expense-tracker", title: "Expense Tracker", description: "Track your income and expenses, visualized with charts.", difficulty: "Intermediate", techStack: ["React", "Context API", "Chart.js"], estimatedHours: 10, learningOutcomes: ["Global State", "Data Visualization"] },
    { slug: "movie-database", title: "Movie Database", description: "Browse movies, search, and view details using the TMDB API.", difficulty: "Intermediate", techStack: ["React", "Tailwind CSS", "React Router"], estimatedHours: 12, learningOutcomes: ["Routing", "Pagination"] },
    { slug: "chat-application", title: "Real-time Chat App", description: "Create a real-time chat application using WebSockets.", difficulty: "Intermediate", techStack: ["Node.js", "Socket.io", "React"], estimatedHours: 15, learningOutcomes: ["WebSockets", "Real-time Communication", "Authentication"] },

    // Advanced
    { slug: "e-commerce-storefront", title: "E-Commerce Storefront", description: "Build a fully responsive e-commerce storefront with a shopping cart and Stripe checkout.", difficulty: "Advanced", techStack: ["Next.js", "TypeScript", "Stripe"], estimatedHours: 25, learningOutcomes: ["Server-Side Rendering", "Payment Integration", "State Management"] },
    { slug: "social-media-dashboard", title: "Social Media Dashboard", description: "A complex dashboard showing analytics with authentication and database.", difficulty: "Advanced", techStack: ["Next.js", "Prisma", "PostgreSQL"], estimatedHours: 30, learningOutcomes: ["Fullstack Development", "ORM", "Auth"] },
    { slug: "kanban-board", title: "Kanban Task Board", description: "A drag-and-drop Trello clone. Focus on complex state and drag events.", difficulty: "Advanced", techStack: ["React", "DnD", "Redux"], estimatedHours: 20, learningOutcomes: ["Drag and Drop", "Redux Toolkit"] },
  ];

  for (const pr of projectsData) {
    await prisma.project.upsert({
      where: { slug: pr.slug },
      update: pr,
      create: pr
    });
    console.log(`Seeded project: ${pr.title}`);
  }

  console.log("Phase 3 Seeding Complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
