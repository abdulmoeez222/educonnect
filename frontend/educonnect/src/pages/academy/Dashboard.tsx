import { Link } from "wouter";
import { Users, BookOpen, CalendarCheck, TrendingUp, ArrowRight, UserPlus, CreditCard, Video, Calendar as CalendarIcon, Settings, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ACADEMY_ACTIVITY, ACADEMY_TUTORS, ACADEMY_STUDENTS } from "@/lib/mock-data/academy-data";

const METRICS = [
  { label: 'Active Tutors', value: 5, change: '+1 this month', icon: Users, color: 'text-primary' },
  { label: 'Active Students', value: 26, change: '+3 this month', icon: Users, color: 'text-blue-600 dark:text-blue-400' },
  { label: 'Sessions This Month', value: 171, change: '+12% vs last month', icon: CalendarCheck, color: 'text-amber-600 dark:text-amber-400' },
  { label: 'Total Revenue', value: 'PKR 85,000', change: 'Current contract', icon: TrendingUp, color: 'text-green-600 dark:text-green-400', isHighlight: true },
];

export default function AcademyDashboard() {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1 tracking-tight">Academy dashboard</h1>
        <p className="text-muted-foreground">Lahore Medical Academy — Overview</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {METRICS.map(m => (
          <Card key={m.label} className={`rounded-2xl border p-5 hover:shadow-md transition-all ${m.isHighlight ? 'border-green-200 dark:border-green-800 bg-green-50/40 dark:bg-green-950/20' : 'bg-card'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-medium uppercase tracking-wider ${m.isHighlight ? 'text-green-800 dark:text-green-300' : 'text-muted-foreground'}`}>{m.label}</span>
              <m.icon className={`h-5 w-5 ${m.color}`} />
            </div>
            <p className={`text-3xl font-black ${m.isHighlight ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>{m.value}</p>
            <p className={`text-xs mt-2 ${m.isHighlight ? 'text-green-700/70 dark:text-green-300/70' : 'text-muted-foreground'}`}>{m.change}</p>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Manage Roster', icon: Users, color: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-950/40', href: '/academy/roster' },
          { label: 'Schedule', icon: CalendarIcon, color: 'text-amber-600 bg-amber-100 dark:bg-amber-950/40', href: '/academy/scheduling' },
          { label: 'Billing', icon: CreditCard, color: 'text-green-600 bg-green-100 dark:bg-green-950/40', href: '/academy/billing' },
          { label: 'Portal', icon: Video, color: 'text-blue-600 bg-blue-100 dark:bg-blue-950/40', href: '/academy/portal-preview' },
        ].map(action => (
          <Link key={action.label} href={action.href}>
            <div className="rounded-2xl border-2 p-5 flex flex-col items-center gap-3 hover:border-primary/40 hover:shadow-md cursor-pointer transition-all text-center bg-card">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${action.color}`}>
                <action.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold">{action.label}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity feed */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-2xl border shadow-sm">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-base">Recent activity</h3>
              <Link href="/academy/activity" className="text-sm text-primary hover:underline font-medium transition-all duration-200">View all</Link>
            </div>
            <div>
              {ACADEMY_ACTIVITY.map((a, i) => {
                let dotClass = 'bg-muted text-muted-foreground';
                let Icon = MessageSquare;
                
                if (a.type === 'session') {
                  dotClass = 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600';
                  Icon = CalendarIcon;
                } else if (a.type === 'payment') {
                  dotClass = 'bg-green-100 dark:bg-green-950/40 text-green-600';
                  Icon = CreditCard;
                } else if (a.type === 'enrollment') {
                  dotClass = 'bg-blue-100 dark:bg-blue-950/40 text-blue-600';
                  Icon = UserPlus;
                } else if (a.type === 'assignment') {
                  dotClass = 'bg-purple-100 dark:bg-purple-950/40 text-purple-600';
                  Icon = BookOpen;
                }

                return (
                  <div key={a.id} className="flex items-start gap-3 px-5 py-3.5 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${dotClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug">{a.description}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Tutors */}
        <div className="space-y-6">
          <div className="bg-card rounded-2xl border shadow-sm">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-base">Top tutors</h3>
              <Link href="/academy/roster" className="text-sm text-primary hover:underline font-medium transition-all duration-200">View all</Link>
            </div>
            <div className="p-2 space-y-1">
              {ACADEMY_TUTORS.slice(0, 4).map(t => (
                <Link key={t.id} href={`/academy/tutor/${t.id}`}>
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                    <Avatar className="h-10 w-10 border shadow-sm">
                      <AvatarFallback className="font-bold text-xs">{t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{t.name}</p>
                      <p className="text-xs text-muted-foreground font-medium">{t.subject} · {t.students} students</p>
                    </div>
                    <Badge variant="secondary" className="text-xs font-semibold bg-primary/10 text-primary border-none">{t.sessionsThisMonth} sessions</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
