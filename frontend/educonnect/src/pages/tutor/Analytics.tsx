import { useStore } from "@/lib/store";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Minus, Lock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { monthlyEarnings, subjectDemand, studentProgress } from "@/lib/mock-data/earnings";

export default function Analytics() {
  const { isPro, setIsPro } = useStore();

  const getHeatmapColor = (value: number) => {
    if (value === 0) return "bg-muted/30 text-muted-foreground/30";
    if (value <= 5) return "bg-muted text-foreground";
    if (value <= 10) return "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100";
    if (value <= 15) return "bg-indigo-200 dark:bg-indigo-800/50 text-indigo-900 dark:text-indigo-100";
    if (value <= 20) return "bg-indigo-300 dark:bg-indigo-700/70 text-indigo-900 dark:text-indigo-50";
    return "bg-indigo-600 text-white font-bold";
  };

  const renderTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-rose-500" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (!isPro) {
    return (
      <div className="max-w-6xl mx-auto space-y-8 relative">
        <div className="mb-6 flex justify-end">
          <div className="flex items-center gap-2 bg-card border-2 rounded-xl p-2 px-4 shadow-sm">
            <span className="text-sm font-medium">Simulate Pro Mode</span>
            <Switch 
              checked={isPro} 
              onCheckedChange={setIsPro} 
              data-testid="switch-simulate-pro"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Insights to help you grow your business.</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 z-10 backdrop-blur-md bg-background/60 flex items-center justify-center rounded-3xl border-2 border-dashed">
            <div className="w-full max-w-md shadow-2xl border-2 border-indigo-200 dark:border-indigo-800 rounded-3xl bg-card p-6">
              <div className="text-center">
                <div className="mx-auto bg-indigo-100 dark:bg-indigo-900/40 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">This is a pro feature</h2>
                <p className="text-muted-foreground mb-6">
                  Upgrade to Tutor Pro to unlock analytics, student tracking, and detailed earnings reports.
                </p>
                <div className="flex justify-center">
                  <Button asChild className="w-full h-12 rounded-xl font-bold shadow-md bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200" data-testid="button-upgrade-link">
                    <Link href="/tutor/pro">Upgrade to Pro</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="opacity-30 pointer-events-none select-none filter blur-sm space-y-8">
            {/* Fake Content for Blur */}
            <div className="bg-card rounded-3xl border-2 shadow-sm p-6 overflow-hidden">
              <div className="mb-4">
                <h2 className="text-xl font-bold">Earnings trend</h2>
              </div>
              <div className="h-[250px] bg-muted/20 rounded-xl" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card rounded-3xl border-2 shadow-sm p-6 overflow-hidden h-[300px]" />
              <div className="bg-card rounded-3xl border-2 shadow-sm p-6 overflow-hidden h-[300px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="mb-6 flex justify-end">
        <div className="flex items-center gap-2 bg-card border-2 rounded-xl p-2 px-4 shadow-sm">
          <span className="text-sm font-medium">Simulate Pro Mode</span>
          <Switch 
            checked={isPro} 
            onCheckedChange={setIsPro} 
            data-testid="switch-simulate-pro"
          />
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">Detailed insights into your tutoring business.</p>
      </div>

      {/* Section 1 - Earnings Trend */}
      <div className="bg-card rounded-3xl border-2 shadow-sm p-6 overflow-hidden">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Earnings trend</h2>
          <p className="text-muted-foreground text-sm">Your monthly revenue over the last 6 months</p>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyEarnings} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickFormatter={(value) => `Rs ${value/1000}k`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                formatter={(value: number) => [`PKR ${value.toLocaleString()}`, 'Earnings']}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#4f46e5" 
                strokeWidth={3}
                dot={{ r: 4, fill: 'hsl(var(--card))', stroke: '#4f46e5', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#4f46e5', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section 2 & 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Section 2 - Subject Demand Heatmap */}
        <div className="bg-card rounded-3xl border-2 shadow-sm p-6 overflow-hidden">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Subject demand</h2>
            <p className="text-muted-foreground text-sm">Search demand this week by subject</p>
          </div>
          <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b-2 bg-muted/20 transition-all duration-200">
                  <TableHead className="w-[140px] font-semibold text-muted-foreground uppercase tracking-wider text-xs">Subject</TableHead>
                  <TableHead className="text-center px-1 font-semibold text-muted-foreground uppercase tracking-wider text-xs">M</TableHead>
                  <TableHead className="text-center px-1 font-semibold text-muted-foreground uppercase tracking-wider text-xs">T</TableHead>
                  <TableHead className="text-center px-1 font-semibold text-muted-foreground uppercase tracking-wider text-xs">W</TableHead>
                  <TableHead className="text-center px-1 font-semibold text-muted-foreground uppercase tracking-wider text-xs">T</TableHead>
                  <TableHead className="text-center px-1 font-semibold text-muted-foreground uppercase tracking-wider text-xs">F</TableHead>
                  <TableHead className="text-center px-1 font-semibold text-muted-foreground uppercase tracking-wider text-xs">S</TableHead>
                  <TableHead className="text-center px-1 font-semibold text-muted-foreground uppercase tracking-wider text-xs">S</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjectDemand.map((row) => (
                  <TableRow key={row.subject} className="hover:bg-muted/10 transition-colors border-b last:border-0">
                    <TableCell className="font-medium py-3 text-xs truncate max-w-[140px]" title={row.subject}>
                      {row.subject}
                    </TableCell>
                    <TableCell className="p-1">
                      <div className={`w-full h-8 flex items-center justify-center rounded-xl text-xs transition-colors ${getHeatmapColor(row.Mon)}`}>{row.Mon}</div>
                    </TableCell>
                    <TableCell className="p-1">
                      <div className={`w-full h-8 flex items-center justify-center rounded-xl text-xs transition-colors ${getHeatmapColor(row.Tue)}`}>{row.Tue}</div>
                    </TableCell>
                    <TableCell className="p-1">
                      <div className={`w-full h-8 flex items-center justify-center rounded-xl text-xs transition-colors ${getHeatmapColor(row.Wed)}`}>{row.Wed}</div>
                    </TableCell>
                    <TableCell className="p-1">
                      <div className={`w-full h-8 flex items-center justify-center rounded-xl text-xs transition-colors ${getHeatmapColor(row.Thu)}`}>{row.Thu}</div>
                    </TableCell>
                    <TableCell className="p-1">
                      <div className={`w-full h-8 flex items-center justify-center rounded-xl text-xs transition-colors ${getHeatmapColor(row.Fri)}`}>{row.Fri}</div>
                    </TableCell>
                    <TableCell className="p-1">
                      <div className={`w-full h-8 flex items-center justify-center rounded-xl text-xs transition-colors ${getHeatmapColor(row.Sat)}`}>{row.Sat}</div>
                    </TableCell>
                    <TableCell className="p-1">
                      <div className={`w-full h-8 flex items-center justify-center rounded-xl text-xs transition-colors ${getHeatmapColor(row.Sun)}`}>{row.Sun}</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end gap-2 mt-6 text-xs text-muted-foreground font-medium">
            <span>Low</span>
            <div className="flex h-4 gap-1">
              <div className="w-5 rounded bg-muted/30" />
              <div className="w-5 rounded bg-indigo-100 dark:bg-indigo-900/30" />
              <div className="w-5 rounded bg-indigo-200 dark:bg-indigo-800/50" />
              <div className="w-5 rounded bg-indigo-300 dark:bg-indigo-700/70" />
              <div className="w-5 rounded bg-indigo-600" />
            </div>
            <span>High</span>
          </div>
        </div>

        {/* Section 3 - Student Progress Tracker */}
        <div className="bg-card rounded-3xl border-2 shadow-sm p-6 overflow-hidden">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Student progress</h2>
            <p className="text-muted-foreground text-sm">Track performance of your active students</p>
          </div>
          <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b-2 bg-muted/20 transition-all duration-200">
                  <TableHead className="font-semibold text-muted-foreground uppercase tracking-wider text-xs">Student</TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase tracking-wider text-xs">Attendance</TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase tracking-wider text-xs">Homework</TableHead>
                  <TableHead className="text-center font-semibold text-muted-foreground uppercase tracking-wider text-xs">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentProgress.map((student, i) => (
                  <TableRow key={i} className="hover:bg-muted/10 transition-colors border-b last:border-0">
                    <TableCell className="py-3">
                      <div className="font-bold text-sm">{student.name}</div>
                      <div className="text-xs text-muted-foreground">{student.subject}</div>
                    </TableCell>
                    <TableCell className="w-[120px]">
                      <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                        <span>{student.attendance}%</span>
                      </div>
                      <Progress value={student.attendance} className="h-2" />
                    </TableCell>
                    <TableCell className="w-[120px]">
                      <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                        <span>{student.homeworkCompletion}%</span>
                      </div>
                      <Progress value={student.homeworkCompletion} className="h-2" />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center bg-muted/20 w-8 h-8 rounded-full items-center mx-auto">
                        {renderTrendIcon(student.readinessTrend)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

      </div>
    </div>
  );
}
