import { Link, useLocation } from "wouter";
import { GraduationCap, LayoutDashboard, Users, CalendarRange, Eye, FileText, Moon, Sun } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/academy/dashboard", icon: LayoutDashboard },
  { name: "Roster", href: "/academy/roster", icon: Users },
  { name: "Scheduling", href: "/academy/scheduling", icon: CalendarRange },
  { name: "Portal Preview", href: "/academy/portal-preview", icon: Eye },
  { name: "Billing", href: "/academy/billing", icon: FileText },
];

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <div className="min-h-screen bg-background flex w-full">
      <aside className="w-60 border-r bg-sidebar h-screen sticky top-0 flex flex-col shrink-0">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <GraduationCap className="h-5 w-5" />
            STUTAP
          </div>
          <div className="text-xs text-muted-foreground mt-0.5 font-medium uppercase tracking-wider">Academy Portal</div>
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
          <span className="text-xs text-muted-foreground">Lahore Medical Academy</span>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
