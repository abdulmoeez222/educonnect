import { useState } from "react";
import { User, Lock, Bell, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Tab = 'profile' | 'security' | 'notifications';

const NOTIFICATION_PREFS = [
  { key: 'booking_email', label: 'Session confirmations', category: 'Bookings', channels: ['email', 'push', 'sms'] },
  { key: 'booking_reminder', label: 'Session reminders (1 hour before)', category: 'Bookings', channels: ['email', 'push', 'sms'] },
  { key: 'message_push', label: 'New messages', category: 'Messages', channels: ['email', 'push'] },
  { key: 'payment_email', label: 'Payment receipts', category: 'Payments', channels: ['email'] },
  { key: 'payment_push', label: 'Payment alerts', category: 'Payments', channels: ['push', 'sms'] },
  { key: 'system_push', label: 'Platform updates & new features', category: 'System', channels: ['email', 'push'] },
  { key: 'readiness_push', label: 'Weekly AI readiness score', category: 'System', channels: ['email', 'push'] },
];

const CATEGORIES = ['Bookings', 'Messages', 'Payments', 'System'];

type Channel = 'email' | 'push' | 'sms';

export default function Settings() {
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>('profile');
  const [name, setName] = useState('Hamza Khan');
  const [email, setEmail] = useState('hamza@example.com');
  const [phone, setPhone] = useState('0312-3456789');
  const [city, setCity] = useState('Lahore');
  const [notifPrefs, setNotifPrefs] = useState<Record<string, Record<Channel, boolean>>>(
    Object.fromEntries(NOTIFICATION_PREFS.map(n => [n.key, { email: true, push: true, sms: false }]))
  );

  const togglePref = (key: string, channel: Channel) => {
    setNotifPrefs(prev => ({
      ...prev,
      [key]: { ...prev[key], [channel]: !prev[key][channel] },
    }));
  };

  const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-in fade-in duration-300">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 tracking-tight">Account settings</h1>
        <p className="text-muted-foreground">Manage your personal info, security, and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
        {/* Left Nav */}
        <div className="space-y-1">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === t.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              <t.icon className="h-5 w-5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {tab === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-card rounded-2xl border p-6 mb-5 shadow-sm">
                <h2 className="text-lg font-bold mb-1">Personal information</h2>
                <p className="text-sm text-muted-foreground mb-6">Update your photo and personal details.</p>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="h-24 w-24 rounded-full relative cursor-pointer group shrink-0">
                    <Avatar className="h-24 w-24 border-2 shadow-sm">
                      <AvatarImage src="https://i.pravatar.cc/150?u=hamza" />
                      <AvatarFallback className="text-2xl font-bold">HK</AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">Profile photo</h3>
                    <p className="text-sm text-muted-foreground mb-3">JPG, GIF or PNG. Max size of 5MB.</p>
                    <div className="flex gap-3">
                      <Button size="sm" className="h-9 rounded-2xl">Upload</Button>
                      <Button size="sm" variant="outline" className="h-9 rounded-2xl text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive transition-all duration-200">Remove</Button>
                    </div>
                  </div>
                </div>

                <div className="border-t my-5"></div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="font-medium text-sm">Full name</Label>
                      <Input value={name} onChange={e => setName(e.target.value)} className="h-11 rounded-xl border-2 focus:border-primary" data-testid="input-name" />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium text-sm">City</Label>
                      <Select value={city} onValueChange={setCity}>
                        <SelectTrigger className="h-11 rounded-xl border-2 focus:border-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta'].map(c => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium text-sm">Email address</Label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="h-11 rounded-xl border-2 focus:border-primary" data-testid="input-email" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium text-sm">Phone number</Label>
                    <Input value={phone} onChange={e => setPhone(e.target.value)} className="h-11 rounded-xl border-2 focus:border-primary" data-testid="input-phone" />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button className="h-10 rounded-xl px-6 font-semibold" onClick={() => toast({ title: 'Profile updated' })} data-testid="btn-save-profile">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {tab === 'security' && (
            <div className="animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-card rounded-2xl border p-6 mb-5 shadow-sm">
                <h2 className="text-lg font-bold mb-1">Change password</h2>
                <p className="text-sm text-muted-foreground mb-6">Ensure your account is using a long, random password to stay secure.</p>
                
                <div className="space-y-5 max-w-md">
                  <div className="space-y-2">
                    <Label className="font-medium text-sm">Current password</Label>
                    <Input type="password" placeholder="Enter current password" className="h-11 rounded-xl border-2 focus:border-primary" data-testid="input-current-pw" />
                  </div>
                  <div className="border-t my-5"></div>
                  <div className="space-y-2">
                    <Label className="font-medium text-sm">New password</Label>
                    <Input type="password" placeholder="At least 8 characters" className="h-11 rounded-xl border-2 focus:border-primary" data-testid="input-new-pw" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium text-sm">Confirm new password</Label>
                    <Input type="password" placeholder="Repeat new password" className="h-11 rounded-xl border-2 focus:border-primary" data-testid="input-confirm-pw" />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button className="h-10 rounded-xl px-6 font-semibold" onClick={() => toast({ title: 'Password updated successfully' })} data-testid="btn-change-pw">
                    Update Password
                  </Button>
                </div>
              </div>

              <div className="border-2 border-destructive/30 rounded-2xl p-6 mt-8 bg-destructive/5">
                <h2 className="text-base font-bold text-destructive mb-1">Danger zone</h2>
                <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all data. This action cannot be undone.</p>
                
                <Button className="h-10 rounded-xl border-2 border-destructive text-destructive hover:bg-destructive hover:text-white transition-colors bg-transparent"
                  onClick={() => toast({ title: 'Contact support to delete your account', description: 'For security, account deletion requires identity verification.' })}>
                  Delete Account
                </Button>
              </div>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 space-y-5">
              {CATEGORIES.map(cat => {
                const items = NOTIFICATION_PREFS.filter(n => n.category === cat);
                return (
                  <div key={cat} className="bg-card rounded-2xl border p-6 shadow-sm">
                    <h2 className="text-lg font-bold mb-1">{cat}</h2>
                    <p className="text-sm text-muted-foreground mb-6">Manage how you receive {cat.toLowerCase()} notifications.</p>
                    
                    <div className="space-y-6">
                      {items.map((item, index) => (
                        <div key={item.key}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <span className="text-sm font-medium">{item.label}</span>
                            <div className="flex items-center gap-6 shrink-0">
                              {(['email', 'push', 'sms'] as Channel[]).map(ch => (
                                item.channels.includes(ch) ? (
                                  <div key={ch} className="flex items-center gap-2">
                                    <Switch
                                      checked={notifPrefs[item.key]?.[ch] ?? false}
                                      onCheckedChange={() => togglePref(item.key, ch)}
                                      data-testid={`toggle-${item.key}-${ch}`}
                                    />
                                    <span className="text-xs font-semibold text-muted-foreground capitalize w-10">{ch}</span>
                                  </div>
                                ) : <div key={ch} className="w-[4.5rem]" />
                              ))}
                            </div>
                          </div>
                          {index < items.length - 1 && <div className="border-t my-5"></div>}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              
              <div className="mt-8 flex justify-end">
                <Button className="h-10 rounded-xl px-6 font-semibold" onClick={() => toast({ title: 'Notification preferences saved' })} data-testid="btn-save-notifs">
                  Save Preferences
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
