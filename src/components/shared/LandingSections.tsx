"use client";

import { motion } from "framer-motion";
import { BentoGrid } from "./BentoGrid";
import { Bot, Terminal, Code2, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export function LandingSections() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Section 4: Bento Grid */}
      <section className="w-full py-24 flex flex-col items-center justify-center relative">
        <div className="text-center mb-16 space-y-4 px-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you need. <br/><span className="text-muted-foreground font-light">Nothing you don&apos;t.</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A complete ecosystem designed to accelerate your computer science journey.</p>
        </div>
        <BentoGrid />
      </section>

      {/* Section 5: Timeline (How it works) */}
      <section className="w-full py-32 flex flex-col items-center justify-center relative bg-muted/10 border-y border-border/10">
        <div className="text-center mb-20 space-y-4 px-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The CodeVerse Workflow</h2>
        </div>
        
        <div className="container px-4 md:px-6 max-w-4xl">
          <div className="relative border-l border-primary/30 ml-4 md:ml-0 md:border-l-0 md:border-t md:flex md:justify-between md:pt-10">
            {[
              { step: 1, title: "Learn", desc: "Structured theory." },
              { step: 2, title: "Practice", desc: "Interactive DSA." },
              { step: 3, title: "Track", desc: "Monitor progress." },
              { step: 4, title: "Build", desc: "Real-world projects." },
              { step: 5, title: "Ace", desc: "Pass your interviews." },
            ].map((item, i) => (
              <motion.div 
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2 }}
                className="relative pl-8 md:pl-0 pb-12 md:pb-0 md:flex-1 md:text-center"
              >
                <div className="absolute left-[-5px] md:left-1/2 md:-top-[46px] md:-translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background shadow-[0_0_15px_rgba(var(--primary),0.8)]" />
                <div className="text-primary font-mono text-sm mb-2">Step 0{item.step}</div>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: AI Assistant Showcase */}
      <section className="w-full py-32 flex flex-col items-center justify-center relative">
        <div className="container px-4 md:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4 backdrop-blur-sm">
                <Bot className="w-4 h-4 mr-2" /> AI Powered
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">Never get stuck again.</h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                CodeVerse AI is integrated directly into your learning environment. Get code explanations, hint generation, and conceptual breakdowns in real-time.
              </p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full rounded-2xl border border-border/50 premium-glass premium-shadow overflow-hidden p-1"
            >
              <div className="bg-background/90 rounded-xl p-4 md:p-6 space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div className="bg-muted/30 p-3 rounded-2xl rounded-tl-sm text-sm">
                    Can you explain how a Hash Map works in constant time?
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-primary/5 border border-primary/10 p-3 rounded-2xl rounded-tl-sm text-sm w-full">
                    <TypewriterText text="A Hash Map achieves O(1) time complexity by using a hash function. When you insert a key-value pair, the hash function converts the key into an integer (the hash code), which serves as the index in an underlying array. Thus, to look up a value, it computes the hash and immediately jumps to that index!" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 7: Animated Statistics */}
      <section className="w-full py-24 flex flex-col items-center justify-center relative border-y border-border/10 bg-background/30">
        <div className="container max-w-5xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatCounter value={20} label="Roadmaps" suffix="+" />
          <StatCounter value={800} label="Concepts" suffix="+" />
          <StatCounter value={1500} label="DSA Problems" suffix="+" />
          <StatCounter value={100} label="Projects" suffix="+" />
        </div>
      </section>

      {/* Section 8: Auto-Scrolling Testimonials */}
      <section className="w-full py-32 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="text-center mb-16 space-y-4 px-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Loved by builders.</h2>
        </div>
        
        {/* Marquee Container */}
        <div className="relative w-full max-w-[100vw] flex overflow-hidden">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <motion.div 
            className="flex gap-6 px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          >
            {[1, 2].map((group) => (
              <div key={group} className="flex gap-6 shrink-0">
                {[
                  { name: "Sarah L.", role: "Software Engineer @ Google", text: "CodeVerse completely changed how I prepare for interviews. The Interactive DSA visualizer is mind-blowing." },
                  { name: "David K.", role: "Frontend Developer", text: "The structured roadmaps kept me on track. I built my first Next.js SaaS entirely following the project guides." },
                  { name: "Elena M.", role: "CS Student", text: "The AI Study Assistant is like having a senior engineer sitting next to you 24/7. Worth every penny." },
                  { name: "James R.", role: "Backend Engineer", text: "Finally, a platform that doesn't just give you a wall of text. The interactive learning approach is the future." },
                ].map((t, i) => (
                  <div key={i} className="w-[350px] shrink-0 premium-glass border border-border/50 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl shadow-primary/5">
                    <p className="text-muted-foreground font-medium leading-relaxed">&quot;{t.text}&quot;</p>
                    <div>
                      <div className="font-bold text-foreground">{t.name}</div>
                      <div className="text-sm text-primary/80">{t.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 9: Final CTA */}
      <section className="w-full py-32 pb-40 flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-[100%] pointer-events-none" />
        <div className="container px-4 text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight">
            Stop searching. <br/> Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">building.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers mastering computer science the modern way.
          </p>
          <div className="pt-8">
            <a href="/signup" className="inline-flex h-16 items-center justify-center rounded-full bg-primary px-12 text-lg font-medium text-primary-foreground shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all">
              Start Learning Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text, isInView]);

  return (
    <motion.span 
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true }}
    >
      {displayedText}
      <motion.span 
        animate={{ opacity: [1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1 h-4 bg-primary ml-1 align-middle"
      />
    </motion.span>
  );
}

function StatCounter({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <motion.div 
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true }}
      className="space-y-2"
    >
      <div className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">
        {count}{suffix}
      </div>
      <div className="text-sm md:text-lg text-muted-foreground font-medium">{label}</div>
    </motion.div>
  );
}
