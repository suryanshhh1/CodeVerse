export type RoadmapItem = {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedHours: number;
  prerequisites: string[];
  topics: string[];
};

export const roadmaps: RoadmapItem[] = [
  { id: "computer-science-fundamentals", title: "Computer Science Fundamentals", description: "The core foundation of computer science.", difficulty: "Beginner", estimatedHours: 40, prerequisites: [], topics: ["Variables", "Memory", "Architecture", "Algorithms"] },
  { id: "frontend-development", title: "Frontend Web Development", description: "Learn to build interactive user interfaces.", difficulty: "Beginner", estimatedHours: 120, prerequisites: ["Basic Computer Skills"], topics: ["HTML", "CSS", "JavaScript", "React", "Next.js"] },
  { id: "backend-development", title: "Backend Web Development", description: "Master APIs, servers, and databases.", difficulty: "Intermediate", estimatedHours: 150, prerequisites: ["Frontend Basics"], topics: ["Node.js", "Express", "REST APIs", "GraphQL"] },
  { id: "fullstack-development", title: "Full Stack Development", description: "Connect frontend and backend ecosystems.", difficulty: "Advanced", estimatedHours: 250, prerequisites: ["Frontend", "Backend"], topics: ["MERN Stack", "Next.js", "Deployment"] },
  { id: "mobile-development", title: "Mobile Development", description: "Build apps for iOS and Android.", difficulty: "Intermediate", estimatedHours: 150, prerequisites: ["JavaScript / React"], topics: ["React Native", "Flutter", "Swift", "Kotlin"] },
  { id: "artificial-intelligence", title: "Artificial Intelligence", description: "The broad field of creating intelligent machines.", difficulty: "Advanced", estimatedHours: 200, prerequisites: ["Python", "Math"], topics: ["Search Algorithms", "Logic", "Knowledge Representation"] },
  { id: "machine-learning", title: "Machine Learning", description: "Train models to learn from data.", difficulty: "Advanced", estimatedHours: 200, prerequisites: ["Python", "Linear Algebra", "Calculus"], topics: ["Supervised Learning", "Unsupervised Learning", "Scikit-Learn"] },
  { id: "deep-learning", title: "Deep Learning", description: "Neural networks and deep learning architectures.", difficulty: "Advanced", estimatedHours: 180, prerequisites: ["Machine Learning"], topics: ["Neural Networks", "TensorFlow", "PyTorch"] },
  { id: "generative-ai", title: "Generative AI", description: "Models that generate text, images, and audio.", difficulty: "Advanced", estimatedHours: 100, prerequisites: ["Deep Learning"], topics: ["GANs", "Diffusion Models", "Transformers"] },
  { id: "prompt-engineering", title: "Prompt Engineering", description: "Master the art of communicating with LLMs.", difficulty: "Beginner", estimatedHours: 30, prerequisites: [], topics: ["Zero-shot", "Few-shot", "Chain of Thought"] },
  { id: "llms", title: "Large Language Models (LLMs)", description: "Dive deep into modern language models.", difficulty: "Advanced", estimatedHours: 150, prerequisites: ["Deep Learning", "NLP"], topics: ["Transformers", "Attention Mechanism", "Fine-Tuning"] },
  { id: "ai-agents", title: "AI Agents", description: "Building autonomous AI systems that take actions.", difficulty: "Advanced", estimatedHours: 120, prerequisites: ["LLMs", "Python"], topics: ["LangChain", "AutoGPT", "Tool Use"] },
  { id: "computer-vision", title: "Computer Vision", description: "Enable machines to understand images.", difficulty: "Advanced", estimatedHours: 160, prerequisites: ["Deep Learning"], topics: ["CNNs", "Object Detection", "OpenCV"] },
  { id: "nlp", title: "Natural Language Processing", description: "Processing and understanding human language.", difficulty: "Advanced", estimatedHours: 150, prerequisites: ["Machine Learning"], topics: ["Tokenization", "Embeddings", "Sequence Models"] },
  { id: "data-science", title: "Data Science", description: "Extracting knowledge and insights from data.", difficulty: "Intermediate", estimatedHours: 200, prerequisites: ["Python", "Statistics"], topics: ["Pandas", "Matplotlib", "Jupyter"] },
  { id: "data-analytics", title: "Data Analytics", description: "Analyzing data to find actionable trends.", difficulty: "Beginner", estimatedHours: 120, prerequisites: ["Basic Math"], topics: ["Excel", "Tableau", "SQL"] },
  { id: "data-engineering", title: "Data Engineering", description: "Building robust data pipelines and warehouses.", difficulty: "Advanced", estimatedHours: 180, prerequisites: ["SQL", "Python"], topics: ["ETL", "Apache Spark", "Airflow"] },
  { id: "cybersecurity", title: "Cybersecurity", description: "Protecting systems, networks, and programs.", difficulty: "Intermediate", estimatedHours: 250, prerequisites: ["Networking", "OS"], topics: ["Cryptography", "Ethical Hacking", "Network Security"] },
  { id: "cloud-computing", title: "Cloud Computing", description: "Delivering computing services over the internet.", difficulty: "Intermediate", estimatedHours: 150, prerequisites: ["Networking"], topics: ["IaaS", "PaaS", "SaaS"] },
  { id: "devops", title: "DevOps", description: "Combining software development and IT operations.", difficulty: "Advanced", estimatedHours: 200, prerequisites: ["Cloud Computing", "Linux"], topics: ["CI/CD", "Infrastructure as Code", "Monitoring"] },
  { id: "docker", title: "Docker", description: "Containerizing applications for consistent environments.", difficulty: "Intermediate", estimatedHours: 40, prerequisites: ["Linux Basics"], topics: ["Images", "Containers", "Docker Compose"] },
  { id: "kubernetes", title: "Kubernetes", description: "Orchestrating containerized applications at scale.", difficulty: "Advanced", estimatedHours: 100, prerequisites: ["Docker"], topics: ["Pods", "Services", "Deployments"] },
  { id: "aws", title: "Amazon Web Services (AWS)", description: "Mastering the world's leading cloud platform.", difficulty: "Intermediate", estimatedHours: 150, prerequisites: ["Cloud Basics"], topics: ["EC2", "S3", "IAM", "Lambda"] },
  { id: "azure", title: "Microsoft Azure", description: "Microsoft's enterprise cloud computing platform.", difficulty: "Intermediate", estimatedHours: 150, prerequisites: ["Cloud Basics"], topics: ["Azure VMs", "App Services", "Azure Active Directory"] },
  { id: "gcp", title: "Google Cloud Platform (GCP)", description: "Google's suite of cloud computing services.", difficulty: "Intermediate", estimatedHours: 150, prerequisites: ["Cloud Basics"], topics: ["Compute Engine", "Cloud Storage", "BigQuery"] },
  { id: "software-engineering", title: "Software Engineering", description: "Principles and practices of building software.", difficulty: "Intermediate", estimatedHours: 100, prerequisites: ["Programming Fundamentals"], topics: ["Agile", "Testing", "Design Patterns"] },
  { id: "system-design", title: "System Design", description: "Designing scalable software architecture.", difficulty: "Advanced", estimatedHours: 80, prerequisites: ["Backend", "Databases"], topics: ["Load Balancing", "Caching", "Microservices"] },
  { id: "database-engineering", title: "Database Engineering", description: "Designing and optimizing databases.", difficulty: "Intermediate", estimatedHours: 120, prerequisites: ["Programming Fundamentals"], topics: ["Schema Design", "Indexing", "Query Optimization"] },
  { id: "sql", title: "SQL", description: "Structured Query Language for relational databases.", difficulty: "Beginner", estimatedHours: 40, prerequisites: [], topics: ["Select", "Joins", "Aggregations", "Subqueries"] },
  { id: "nosql", title: "NoSQL", description: "Non-relational databases for flexible schemas.", difficulty: "Intermediate", estimatedHours: 50, prerequisites: ["Databases Basics"], topics: ["MongoDB", "Redis", "Cassandra"] },
  { id: "operating-systems", title: "Operating Systems", description: "How computers manage hardware and software.", difficulty: "Intermediate", estimatedHours: 80, prerequisites: ["C/C++", "Architecture"], topics: ["Processes", "Memory Management", "File Systems"] },
  { id: "computer-networks", title: "Computer Networks", description: "How computers communicate globally.", difficulty: "Intermediate", estimatedHours: 80, prerequisites: [], topics: ["OSI Model", "TCP/IP", "HTTP", "DNS"] },
  { id: "linux", title: "Linux", description: "The core operating system of the internet.", difficulty: "Beginner", estimatedHours: 60, prerequisites: [], topics: ["Command Line", "Permissions", "Bash Scripting"] },
  { id: "blockchain", title: "Blockchain", description: "Decentralized ledgers and smart contracts.", difficulty: "Advanced", estimatedHours: 150, prerequisites: ["Cryptography", "Programming"], topics: ["Web3", "Solidity", "Ethereum"] },
  { id: "game-development", title: "Game Development", description: "Creating interactive entertainment.", difficulty: "Intermediate", estimatedHours: 200, prerequisites: ["C++ / C#"], topics: ["Unity", "Unreal Engine", "Game Physics"] },
  { id: "embedded-systems", title: "Embedded Systems", description: "Programming dedicated hardware systems.", difficulty: "Advanced", estimatedHours: 180, prerequisites: ["C", "Electronics Basics"], topics: ["Microcontrollers", "RTOS", "Sensors"] },
  { id: "iot", title: "Internet of Things (IoT)", description: "Connecting physical devices to the internet.", difficulty: "Intermediate", estimatedHours: 120, prerequisites: ["Networking", "Embedded Systems"], topics: ["MQTT", "Edge Computing", "Smart Devices"] },
  { id: "competitive-programming", title: "Competitive Programming", description: "Solving complex algorithmic puzzles fast.", difficulty: "Advanced", estimatedHours: 300, prerequisites: ["DSA"], topics: ["Advanced DP", "Graph Algorithms", "Segment Trees"] },
  { id: "open-source", title: "Open Source", description: "Contributing to public software projects.", difficulty: "Beginner", estimatedHours: 50, prerequisites: ["Git & GitHub"], topics: ["Pull Requests", "Licensing", "Community"] },
  { id: "git-github", title: "Git & GitHub", description: "Version control and collaborative coding.", difficulty: "Beginner", estimatedHours: 20, prerequisites: [], topics: ["Commits", "Branches", "Merging", "Rebasing"] },
  { id: "career-preparation", title: "Career Preparation", description: "Getting ready for the tech job market.", difficulty: "Beginner", estimatedHours: 40, prerequisites: [], topics: ["Resume", "LinkedIn", "Behavioral Interviews"] },
  { id: "freelancing", title: "Freelancing", description: "Working independently as a developer.", difficulty: "Intermediate", estimatedHours: 60, prerequisites: ["Web Development / Mobile Dev"], topics: ["Client Acquisition", "Pricing", "Contracts"] },
];
