import Link from "next/link";
import { 
  LayoutDashboard, Users, Map, BookOpen, Code2, 
  FolderGit2, FileText, Settings, Bell, Award, Search
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Roadmaps", href: "/admin/roadmaps", icon: Map },
    { name: "Languages", href: "/admin/languages", icon: Code2 },
    { name: "Notes", href: "/admin/notes", icon: BookOpen },
    { name: "DSA", href: "/admin/dsa", icon: Code2 }, // Or a different icon
    { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
    { name: "Quizzes", href: "/admin/quizzes", icon: FileText },
    { name: "Announcements", href: "/admin/announcements", icon: Bell },
    { name: "Certificates", href: "/admin/certificates", icon: Award },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/40 bg-card/30 backdrop-blur-sm hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight text-primary">Admin Panel</h2>
          <p className="text-xs text-muted-foreground mt-1">Platform Management</p>
        </div>
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto pb-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-background/50 overflow-y-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
