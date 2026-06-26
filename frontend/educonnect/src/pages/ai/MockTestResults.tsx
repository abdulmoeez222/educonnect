import { Link } from "wouter";
import { CheckCircle2, XCircle, TrendingUp, RefreshCw, ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendChart } from "@/components/ui/TrendChart";
import { MOCK_TEST_QUESTIONS, TOPIC_SCORES } from "@/lib/mock-data/ai-content";

const MOCK_ANSWERS: Record<number, number> = {
  0: 1, 1: 2, 2: 2, 3: 2, 4: 2, 5: 1, 6: 2, 7: 3,
  8: 1, 9: 2, 10: 1, 11: 1, 12: 0, 13: 2, 14: 2,
  15: 2, 16: 2, 17: 2, 18: 1, 19: 1,
};

export default function MockTestResults() {
  const answers = MOCK_ANSWERS;
  const questions = MOCK_TEST_QUESTIONS;

  const correct = questions.filter((q, i) => answers[i] === q.correctIndex);
  const incorrect = questions.filter((q, i) => answers[i] !== undefined && answers[i] !== q.correctIndex);
  const unanswered = questions.filter((_, i) => answers[i] === undefined);

  const scorePercent = Math.round((correct.length / questions.length) * 100);
  const isPassing = scorePercent >= 70;

  const subjectBreakdown = TOPIC_SCORES.map(t => ({
    topic: t.topic,
    score: t.score,
    correct: Math.round((t.score / 100) * t.questions),
    total: t.questions,
  }));

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-fade-in-1 {
          animation: fadeIn 0.4s ease-out 0.1s forwards;
          opacity: 0;
        }
        .animate-fade-in-2 {
          animation: fadeIn 0.4s ease-out 0.2s forwards;
          opacity: 0;
        }
        .animate-fade-in-3 {
          animation: fadeIn 0.4s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>

      <Button variant="ghost" className="-ml-4 mb-6" asChild>
        <Link href="/mock-test">
          <ArrowLeft className="mr-2 h-4 w-4" /> New Test
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-6">Test results</h1>

      {/* Score */}
      <Card className={`mb-6 border-2 rounded-2xl overflow-hidden shadow-lg ${isPassing ? 'border-green-500/50 bg-gradient-to-br from-green-50/40 to-card' : 'border-amber-500/50 bg-gradient-to-br from-amber-50/40 to-card'} animate-fade-in`}>
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="text-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-6 min-w-[140px] shadow-md shadow-indigo-500/25">
              <div className="text-5xl font-black">
                {scorePercent}%
              </div>
              <div className="text-xs text-indigo-100 mt-1 uppercase tracking-wider font-semibold">Overall Score</div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-4 text-center">
              <div className="bg-card rounded-2xl p-4 border border-muted hover:border-green-500/30 transition-all duration-200 shadow-sm animate-fade-in-1">
                <div className="text-2xl font-black text-green-600 dark:text-green-400">{correct.length}</div>
                <div className="text-xs text-muted-foreground font-semibold mt-1">Correct</div>
              </div>
              <div className="bg-card rounded-2xl p-4 border border-muted hover:border-red-500/30 transition-all duration-200 shadow-sm animate-fade-in-2">
                <div className="text-2xl font-black text-red-600 dark:text-red-400">{incorrect.length}</div>
                <div className="text-xs text-muted-foreground font-semibold mt-1">Incorrect</div>
              </div>
              <div className="bg-card rounded-2xl p-4 border border-muted hover:border-primary/30 transition-all duration-200 shadow-sm animate-fade-in-3">
                <div className="text-2xl font-black text-muted-foreground">{unanswered.length}</div>
                <div className="text-xs text-muted-foreground font-semibold mt-1">Skipped</div>
              </div>
            </div>
          </div>
          <div className={`mt-6 p-4 rounded-xl text-sm text-center font-medium leading-relaxed ${isPassing ? 'bg-green-100/60 dark:bg-green-950/30 text-green-800 dark:text-green-400' : 'bg-amber-100/60 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400'}`}>
            {isPassing
              ? 'Great work! You\'re on track for MDCAT. Keep practising to push beyond 80%.'
              : 'Good effort. Focus on the weak areas below — you\'re making real progress.'}
          </div>
        </CardContent>
      </Card>

      {/* Topic breakdown chart */}
      <Card className="mb-6 rounded-2xl border border-indigo-100 dark:border-indigo-900 bg-gradient-to-b from-indigo-50/10 to-card shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Score by Subject
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TrendChart
            data={subjectBreakdown}
            type="bar"
            xKey="topic"
            yKey="score"
            height={180}
            color="hsl(var(--muted-foreground))"
            highlightLast={false}
            yDomain={[0, 100]}
          />
          <div className="grid grid-cols-3 gap-3 mt-4">
            {subjectBreakdown.map(s => (
              <div key={s.topic} className="text-center p-3 rounded-2xl bg-card border border-muted hover:border-primary/30 transition-all duration-200 shadow-sm">
                <div className="text-lg font-bold text-primary">{s.score}%</div>
                <div className="text-xs text-muted-foreground font-medium mt-0.5">{s.topic}</div>
                <div className="text-[10px] text-muted-foreground mt-1 bg-muted px-1.5 py-0.5 rounded-full inline-block font-semibold">{s.correct}/{s.total} correct</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Incorrect answers */}
      {incorrect.length > 0 && (
        <Card className="mb-6 rounded-2xl border border-red-100 dark:border-red-950 shadow-md animate-fade-in-2">
          <CardHeader className="pb-3 border-b border-red-50 dark:border-red-950/50">
            <CardTitle className="text-base flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              Incorrect Answers ({incorrect.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {incorrect.slice(0, 8).map((q, i) => {
              const qIdx = questions.indexOf(q);
              const userAnswer = answers[qIdx];
              return (
                <div key={q.id} className="border border-red-100 dark:border-red-950/50 rounded-2xl p-5 space-y-3 bg-red-50/10 hover:border-red-300 dark:hover:border-red-800 transition-all duration-200">
                  <div className="flex items-start gap-3">
                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-2">
                      <p className="text-sm font-semibold leading-relaxed">{q.question}</p>
                      <div className="space-y-2 bg-card p-3.5 rounded-xl border border-muted">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-red-600 dark:text-red-400 font-semibold shrink-0">Your answer:</span>
                          <span className="line-through text-muted-foreground">{userAnswer !== undefined ? q.options[userAnswer] : 'Skipped'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400 shrink-0" />
                          <span className="text-green-700 dark:text-green-400 font-bold">{q.options[q.correctIndex]}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed italic bg-muted/40 p-2.5 rounded-2xl border-l-2 border-primary/40">{q.explanation}</p>
                    </div>
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider shrink-0 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 font-bold">{q.subject}</Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-md border-none transition-all duration-200" asChild>
          <Link href="/mock-test">
            <RefreshCw className="mr-2 h-4 w-4" /> Generate New Test from Weak Areas
          </Link>
        </Button>
        <Button variant="outline" className="flex-1 rounded-xl" asChild>
          <Link href="/ai-chat">
            <MessageSquare className="mr-2 h-4 w-4" /> Ask AI to explain mistakes
          </Link>
        </Button>
      </div>
    </div>
  );
}
