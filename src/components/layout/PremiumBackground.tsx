"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export function PremiumBackground() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
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
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const smoothMouseX = useSpring(mousePosition.x, { stiffness: 40, damping: 20 });
  const smoothMouseY = useSpring(mousePosition.y, { stiffness: 40, damping: 20 });
  
  const parallaxX1 = useTransform(smoothMouseX, (v) => v * 0.8);
  const parallaxY1 = useTransform(smoothMouseY, (v) => v * 0.8);
  const parallaxX2 = useTransform(smoothMouseX, (v) => v * -0.5);
  const parallaxY2 = useTransform(smoothMouseY, (v) => v * -0.5);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(1%, 1%); }
          30% { transform: translate(-2%, -2%); }
          40% { transform: translate(2%, 2%); }
          50% { transform: translate(-1%, 2%); }
          60% { transform: translate(2%, -1%); }
          70% { transform: translate(-2%, 1%); }
          80% { transform: translate(1%, -2%); }
          90% { transform: translate(-1%, -1%); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .animate-noise {
            animation: noise 8s steps(10) infinite;
          }
        }
      `}} />
      
      {/* Base Background Color */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${isDark ? "bg-[#000000]" : "bg-[#fafafa]"}`} />

      {/* Radial Glow 1 (Top Right) */}
      <motion.div 
        className={`absolute -top-1/4 -right-1/4 w-3/4 h-3/4 rounded-full mix-blend-screen filter blur-[120px] transition-colors duration-1000`}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        style={{
          x: parallaxX1,
          y: parallaxY1,
          background: isDark 
            ? "radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(0,0,0,0) 70%)"
            : "radial-gradient(circle, rgba(147,51,234,0.05) 0%, rgba(255,255,255,0) 70%)"
        }}
      />
      
      {/* Radial Glow 2 (Bottom Left) */}
      <motion.div 
        className={`absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 rounded-full mix-blend-screen filter blur-[120px] transition-colors duration-1000`}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 }}
        style={{
          x: parallaxX2,
          y: parallaxY2,
          background: isDark 
            ? "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0) 70%)"
            : "radial-gradient(circle, rgba(59,130,246,0.05) 0%, rgba(255,255,255,0) 70%)"
        }}
      />

      {/* SVG Noise Texture Overlay for that premium grainy feel */}
      <div className={`absolute inset-[-10%] w-[120%] h-[120%] opacity-[0.025] mix-blend-overlay pointer-events-none animate-noise ${!isDark && "opacity-[0.015] mix-blend-multiply"}`}>
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </div>
  );
}
