import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPinOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="w-24 h-24 mb-8 relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
        <div className="relative bg-background border border-border w-full h-full rounded-2xl flex items-center justify-center transform rotate-12">
          <MapPinOff className="w-10 h-10 text-primary" />
        </div>
      </div>
      <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 mb-4">
        404
      </h1>
      <h2 className="text-2xl font-bold tracking-tight mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md text-lg">
        The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button size="lg" className="w-full sm:w-auto">Return Home</Button>
        </Link>
        <Link href="/search">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">Search Platform</Button>
        </Link>
      </div>
    </div>
  );
}
