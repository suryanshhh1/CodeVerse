"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const navLinksList = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/roadmaps", label: "Roadmaps" },
  { href: "/notes", label: "Notes" },
  { href: "/languages", label: "Languages" },
  { href: "/dsa", label: "DSA" },
  { href: "/projects", label: "Projects" },
  { href: "/planner", label: "Planner" },
  { href: "/chat", label: "CodeVerse AI" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-4 xl:gap-6 text-sm font-medium text-muted-foreground">
      {navLinksList.map(({ href, label }) => {
        // Active if exact match OR if it's a nested route under this href
        // e.g. href="/notes" matches pathname="/notes" and "/notes/java"
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "relative transition-colors hover:text-foreground group whitespace-nowrap",
              isActive ? "text-primary font-semibold" : ""
            )}
          >
            {label}
            <span className={cn(
              "absolute -bottom-1 left-0 w-full h-[2px] bg-primary scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isActive ? "scale-x-100" : "group-hover:scale-x-100"
            )} />
          </Link>
        );
      })}
    </nav>
  );
}
