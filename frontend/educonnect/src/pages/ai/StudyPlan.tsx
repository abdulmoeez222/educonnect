import { useState } from "react";
import { CalendarDays, Target, BookOpen, Sparkles, Download, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { STUDY_PLAN_WEEKS } from "@/lib/mock-data/ai-content";

const READINESS_OPTIONS = [
  { value: 'just-started', label: 'Just starting out' },
  { value: 'some-prep', label: 'Some preparation done' },
  { value: 'halfway', label: 'About halfway through syllabus' },
  { value: 'revision', label: 'Mostly done, need revision' },
];

const SUBJECT_COLORS: Record<string, string> = {
  'Cell Biology': 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
  'Organic Chemistry Basics': 'bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400',
  'Human Physiology': 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400',
  'Thermodynamics': 'bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400',
  'Genetics': 'bg-pink-100 text-pink-700 dark:bg-pink-950/30 dark:text-pink-400',
  'Electrochemistry': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400',
  'Plant Biology': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400',
  'Mechanics Revision': 'bg-slate-100 text-slate-700 dark:bg-slate-950/30 dark:text-slate-400',
  'Evolution': 'bg-teal-100 text-teal-700 dark:bg-teal-950/30 dark:text-teal-400',
  'Atomic Structure': 'bg-violet-100 text-violet-700 dark:bg-violet-950/30 dark:text-violet-400',
  'Ecology': 'bg-lime-100 text-lime-700 dark:bg-lime-950/30 dark:text-lime-400',
  'Chemical Equilibrium': 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
  'Nervous System': 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400',
  'Optics & Waves': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-400',
  'Full Syllabus Revision': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400',
  'Mock Exams': 'bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400',
};

export default function StudyPlan() {
  const { toast } = useToast();
  const [examDate, setExamDate] = useState<Date | undefined>(undefined);
  const [readiness, setReadiness] = useState('');
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!examDate || !readiness) {
      toast({ title: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-16px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(16px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-left {
          animation: slideInLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-right {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Study plan generator</h1>
        <p className="text-muted-foreground">Get a personalised week-by-week MDCAT preparation timeline.</p>
      </div>

      {/* Input form */}
      {!generated && (
        <Card className="mb-8 rounded-2xl border border-indigo-200/60 bg-gradient-to-b from-indigo-50/60 to-card shadow-md">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label className="font-semibold">When is your MDCAT exam?</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start font-normal rounded-xl border-2 hover:border-indigo-400 transition-all duration-200" data-testid="btn-exam-date">
                    <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                    {examDate ? examDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select exam date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl shadow-xl">
                  <Calendar
                    mode="single"
                    selected={examDate}
                    onSelect={setExamDate}
                    disabled={d => d <= new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Where are you in your preparation?</Label>
              <Select value={readiness} onValueChange={setReadiness}>
                <SelectTrigger className="rounded-xl border-2 hover:border-indigo-400 transition-all duration-200" data-testid="select-readiness">
                  <SelectValue placeholder="Select your current level" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {READINESS_OPTIONS.map(opt => (
                    <SelectItem key={opt.value} value={opt.value} className="rounded-2xl">{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl shadow-lg shadow-indigo-500/25 border-none h-12 font-semibold transition-all duration-200"
              size="lg"
              disabled={loading}
              data-testid="btn-generate"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating your plan…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate Study Plan
                </span>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Generated plan */}
      {generated && (
        <>
          <div className="flex items-center justify-between mb-6 animate-slide-right">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-100/50">
                  <Sparkles className="h-3 w-3 mr-1 text-indigo-600 animate-pulse" /> AI Generated
                </Badge>
              </div>
              <h2 className="text-xl font-bold">Your 8-Week MDCAT plan</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Exam: {examDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} ·{' '}
                {READINESS_OPTIONS.find(o => o.value === readiness)?.label}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl font-semibold border-2 hover:border-indigo-400 transition-all duration-200"
              onClick={() => toast({ title: 'Export coming soon', description: 'PDF export will be available in the next update.' })}
              data-testid="btn-export"
            >
              <Download className="mr-2 h-3.5 w-3.5" /> Export PDF
            </Button>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[1.1rem] top-4 bottom-4 w-px bg-border" />

            <div className="space-y-0">
              {STUDY_PLAN_WEEKS.map((week, i) => (
                <div key={week.week} className="relative flex gap-4 pb-8 last:pb-0">
                  {/* Node */}
                  <div className={`relative z-10 h-9 w-9 rounded-full border-2 flex items-center justify-center shrink-0 font-bold text-sm transition-all duration-200 hover:scale-110 shadow-sm animate-slide-left
                    ${i === 0 ? 'border-primary bg-primary text-white' : 'border-border bg-card text-muted-foreground'}`}>
                    {week.week}
                  </div>

                  {/* Content */}
                  <Card className="flex-1 border hover:border-primary/40 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md animate-slide-right">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-foreground">Week {week.week}</span>
                        <span className="text-xs text-muted-foreground font-semibold bg-muted px-2.5 py-0.5 rounded-full">{week.dateRange}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {week.focus.map(subject => (
                          <Badge
                            key={subject}
                            variant="secondary"
                            className={`text-xs font-medium rounded-full px-2.5 py-0.5 border ${SUBJECT_COLORS[subject] ?? 'bg-muted text-muted-foreground'}`}
                          >
                            {subject}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-start gap-4 text-xs text-muted-foreground mt-3 pt-3 border-t border-muted/50">
                        <div className="flex items-center gap-1.5 shrink-0">
                          <BookOpen className="h-3.5 w-3.5 text-primary" />
                          <span className="font-semibold">{week.sessions} sessions</span>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
                        <div className="flex items-start gap-1.5">
                          <Target className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                          <span className="leading-relaxed">{week.target}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex gap-3 animate-slide-right">
            <Button className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none shadow-md transition-all duration-200" onClick={() => { setGenerated(false); setExamDate(undefined); setReadiness(''); }}>
              Regenerate Plan
            </Button>
            <Button variant="outline" className="flex-1 rounded-xl border-2 hover:border-indigo-400 transition-all duration-200" onClick={() => toast({ title: 'Plan saved to your profile!' })}>
              Save to Profile
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
