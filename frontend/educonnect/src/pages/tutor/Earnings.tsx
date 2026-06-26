import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EarningsSummaryCard } from "@/components/cards/EarningsSummaryCard";
import { earningsSummary, sessionHistory } from "@/lib/mock-data/earnings";

export default function Earnings() {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(sessionHistory.length / itemsPerPage);
  const currentItems = sessionHistory.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleRequestPayout = () => {
    toast({
      title: "Payout Requested",
      description: `Your request for PKR ${earningsSummary.pendingPayout.toLocaleString()} has been submitted.`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-bold mb-2">Earnings dashboard</h1>
        <p className="text-muted-foreground">Track your income and request payouts.</p>
      </div>

      <EarningsSummaryCard 
        {...earningsSummary} 
        onRequestPayout={handleRequestPayout} 
      />

      <div className="space-y-4 pt-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">Session history</h2>
        
        <div className="bg-card rounded-3xl border-2 shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30 border-b-2">
              <TableRow>
                <TableHead className="font-semibold text-muted-foreground uppercase tracking-wider text-xs h-12">Date</TableHead>
                <TableHead className="font-semibold text-muted-foreground uppercase tracking-wider text-xs h-12">Student</TableHead>
                <TableHead className="font-semibold text-muted-foreground uppercase tracking-wider text-xs h-12">Subject</TableHead>
                <TableHead className="font-semibold text-muted-foreground uppercase tracking-wider text-xs h-12">Duration</TableHead>
                <TableHead className="font-semibold text-muted-foreground uppercase tracking-wider text-xs h-12 text-right">Amount (PKR)</TableHead>
                <TableHead className="font-semibold text-muted-foreground uppercase tracking-wider text-xs h-12 text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((session) => (
                <TableRow key={session.id} className="hover:bg-muted/30 transition-colors border-b last:border-0">
                  <TableCell className="font-medium">{session.date}</TableCell>
                  <TableCell>{session.studentName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">{session.subject}</Badge>
                  </TableCell>
                  <TableCell>{session.duration} min</TableCell>
                  <TableCell className="text-right font-medium">
                    {session.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {session.status === 'paid' ? (
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900 rounded-full font-medium px-3">
                        Paid
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900 rounded-full font-medium px-3">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination UI */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * itemsPerPage + 1}–{Math.min(page * itemsPerPage, sessionHistory.length)} of {sessionHistory.length}
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-xl"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Prev
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-xl" 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
