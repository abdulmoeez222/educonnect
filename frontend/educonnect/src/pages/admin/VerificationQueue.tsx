import { useState } from "react";
import { ChevronDown, ChevronUp, Check, X, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { VERIFICATION_REQUESTS, type VerificationRequest } from "@/lib/mock-data/admin-data";

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
  approved: 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400',
};

export default function VerificationQueue() {
  const { toast } = useToast();
  const [requests, setRequests] = useState(VERIFICATION_REQUESTS);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const pending = requests.filter(r => r.status === 'pending');
  const decided = requests.filter(r => r.status !== 'pending');

  const approve = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' as const } : r));
    toast({ title: 'Profile approved', description: 'Applicant will be notified and their badge activated.' });
  };

  const reject = () => {
    if (!rejectId) return;
    setRequests(prev => prev.map(r => r.id === rejectId ? { ...r, status: 'rejected' as const } : r));
    setRejectId(null);
    setRejectReason('');
    toast({ title: 'Application rejected', description: 'Applicant has been notified with the reason provided.' });
  };

  const RequestRow = ({ r }: { r: VerificationRequest }) => {
    const isOpen = expanded === r.id;
    return (
      <Card key={r.id} className={`border ${r.status === 'pending' ? 'border-amber-200 dark:border-amber-800' : ''}`}>
        <div
          className="flex items-center gap-4 p-4 cursor-pointer"
          onClick={() => setExpanded(isOpen ? null : r.id)}
          data-testid={`row-${r.id}`}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm">{r.name}</span>
              <Badge variant="secondary" className="text-xs capitalize">{r.role}</Badge>
              <Badge variant="secondary" className={`text-xs capitalize ${STATUS_STYLES[r.status]}`}>{r.status}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {r.role === 'tutor' ? r.subject : r.expertise} · {r.institution} · Submitted {r.submittedDate}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {r.status === 'pending' && (
              <>
                <Button size="sm" className="h-7 bg-green-600 hover:bg-green-700 text-white transition-all duration-200"
                  onClick={e => { e.stopPropagation(); approve(r.id); }} data-testid={`btn-approve-${r.id}`}>
                  <Check className="h-3.5 w-3.5 mr-1" /> Approve
                </Button>
                <Button size="sm" variant="outline" className="h-7 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30 transition-all duration-200"
                  onClick={e => { e.stopPropagation(); setRejectId(r.id); }} data-testid={`btn-reject-${r.id}`}>
                  <X className="h-3.5 w-3.5 mr-1" /> Reject
                </Button>
              </>
            )}
            {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </div>
        </div>

        {isOpen && (
          <CardContent className="pt-0 pb-4 px-4 border-t">
            <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Credentials</p>
                <div className="space-y-1">
                  <p><span className="text-muted-foreground">CNIC:</span> {r.cnic}</p>
                  <p><span className="text-muted-foreground">Degree:</span> {r.degree}</p>
                  <p><span className="text-muted-foreground">Institution:</span> {r.institution}</p>
                  {r.mdcatScore && <p><span className="text-muted-foreground">MDCAT Score:</span> <strong className="text-green-600 dark:text-green-400">{r.mdcatScore}/200</strong></p>}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Experience</p>
                <p className="text-muted-foreground leading-relaxed">{r.experience}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Submitted Documents</p>
              <div className="flex flex-wrap gap-2">
                {r.documents.map(doc => (
                  <div key={doc} className="flex items-center gap-1.5 text-xs bg-muted px-2.5 py-1.5 rounded-xl border">
                    <FileText className="h-3 w-3 text-muted-foreground" />
                    {doc}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Verification queue</h1>
        <p className="text-muted-foreground">Review tutor and consultant verification applications.</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-semibold">Pending review</h2>
          <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">{pending.length}</Badge>
        </div>
        <div className="space-y-3">
          {pending.length === 0 && <p className="text-sm text-muted-foreground">No pending applications. All caught up.</p>}
          {pending.map(r => <RequestRow key={r.id} r={r} />)}
        </div>
      </div>

      {decided.length > 0 && (
        <div>
          <h2 className="font-semibold mb-4 text-muted-foreground">Recently decided</h2>
          <div className="space-y-3">
            {decided.map(r => <RequestRow key={r.id} r={r} />)}
          </div>
        </div>
      )}

      <Dialog open={!!rejectId} onOpenChange={() => { setRejectId(null); setRejectReason(''); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Provide a reason — this will be shared with the applicant so they can address the issue and reapply.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={rejectReason}
            onChange={e => setRejectReason(e.target.value)}
            placeholder="e.g. Degree certificate is unclear. Please re-upload a high-resolution scan."
            rows={4}
            data-testid="input-reject-reason"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={reject} data-testid="btn-confirm-reject">
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
