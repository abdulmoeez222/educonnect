import { useState } from "react";
import { Link } from "wouter";
import { CalendarDays, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const BILLING_HISTORY = [
  { id: 'b-1', date: 'Jun 22, 2025', amount: 999, plan: 'Student AI Plan', status: 'paid', invoice: '#INV-2506' },
  { id: 'b-2', date: 'May 22, 2025', amount: 999, plan: 'Student AI Plan', status: 'paid', invoice: '#INV-2505' },
  { id: 'b-3', date: 'Apr 22, 2025', amount: 999, plan: 'Student AI Plan', status: 'paid', invoice: '#INV-2504' },
  { id: 'b-4', date: 'Mar 22, 2025', amount: 999, plan: 'Student AI Plan', status: 'paid', invoice: '#INV-2503' },
];

export default function Subscription() {
  const { toast } = useToast();
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const handleCancel = () => {
    setCancelled(true);
    setCancelOpen(false);
    toast({ title: 'Subscription cancelled', description: 'You\'ll retain access until Jul 22, 2025.' });
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <h1 className="text-3xl font-bold mb-1">Subscription</h1>
      <p className="text-muted-foreground mb-8">Manage your plan and billing.</p>

      {/* Current plan */}
      <Card className="mb-6 border-2 border-primary">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-lg">Student AI Plan</span>
                {cancelled
                  ? <Badge variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">Cancelling</Badge>
                  : <Badge className="bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-0 text-xs">Active</Badge>
                }
              </div>
              <p className="text-2xl font-black text-primary">PKR 999 <span className="text-sm font-normal text-muted-foreground">/month</span></p>
              {cancelled
                ? <p className="text-sm text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> Access ends Jul 22, 2025</p>
                : <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> Next billing: Jul 22, 2025</p>
              }
            </div>
            <div className="flex gap-2 flex-col sm:flex-row">
              <Button variant="outline" size="sm" asChild>
                <Link href="/pricing">Change plan</Link>
              </Button>
              {!cancelled && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200"
                  onClick={() => setCancelOpen(true)}
                  data-testid="btn-cancel-sub"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t grid grid-cols-2 sm:grid-cols-3 gap-3">
            {['AI Doubt-Bot', 'Mock Tests', 'Flashcards', 'Study Plan', 'Readiness Score', 'Session Debriefs'].map(f => (
              <div key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400 shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment method */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            Payment Method
            <Button variant="ghost" size="sm" asChild>
              <Link href="/payment-methods">Manage <ExternalLink className="ml-1 h-3 w-3" /></Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="h-8 w-12 rounded border bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">JC</div>
            <div>
              <p className="text-sm font-medium">JazzCash</p>
              <p className="text-xs text-muted-foreground">03xx-xxxxxxx (default)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing history */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Billing History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left px-6 py-3 text-xs text-muted-foreground font-medium">Date</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">Plan</th>
                <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium">Amount</th>
                <th className="text-right px-6 py-3 text-xs text-muted-foreground font-medium">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {BILLING_HISTORY.map(row => (
                <tr key={row.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3 text-muted-foreground">{row.date}</td>
                  <td className="px-4 py-3">{row.plan}</td>
                  <td className="px-4 py-3 text-right font-medium">PKR {row.amount.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right">
                    <button className="text-primary text-xs hover:underline transition-all duration-200">{row.invoice}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Cancel modal */}
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel subscription?</DialogTitle>
            <DialogDescription>
              Your Student AI Plan will remain active until <strong>Jul 22, 2025</strong>. After that, you'll be moved to the Free plan. You can re-subscribe any time.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setCancelOpen(false)}>Keep my plan</Button>
            <Button variant="destructive" onClick={handleCancel} data-testid="btn-confirm-cancel">
              Yes, cancel subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
