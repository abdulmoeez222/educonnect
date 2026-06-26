import { Link } from "wouter";
import { GraduationCap, BookOpen, Users, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-white animate-in fade-in duration-300">
      {/* Navbar */}
      <header className="h-16 border-b border-gray-100 bg-white/80 backdrop-blur-xl flex items-center justify-between px-6 md:px-10 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center text-white">
            <GraduationCap className="h-4.5 w-4.5" />
          </div>
          <span className="font-black text-lg tracking-tight text-gray-900">EduConnect</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
          <a href="#modules" className="hover:text-gray-900 transition-colors">For Students</a>
          <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-sm font-medium text-gray-600 hover:text-gray-900" asChild>
            <Link href="/auth">Sign in</Link>
          </Button>
          <Button className="h-9 px-5 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm" asChild>
            <Link href="/auth">Get started free</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 md:px-10 pt-24 pb-20 md:pt-36 md:pb-28 max-w-5xl mx-auto text-center overflow-hidden bg-white bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(79,70,229,0.08),transparent)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700 mb-8 tracking-wide">
          <span className="text-base">🇵🇰</span>
          Pakistan's first AI-powered education platform
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-950 leading-[1.05] mb-6">
          Learn smarter.<br />
          <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
            Teach better.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
          Find verified MDCAT, O-Level, and A-Level tutors. Access premium study resources. Book expert consultations. All in one platform built for Pakistan.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all" asChild>
            <Link href="/auth">Start for free <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base font-medium rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 transition-all" asChild>
            <Link href="/search">Browse tutors</Link>
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <div className="flex -space-x-2">
            {['🧑🎓','👩🎓','🧑💻','👩🏫','🧑🔬'].map((emoji,i)=>(
              <div key={i} className="h-8 w-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-sm">{emoji}</div>
            ))}
          </div>
          <span>Trusted by <strong className="text-gray-700 font-semibold">10,000+</strong> students across Pakistan</span>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-100 bg-gray-50/50 py-12">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '10,000+', label: 'Active students' },
            { value: '500+', label: 'Verified tutors' },
            { value: '50,000+', label: 'Study resources' },
            { value: '4.9/5', label: 'Average rating' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Three Modules */}
      <section id="modules" className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">Three modules. One platform.</p>
          <h2 className="text-4xl font-black tracking-tight text-gray-950 mb-4">Everything you need to succeed</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            A single account gives you access to tutors, resources, and expert consultations.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Tutoring */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
            <div className="h-12 w-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
              <GraduationCap className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Expert tutoring</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              1‑on‑1 sessions with verified MDCAT toppers, ECAT experts, and Cambridge tutors. Online or in‑person.
            </p>
            <ul className="space-y-2 mb-8 flex-1">
              {['Verified top scorers','Flexible scheduling','AI session summaries','Secure payments via JazzCash'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Button className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-10 mt-auto" asChild>
              <Link href="/search">Find a tutor</Link>
            </Button>
          </div>
          {/* Resources */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col hover:shadow-lg hover:border-teal-200 transition-all duration-300">
            <div className="h-12 w-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-6">
              <BookOpen className="h-6 w-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Resource library</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Thousands of past papers, mock exams, and premium study notes. Free and paid, curated by experts.
            </p>
            <ul className="space-y-2 mb-8 flex-1">
              {['MDCAT & ECAT past papers','O‑Level & A‑Level notes','Practice question banks','Formula sheets & cheat sheets'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Button className="w-full rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold h-10 mt-auto" asChild>
              <Link href="/resources">Browse resources</Link>
            </Button>
          </div>
          {/* Consultations */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col hover:shadow-lg hover:border-amber-200 transition-all duration-300">
            <div className="h-12 w-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Expert consultations</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Book 1‑on‑1 sessions with career coaches, startup advisors, agency mentors, and industry experts.
            </p>
            <ul className="space-y-2 mb-8 flex-1">
              {['Career & university guidance','Agency & freelance mentors','Tech leads & startup founders','Async written Q&A option'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Button className="w-full rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold h-10 mt-auto" asChild>
              <Link href="/consultations">Find a consultant</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AI Features Strip */}
      <section id="features" className="bg-gray-950 py-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-400 mb-6 tracking-wide">
              <Sparkles className="h-3.5 w-3.5" />
              AI-powered learning
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white mb-4">
              The AI layer that makes it stick
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Not just a marketplace. EduConnect learns from every session and gets smarter the more you use it.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🤖', title: 'AI Doubt Bot', desc: 'Instant answers grounded in MDCAT, ECAT, O‑Level, and A‑Level syllabi. No hallucinations.' },
              { icon: '📊', title: 'Readiness Score', desc: 'Your exam readiness tracked weekly. Know exactly where you stand and what to focus on.' },
              { icon: '🃏', title: 'Adaptive Flashcards', desc: 'Auto‑generated from your sessions. Spaced repetition keeps you sharp before exams.' },
              { icon: '📝', title: 'Mock Test Engine', desc: 'Personalised tests built from your weak areas. Track improvement over time.' },
              { icon: '📅', title: 'Study Plan Generator', desc: 'Input your exam date. AI outputs a week‑by‑week revision and session schedule.' },
              { icon: '📋', title: 'Session Debrief', desc: 'After every session: topics covered, homework, weak areas, and next steps — automatically.' },
            ].map(feature => (
              <div key={feature.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-200">
                <div className="text-2xl mb-3">{feature.icon}</div>
                <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 md:px-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">Simple, transparent pricing</p>
          <h2 className="text-4xl font-black tracking-tight text-gray-950 mb-4">No hidden fees. Pay as you learn.</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Choose the plan that fits your academic goals. Secure local payments with JazzCash and EasyPaisa.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {/* Free Tier */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col hover:border-gray-300 transition-all duration-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Free Starter</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">Explore the platform and start learning.</p>
            <div className="mb-6">
              <span className="text-4xl font-black text-gray-900">PKR 0</span>
              <span className="text-gray-500 text-sm"> / forever</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {['Access to free study notes','Browse verified tutors','3 mock questions per day','Basic study plans'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50" asChild>
              <Link href="/auth">Get Started</Link>
            </Button>
          </div>
          {/* Pro Tier (Featured) */}
          <div className="bg-white rounded-2xl border-2 border-indigo-600 p-8 flex flex-col relative shadow-md">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Pro Learner</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">Perfect for MDCAT, ECAT, and Board exams preparation.</p>
            <div className="mb-6">
              <span className="text-4xl font-black text-gray-900">PKR 1,499</span>
              <span className="text-gray-500 text-sm"> / month</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {['Unlimited premium notes & past papers','Prioritized tutor match','Unlimited AI doubt bot access','Full weekly mock tests','Personalized study dashboard'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Button className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold" asChild>
              <Link href="/auth">Unlock Pro Access</Link>
            </Button>
          </div>
          {/* Custom Tier */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col hover:border-gray-300 transition-all duration-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Tutor Plan</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">For tutors looking to scale their tuition business.</p>
            <div className="mb-6">
              <span className="text-4xl font-black text-gray-900">PKR 2,499</span>
              <span className="text-gray-500 text-sm"> / month</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {['Featured profile listing','Zero commission on first 5 bookings','Advanced scheduling tools','Student progress tracking','Priority chat support'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-400 shrink-0" />{f}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50" asChild>
              <Link href="/auth">Start as Tutor</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 md:px-10 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-950 mb-6">
            Ready to start learning?
          </h2>
          <p className="text-lg text-gray-500 mb-10 leading-relaxed">
            Join 10,000+ students already using EduConnect to prepare for MDCAT, ECAT, and Cambridge exams.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="w-full sm:w-auto h-12 px-10 text-base font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 transition-all" asChild>
              <Link href="/auth">Create free account</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base font-medium rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50" asChild>
              <Link href="/search">Explore Tutors</Link>
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-6">No credit card required · JazzCash & EasyPaisa accepted · Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 py-12 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-7 w-7 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center text-white">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <span className="font-black text-gray-900">EduConnect</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Empowering Pakistani students with the best tutors, resources, and expert guidance.
              </p>
            </div>
            {/* Links */}
            <div className="grid grid-cols-3 gap-8 text-sm">
              <div>
                <p className="font-semibold text-gray-900 mb-3">Platform</p>
                <ul className="space-y-2 text-gray-500">
                  <li><Link href="/search" className="hover:text-gray-900 transition-colors">Find Tutors</Link></li>
                  <li><Link href="/resources" className="hover:text-gray-900 transition-colors">Resources</Link></li>
                  <li><Link href="/search" className="hover:text-gray-900 transition-colors">Consultations</Link></li>
                  <li><Link href="/auth" className="hover:text-gray-900 transition-colors">Become a Tutor</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-3">Company</p>
                <ul className="space-y-2 text-gray-500">
                  <li><a href="#" className="hover:text-gray-900 transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-3">Legal</p>
                <ul className="space-y-2 text-gray-500">
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-gray-900 transition-colors">Refund policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} EduConnect Pakistan. All rights reserved.</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>🇵🇰 Built for Pakistani students</span>
              <span>·</span>
              <span>JazzCash · EasyPaisa · Cards accepted</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

