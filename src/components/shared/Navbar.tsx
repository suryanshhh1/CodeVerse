import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Code2, Search } from "lucide-react";
import { auth, signOut } from "@/lib/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { NotificationCenter } from "../layout/NotificationCenter";
import { NavLinks } from "./NavLinks";

import { MobileNav } from "./MobileNav";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-2 md:gap-6">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground hidden sm:flex">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="font-bold tracking-tight text-lg">CodeVerse</span>
          </Link>
          <NavLinks />
        </div>
        <div className="flex items-center gap-6 flex-1 justify-end mr-4">
          <form action="/search" method="GET" className="relative hidden lg:block w-64 group">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              name="q"
              type="search" 
              placeholder="Search anything..." 
              className="w-full bg-background/50 pl-9 border-border/50 focus-visible:ring-primary/50 transition-all rounded-full"
            />
          </form>
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <Link href="/profile" className="text-sm font-medium hidden md:inline-block hover:text-primary transition-colors">
                {session.user?.name}
              </Link>
              <NotificationCenter />
              <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}>
                <Button variant="outline" size="sm" type="submit">Log out</Button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
                Login
              </Link>
              <Link href="/signup" className={cn(buttonVariants({ size: "sm" }))}>
                Sign Up
              </Link>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
