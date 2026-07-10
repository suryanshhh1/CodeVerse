import Link from "next/link";
import { Code } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full mt-24 py-8 border-t border-border/50 premium-glass rounded-none border-x-0 border-b-0">
      <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          <span className="font-semibold text-lg tracking-tight">CodeVerse</span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} CodeVerse. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] flex items-center">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] flex items-center">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
