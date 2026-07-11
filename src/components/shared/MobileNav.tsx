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

export function MobileNav({ session }: { session?: any }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the sheet when the pathname changes (user navigated)
  // We handle this via onClick on links instead of an effect to avoid cascading renders


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={cn("xl:hidden", "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground h-12 w-12 transition-all active:scale-[0.95]")}>
        <Menu className="h-7 w-7" />
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
              className="w-full bg-background/50 pl-9 border-border/50 focus-ring"
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
                onClick={() => setOpen(false)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary min-h-[44px] flex items-center",
                  isActive ? "text-primary font-bold" : "text-foreground/80"
                )}
              >
                {label}
              </Link>
            );
          })}
          
          <div className="mt-8 pt-6 border-t border-border/50 flex flex-col gap-4">
            {session ? (
              <>
                <Link href="/profile" onClick={() => setOpen(false)} className="flex items-center min-h-[44px] text-lg font-medium text-foreground/80 hover:text-primary">
                  Profile ({session.user?.name})
                </Link>
                <form action="/api/auth/signout" method="POST" onSubmit={() => setOpen(false)}>
                   <Button variant="outline" className="w-full h-11" type="submit">Log out</Button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground active:scale-[0.98]", "h-12 w-full")}>Login</Link>
                <Link href="/signup" onClick={() => setOpen(false)} className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]", "h-12 w-full")}>Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
