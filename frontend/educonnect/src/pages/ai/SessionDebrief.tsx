import { useState } from "react";
import { useParams, Link } from "wouter";
import { CheckCircle2, Circle, ChevronDown, ChevronUp, ArrowLeft, BookOpen, AlertTriangle, ClipboardList, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DEBRIEF_DATA = {
  sessionWith: 'Dr. Ayesha Tariq',
  subject: 'MDCAT Biology',
  date: 'Today, 3:00 PM – 4:00 PM',
  topicsCovered: [
    'Cell Division — Mitosis',
    'Cell Division — Meiosis',
    'Chromosome Structure',
    'Cell Cycle Regulation',
    'G1 and S Phase Checkpoints',
  ],
  homework: [
    { id: 'hw-1', task: 'Complete 20 MCQs on mitosis from past MDCAT papers', done: false },
    { id: 'hw-2', task: 'Draw and label all 4 phases of mitosis from memory', done: false },
    { id: 'hw-3', task: 'Revise differences between mitosis and meiosis (make a comparison table)', done: false },
    { id: 'hw-4', task: 'Review flashcard deck: "Cell Biology" — target 90% accuracy', done: false },
    { id: 'hw-5', task: 'Read Chapter 5 pages 112–128 (Kips Biology)', done: true },
  ],
  weakAreas: [
    { topic: 'Meiosis II vs Mitosis', explanation: 'You confused the chromosome number outcome. In meiosis II, sister chromatids separate (like mitosis), but starting material is haploid (n), not diploid.' },
    { topic: 'Checkpoints in the Cell Cycle', explanation: 'G1 checkpoint monitors cell size and DNA damage. G2 checkpoint ensures DNA replication is complete. S checkpoint monitors replication errors. You mixed up G1 and G2 roles.' },
    { topic: 'Synapsis and Crossing Over', explanation: 'Synapsis (pairing of homologous chromosomes) occurs in Prophase I of meiosis, not mitosis. Crossing over creates genetic variation and happens during the same phase.' },
  ],
  transcript: `[10:00] Dr. Ayesha: Let's start with a quick recall — what are the 4 phases of mitosis?
[10:02] Hamza: Prophase, Metaphase, Anaphase, Telophase.
[10:02] Dr. Ayesha: Perfect. And what happens in each phase?
[10:04] Hamza: In prophase chromosomes condense... in metaphase they line up... anaphase they're pulled apart... telophase the cell divides.
[10:06] Dr. Ayesha: Good. Now what's the key difference between mitosis and meiosis in terms of output?
[10:07] Hamza: Mitosis gives 2 identical cells, meiosis gives... 4 cells?
[10:08] Dr. Ayesha: Yes, 4 haploid cells. And what's the chromosome number — diploid or haploid?
[10:09] Hamza: Meiosis ends with haploid. Mitosis ends with diploid — same as parent.
[10:10] Dr. Ayesha: Exactly. Now let's go deeper — can you explain crossing over?
[10:12] Hamza: It happens in... metaphase?
[10:13] Dr. Ayesha: Close — it's Prophase I of meiosis. This is a common mistake. Let's revisit this...`,
};

export default function SessionDebrief() {
  const { id } = useParams();
  const [homework, setHomework] = useState(DEBRIEF_DATA.homework);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  const toggleHw = (hwId: string) => {
    setHomework(prev => prev.map(h => h.id === hwId ? { ...h, done: !h.done } : h));
  };

  const completedCount = homework.filter(h => h.done).length;

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
        .animate-slide-down {
          animation: slideInDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-in-1 {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards;
          opacity: 0;
        }
        .animate-slide-in-2 {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
          opacity: 0;
        }
        .animate-slide-in-3 {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
          opacity: 0;
        }
        .animate-slide-in-4 {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          opacity: 0;
        }
      `}</style>

      <Button variant="ghost" className="-ml-4 mb-6" asChild>
        <Link href="/sessions">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sessions
        </Link>
      </Button>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-6 md:p-8 mb-8 shadow-lg shadow-indigo-500/20 animate-slide-down">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-white animate-pulse" />
          </div>
          <Badge variant="secondary" className="text-xs bg-white/25 text-white border-none font-semibold">AI Generated Debrief</Badge>
        </div>
        <h1 className="text-3xl font-black tracking-tight mb-2">Session debrief</h1>
        <p className="text-indigo-100 font-semibold">{DEBRIEF_DATA.sessionWith} · {DEBRIEF_DATA.subject}</p>
        <p className="text-xs text-indigo-200 mt-1">{DEBRIEF_DATA.date}</p>
      </div>

      <div className="space-y-6">
        {/* Topics Covered */}
        <Card className="rounded-2xl border border-muted hover:border-primary/30 transition-all duration-200 shadow-sm border-l-4 border-l-primary animate-slide-in-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-5 w-5 text-primary" />
              Topics Covered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {DEBRIEF_DATA.topicsCovered.map(topic => (
                <Badge key={topic} variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-normal">
                  {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Homework */}
        <Card className="rounded-2xl border border-muted hover:border-amber-300 dark:hover:border-amber-800 transition-all duration-200 shadow-sm animate-slide-in-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-amber-600" />
                Homework Assigned
              </span>
              <span className="text-sm font-normal text-muted-foreground">{completedCount}/{homework.length} done</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {homework.map(hw => (
              <div
                key={hw.id}
                className="flex items-start gap-3 cursor-pointer group"
                onClick={() => toggleHw(hw.id)}
                data-testid={`hw-${hw.id}`}
              >
                <div className="mt-0.5 shrink-0">
                  {hw.done
                    ? <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    : <Circle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  }
                </div>
                <span className={`text-sm leading-relaxed ${hw.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {hw.task}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weak Areas */}
        <Card className="border-2 border-amber-200/60 dark:border-amber-800 bg-amber-50/5 dark:bg-amber-950/5 rounded-2xl shadow-sm border-l-4 border-l-amber-500 animate-slide-in-3">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Weak Areas Flagged
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {DEBRIEF_DATA.weakAreas.map((area, i) => (
              <div key={i} className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400">{i + 1}</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{area.topic}</p>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{area.explanation}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Transcript */}
        <Card className="rounded-2xl border border-muted hover:border-primary/20 transition-all duration-200 shadow-sm animate-slide-in-4">
          <button
            className="w-full text-left"
            onClick={() => setTranscriptOpen(o => !o)}
            data-testid="toggle-transcript"
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base">
                <span>View Full Transcript</span>
                {transcriptOpen ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
              </CardTitle>
            </CardHeader>
          </button>
          {transcriptOpen && (
            <CardContent>
              <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border-l-4 border-primary rounded-r-2xl p-5 font-mono text-xs leading-relaxed whitespace-pre-line text-muted-foreground max-h-64 overflow-y-auto">
                {DEBRIEF_DATA.transcript}
              </div>
            </CardContent>
          )}
        </Card>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-md border-none transition-all duration-200" asChild>
            <Link href="/ai-chat">
              <MessageSquare className="mr-2 h-4 w-4" /> Ask AI about weak areas
            </Link>
          </Button>
          <Button variant="outline" className="flex-1 rounded-xl" asChild>
            <Link href="/flashcards">Open Flashcards</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
