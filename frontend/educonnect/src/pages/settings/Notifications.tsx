import { useState } from "react";
import { Bell, BookOpen, CreditCard, Settings2, CheckCheck } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MOCK_NOTIFICATIONS, type Notification } from "@/lib/mock-data/notifications-data";

const TYPE_CONFIG: Record<Notification['type'], { icon: React.ElementType; label: string; color: string }> = {
  booking: { icon: BookOpen, label: 'Bookings', color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' },
  payment: { icon: CreditCard, label: 'Payments', color: 'bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400' },
  system: { icon: Settings2, label: 'System', color: 'bg-muted text-muted-foreground' },
};

type FilterType = 'all' | Notification['type'];

export default function Notifications() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<FilterType>('all');

  const unread = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const filtered = notifications.filter(n => filter === 'all' || n.type === filter);

  const TABS: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'booking', label: 'Bookings' },
    { id: 'payment', label: 'Payments' },
    { id: 'system', label: 'System' },
  ];

  return (
    <div className="max-w-2xl mx-auto pb-20 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1 tracking-tight">Notifications</h1>
          {unread > 0
            ? <p className="text-muted-foreground">{unread} unread notification{unread > 1 ? 's' : ''}</p>
            : <p className="text-muted-foreground">All caught up</p>
          }
        </div>
        {unread > 0 && (
          <Button variant="ghost" className="rounded-xl h-10 px-4 font-semibold hover:bg-muted transition-all duration-200" onClick={markAllRead} data-testid="btn-mark-all-read">
            <CheckCheck className="mr-2 h-4 w-4" /> Mark all read
          </Button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide -mx-1 px-1">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setFilter(t.id)}
            className={`rounded-full px-5 py-2 text-sm font-medium border whitespace-nowrap cursor-pointer transition-all duration-150 shrink-0 ${filter === t.id ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-primary'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="space-y-3">
        {filtered.map(n => {
          const config = TYPE_CONFIG[n.type];
          const Icon = config.icon;
          return (
            <div
              key={n.id}
              className={`flex items-start gap-4 p-5 rounded-2xl cursor-pointer ${!n.read ? 'bg-primary/5 border border-primary/20 shadow-sm' : 'bg-card border shadow-sm hover:border-primary/30 transition-all'}`}
              onClick={() => markRead(n.id)}
              data-testid={`notif-${n.id}`}
            >
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${config.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-snug ${!n.read ? 'font-bold' : 'font-medium'}`}>{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{n.body}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0 mt-0.5">
                    <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap uppercase tracking-wider">{n.time}</span>
                    {!n.read && <div className="h-2.5 w-2.5 rounded-full bg-primary mt-1" />}
                  </div>
                </div>
                {n.link && (
                  <Link href={n.link} className="text-xs font-semibold text-primary hover:underline mt-2 inline-block transition-all duration-200" onClick={e => e.stopPropagation()}>
                    View Details →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-card rounded-2xl border border-dashed">
            <Bell className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground font-medium">No notifications in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
