import { useState } from "react";
import { RotateCcw, ThumbsUp, ThumbsDown, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FLASHCARD_DECKS } from "@/lib/mock-data/ai-content";

const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
  hard: 'bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400',
};

export default function Flashcards() {
  const [deckKey, setDeckKey] = useState('biology');
  const deck = FLASHCARD_DECKS[deckKey];

  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [gotIt, setGotIt] = useState<Set<string>>(new Set());
  const [review, setReview] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);

  const cards = deck.cards;
  const card = cards[cardIndex];
  const progress = ((cardIndex) / cards.length) * 100;
  const dueToday = cards.length - gotIt.size;

  const handleGotIt = () => {
    setGotIt(prev => new Set([...prev, card.id]));
    review.delete(card.id);
    advance();
  };

  const handleReview = () => {
    setReview(prev => new Set([...prev, card.id]));
    gotIt.delete(card.id);
    advance();
  };

  const advance = () => {
    setFlipped(false);
    if (cardIndex < cards.length - 1) {
      setTimeout(() => setCardIndex(i => i + 1), 200);
    } else {
      setTimeout(() => setDone(true), 200);
    }
  };

  const restart = () => {
    setCardIndex(0);
    setFlipped(false);
    setGotIt(new Set());
    setReview(new Set());
    setDone(false);
  };

  const switchDeck = (key: string) => {
    setDeckKey(key);
    restart();
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <style>{`
        @keyframes slideInUp {
          from { transform: translateY(24px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulseBorder {
          0%, 100% { border-color: hsl(var(--border)); }
          50% { border-color: rgba(20, 184, 166, 0.5); }
        }
        .animate-slide-up {
          animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-pulse-border {
          animation: pulseBorder 2s infinite ease-in-out;
        }
      `}</style>

      {/* Header */}
      <div className="mb-6 animate-slide-up">
        <h1 className="text-3xl font-bold mb-1">Flashcards</h1>
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Tap the card to reveal the answer</p>
          <div className="flex items-center gap-2 text-sm text-teal-600 dark:text-teal-400 font-semibold bg-teal-50 dark:bg-teal-950/30 px-3 py-1.5 rounded-full border border-teal-100 dark:border-teal-900">
            <BookOpen className="h-4 w-4" />
            {dueToday} due today
          </div>
        </div>
      </div>

      {/* Deck selector */}
      <div className="flex items-center gap-3 mb-6 animate-slide-up">
        <Select value={deckKey} onValueChange={switchDeck}>
          <SelectTrigger className="w-48 rounded-xl border-2 hover:border-teal-400 focus:ring-teal-500 transition-all duration-200" data-testid="select-deck">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {Object.entries(FLASHCARD_DECKS).map(([key, d]) => (
              <SelectItem key={key} value={key} className="rounded-2xl">{d.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground font-semibold bg-muted px-2.5 py-1 rounded-full">{cards.length} cards</span>
      </div>

      {done ? (
        <div className="text-center py-16 space-y-5 bg-card border border-muted rounded-2xl p-8 shadow-lg animate-slide-up">
          <div className="h-16 w-16 rounded-full bg-teal-100 dark:bg-teal-950/30 flex items-center justify-center mx-auto shadow-inner">
            <ThumbsUp className="h-8 w-8 text-teal-600 dark:text-teal-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Deck complete!</h2>
          <p className="text-muted-foreground font-medium">
            {gotIt.size} got it · {review.size} to review
          </p>
          {review.size > 0 && (
            <p className="text-sm text-teal-600 dark:text-teal-400 font-semibold bg-teal-50 dark:bg-teal-950/20 px-4 py-2 rounded-xl border border-teal-100/50 inline-block">
              {review.size} card{review.size > 1 ? 's' : ''} will appear again in your next session.
            </p>
          )}
          <div>
            <Button onClick={restart} className="mt-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white rounded-xl shadow-md border-none px-6 transition-all duration-200">
              <RotateCcw className="mr-2 h-4 w-4" /> Restart Deck
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Progress */}
          <div className="mb-4 animate-slide-up">
            <div className="flex justify-between text-xs text-muted-foreground mb-2 px-1">
              <span>Card {cardIndex + 1} of {cards.length}</span>
              <span className="font-semibold text-teal-600 dark:text-teal-400">{gotIt.size} learned · {review.size} to review</span>
            </div>
            <Progress value={progress} className="h-2 rounded-full" />
          </div>

          {/* Progress dots */}
          <div className="flex gap-1.5 justify-center mb-6 flex-wrap animate-slide-up">
            {cards.map((c, i) => (
              <div
                key={c.id}
                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                  i === cardIndex ? 'bg-teal-500 scale-150 shadow-sm' :
                  gotIt.has(c.id) ? 'bg-green-500' :
                  review.has(c.id) ? 'bg-amber-500' :
                  i < cardIndex ? 'bg-muted-foreground' : 'bg-border'
                }`}
              />
            ))}
          </div>

          {/* Card */}
          <div
            className="cursor-pointer select-none mb-6 animate-slide-up"
            onClick={() => setFlipped(f => !f)}
            data-testid="flashcard"
          >
            <div className={`relative rounded-3xl border-2 shadow-md transition-all duration-300 min-h-64 flex flex-col justify-between
              ${flipped
                ? 'border-teal-500 bg-gradient-to-b from-teal-50/20 to-card dark:from-teal-950/20 shadow-teal-100/20'
                : 'border-border bg-card hover:border-teal-400 hover:shadow-xl'}`}
            >
              {/* Difficulty + subject */}
              <div className="flex items-center justify-between p-5 border-b border-muted/40">
                <Badge variant="secondary" className="text-xs font-semibold bg-muted text-foreground">{card.subject}</Badge>
                <Badge variant="secondary" className={`text-xs font-bold ${DIFFICULTY_COLORS[card.difficulty]}`}>
                  {card.difficulty}
                </Badge>
              </div>

              <div className="flex flex-col items-center justify-center text-center px-8 py-10 min-h-[160px] flex-grow">
                {!flipped ? (
                  <>
                    <p className="text-[10px] text-muted-foreground mb-3 font-bold uppercase tracking-widest opacity-60">Question</p>
                    <p className="text-lg font-bold leading-relaxed text-foreground px-4">{card.front}</p>
                    <p className="text-xs text-muted-foreground/60 mt-6 font-semibold">Tap to reveal answer</p>
                  </>
                ) : (
                  <>
                    <p className="text-[10px] text-teal-600 dark:text-teal-400 mb-3 font-bold uppercase tracking-widest">Answer</p>
                    <p className="text-base font-semibold leading-relaxed text-foreground px-4">{card.back}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Actions — only show after flip */}
          <div className={`flex gap-4 mt-6 transition-all duration-300 ${flipped ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
            <Button
              variant="outline"
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30 rounded-xl py-6 font-semibold shadow-sm transition-all duration-200"
              onClick={handleReview}
              data-testid="btn-review-again"
            >
              <ThumbsDown className="mr-2 h-4 w-4" /> Review Again
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white rounded-xl py-6 font-semibold shadow-md border-none transition-all duration-200"
              onClick={handleGotIt}
              data-testid="btn-got-it"
            >
              <ThumbsUp className="mr-2 h-4 w-4" /> Got It
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
