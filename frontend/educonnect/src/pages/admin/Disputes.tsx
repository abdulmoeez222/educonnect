import { useState } from "react";
import { ArrowLeft, RefreshCw, AlertOctagon, CheckCircle2, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DISPUTES, type Dispute } from "@/lib/mock-data/admin-data";

const STATUS_STYLES: Record<string, string> = {
  open: 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400',
  resolved: 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400',
  escalated: 'bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400',
};

const ISSUE_LABELS: Record<string, string> = {
  'no-show': 'No-show',
  quality: 'Quality',
  refund: 'Refund',
  technical: 'Technical',
};

export default function Disputes() {
  const { toast } = useToast();
  const [disputes, setDisputes] = useState(DISPUTES);
  const [selected, setSelected] = useState<string | null>(null);
  const [adminNote, setAdminNote] = useState('');

  const active = disputes.filter(d => d.status !== 'resolved');
  const resolved = disputes.filter(d => d.status === 'resolved');

  const resolve = (id: string, action: 'refund' | 'no-action' | 'escalate') => {
    const labels = { refund: 'Refunded — student notified', 'no-action': 'Closed with no action', escalate: 'Escalated to senior team' };
    const newStatus = action === 'escalate' ? 'escalated' as const : 'resolved' as const;
    setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
    setSelected(null);
    setAdminNote('');
    toast({ title: labels[action] });
  };

  const selectedDispute = disputes.find(d => d.id === selected);

  const ROLE_COLORS: Record<string, string> = {
    student: 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
    tutor: 'bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400',
    admin: 'bg-muted text-muted-foreground',
  };

  if (selectedDispute) {
    return (
      <div className="max-w-3xl">
        <Button variant="ghost" className="-ml-4 mb-6" onClick={() => setSelected(null)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Disputes
        </Button>

        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">Dispute {selectedDispute.bookingId}</h1>
              <Badge variant="secondary" className={`text-xs ${STATUS_STYLES[selectedDispute.status]}`}>{selectedDispute.status}</Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              {selectedDispute.student} vs {selectedDispute.tutor} · PKR {selectedDispute.amount.toLocaleString()} · Opened {selectedDispute.openedDate}
            </p>
          </div>
          <Badge variant="secondary" className="text-xs shrink-0">{ISSUE_LABELS[selectedDispute.issueType]}</Badge>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Issue Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{selectedDispute.issueSummary}</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Conversation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDispute.messages.map((msg, i) => (
              <div key={i} className="flex gap-3">
                <div className="shrink-0">
                  <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${ROLE_COLORS[msg.role]}`}>{msg.role}</div>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold">{msg.sender}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {selectedDispute.status === 'open' && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={adminNote}
                onChange={e => setAdminNote(e.target.value)}
                placeholder="Add an admin note visible to both parties (optional)…"
                rows={3}
                data-testid="input-admin-note"
              />
              <div className="flex flex-wrap gap-3">
                <Button className="bg-green-600 hover:bg-green-700 text-white transition-all duration-200" onClick={() => resolve(selectedDispute.id, 'refund')} data-testid="btn-refund">
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Issue Refund
                </Button>
                <Button variant="outline" onClick={() => resolve(selectedDispute.id, 'no-action')} data-testid="btn-no-action">
                  Close — No Action
                </Button>
                <Button variant="outline" className="text-orange-600 border-orange-200 hover:bg-orange-50 dark:border-orange-800 dark:hover:bg-orange-950/30 transition-all duration-200" onClick={() => resolve(selectedDispute.id, 'escalate')} data-testid="btn-escalate">
                  <TrendingUp className="mr-2 h-4 w-4" /> Escalate
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Dispute management</h1>
        <p className="text-muted-foreground">Review and resolve booking disputes between students and tutors.</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-semibold">Open disputes</h2>
          <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400">{active.length}</Badge>
        </div>
        <div className="space-y-3">
          {active.map(d => (
            <Card key={d.id} className="hover:border-primary/40 transition-colors cursor-pointer" onClick={() => setSelected(d.id)} data-testid={`dispute-${d.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-sm">{d.bookingId}</span>
                      <Badge variant="secondary" className={`text-xs ${STATUS_STYLES[d.status]}`}>{d.status}</Badge>
                      <Badge variant="secondary" className="text-xs">{ISSUE_LABELS[d.issueType]}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{d.student} vs {d.tutor} · PKR {d.amount.toLocaleString()}</p>
                    <p className="text-sm mt-1 leading-snug line-clamp-2">{d.issueSummary}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">{d.openedDate}</p>
                    <p className="text-xs text-muted-foreground mt-1">{d.messages.length} messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {resolved.length > 0 && (
        <div>
          <h2 className="font-semibold mb-4 text-muted-foreground">Resolved</h2>
          <div className="space-y-3">
            {resolved.map(d => (
              <Card key={d.id} className="opacity-70 hover:opacity-100 cursor-pointer transition-opacity" onClick={() => setSelected(d.id)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{d.bookingId}</span>
                        <Badge variant="secondary" className={`text-xs ${STATUS_STYLES[d.status]}`}>{d.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{d.student} vs {d.tutor} · {d.openedDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
