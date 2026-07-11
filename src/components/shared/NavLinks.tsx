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
    <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
      {navLinksList.map(({ href, label }) => {
        // Active if exact match OR if it's a nested route under this href
        // e.g. href="/notes" matches pathname="/notes" and "/notes/java"
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "transition-colors hover:text-foreground",
              isActive ? "text-primary font-semibold" : ""
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
