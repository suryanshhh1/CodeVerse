"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const logos = [
  { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", style: { top: "10%", left: "10%", scale: 1.2 } },
  { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", style: { top: "20%", left: "80%", scale: 0.9 } },
  { name: "C++", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", style: { top: "70%", left: "15%", scale: 1 } },
  { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", style: { top: "60%", left: "85%", scale: 1.1 } },
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", style: { top: "30%", left: "25%", scale: 0.8 } },
  { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", style: { top: "80%", left: "70%", scale: 1.3 } },
  { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", style: { top: "40%", left: "75%", scale: 1 } },
  { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", style: { top: "85%", left: "30%", scale: 0.9 } },
  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", style: { top: "15%", left: "60%", scale: 1.2 } },
  { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", style: { top: "50%", left: "10%", scale: 1 } },
];

export function FloatingLogos() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -150]); // Parallax on scroll

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const smoothMouseX = useSpring(mousePosition.x, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mousePosition.y, { stiffness: 50, damping: 20 });

  return (
    <motion.div 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-20"
      style={{ y }}
    >
      {logos.map((logo, i) => (
        <motion.div
          key={logo.name}
          className="absolute"
          style={{
            ...logo.style,
            x: smoothMouseX,
            y: smoothMouseY,
          }}
          animate={{
            y: ["0%", "-10%", "0%"],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 8 + (i % 5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          <div className="relative w-12 h-12 md:w-16 md:h-16 premium-glass rounded-2xl flex items-center justify-center filter drop-shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt={logo.name} className="w-8 h-8 md:w-10 md:h-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
