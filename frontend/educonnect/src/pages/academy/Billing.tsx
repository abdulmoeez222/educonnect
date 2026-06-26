import { PhoneCall, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ACADEMY_INVOICES } from "@/lib/mock-data/academy-data";

export default function AcademyBilling() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-1">Billing & contract</h1>
      <p className="text-muted-foreground mb-8">Your contract details and invoice history.</p>

      {/* Contract card */}
      <Card className="mb-6 border-2 border-primary">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-lg">Academy Pro Plan</span>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400 border-0 text-xs">Active</Badge>
              </div>
              <p className="text-3xl font-black text-primary">PKR 85,000 <span className="text-sm font-normal text-muted-foreground">/month</span></p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t text-sm">
            {[
              { label: 'Contract tier', value: 'Academy Pro' },
              { label: 'Tutors included', value: '6 tutors' },
              { label: 'Student seats', value: 'Up to 50' },
              { label: 'Contract start', value: 'Jan 1, 2025' },
              { label: 'Renewal date', value: 'Jan 1, 2026' },
              { label: 'Account manager', value: 'Sana Mirza' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-semibold mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invoice history */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Invoice History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left px-6 py-3 text-xs text-muted-foreground font-medium">Date</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-medium">Description</th>
                <th className="text-right px-4 py-3 text-xs text-muted-foreground font-medium">Amount</th>
                <th className="text-right px-6 py-3 text-xs text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {ACADEMY_INVOICES.map(inv => (
                <tr key={inv.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3 text-muted-foreground whitespace-nowrap">{inv.date}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{inv.description}</td>
                  <td className="px-4 py-3 text-right font-semibold">PKR {inv.amount.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right">
                    <Badge variant="secondary" className={`text-xs ${inv.status === 'paid' ? 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'}`}>
                      {inv.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="border-dashed">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">Need to modify your contract?</p>
            <p className="text-xs text-muted-foreground mt-0.5">Contact your account manager or reach EduConnect support directly.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm">
              <PhoneCall className="mr-1.5 h-3.5 w-3.5" /> Call Support
            </Button>
            <Button size="sm">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Email Us
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
