import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight, Clock, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MOCK_TEST_QUESTIONS } from "@/lib/mock-data/ai-content";

const TOTAL_TIME = 20 * 60; // 20 minutes in seconds

export default function MockTest() {
  const [, navigate] = useLocation();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [submitted, setSubmitted] = useState(false);

  const questions = MOCK_TEST_QUESTIONS;
  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSubmit = useCallback(() => {
    if (submitted) return;
    setSubmitted(true);
    navigate('/mock-test/results', { state: { answers } });
  }, [submitted, answers, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) { handleSubmit(); return; }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit]);

  const toggleFlag = () => {
    setFlagged(prev => {
      const next = new Set(prev);
      next.has(current) ? next.delete(current) : next.add(current);
      return next;
    });
  };

  const selectAnswer = (idx: number) => {
    setAnswers(prev => ({ ...prev, [current]: idx }));
  };

  const timeWarning = timeLeft < 300;

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(24px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInDown {
          from { transform: translateY(-16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInUp {
          from { transform: translateY(16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-right {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-down {
          animation: slideInDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-up {
          animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 sticky top-[4rem] bg-background/90 backdrop-blur-md z-10 py-3.5 px-4 border-b rounded-b-2xl shadow-sm animate-slide-down">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm">Question {current + 1} of {questions.length}</span>
          <Badge variant="secondary" className="text-xs font-normal bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">{q.subject}</Badge>
          {flagged.has(current) && (
            <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
              Flagged
            </Badge>
          )}
        </div>
        <div className={`flex items-center gap-2 font-mono font-bold text-sm px-3 py-1.5 rounded-2xl border transition-all ${timeWarning ? 'text-red-600 border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800 animate-pulse' : 'text-foreground border-border bg-card'}`}>
          <Clock className="h-4 w-4" />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <Progress value={progress} className="h-2 rounded-full" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1.5 px-1">
          <span>{answeredCount} answered</span>
          <span>{questions.length - answeredCount} remaining</span>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8 bg-card rounded-2xl border border-muted p-6 md:p-8 shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all duration-300 animate-slide-right">
        <h2 className="text-lg font-semibold leading-relaxed mb-6">{q.question}</h2>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const isSelected = answers[current] === i;
            return (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                data-testid={`option-${i}`}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 text-sm font-medium flex items-center
                  ${isSelected
                    ? 'border-primary bg-primary/5 text-primary shadow-sm'
                    : 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted/50'
                  }`}
              >
                <span className={`inline-flex h-6 w-6 rounded-full border-2 items-center justify-center text-xs mr-3 shrink-0 transition-all
                  ${isSelected ? 'border-primary bg-primary text-white scale-110 shadow-sm' : 'border-muted-foreground bg-background'}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button variant="outline" onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0} className="rounded-xl">
          <ChevronLeft className="mr-1 h-4 w-4" /> Previous
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFlag}
            className={`rounded-xl transition-colors ${flagged.has(current) ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/30' : 'text-muted-foreground'}`}
            data-testid="btn-flag"
          >
            <Flag className="h-4 w-4 mr-1" />
            {flagged.has(current) ? 'Unflag' : 'Flag'}
          </Button>

          {current === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-md border-none transition-all duration-200"
              data-testid="btn-submit"
            >
              Submit Test
            </Button>
          ) : (
            <Button onClick={() => setCurrent(c => Math.min(questions.length - 1, c + 1))} className="rounded-xl">
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Question grid */}
      <div className="mt-8 pt-6 border-t animate-slide-up">
        <p className="text-xs text-muted-foreground mb-3 font-medium">Question Navigator</p>
        <div className="flex flex-wrap gap-2 bg-muted/20 dark:bg-muted/10 p-4 rounded-2xl border border-muted">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              data-testid={`nav-q-${i}`}
              className={`h-8 w-8 rounded-xl text-xs font-semibold border transition-colors
                ${i === current ? 'border-primary bg-primary text-white' :
                  answers[i] !== undefined ? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400' :
                  flagged.has(i) ? 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400' :
                  'border-border bg-card text-muted-foreground hover:border-primary/50'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="flex gap-4 mt-3 text-xs text-muted-foreground px-1">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm border-2 border-green-500 bg-green-50 dark:bg-green-950/30 inline-block" />Answered</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm border-2 border-amber-500 bg-amber-50 dark:bg-amber-950/30 inline-block" />Flagged</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm border-2 border-border inline-block" />Unanswered</span>
        </div>
      </div>
    </div>
  );
}
