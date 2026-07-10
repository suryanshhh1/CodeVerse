"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, BrainCircuit, Code, Search } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/shared/Footer";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-primary/20 blur-[120px] rounded-full opacity-50" />

      <motion.div
        className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 md:space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            The Ultimate CS Learning Platform
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight md:leading-tight">
            Master Computer Science <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">
              The Modern Way
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-base sm:text-lg md:text-xl text-muted-foreground mt-4 md:mt-6 leading-relaxed">
            Structured roadmaps, interactive visualizers, concise notes, and an AI study assistant—everything you need to ace your exams and interviews.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full justify-center">
          <Link 
            href="/roadmaps" 
            className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 shadow-lg shadow-primary/25 text-md h-12 w-full sm:w-auto max-w-[280px]")}
          >
            Start Learning <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link 
            href="/dsa" 
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full px-8 bg-background/50 backdrop-blur-md text-md h-12 w-full sm:w-auto max-w-[280px]")}
          >
            Explore DSA
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-8 md:pt-12 w-full max-w-6xl">
          {[
            { title: "Structured Roadmaps", icon: BookOpen, desc: "Step-by-step paths from beginner to advanced." },
            { title: "Interactive DSA", icon: Code, desc: "Visualize algorithms and data structures in real-time." },
            { title: "AI Study Assistant", icon: BrainCircuit, desc: "Get instantly unstuck with AI-powered tutoring." },
            { title: "Universal Search", icon: Search, desc: "Find notes, cheatsheets, and quizzes instantly." },
          ].map((feature, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background/40 p-6 text-left backdrop-blur-md hover:bg-background/60 hover:border-primary/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <feature.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
}
