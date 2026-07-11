import Link from "next/link";
import { Code2, Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full relative z-10 pt-20 pb-10 bg-background/80 premium-glass border-t border-border/10">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary text-primary-foreground premium-shadow transition-transform group-hover:scale-105 group-hover:shadow-primary/50">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="font-extrabold tracking-tight text-xl transition-opacity group-hover:opacity-80">
              CodeVerse
            </span>
          </Link>
          <p className="text-muted-foreground text-sm max-w-[300px] text-center md:text-left">
            The premium platform for developers to master computer science the modern way.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full premium-glass border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full premium-glass border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full premium-glass border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </div>
      
      <div className="container px-4 md:px-6 max-w-7xl mx-auto mt-12 pt-8 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60">
        <p>&copy; {new Date().getFullYear()} CodeVerse. All rights reserved.</p>
        <p>Built with Next.js & Framer Motion.</p>
      </div>
    </footer>
  );
}
