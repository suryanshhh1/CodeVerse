export type CheatSheet = {
  id: string;
  title: string;
  icon: string;
  sections: {
    heading: string;
    items: { command: string; description: string }[];
  }[];
};

export const cheatSheets: CheatSheet[] = [
  {
    id: "git",
    title: "Git & GitHub",
    icon: "branch",
    sections: [
      {
        heading: "Basic Commands",
        items: [
          { command: "git init", description: "Initialize a local Git repository" },
          { command: "git clone [url]", description: "Clone a public repository" },
          { command: "git status", description: "Check status of working tree" },
          { command: "git add .", description: "Add all current changes to the next commit" },
          { command: "git commit -m '[msg]'", description: "Commit changes with a message" }
        ]
      },
      {
        heading: "Branching",
        items: [
          { command: "git branch", description: "List all local branches" },
          { command: "git checkout -b [branch]", description: "Create and switch to a new branch" },
          { command: "git merge [branch]", description: "Merge specified branch into current" }
        ]
      }
    ]
  },
  {
    id: "linux",
    title: "Linux Commands",
    icon: "terminal",
    sections: [
      {
        heading: "File Operations",
        items: [
          { command: "ls -la", description: "List all files including hidden" },
          { command: "cd [dir]", description: "Change directory" },
          { command: "mkdir [name]", description: "Create a directory" },
          { command: "rm -rf [dir]", description: "Remove directory forcefully" },
          { command: "touch [file]", description: "Create a new empty file" }
        ]
      }
    ]
  }
];
