"use client";

import Link from "next/link";
import { motion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/shared/Footer";
import { FloatingLogos } from "@/components/shared/FloatingLogos";
import { DashboardShowcase } from "@/components/shared/DashboardShowcase";
import { LandingSections } from "@/components/shared/LandingSections";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Section 2: Cinematic Hero */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-32 overflow-hidden">
        <FloatingLogos />
        <HeroWatermark />
        
        <motion.div
          className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-6 max-w-4xl mx-auto flex flex-col items-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <motion.div 
                className="flex items-center justify-center gap-3 sm:gap-4"
                animate={{ y: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/40">
                  <Code2 className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <span className="font-black tracking-tighter text-4xl sm:text-5xl md:text-6xl text-foreground">
                  CodeVerse
                </span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ 
                  opacity: 1, 
                  scaleX: 1,
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  opacity: { delay: 0.4, duration: 0.8, ease: "easeOut" },
                  scaleX: { delay: 0.4, duration: 0.8, ease: "easeOut" },
                  backgroundPosition: { repeat: Infinity, duration: 8, ease: "linear" }
                }}
                className="mt-8 w-32 h-[1px] drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.2), rgba(139,92,246,0.8), rgba(139,92,246,0.2), transparent)",
                  backgroundSize: "200% 100%"
                }}
              />
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[1.1] md:leading-[1.1]">
              Master CS. <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-primary/80 drop-shadow-sm">
                The Modern Way.
              </span>
            </h1>
            
            <p className="max-w-[700px] text-lg sm:text-xl md:text-2xl text-muted-foreground mt-4 leading-relaxed font-light">
              Structured roadmaps, interactive visualizers, concise notes, and an AI study assistant. Stop searching. Start building.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full justify-center pt-8">
            <motion.div whileHover={{ y: -2, scale: 1.02, filter: "drop-shadow(0 0 10px rgba(139,92,246,0.4))" }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link 
                href="/roadmaps" 
                className={cn(buttonVariants({ size: "lg" }), "rounded-full px-10 shadow-2xl shadow-primary/30 text-lg h-14 w-full transition-transform group")}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link 
                href="/login" 
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full px-10 premium-glass text-lg h-14 w-full transition-transform")}
              >
                Sign In
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Ambient Hero Glows */}
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/20 blur-[150px] rounded-[100%] pointer-events-none mix-blend-screen" 
        />
      </section>

      {/* Section 3: Premium Dashboard Showcase */}
      <section className="relative w-full py-24 z-20 flex flex-col items-center justify-center -mt-20 overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="w-full max-w-6xl mx-auto perspective-[2000px]"
          >
            <motion.div
              whileHover={{ rotateX: 0, rotateY: 0, scale: 1.02 }}
              initial={{ rotateX: 5, rotateY: 0, scale: 0.95 }}
              whileInView={{ rotateX: 0, rotateY: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
              style={{ transformStyle: "preserve-3d" }}
              className="w-full shadow-2xl shadow-primary/20 rounded-xl"
            >
              <DashboardShowcase />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Glow behind dashboard */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-[100%] opacity-50 pointer-events-none mix-blend-screen" />
      </section>

      <LandingSections />

      <Footer />
    </div>
  );
}

function HeroWatermark() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mediaQuery.matches) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const smoothMouseX = useSpring(mousePosition.x, { stiffness: 40, damping: 20 });
  const smoothMouseY = useSpring(mousePosition.y, { stiffness: 40, damping: 20 });

  // Max 8px movement from mouse parallax
  const parallaxX = useTransform(smoothMouseX, (v) => v * 0.4);
  const parallaxY = useTransform(smoothMouseY, (v) => v * 0.4);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
      <motion.div
        className="relative flex items-center justify-center"
        style={{ x: parallaxX, y: parallaxY }}
        animate={{ y: ["-3px", "3px", "-3px"] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      >
        <Code2 className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] text-primary opacity-[0.03] blur-[8px]" />
        
        {/* Soft Radial Glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-[100px] mix-blend-screen"
          style={{
            background: isDark 
              ? "radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(0,0,0,0) 70%)"
              : "radial-gradient(circle, rgba(147,51,234,0.05) 0%, rgba(255,255,255,0) 70%)"
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
