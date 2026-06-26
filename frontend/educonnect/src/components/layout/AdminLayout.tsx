import { Link, useLocation } from "wouter";
import { ShieldCheck, ListChecks, MessageSquareWarning, Moon, Sun } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { name: "Verification Queue", href: "/admin/verification", icon: ListChecks },
  { name: "Disputes", href: "/admin/disputes", icon: MessageSquareWarning },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <div className="min-h-screen bg-background flex w-full">
      <aside className="w-60 border-r bg-sidebar h-screen sticky top-0 flex flex-col shrink-0">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-lg">
            <ShieldCheck className="h-5 w-5" />
            EduConnect
          </div>
          <div className="text-xs text-muted-foreground mt-0.5 font-medium uppercase tracking-wider">Admin Panel</div>
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {NAV_ITEMS.map(item => {
            const isActive = location === item.href || location.startsWith(item.href + '/');
            return (
              <Link key={item.name} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-primary text-primary-foreground font-medium' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}>
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Internal Admin</span>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
