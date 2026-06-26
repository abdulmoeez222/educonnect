import { useState } from "react";
import { Search, Plus, Trash2, MessageSquare, Download, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ACADEMY_TUTORS, ACADEMY_STUDENTS } from "@/lib/mock-data/academy-data";

type Tab = 'tutors' | 'students';

export default function Roster() {
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>('students');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [addOpen, setAddOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const students = ACADEMY_STUDENTS.filter(s =>
    (filterStatus === 'all' || s.status === filterStatus) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.tutor.toLowerCase().includes(search.toLowerCase()))
  );
  const tutors = ACADEMY_TUTORS.filter(t =>
    (filterStatus === 'all' || t.status === filterStatus) &&
    (t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()))
  );

  const items = tab === 'students' ? students : tutors;
  const allSelected = selected.size === items.length && items.length > 0;

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(items.map(i => i.id)));
  };
  const toggle = (id: string) => {
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const handleBulk = (action: string) => {
    toast({ title: `${action} applied to ${selected.size} member${selected.size > 1 ? 's' : ''}` });
    setSelected(new Set());
  };

  return (
    <div className="animate-in fade-in duration-300 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1 tracking-tight">Roster management</h1>
          <p className="text-muted-foreground">Manage tutors and students in your academy.</p>
        </div>
        <Button onClick={() => setAddOpen(true)} className="rounded-xl h-10 px-4 font-semibold" data-testid="btn-add-member">
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        {(['students', 'tutors'] as Tab[]).map(t => (
          <button key={t} onClick={() => { setTab(t); setSelected(new Set()); }}
            className={`px-4 py-2 text-sm font-semibold capitalize border-b-2 transition-colors ${tab === t ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
            {t} ({t === 'students' ? ACADEMY_STUDENTS.length : ACADEMY_TUTORS.length})
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search by name…" 
            className="h-11 rounded-xl border-2 pl-11 text-base focus:border-primary" 
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="h-11 rounded-xl border-2 text-sm w-full sm:w-40 focus:border-primary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-primary/5 rounded-xl border border-primary/20 animate-in slide-in-from-top-2">
          <span className="text-sm font-semibold px-2">{selected.size} selected</span>
          <Button size="sm" variant="outline" className="rounded-2xl h-8 text-xs font-semibold bg-background" onClick={() => handleBulk('Message')} data-testid="btn-bulk-message">
            <MessageSquare className="mr-1.5 h-3.5 w-3.5" /> Message
          </Button>
          <Button size="sm" variant="outline" className="rounded-2xl h-8 text-xs font-semibold bg-background" onClick={() => handleBulk('Export')} data-testid="btn-bulk-export">
            <Download className="mr-1.5 h-3.5 w-3.5" /> Export
          </Button>
          <Button size="sm" variant="outline" className="rounded-2xl h-8 text-xs font-semibold text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive bg-background transition-all duration-200" onClick={() => handleBulk('Remove')} data-testid="btn-bulk-remove">
            <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Remove
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border overflow-x-auto shadow-sm bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b">
              <th className="px-5 py-3.5 text-left w-12">
                <Checkbox checked={allSelected} onCheckedChange={toggleAll} className="rounded" data-testid="select-all" />
              </th>
              <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</th>
              <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">{tab === 'students' ? 'Grade' : 'Subject'}</th>
              <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">{tab === 'students' ? 'Tutor' : 'Students'}</th>
              <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Sessions</th>
              <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">Joined</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const s = 'grade' in item ? item : null;
              const t = 'subject' in item && !('grade' in item) ? item : null;
              const isSelected = selected.has(item.id);
              return (
                <tr key={item.id} className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${isSelected ? 'bg-primary/5 hover:bg-primary/5' : ''}`}>
                  <td className="px-5 py-4">
                    <Checkbox checked={isSelected} onCheckedChange={() => toggle(item.id)} className="rounded" data-testid={`select-${item.id}`} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border shadow-sm">
                        <AvatarFallback className="font-bold text-xs">{item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-sm">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground font-medium">{s ? s.grade : (t as typeof ACADEMY_TUTORS[0]).subject}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{s ? s.tutor : `${(t as typeof ACADEMY_TUTORS[0]).students} students`}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground font-medium">{s ? s.sessionsAttended : (t as typeof ACADEMY_TUTORS[0]).sessionsThisMonth}</td>
                  <td className="px-5 py-4">
                    <span className={item.status === 'active' 
                      ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/40 dark:text-green-400 dark:border-green-800 rounded-full px-2.5 py-0.5 text-xs font-semibold inline-block" 
                      : "bg-muted text-muted-foreground border rounded-full px-2.5 py-0.5 text-xs font-semibold inline-block"}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{s ? s.lastSession : (t as typeof ACADEMY_TUTORS[0]).joinedDate}</td>
                </tr>
              );
            })}
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-muted-foreground">
                  No {tab} found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add {tab === 'students' ? 'Student' : 'Tutor'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <Label className="font-semibold">Full name</Label>
              <Input placeholder="e.g. Ali Hassan" className="h-11 rounded-xl focus:border-primary" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-semibold">Email / Phone</Label>
              <Input placeholder="e.g. ali@example.com" className="h-11 rounded-xl focus:border-primary" />
            </div>
            {tab === 'students' && (
              <div className="space-y-1.5">
                <Label className="font-semibold">Assign tutor</Label>
                <Select>
                  <SelectTrigger className="h-11 rounded-xl focus:border-primary">
                    <SelectValue placeholder="Select tutor" />
                  </SelectTrigger>
                  <SelectContent>
                    {ACADEMY_TUTORS.filter(t => t.status === 'active').map(t => (
                      <SelectItem key={t.id} value={t.id}>{t.name} — {t.subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-xl h-11 px-6 font-semibold" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button className="rounded-xl h-11 px-6 font-semibold" onClick={() => { setAddOpen(false); toast({ title: `${tab === 'students' ? 'Student' : 'Tutor'} invited successfully` }); }}>
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
