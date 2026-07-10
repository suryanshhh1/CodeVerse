"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function PremiumBackground() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Base Background Color */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${isDark ? "bg-[#000000]" : "bg-[#fafafa]"}`} />

      {/* Radial Glow 1 (Top Right) */}
      <div 
        className={`absolute -top-1/4 -right-1/4 w-3/4 h-3/4 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse transition-colors duration-1000`}
        style={{
          background: isDark 
            ? "radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(0,0,0,0) 70%)" // Subtle Purple in Dark
            : "radial-gradient(circle, rgba(147,51,234,0.05) 0%, rgba(255,255,255,0) 70%)" // Very Subtle Purple in Light
        }}
      />
      
      {/* Radial Glow 2 (Bottom Left) */}
      <div 
        className={`absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 rounded-full mix-blend-screen filter blur-[120px] opacity-40 transition-colors duration-1000`}
        style={{
          background: isDark 
            ? "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0) 70%)" // Subtle Blue in Dark
            : "radial-gradient(circle, rgba(59,130,246,0.05) 0%, rgba(255,255,255,0) 70%)" // Very Subtle Blue in Light
        }}
      />

      {/* SVG Noise Texture Overlay for that premium grainy feel */}
      <svg
        className={`absolute inset-0 w-full h-full opacity-[0.025] mix-blend-overlay ${!isDark && "opacity-[0.015] mix-blend-multiply"}`}
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
  );
}
