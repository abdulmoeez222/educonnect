import { Link, useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { mockUser } from "@/lib/mock-data/mock-user";
import { 
  Home, 
  Search, 
  CalendarDays, 
  MessageSquare, 
  BookOpen, 
  User,
  Bell,
  Moon,
  Sun,
  Menu,
  GraduationCap,
  Wallet,
  BarChart3,
  Package,
  Sparkles,
  Brain,
  ClipboardCheck,
  Layers,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const STUDENT_NAV_ITEMS = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Search", href: "/search", icon: Search },
  { name: "Sessions", href: "/sessions", icon: CalendarDays },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Resources", href: "/resources", icon: BookOpen },
];

const STUDENT_AI_NAV_ITEMS = [
  { name: "AI Tutor", href: "/ai-chat", icon: Sparkles },
  { name: "Mock Tests", href: "/mock-test", icon: ClipboardCheck },
  { name: "Flashcards", href: "/flashcards", icon: Layers },
  { name: "Study Plan", href: "/study-plan", icon: Brain },
  { name: "Readiness", href: "/readiness", icon: Activity },
];

const TUTOR_NAV_ITEMS = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Bookings", href: "/tutor/bookings", icon: CalendarDays },
  { name: "Earnings", href: "/tutor/earnings", icon: Wallet },
  { name: "Resources", href: "/tutor/resources/sales", icon: BookOpen },
  { name: "Analytics", href: "/tutor/analytics", icon: BarChart3 },
  { name: "Profile", href: "/profile", icon: User },
];

const CONSULTANT_NAV_ITEMS = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Bookings", href: "/consultant/bookings", icon: CalendarDays },
  { name: "Packages", href: "/consultant/packages", icon: Package },
  { name: "Earnings", href: "/consultant/earnings", icon: Wallet },
  { name: "Profile", href: "/profile", icon: User },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { role, setRole, darkMode, toggleDarkMode } = useStore();

  const NAV_ITEMS = role === 'tutor' ? TUTOR_NAV_ITEMS : role === 'consultant' ? CONSULTANT_NAV_ITEMS : STUDENT_NAV_ITEMS;

  const MOBILE_BOTTOM_NAV = role === 'tutor' ? [
    { name: "Home", href: "/home", icon: Home },
    { name: "Bookings", href: "/tutor/bookings", icon: CalendarDays },
    { name: "Earnings", href: "/tutor/earnings", icon: Wallet },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Profile", href: "/profile", icon: User },
  ] : role === 'consultant' ? [
    { name: "Home", href: "/home", icon: Home },
    { name: "Bookings", href: "/consultant/bookings", icon: CalendarDays },
    { name: "Packages", href: "/consultant/packages", icon: Package },
    { name: "Earnings", href: "/consultant/earnings", icon: Wallet },
    { name: "Profile", href: "/profile", icon: User },
  ] : [
    ...STUDENT_NAV_ITEMS.slice(0, 4), 
    { name: "Profile", href: "/profile", icon: User }
  ];

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] border-r bg-sidebar h-screen sticky top-0">
        <div className="p-4 border-b flex items-center gap-2 text-primary font-bold text-xl">
          <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center text-white p-1.5">
            <GraduationCap className="h-full w-full" />
          </div>
          <span className="font-extrabold tracking-tight text-xl">STUTAP</span>
        </div>
        
        <nav className="flex-1 py-4 flex flex-col gap-1 px-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href || location.startsWith(`${item.href}/`);
            return (
              <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border-l-2 transition-all duration-150 ${isActive ? 'bg-primary text-primary-foreground font-medium border-white/30' : 'text-sidebar-foreground hover:bg-sidebar-accent border-transparent'}`}>
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
          {role === 'student' && (
            <>
              <div className="px-3 pt-4 pb-1">
                <div className="bg-primary/5 rounded-md px-2 py-1 -mx-2 mb-1 flex items-center">
                  <Sparkles className="h-3 w-3 mr-1.5 text-primary/60" />
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">AI Learning</p>
                </div>
              </div>
              {STUDENT_AI_NAV_ITEMS.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border-l-2 transition-all duration-150 ${isActive ? 'bg-primary text-primary-foreground font-medium border-white/30' : 'text-sidebar-foreground hover:bg-sidebar-accent border-transparent'}`}>
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </>
          )}
        </nav>

        <div className="p-4 border-t flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-sidebar-foreground">Dark Mode</span>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="h-8 w-8 active:scale-[0.98] transition-transform duration-75">
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-10 w-10 border border-sidebar-border">
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback>{mockUser.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-sidebar ring-1 ring-background" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{mockUser.name}</p>
              <p className="text-xs text-sidebar-foreground/60 capitalize truncate">{role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 max-w-full pb-16 md:pb-0">
        {/* Header */}
        <header className="h-16 border-b bg-card/80 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-20">
          <div className="flex items-center gap-3 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-2 active:scale-[0.98] transition-transform duration-75">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0 flex flex-col bg-sidebar">
                <div className="p-4 border-b flex items-center gap-2 text-primary font-bold text-xl">
                  <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center text-white p-1.5">
                    <GraduationCap className="h-full w-full" />
                  </div>
                  <span className="font-extrabold tracking-tight text-xl">STUTAP</span>
                </div>
                <nav className="flex-1 py-4 flex flex-col gap-1 px-2 overflow-y-auto">
                  {NAV_ITEMS.map((item) => {
                    const isActive = location === item.href || location.startsWith(`${item.href}/`);
                    return (
                      <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border-l-2 transition-all duration-150 ${isActive ? 'bg-primary text-primary-foreground font-medium border-white/30' : 'text-sidebar-foreground hover:bg-sidebar-accent border-transparent'}`}>
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    );
                  })}
                  {role === 'student' && (
                    <>
                      <div className="px-3 pt-4 pb-1">
                        <div className="bg-primary/5 rounded-md px-2 py-1 -mx-2 mb-1 flex items-center">
                          <Sparkles className="h-3 w-3 mr-1.5 text-primary/60" />
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">AI Learning</p>
                        </div>
                      </div>
                      {STUDENT_AI_NAV_ITEMS.map((item) => {
                        const isActive = location === item.href;
                        return (
                          <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border-l-2 transition-all duration-150 ${isActive ? 'bg-primary text-primary-foreground font-medium border-white/30' : 'text-sidebar-foreground hover:bg-sidebar-accent border-transparent'}`}>
                            <item.icon className="h-5 w-5" />
                            {item.name}
                          </Link>
                        );
                      })}
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
            <div className="font-bold text-lg text-primary flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center text-white p-1.5">
                <GraduationCap className="h-full w-full" />
              </div>
              <span className="hidden sm:inline font-extrabold tracking-tight">STUTAP</span>
            </div>
          </div>

          <div className="hidden md:flex flex-1" />

          <div className="flex items-center gap-2 sm:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="capitalize hidden sm:flex rounded-full text-xs border bg-muted/50 h-8 px-3 active:scale-[0.98] transition-transform duration-75">
                  View as: {role}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(['student', 'tutor', 'consultant', 'academy'] as const).map(r => (
                  <DropdownMenuItem key={r} onClick={() => setRole(r)} className="capitalize">
                    {r}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="relative active:scale-[0.98] transition-transform duration-75" asChild>
              <Link href="/notifications">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-bold text-white flex items-center justify-center leading-none">3</span>
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full active:scale-[0.98] transition-transform duration-75">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={mockUser.avatar} />
                    <AvatarFallback>{mockUser.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{mockUser.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{mockUser.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">Account Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/notifications">Notifications</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/pricing">Plans & Pricing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="md:hidden" onClick={toggleDarkMode}>
                  Toggle {darkMode ? 'Light' : 'Dark'} Mode
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">Log out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[68px] bg-card border-t flex items-center justify-around px-2 z-30 pb-safe pb-[env(safe-area-inset-bottom,0px)]">
        {MOBILE_BOTTOM_NAV.map((item) => {
          const isActive = location === item.href || location.startsWith(`${item.href}/`);
          return (
            <Link key={item.name} href={item.href} className={`flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
              {isActive ? (
                <div className="bg-primary/10 rounded-xl px-3 py-1 flex flex-col items-center gap-0.5">
                  <item.icon className="h-5 w-5 fill-primary/20" />
                  <span className="text-[10px] font-medium">{item.name}</span>
                </div>
              ) : (
                <>
                  <item.icon className="h-5 w-5" />
                  <span className="text-[10px] font-medium">{item.name}</span>
                </>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
