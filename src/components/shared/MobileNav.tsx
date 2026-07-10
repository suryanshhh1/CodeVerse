"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Code2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { navLinksList } from "./NavLinks";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the sheet when the pathname changes (user navigated)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={cn("md:hidden", "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-10 w-10")}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle navigation menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 flex flex-col">
        <div className="p-6 border-b border-border/50">
          <SheetTitle>
            <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="font-bold tracking-tight text-lg">CodeVerse</span>
            </Link>
          </SheetTitle>
        </div>
        
        <div className="px-6 py-4 border-b border-border/50">
          <form action="/search" method="GET" className="relative group">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              name="q"
              type="search" 
              placeholder="Search..." 
              className="w-full bg-background/50 pl-9 border-border/50 focus-visible:ring-primary/50"
            />
          </form>
        </div>

        <nav className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {navLinksList.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary min-h-[44px] flex items-center",
                  isActive ? "text-primary font-bold" : "text-foreground/80"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
