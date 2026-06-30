import { useState } from "react";
import { Link } from "wouter";
import { Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLAN_FEATURES = {
  free: [
    'Search and browse tutors',
    'Up to 2 sessions/month',
    'Resource library (free items)',
    'Basic tutor profile',
  ],
  student: [
    'Everything in Free',
    'Unlimited sessions',
    'Mock tests (MDCAT, ECAT)',
    'Weekly readiness score',
    'Priority booking',
    'Full resource library access',
    'Session history & reviews',
  ],
  tutor: [
    'Everything in Free',
    'Unlimited bookings',
    'Featured placement in search',
    'AI analytics dashboard',
    'Resource bundles & sales tools',
    'Early access to new features',
    'Pro badge on profile',
  ],
};

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-in fade-in duration-300">
      <div className="text-center py-12 px-4 mb-10">
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Pricing Plans</p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Simple, transparent pricing</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Start for free. Upgrade when you're ready to unlock unlimited sessions or supercharge your tutoring business.
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-10">
        <div className="bg-muted rounded-full p-1 flex items-center border">
          <button 
            onClick={() => setBilling('monthly')}
            className={`transition-all duration-200 ${billing === 'monthly' ? 'bg-card rounded-full px-5 py-2 text-sm font-semibold shadow-sm' : 'px-5 py-2 text-sm text-muted-foreground'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBilling('annual')}
            className={`transition-all duration-200 flex items-center ${billing === 'annual' ? 'bg-card rounded-full px-5 py-2 text-sm font-semibold shadow-sm' : 'px-5 py-2 text-sm text-muted-foreground'}`}
          >
            Annual
            <span className="bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400 rounded-full text-xs font-bold px-2.5 py-1 ml-2">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="rounded-2xl border-2 p-7 bg-card flex flex-col">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-1">Basic</h3>
            <div className="flex items-end gap-1 my-4">
              <span className="text-5xl font-black tracking-tight">PKR 0</span>
              <span className="text-lg text-muted-foreground font-normal ml-1">/mo</span>
            </div>
            <p className="text-sm text-muted-foreground">Perfect for getting started.</p>
          </div>
          
          <ul className="space-y-3 my-6 flex-1">
            {PLAN_FEATURES.free.map(f => (
              <li key={f} className="flex items-start gap-3 text-sm font-medium">
                <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          
          <Button variant="outline" className="h-12 w-full rounded-xl font-semibold mt-2 border-2" asChild>
            <Link href="/auth">Get started free</Link>
          </Button>
        </div>

        {/* Student Pro Plan */}
        <div className="rounded-2xl border-2 border-primary shadow-2xl shadow-primary/10 p-7 relative bg-gradient-to-b from-primary/5 to-card flex flex-col transform md:-translate-y-4">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full px-6 py-1.5 text-xs font-bold whitespace-nowrap shadow-lg">
            Most Popular
          </div>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Star className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold">Student Pro</h3>
            </div>
            <div className="flex items-end gap-1 my-4">
              <span className="text-5xl font-black tracking-tight">{billing === 'monthly' ? 'PKR 999' : 'PKR 799'}</span>
              <span className="text-lg text-muted-foreground font-normal ml-1">/mo</span>
            </div>
            <p className="text-sm text-muted-foreground">Unlock unlimited learning with top tutors.</p>
          </div>
          
          <ul className="space-y-3 my-6 flex-1">
            {PLAN_FEATURES.student.map(f => (
              <li key={f} className="flex items-start gap-3 text-sm font-medium">
                <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          
          <Button className="h-12 w-full rounded-xl font-semibold mt-2 bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all" asChild>
            <Link href="/subscription">Start 7-day free trial</Link>
          </Button>
        </div>

        {/* Tutor Pro Plan */}
        <div className="rounded-2xl border-2 p-7 bg-card flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-5 w-5 text-amber-500" />
              <h3 className="text-xl font-bold">Tutor pro</h3>
            </div>
            <div className="flex items-end gap-1 my-4">
              <span className="text-5xl font-black tracking-tight">{billing === 'monthly' ? 'PKR 1,999' : 'PKR 1,599'}</span>
              <span className="text-lg text-muted-foreground font-normal ml-1">/mo</span>
            </div>
            <p className="text-sm text-muted-foreground">Grow your tutoring business on autopilot.</p>
          </div>
          
          <ul className="space-y-3 my-6 flex-1">
            {PLAN_FEATURES.tutor.map(f => (
              <li key={f} className="flex items-start gap-3 text-sm font-medium">
                <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          
          <Button variant="outline" className="h-12 w-full rounded-xl font-semibold mt-2 border-2 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all" asChild>
            <Link href="/subscription">Upgrade to Pro</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 pt-8 border-t max-w-2xl mx-auto">
        <span className="text-sm font-medium text-muted-foreground">All prices in PKR</span>
        <div className="h-4 w-px bg-border hidden sm:block"></div>
        <div className="flex items-center gap-3">
          <span className="bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/30 dark:border-red-800 rounded-2xl px-3 py-1.5 text-xs font-bold">JazzCash</span>
          <span className="bg-green-50 text-green-600 border border-green-200 dark:bg-green-950/30 dark:border-green-800 rounded-2xl px-3 py-1.5 text-xs font-bold">EasyPaisa</span>
          <span className="bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950/30 dark:border-blue-800 rounded-2xl px-3 py-1.5 text-xs font-bold">Visa / MC</span>
        </div>
        <div className="h-4 w-px bg-border hidden sm:block"></div>
        <span className="text-xs font-medium text-muted-foreground">Cancel anytime</span>
      </div>
    </div>
  );
}
