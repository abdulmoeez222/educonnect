import { Link } from "wouter";
import { TrendingUp, Info, ArrowLeft, Sparkles, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TrendChart } from "@/components/ui/TrendChart";
import { READINESS_HISTORY, SUBJECT_READINESS } from "@/lib/mock-data/ai-content";

const SCORE = 68;

function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const strokeDash = (score / 100) * circ;
  const color = score >= 75 ? '#16a34a' : score >= 55 ? '#d97706' : '#dc2626';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
        <circle
          cx="70" cy="70" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={`${strokeDash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-black" style={{ color }}>{score}%</div>
        <div className="text-xs text-muted-foreground font-medium">Ready</div>
      </div>
    </div>
  );
}

export default function Readiness() {
  const lastWeek = READINESS_HISTORY[READINESS_HISTORY.length - 2].score;
  const delta = SCORE - lastWeek;

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <Button variant="ghost" className="-ml-4 mb-6" asChild>
        <Link href="/home">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Readiness score</h1>
        <p className="text-muted-foreground">Your MDCAT preparation progress, tracked weekly by AI.</p>
      </div>

      {/* Score hero */}
      <Card className="mb-6 rounded-2xl border border-indigo-200/60 bg-gradient-to-b from-indigo-50/60 to-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <ScoreRing score={SCORE} />
            <div className="flex-1 text-center sm:text-left">
              <div className="text-sm text-muted-foreground mb-1">Overall Readiness</div>
              <div className={`flex items-center gap-2 mb-3 ${delta >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} justify-center sm:justify-start`}>
                <TrendingUp className="h-4 w-4" />
                <span className="font-semibold text-sm">
                  {delta >= 0 ? '+' : ''}{delta}% from last week
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                You're making solid progress. At this pace you'll reach 80% readiness in approximately 3 weeks. Focus on Chemistry to unlock the biggest gains.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Countdown Block */}
      <Card className="mb-6 rounded-2xl bg-indigo-600 text-white">
        <CardContent className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span className="font-semibold">Mock Exam Countdown</span>
          </div>
          <div className="text-lg font-bold">12d 4h 23m</div>
        </CardContent>
      </Card>

      {/* Trend chart */}
      <Card className="mb-6 rounded-2xl border hover:border-primary/30 transition-all duration-200 bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Readiness Over Time
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <Info className="h-3.5 w-3.5 text-muted-foreground ml-1" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-xs">
                Score is computed weekly from your mock test results, session attendance, flashcard accuracy, and tutor feedback.
              </TooltipContent>
            </Tooltip>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TrendChart
            data={READINESS_HISTORY}
            type="line"
            xKey="week"
            yKey="score"
            height={200}
            yDomain={[30, 100]}
            color="#16a34a"
            tooltipFormatter={(v) => `${v}% ready`}
          />
        </CardContent>
      </Card>

      {/* Subject breakdown */}
      <Card className="mb-6 rounded-2xl border border-muted hover:border-primary/30 transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span>Breakdown by Subject</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex items-center gap-1 text-xs text-muted-foreground font-normal">
                  <Info className="h-3.5 w-3.5" /> What affects this score?
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs text-xs leading-relaxed">
                Each subject score is weighted by: Mock test performance (50%), Session attendance (20%), Flashcard accuracy (20%), Homework completion (10%).
              </TooltipContent>
            </Tooltip>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {SUBJECT_READINESS.map(s => {
            const pct = s.score;
            const gap = s.target - pct;
            const color = pct >= 75 ? 'bg-green-500' : pct >= 55 ? 'bg-amber-500' : 'bg-red-500';
            return (
              <div key={s.subject} className="bg-card rounded-2xl p-4 border hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-medium text-sm">{s.subject}</span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-bold text-foreground">{pct}%</span>
                    <span>· target {s.target}%</span>
                    {gap > 0 && <span className="text-amber-600 dark:text-amber-400 font-medium">({gap} to go)</span>}
                    {gap <= 0 && <span className="text-green-600 dark:text-green-400 font-medium">On track</span>}
                  </div>
                </div>
                <div className="relative h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className={`absolute left-0 top-0 h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
                  {/* Target marker */}
                  <div className="absolute top-0 h-full w-0.5 bg-foreground/30" style={{ left: `${s.target}%` }} />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1" asChild>
          <Link href="/mock-test">
            <Sparkles className="mr-2 h-4 w-4" /> Take a Mock Test
          </Link>
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <Link href="/study-plan">
            <Info className="mr-2 h-4 w-4" /> View Study Plan
          </Link>
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <Link href="/ai-chat">
            <MessageSquare className="mr-2 h-4 w-4" /> Ask AI for guidance
          </Link>
        </Button>
      </div>
    </div>
  );
}
