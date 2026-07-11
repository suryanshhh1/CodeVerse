"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export type AmbientVariant = 
  | "dashboard" 
  | "roadmaps" 
  | "notes" 
  | "languages" 
  | "projects" 
  | "dsa" 
  | "planner" 
  | "chat";

interface AmbientLightingProps {
  variant: AmbientVariant;
}

export function AmbientLighting({ variant }: AmbientLightingProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  // Base opacity adjustment for Light vs Dark
  const opacityMultiplier = isDark ? 1 : 0.4;

  const colors = {
    primary: "124, 108, 255", // #7C6CFF
    secondary: "91, 140, 255", // #5B8CFF
    accent: "167, 139, 250", // #A78BFA
    cyan: "103, 232, 249", // #67E8F9
  };

  const getGradient = (rgb: string, baseOpacity: number) => {
    return `radial-gradient(circle at center, rgba(${rgb}, ${baseOpacity}) 0%, rgba(${rgb}, ${baseOpacity * 0.4}) 30%, rgba(${rgb}, 0) 65%)`;
  };

  interface GlowConfig {
    id: string;
    gradient: string;
    position: string;
    size: string;
    animation: { opacity: number[] };
    duration: number;
    className?: string;
  }

  const glowConfig: Record<AmbientVariant, GlowConfig[]> = {
    dashboard: [
      {
        id: "dash-1",
        gradient: getGradient(colors.primary, 0.1),
        position: "-top-[20%] -left-[10%]",
        size: "w-[800px] h-[800px] md:w-[1200px] md:h-[1200px]",
        animation: { opacity: [0.4, 0.8, 0.4] },
        duration: 25,
      },
    ],
    roadmaps: [
      {
        id: "road-1",
        gradient: getGradient(colors.secondary, 0.1),
        position: "top-[10%] -right-[10%]",
        size: "w-[800px] h-[800px] md:w-[1000px] md:h-[1000px]",
        animation: { opacity: [0.5, 0.9, 0.5] },
        duration: 28,
      },
    ],
    notes: [
      {
        id: "notes-1",
        gradient: getGradient(colors.accent, 0.08),
        position: "top-[20%] left-[5%]",
        size: "w-[600px] h-[600px] md:w-[900px] md:h-[900px]",
        animation: { opacity: [0.4, 0.7, 0.4] },
        duration: 20,
      },
    ],
    languages: [
      {
        id: "lang-1",
        gradient: getGradient(colors.primary, 0.08),
        position: "-top-[5%] -left-[5%]",
        size: "w-[600px] h-[600px] md:w-[800px] md:h-[800px]",
        animation: { opacity: [0.4, 0.8, 0.4] },
        duration: 22,
      },
      {
        id: "lang-2",
        gradient: getGradient(colors.secondary, 0.06),
        position: "top-[30%] -right-[5%]",
        size: "w-[600px] h-[600px] md:w-[900px] md:h-[900px]",
        animation: { opacity: [0.3, 0.7, 0.3] },
        duration: 30,
        className: "hidden md:block" // Reduce count on mobile
      },
    ],
    projects: [
      {
        id: "proj-1",
        gradient: getGradient(colors.cyan, 0.06),
        position: "top-[10%] left-[15%]",
        size: "w-[500px] h-[500px] md:w-[800px] md:h-[800px]",
        animation: { opacity: [0.3, 0.6, 0.3] },
        duration: 18,
      },
    ],
    dsa: [
      {
        id: "dsa-1",
        gradient: getGradient(colors.primary, 0.12), // Darker atmosphere, slightly stronger purple bloom
        position: "top-[20%] -left-[10%]",
        size: "w-[700px] h-[700px] md:w-[1000px] md:h-[1000px]",
        animation: { opacity: [0.5, 1, 0.5] },
        duration: 30,
      },
      {
        id: "dsa-2",
        gradient: getGradient(colors.accent, 0.06),
        position: "-top-[5%] -right-[5%]",
        size: "w-[500px] h-[500px] md:w-[800px] md:h-[800px]",
        animation: { opacity: [0.3, 0.7, 0.3] },
        duration: 25,
        className: "hidden md:block"
      }
    ],
    planner: [
      {
        id: "plan-1",
        gradient: getGradient(colors.secondary, 0.09),
        position: "-top-[5%] left-[50%] -translate-x-1/2",
        size: "w-[600px] h-[600px] md:w-[1000px] md:h-[1000px]",
        animation: { opacity: [0.4, 0.8, 0.4] },
        duration: 20,
      },
    ],
    chat: [
      {
        id: "chat-1",
        gradient: getGradient(colors.primary, 0.08),
        position: "top-[10%] left-[50%] -translate-x-1/2",
        size: "w-[500px] h-[500px] md:w-[700px] md:h-[700px]",
        animation: { opacity: [0.5, 0.9, 0.5] },
        duration: 18,
      },
    ],
  };

  const glows = glowConfig[variant];

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {glows.map((glow) => (
        <motion.div
          key={glow.id}
          className={`absolute ${glow.position} ${glow.size} rounded-full ${glow.className || ""}`}
          style={{
            background: glow.gradient,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: glow.animation.opacity.map((v) => v * opacityMultiplier),
          }}
          transition={{
            repeat: Infinity,
            duration: glow.duration,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
