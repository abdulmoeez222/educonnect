import { Wallet, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EarningsSummaryCardProps {
  totalEarned: number;
  pendingPayout: number;
  thisMonth: number;
  totalSessions: number;
  role?: 'tutor' | 'consultant';
  onRequestPayout?: () => void;
}

export function EarningsSummaryCard({
  totalEarned,
  pendingPayout,
  thisMonth,
  totalSessions,
  role = 'tutor',
  onRequestPayout
}: EarningsSummaryCardProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Earned</CardTitle>
            <Wallet className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">PKR {totalEarned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              From {totalSessions} total sessions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">PKR {thisMonth.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payout</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">PKR {pendingPayout.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Available for withdrawal
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4 justify-between bg-muted/30">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Select defaultValue="jazzcash">
              <SelectTrigger className="w-full sm:w-[200px]" data-testid="select-payout-method">
                <SelectValue placeholder="Select payout method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jazzcash">JazzCash</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto" 
            onClick={onRequestPayout}
            disabled={pendingPayout <= 0}
            data-testid="button-request-payout"
          >
            <Wallet className="h-4 w-4 mr-2" />
            Request Payout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
