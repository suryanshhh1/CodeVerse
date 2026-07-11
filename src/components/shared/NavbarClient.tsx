"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Search } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { NotificationCenter } from "../layout/NotificationCenter";
import { NavLinks } from "./NavLinks";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";
import { LayoutContainer } from "../layout/LayoutContainer";

export function NavbarClient({ session, signOutAction }: { session: unknown, signOutAction: () => void }) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  // Framer Motion transforms for smooth floating effect
  const navWidth = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  const navY = useTransform(scrollY, [0, 100], [0, 16]);
  const navRadius = useTransform(scrollY, [0, 100], ["0px", "24px"]);
  const blurValue = useTransform(scrollY, [0, 100], ["blur(12px)", "blur(24px)"]);
  const bgColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.4)"]
  ); // In dark mode, it will have a sleek black glass

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center mx-auto transition-all"
      style={{
        width: navWidth,
        y: navY,
        borderRadius: navRadius,
      }}
    >
      <motion.div 
        className={cn(
          "w-full flex justify-center h-16 transition-all duration-300",
          isScrolled ? "border border-border/50 premium-shadow" : "border-b border-border/10"
        )}
        style={{
          borderRadius: navRadius,
          backgroundColor: bgColor,
          backdropFilter: blurValue,
        }}
      >
        <LayoutContainer className="flex items-center justify-between h-full w-full">
          {/* Left Side: Mobile Nav + Desktop Links */}
          <div className="flex items-center gap-4 flex-1">
            <MobileNav session={session} />
          <div className="hidden lg:flex">
            <NavLinks />
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex-1 flex justify-center">
          <Link href="/" className="flex items-center gap-2 group transition-transform active:scale-95">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary text-primary-foreground premium-shadow transition-transform group-hover:scale-105 group-hover:shadow-primary/50">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="font-extrabold tracking-tight text-xl hidden sm:inline-block transition-opacity group-hover:opacity-80">
              CodeVerse
            </span>
          </Link>
        </div>

        {/* Right Side: Search + Actions */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <form action="/search" method="GET" className="relative hidden xl:block w-48 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              name="q"
              type="search" 
              placeholder="Search..." 
              className="w-full bg-background/30 pl-9 border-border/30 hover:bg-background/50 focus-ring transition-all rounded-full h-9"
            />
          </form>

          {session ? (
            <div className="flex items-center gap-3">
              <Link href="/profile" className="text-sm font-medium hidden md:inline-block hover:text-primary transition-colors">
                {((session as { user?: { name?: string } })?.user?.name)?.split(" ")[0]}
              </Link>
              <NotificationCenter />
              <form action={signOutAction}>
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex rounded-full px-4 text-muted-foreground hover:text-foreground">
                  Log out
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full hidden sm:inline-flex")}>
                Login
              </Link>
              <Link href="/signup" className={cn(buttonVariants({ size: "sm" }), "rounded-full shadow-lg shadow-primary/20")}>
                Sign Up
              </Link>
            </div>
          )}
          
          <div className="hidden sm:block ml-2 border-l border-border/50 pl-4">
            <ThemeToggle />
          </div>
        </div>
      </LayoutContainer>
    </motion.div>
    </motion.header>
  );
}
