"use client";

import { motion } from "framer-motion";
import { BookOpen, BrainCircuit, Code, Search, FolderGit2, Calendar as CalendarIcon, Trophy, Bookmark, MessageSquare, Terminal } from "lucide-react";

const features = [
  {
    title: "AI Study Assistant",
    description: "Get instantly unstuck with personalized AI tutoring, code explanations, and 24/7 guidance.",
    icon: BrainCircuit,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-2",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Interactive DSA",
    description: "Visualize complex algorithms and data structures in real-time.",
    icon: Code,
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Roadmaps",
    description: "Step-by-step learning paths.",
    icon: BookOpen,
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    title: "Projects",
    description: "Build real-world apps.",
    icon: FolderGit2,
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Universal Search",
    description: "Find anything instantly.",
    icon: Search,
    colSpan: "col-span-1 md:col-span-1 lg:col-span-2",
    rowSpan: "row-span-1",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    title: "Planner",
    description: "Organize your study sessions.",
    icon: CalendarIcon,
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your growth.",
    icon: Trophy,
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    title: "Languages",
    description: "Master multiple syntaxes.",
    icon: Terminal,
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    title: "Bookmarks & Notes",
    description: "Save and annotate your learning.",
    icon: Bookmark,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-1",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
];

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl w-full mx-auto p-4 md:p-6">
      {features.map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
          whileHover={{ y: -4, scale: 1.01 }}
          className={`group relative overflow-hidden rounded-3xl premium-glass border border-border/50 p-6 md:p-8 flex flex-col justify-end min-h-[200px] hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30 transition-all duration-300 ${feature.colSpan} ${feature.rowSpan}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className={`mb-auto w-12 h-12 rounded-2xl flex items-center justify-center ${feature.bg} ${feature.color} border border-border/50 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
            <feature.icon className="w-6 h-6" />
          </div>
          
          <div className="mt-8 z-10">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
            <p className="text-muted-foreground font-medium text-sm md:text-base leading-relaxed">{feature.description}</p>
          </div>
          
          {/* Subtle glow effect on hover */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      ))}
    </div>
  );
}
