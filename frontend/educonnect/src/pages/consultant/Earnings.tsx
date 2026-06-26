import { EarningsSummaryCard } from "@/components/cards/EarningsSummaryCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { consultantSessions, consultantEarningsSummary } from "@/lib/mock-data/consultant-earnings";
import { useToast } from "@/hooks/use-toast";

export default function ConsultantEarnings() {
  const { toast } = useToast();

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Earnings</h1>
        <p className="text-muted-foreground">Your consultation revenue and payout history.</p>
      </div>

      <EarningsSummaryCard
        totalEarned={consultantEarningsSummary.totalEarned}
        pendingPayout={consultantEarningsSummary.pendingPayout}
        thisMonth={consultantEarningsSummary.thisMonth}
        totalSessions={consultantEarningsSummary.totalSessions}
        role="consultant"
        onRequestPayout={() => toast({ title: 'Payout requested', description: 'Your withdrawal will be processed within 2 business days.' })}
      />

      <div className="mt-8">
        <div className="flex items-start gap-2 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-4 text-sm text-amber-800 dark:text-amber-400">
          EduConnect retains a 12% platform commission on each session fee. Net amounts shown below are what you receive.
        </div>

        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Session Type</TableHead>
                  <TableHead className="text-right">Gross</TableHead>
                  <TableHead className="text-right">Commission (12%)</TableHead>
                  <TableHead className="text-right">Net Earned</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {consultantSessions.map(session => (
                  <TableRow key={session.id}>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{session.date}</TableCell>
                    <TableCell className="font-medium whitespace-nowrap">{session.clientName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{session.sessionType}</TableCell>
                    <TableCell className="text-right font-medium whitespace-nowrap">
                      PKR {session.grossAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-red-600 dark:text-red-400 font-medium whitespace-nowrap">
                      −PKR {session.commission.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-green-600 dark:text-green-400 font-bold whitespace-nowrap">
                      PKR {session.netAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={session.status === 'paid' ? 'default' : 'secondary'}
                        className={session.status === 'paid'
                          ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400 border-green-200 dark:border-green-800'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                        }
                      >
                        {session.status === 'paid' ? 'Paid' : 'Pending'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Sample row detail callout */}
        <Card className="mt-4 bg-muted/30">
          <CardContent className="p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">How commissions work</p>
            <p>Example: Session fee <span className="font-medium text-foreground">PKR 5,000</span> — Platform commission (12%) <span className="text-red-600 dark:text-red-400 font-medium">−PKR 600</span> — Net to you <span className="text-green-600 dark:text-green-400 font-bold">PKR 4,400</span></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
