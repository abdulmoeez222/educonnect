import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  GraduationCap, ArrowRight, CheckCircle2, Menu, X,
  ChevronDown, Star, Shield, Zap, Users, BookOpen, TrendingUp,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   SCROLL ANIMATION HOOK
═══════════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ─── animated section wrapper ─────────────────────────────────── */
function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  const { ref, inView } = useInView();
  const translate =
    direction === "up" ? "translateY(32px)"
    : direction === "left" ? "translateX(-32px)"
    : direction === "right" ? "translateX(32px)"
    : "none";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : translate,
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   WAITLIST FORM
═══════════════════════════════════════════════════════════════════ */
function WaitlistForm({
  variant = "hero",
  dark = false,
}: {
  variant?: "hero" | "tutor" | "consultant";
  dark?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"student" | "tutor" | "consultant" | "">("");
  const [exam, setExam] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const lockedRole =
    variant === "tutor" ? "tutor" : variant === "consultant" ? "consultant" : undefined;
  const effectiveRole = lockedRole ?? role;
  const ctaLabel =
    variant === "tutor" ? "Join Tutor Waitlist"
    : variant === "consultant" ? "Join Consultant Waitlist"
    : "Join The Waitlist";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !effectiveRole) return;
    setLoading(true);

    const scriptUrl = (import.meta.env.VITE_GOOGLE_SCRIPT_URL || "").trim();

    if (scriptUrl) {
      // Send data as URL-encoded form data which Apps Script handles easily
      const params = new URLSearchParams();
      params.append("email", email);
      params.append("role", effectiveRole);
      params.append("exam", exam || "N/A");

      fetch(scriptUrl, {
        method: "POST",
        body: params,
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then(() => {
          setLoading(false);
          setSubmitted(true);
        })
        .catch((err) => {
          console.error("Waitlist submit error:", err);
          // Fallback to successful UI state so the user is not blocked
          setLoading(false);
          setSubmitted(true);
        });
    } else {
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 900);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4 mt-2">
        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
        <p className="text-sm font-semibold text-emerald-800">
          You're on the list. We'll reach out the moment doors open.
        </p>
      </div>
    );
  }

  const inputCls = dark
    ? "h-11 rounded-lg border border-white/20 bg-white/10 backdrop-blur px-4 text-sm text-white placeholder:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
    : "h-11 rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all";

  const selectCls = dark
    ? "h-11 rounded-lg border border-white/20 bg-white/10 backdrop-blur px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all appearance-none cursor-pointer"
    : "h-11 rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all appearance-none cursor-pointer";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md mt-2">
      {!lockedRole && (
        <div className="relative">
          <select required value={role} onChange={(e) => { setRole(e.target.value as typeof role); setExam(""); }} className={selectCls + " w-full pr-10"}>
            <option value="" disabled className="text-gray-400 bg-white">I am joining as a…</option>
            <option value="student" className="text-gray-900 bg-white">Student</option>
            <option value="tutor" className="text-gray-900 bg-white">Tutor or Teacher</option>
            <option value="consultant" className="text-gray-900 bg-white">Consultant or Expert</option>
          </select>
          <ChevronDown className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 ${dark ? "text-indigo-300" : "text-gray-400"}`} />
        </div>
      )}
      {effectiveRole === "student" && !lockedRole && (
        <div className="relative">
          <select value={exam} onChange={(e) => setExam(e.target.value)} className={selectCls + " w-full pr-10"}>
            <option value="" className="text-gray-400 bg-white">What are you preparing for? (optional)</option>
            <option value="mdcat" className="text-gray-900 bg-white">MDCAT</option>
            <option value="ecat" className="text-gray-900 bg-white">ECAT</option>
            <option value="olevel" className="text-gray-900 bg-white">O-Level / A-Level</option>
            <option value="other" className="text-gray-900 bg-white">Other</option>
          </select>
          <ChevronDown className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 ${dark ? "text-indigo-300" : "text-gray-400"}`} />
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className={inputCls + " flex-1"} />
        <button type="submit" disabled={loading} className={`h-11 px-5 rounded-lg text-sm font-semibold transition-all disabled:opacity-70 whitespace-nowrap flex items-center gap-2 active:scale-95 ${dark ? "bg-white hover:bg-indigo-50 text-indigo-700 shadow-lg" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20"}`}>
          {loading ? (
            <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Joining…</>
          ) : (
            <>{ctaLabel}<ArrowRight className="h-4 w-4" /></>
          )}
        </button>
      </div>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DIVIDER
═══════════════════════════════════════════════════════════════════ */
function SectionDivider({ dark = false }) {
  return (
    <div className={`w-full flex items-center justify-center py-0 ${dark ? "bg-gray-950" : "bg-white"}`}>
      <div className={`w-full h-px ${dark ? "bg-white/5" : "bg-gray-100"}`} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   EYEBROW
═══════════════════════════════════════════════════════════════════ */
function Eyebrow({ label, dark = false, color = "indigo" }: { label: string; dark?: boolean; color?: string }) {
  const colors: Record<string, string> = {
    indigo: dark ? "text-indigo-400" : "text-indigo-600",
    violet: "text-violet-400",
    emerald: "text-emerald-600",
    orange: "text-orange-500",
    amber: "text-amber-600",
    teal: "text-teal-600",
  };
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.15em] mb-5 ${colors[color] ?? colors.indigo}`}>
      {label}
    </p>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════════ */
export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── NAVBAR ───────────────────────────────────────────────── */}
      <header
        className="h-20 flex items-center justify-between px-6 md:px-14 sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled ? "2px solid rgba(99,102,241,0.15)" : "2px solid transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.05)" : "none",
        }}
      >
        {/* Logo */}
        <div className="flex items-center p-0 m-0">
          <img src="/background-removed.png" alt="STUTAP Logo" className="h-18 md:h-20 w-auto object-contain p-0 m-0" />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <a href="#problem" className="hover:text-gray-900 transition-colors duration-200">Why STUTAP</a>
          <a href="#smarter" className="hover:text-gray-900 transition-colors duration-200">How It Works</a>
          <a href="#tutors" className="hover:text-gray-900 transition-colors duration-200">For Tutors</a>
          <a href="#consultants" className="hover:text-gray-900 transition-colors duration-200">For Consultants</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200">
            Sign in
          </Link>
          <a href="#hero-cta" className="h-9 px-5 text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 flex items-center shadow-sm">
            Join Waitlist
          </a>
        </div>

        <button className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl px-6 py-5 flex flex-col gap-4 text-sm font-medium text-gray-600">
          <a href="#problem" onClick={() => setMobileMenuOpen(false)}>Why STUTAP</a>
          <a href="#smarter" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#tutors" onClick={() => setMobileMenuOpen(false)}>For Tutors</a>
          <a href="#consultants" onClick={() => setMobileMenuOpen(false)}>For Consultants</a>
          <hr className="border-gray-100" />
          <Link href="/auth" className="text-indigo-600 font-semibold">Sign in →</Link>
        </div>
      )}

      {/* ── SECTION 1: HERO ─────────────────────────────────────── */}
      <section
        id="hero"
        className="relative px-6 md:px-14 pt-28 pb-24 md:pt-40 md:pb-36 w-full overflow-hidden"
        style={{ background: "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(99,102,241,0.12) 0%, transparent 70%)" }}
      >
        {/* Fine grid overlay */}
        <div className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Eyebrow badge */}
          <div
            className="inline-flex items-center gap-3 rounded-full border border-indigo-500/20 bg-indigo-50/40 p-1.5 pr-4 text-xs font-semibold text-indigo-950 mb-9 shadow-[0_4px_15px_-3px_rgba(99,102,241,0.06)] hover:border-indigo-500/30 transition-all duration-300 hover:shadow-[0_4px_20px_-3px_rgba(99,102,241,0.1)] group cursor-pointer"
            style={{ animation: "fadeSlideDown 0.6s ease forwards" }}
          >
            <span className="rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-sm shadow-indigo-600/25 transition-transform group-hover:scale-105">
              Waitlist Live
            </span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
              </span>
              <span className="text-[11px] font-bold text-indigo-900 tracking-wide">
                Now accepting early access requests
              </span>
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-3xl sm:text-5xl md:text-[68px] font-black tracking-[-0.03em] text-gray-950 leading-[1.05] mb-6"
            style={{ animation: "fadeSlideDown 0.6s 0.1s ease both" }}
          >
            Stop Paying For An Entire Batch{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
              When You Only Need One Tutor For One Topic
            </span>
          </h1>

          {/* Sub */}
          <p
            className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ animation: "fadeSlideDown 0.6s 0.18s ease both" }}
          >
            STUTAP lets you pick your own verified tutor, book one session at a time, and pay only for what you
            actually need.{" "}
            <strong className="text-gray-700 font-semibold">Your first session is free.</strong>
          </p>

          {/* Form */}
          <div id="hero-cta" className="flex flex-col items-center gap-4 mb-9" style={{ animation: "fadeSlideDown 0.6s 0.24s ease both" }}>
            <WaitlistForm variant="hero" />
            <p className="text-xs text-gray-400">
              Early access spots are limited. We are onboarding verified tutors before opening to the public.
            </p>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-3" style={{ animation: "fadeSlideDown 0.6s 0.32s ease both" }}>
            <div className="flex -space-x-2.5">
              {["🧑‍🎓", "👩‍🎓", "🧑‍💻", "👩‍🏫", "🧑‍🔬"].map((e, i) => (
                <div key={i} className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 border-2 border-white flex items-center justify-center text-sm shadow-sm">{e}</div>
              ))}
            </div>
            <p className="text-sm text-gray-500"><strong className="text-gray-800 font-semibold">200+ students</strong> already on the waitlist</p>
          </div>
        </div>

        {/* Gradient blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full bg-indigo-100 opacity-25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-24 h-[400px] w-[400px] rounded-full bg-violet-100 opacity-20 blur-3xl" />
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────── */}
      <div className="border-y border-gray-100 bg-gray-50/60">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "200+", label: "Waitlist signups" },
            { value: "1-on-1", label: "Sessions, not batch classes" },
            { value: "Free", label: "First session, always" },
            { value: "PKR 0", label: "To join the waitlist" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-1">{s.value}</div>
              <div className="text-xs text-gray-500 font-medium">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: THE PROBLEM ──────────────────────────────── */}
      <section id="problem" className="py-16 md:py-28 px-6 md:px-14 bg-gray-950 relative overflow-hidden">
        {/* Subtle dot pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow label="Here is what nobody tells you before you sign up for a batch" dark color="indigo" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-[-0.02em] leading-tight mb-10">
                You Are Paying For Four Subjects When You Are Only Stuck On{" "}
                <span className="text-indigo-400">One</span>
              </h2>
            </Reveal>
            <div className="space-y-5 text-gray-300 text-base md:text-lg leading-relaxed">
              {[
                "Most academies sell you a full package. Eight months. All subjects. One fixed price, whether you needed three of those subjects or just one.",
                "You knew exactly which chapter was costing you marks. Organic chemistry. Or one tricky physics topic. Or one weak spot in biology. But the system did not let you fix just that. It made you buy the whole batch to get help with the one thing.",
                "That is not a study problem. That is a pricing problem someone else designed, and you have been paying for it without ever being asked if it made sense to you.",
              ].map((p, i) => (
                <Reveal key={i} delay={120 + i * 80}>
                  <p dangerouslySetInnerHTML={{ __html: p.replace("It made you buy the whole batch to get help with the one thing.", "<strong class='text-white font-semibold'>It made you buy the whole batch to get help with the one thing.</strong>") }} />
                </Reveal>
              ))}
            </div>
            <Reveal delay={360}>
              <div className="mt-10 inline-block rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-6 py-4">
                <p className="text-indigo-300 font-semibold">
                  STUTAP was built to fix that one decision, not the whole system.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: NEW OPPORTUNITY ──────────────────────────── */}
      <section id="opportunity" className="py-16 md:py-28 px-6 md:px-14 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div>
            <Reveal>
              <Eyebrow label="A different way to get help" color="indigo" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-2xl sm:text-3xl md:text-[2.6rem] font-black text-gray-950 tracking-[-0.02em] leading-tight mb-6">
                What If You Could Hire A Tutor The Same Way You Hire Anyone Else
              </h2>
            </Reveal>
            <div className="space-y-4 text-gray-500 text-base leading-relaxed">
              {[
                "You do not get assigned a freelancer. You look at their work, their reviews, their price, and you choose. That is how Fiverr works. That is how Upwork works. Nobody questions it.",
                "Tutoring has never worked that way. You get assigned whoever the academy gives you, and you make it work or you complain quietly and stay anyway.",
              ].map((p, i) => (
                <Reveal key={i} delay={120 + i * 80}><p>{p}</p></Reveal>
              ))}
              <Reveal delay={280}>
                <p>
                  <strong className="text-gray-800">STUTAP is the first place in Pakistan where you choose your own verified tutor</strong>,
                  the same way you would choose anyone else you are paying for their skill. See their score. See their real reviews. Pick the one who teaches the way you actually learn. Book one session. Done.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Comparison cards */}
          <div className="space-y-6">
            <Reveal direction="right">
              <div className="relative overflow-hidden rounded-2xl border border-rose-100 bg-white p-8 shadow-[0_8px_30px_rgb(244,63,94,0.02)] border-t-4 border-t-rose-500 hover:shadow-[0_8px_30px_rgb(244,63,94,0.04)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100 shrink-0">
                    <X className="h-4 w-4 text-rose-500" />
                  </div>
                  <p className="text-xs font-bold text-rose-500 uppercase tracking-widest">The Old Way</p>
                </div>
                <ul className="space-y-4">
                  {["Pay 4–8 months upfront, no refunds", "Get assigned whoever is available", "Fixed schedule, fall behind or keep up", "Pay for subjects you never needed"].map((item) => (
                    <li key={item} className="flex items-start gap-3.5 text-sm text-gray-600 font-medium">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal direction="right" delay={120}>
              <div className="relative overflow-hidden rounded-2xl border-2 border-indigo-600/10 bg-gradient-to-b from-indigo-50/20 to-white p-8 shadow-[0_12px_30px_rgb(99,102,241,0.05)] border-t-4 border-t-indigo-600 hover:shadow-[0_16px_35px_rgb(99,102,241,0.08)] hover:border-indigo-600/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600" />
                  </div>
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">The STUTAP Way</p>
                </div>
                <ul className="space-y-4">
                  {["Browse verified tutors with real scores & reviews", "Choose who teaches you, before you book", "Book one session at a time, your schedule", "Pay only for the exact topic you need"].map((item) => (
                    <li key={item} className="flex items-start gap-3.5 text-sm text-gray-800 font-semibold">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-indigo-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── SECTION 4: RISK REVERSAL ────────────────────────────── */}
      <section id="risk" className="py-16 md:py-28 px-6 md:px-14 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <Eyebrow label="Why this costs you nothing to try" color="emerald" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-3xl md:text-5xl font-black text-gray-950 tracking-[-0.02em] leading-tight mb-6">
                Your First Session Is Free.{" "}
                <span className="text-emerald-600">We Are Not Asking You To Trust Us On Faith.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                We are not asking for a deposit. We are not asking you to commit to a package. We are not asking you to believe a sales pitch.
                Pick a tutor. Book a session. See if it actually helps.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Shield className="h-5 w-5 text-emerald-600" />, iconBg: "bg-emerald-50 border-emerald-100", border: "border-slate-100/80 hover:border-emerald-200", bg: "bg-white", title: "No Deposit Required", desc: "Nothing required upfront. Join, browse, and book your first session at zero cost." },
              { icon: <Zap className="h-5 w-5 text-indigo-600" />, iconBg: "bg-indigo-50 border-indigo-100", border: "border-slate-100/80 hover:border-indigo-200", bg: "bg-white", title: "No Package Commitment", desc: "Pay per session, per topic. Never locked into a bundle you don't fully need." },
              { icon: <CheckCircle2 className="h-5 w-5 text-violet-600" />, iconBg: "bg-violet-50 border-violet-100", border: "border-slate-100/80 hover:border-violet-200", bg: "bg-white", title: "Walk Away Anytime", desc: "If the session does not help, you leave having spent nothing and lost nothing." },
            ].map((g, i) => (
              <Reveal key={g.title} delay={i * 100}>
                <div className={`group relative rounded-2xl border ${g.border} ${g.bg} p-8 h-full shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300`}>
                  <div className={`h-10 w-10 rounded-xl ${g.iconBg} border flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>{g.icon}</div>
                  <h3 className="font-bold text-gray-900 text-base mb-3">{g.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">{g.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div className="mt-10 rounded-2xl border border-gray-100 bg-gray-50 px-8 py-6 text-center">
              <p className="text-gray-700 font-semibold text-base md:text-lg">
                If it does not help,{" "}
                <strong className="text-gray-900">you walk away having spent nothing and lost nothing.</strong>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 5: THE STAKES ───────────────────────────────── */}
      <section id="stakes" className="py-16 md:py-28 px-6 md:px-14 bg-gray-950 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div>
            <Reveal>
              <Eyebrow label="What waiting actually costs" dark color="orange" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-2xl sm:text-3xl md:text-[2.6rem] font-black text-white tracking-[-0.02em] leading-tight mb-8">
                Every Week You Spend Stuck On The Same Topic Is A Week You Do Not Get Back Before Your Exam
              </h2>
            </Reveal>
            <div className="space-y-4 text-gray-300 text-base leading-relaxed">
              <Reveal delay={160}>
                <p>The exam date does not move because you are still figuring out the right tutor. The syllabus does not pause while you wait for your batch to get to the chapter you are already behind on.</p>
              </Reveal>
              <Reveal delay={220}>
                <p>The students who get ahead are not smarter. <strong className="text-white">They get unstuck faster</strong> because they get the right help for the right topic at the right moment, instead of waiting for a fixed schedule to catch up to where they already are.</p>
              </Reveal>
            </div>
          </div>

          {/* Timeline card */}
          <Reveal direction="right">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/60 p-8 backdrop-blur-md shadow-[0_24px_50px_rgba(0,0,0,0.3)]">
              <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-6">The Cost of Delay</p>
              <div className="space-y-0">
                {[
                  { week: "Week 1", action: "Still stuck on the same topic", dot: "border-orange-500/50 bg-orange-500 shadow-orange-500/40" },
                  { week: "Week 2", action: "Batch hasn't caught up yet", dot: "border-orange-500/50 bg-orange-500 shadow-orange-500/40" },
                  { week: "Week 3", action: "Topic builds on itself, gap widens", dot: "border-red-500/50 bg-red-500 shadow-red-500/40" },
                  { week: "Week 4", action: "Exam is here. No time left.", dot: "border-red-600/50 bg-red-600 shadow-red-600/40" },
                ].map((row, i) => (
                  <div key={row.week} className="flex items-stretch gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`h-3 w-3 rounded-full border-2 ${row.dot} shadow-[0_0_10px_3px] mt-1.5 shrink-0`} />
                      {i < 3 && <div className="w-px flex-1 bg-gradient-to-b from-white/10 to-white/[0.03] my-1.5" />}
                    </div>
                    <div className="pb-6">
                      <p className="text-xs font-bold text-slate-400 mb-0.5 tracking-wider">{row.week}</p>
                      <p className="text-sm text-slate-200 font-medium">{row.action}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 rounded-xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 px-5 py-4 text-center">
                <p className="text-sm text-indigo-300 font-semibold tracking-wide">With STUTAP → get unstuck in 24 hours</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 6: GETS SMARTER ─────────────────────────────── */}
      <section id="smarter" className="py-16 md:py-28 px-6 md:px-14 bg-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Progress card */}
          <Reveal direction="left">
            <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] p-8">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                <div>
                  <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">Progress Analytics</p>
                  <p className="text-xs text-gray-400 mt-0.5">Updated live after every session</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { topic: "Organic Chemistry: Alkenes", pct: 82, color: "bg-emerald-500", text: "text-emerald-600" },
                  { topic: "Physics: Magnetism", pct: 55, color: "bg-amber-500", text: "text-amber-600" },
                  { topic: "Biology: Cell Division", pct: 31, color: "bg-red-500", text: "text-red-600" },
                  { topic: "MDCAT Vocabulary", pct: 74, color: "bg-indigo-500", text: "text-indigo-600" },
                ].map((row) => (
                  <div key={row.topic}>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-800">{row.topic}</span>
                      <span className={`text-xs font-bold ${row.text}`}>{row.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full rounded-full ${row.color} transition-all duration-1000`} style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-xl bg-indigo-50/50 border border-indigo-100/50 px-4 py-3.5 flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Star className="h-3 w-3 text-indigo-600" />
                </div>
                <p className="text-xs text-indigo-900 font-semibold leading-relaxed">
                  Recommended Action: Practice Biology Cell Division with a verified tutor
                </p>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <div>
            <Reveal>
              <Eyebrow label="What happens after your first few sessions" color="indigo" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-2xl sm:text-3xl md:text-[2.6rem] font-black text-gray-950 tracking-[-0.02em] leading-tight mb-6">
                The More You Study On STUTAP, The Better It Understands Exactly{" "}
                <span className="text-violet-600">Where You Are Stuck</span>
              </h2>
            </Reveal>
            <div className="space-y-4 text-gray-500 text-base leading-relaxed">
              <Reveal delay={140}>
                <p>A generic app can give you a mock test. It does not know you. It does not know which tutor you booked, what they covered, what you struggled with in that exact session, or what you have already fixed since.</p>
              </Reveal>
              <Reveal delay={200}>
                <p>STUTAP builds a personal profile of your actual progress, session by session. Every tutoring session you complete feeds into it. Your weak topics get flagged automatically. Your mock tests adjust to target exactly what you are still missing, rather than a generic syllabus walkthrough everyone else gets.</p>
              </Reveal>
              <Reveal delay={260}>
                <p className="font-semibold text-gray-800">This is not a separate app bolted on next to your tutoring. It is built from your real sessions, with your real tutors, tracking your real gaps.</p>
              </Reveal>
              <Reveal delay={320}>
                <p className="text-gray-400 text-sm">This is the part that no fixed batch class and no generic app can copy since it is built from your own history on the platform, not a one-size-fits-all syllabus.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FOR TUTORS ───────────────────────────────── */}
      <section id="tutors" className="py-28 px-6 md:px-14 bg-gray-950 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-20 items-center">
          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-5">
            {[
              { icon: <TrendingUp className="h-5 w-5 text-indigo-400" />, label: "Set Your Price" },
              { icon: <BookOpen className="h-5 w-5 text-violet-400" />, label: "Your Schedule" },
              { icon: <Star className="h-5 w-5 text-amber-400" />, label: "Build Reviews" },
              { icon: <Shield className="h-5 w-5 text-emerald-400" />, label: "Keep 100% of Earnings" },
            ].map((card, i) => (
              <Reveal key={card.label} delay={i * 80}>
                <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 flex flex-col items-center text-center gap-4 hover:bg-white/[0.08] hover:border-indigo-500/30 transition-all duration-300 h-full group hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">{card.icon}</div>
                  <p className="text-sm font-bold text-slate-200 tracking-wide">{card.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div>
            <Reveal>
              <Eyebrow label="For verified toppers and tutors" dark color="indigo" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-3xl md:text-[2.6rem] font-black text-white tracking-[-0.02em] leading-tight mb-6">
                Turn Your Score Into Income, On Your Own Schedule, With No Batch To Manage
              </h2>
            </Reveal>
            <div className="space-y-4 text-gray-300 text-base leading-relaxed mb-8">
              <Reveal delay={140}><p>You already have the score. You already know the subject better than most. Right now your options are limited to teaching at an academy on their schedule, for their cut, with students you did not choose.</p></Reveal>
              <Reveal delay={200}><p>STUTAP lets you list your subjects, set your own price, and set your own hours. Students come to you directly. You build your own reviews, your own reputation, and your own client base without needing an academy's name attached to yours.</p></Reveal>
              <Reveal delay={260}><p className="font-semibold text-white">No fixed salary cut. No waiting for a batch. You decide who you teach and when.</p></Reveal>
            </div>
            <Reveal delay={300}>
              <WaitlistForm variant="tutor" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FOR CONSULTANTS ──────────────────────────── */}
      <section id="consultants" className="py-16 md:py-28 px-6 md:px-14 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div>
            <Reveal>
              <Eyebrow label="For consultants, mentors, and industry experts" color="amber" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-2xl sm:text-3xl md:text-[2.6rem] font-black text-gray-950 tracking-[-0.02em] leading-tight mb-6">
                Your Time And Your Experience Are Worth Paying For.{" "}
                <span className="text-amber-600">Make Them Bookable.</span>
              </h2>
            </Reveal>
            <div className="space-y-4 text-gray-500 text-base leading-relaxed mb-8">
              <Reveal delay={140}><p>You have built something. A career, an agency, a skill most people are still trying to figure out. People already ask you questions for free: on DMs, on calls that go nowhere, or on favors you never get paid for.</p></Reveal>
              <Reveal delay={200}><p>STUTAP turns your expertise into something bookable. Set your rate. Set your availability. Let people pay for your time directly, the same way they would pay any other expert for a session.</p></Reveal>
              <Reveal delay={260}><p className="font-semibold text-gray-800">No more free advice disguised as networking. Just paid sessions, with people who actually want your help and are willing to pay for it.</p></Reveal>
            </div>
            <Reveal delay={300}>
              <WaitlistForm variant="consultant" />
            </Reveal>
          </div>

          <Reveal direction="right">
            <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border-t-4 border-t-amber-500 hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.08)] transition-all duration-300">
              <div className="flex items-center gap-3.5 mb-7">
                <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
                <p className="text-sm font-bold text-gray-900 uppercase tracking-widest">What you get on STUTAP</p>
              </div>
              <ul className="space-y-4">
                {[
                  "A public bookable profile with your rates visible upfront",
                  "Clients pay before the session, with no chasing invoices",
                  "Async written Q&A option for passive income",
                  "Build a reputation separate from your employer",
                  "Choose exactly who you take sessions with",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3.5 text-sm text-gray-700 font-medium">
                    <CheckCircle2 className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 9: WHAT MAKES THIS DIFFERENT ───────────────── */}
      <section id="different" className="py-16 md:py-28 px-6 md:px-14 bg-gray-950 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <Reveal>
            <Eyebrow label="Why this is not another tutoring app" dark color="indigo" />
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-[-0.02em] leading-tight mb-5">
              We Are Not An Academy.{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                We Are A Marketplace.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-14">
              An academy sells you a seat in a class and assigns you a teacher. A marketplace lets you choose who you work with, see what others thought of them, and pay only for the exact thing you came for. STUTAP is built as a marketplace first, offering tutoring, learning resources, and expert consultations all in one place, all working the same way.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { icon: "🎯", title: "You Choose Tutors", desc: "See who you work with, read what others thought of them, and make the call yourself before spending a single rupee." },
              { icon: "💳", title: "Pay Per Session", desc: "Tutoring, resources, and expert consultations are all priced per session. No packages, no forced commitments." },
              { icon: "📖", title: "One Unified Hub", desc: "Everything you need to learn and grow is in one account, not three different apps each with their own subscription." },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 100}>
                <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.06] p-8 hover:bg-white/[0.04] hover:border-indigo-500/20 transition-all duration-300 h-full hover:-translate-y-1">
                  <span className="text-4xl mb-6 block">{card.icon}</span>
                  <h3 className="font-bold text-white text-base mb-3 tracking-wide">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 10: FOR PARENTS ─────────────────────────────── */}
      <section id="parents" className="py-16 md:py-28 px-6 md:px-14 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div>
            <Reveal>
              <Eyebrow label="For parents" color="teal" />
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-2xl sm:text-3xl md:text-[2.6rem] font-black text-gray-950 tracking-[-0.02em] leading-tight mb-6">
                See What Your Child Is Actually Working On,{" "}
                <span className="text-teal-600">Every Week</span>
              </h2>
            </Reveal>
            <div className="space-y-4 text-gray-500 text-base leading-relaxed">
              <Reveal delay={140}><p>You are paying for tutoring. You deserve more than a one word answer when you ask how it is going.</p></Reveal>
              <Reveal delay={200}><p>Every session on STUTAP comes with a simple report. What was covered. What is improving. What still needs work. <strong className="text-gray-800 font-semibold">No guessing. No vague updates.</strong> Just a clear picture of where your child actually stands, sent to you directly.</p></Reveal>
            </div>
          </div>

          {/* Report card */}
          <Reveal direction="right">
            <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_15px_45px_-15px_rgba(0,0,0,0.06)]">
              <div className="bg-slate-50/50 border-b border-slate-100 px-7 py-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-slate-800 uppercase tracking-widest">Session Summary Report</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Dispatched instantly to parent after session</p>
                </div>
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100/50 rounded-full px-3 py-1">Student Portal</span>
              </div>
              <div className="p-7 space-y-4">
                {[
                  { label: "Topic covered", value: "Organic Chemistry: Alkenes", color: "text-gray-900" },
                  { label: "What improved", value: "Addition reactions now solid ✅", color: "text-emerald-700 bg-emerald-50/50 border-emerald-100/50" },
                  { label: "Still needs work", value: "Nomenclature of complex chains", color: "text-orange-700 bg-orange-50/50 border-orange-100/50" },
                  { label: "Next session", value: "Alkynes + practice questions", color: "text-indigo-700 bg-indigo-50/30 border-indigo-100/30" },
                ].map((row) => (
                  <div key={row.label} className={`rounded-xl border border-slate-100/70 p-4 ${row.color && row.color.includes('bg-') ? row.color.split(' ')[1] + ' ' + row.color.split(' ')[2] : 'bg-slate-50/40'}`}>
                    <p className="text-[10px] text-gray-400 font-bold mb-1.5 uppercase tracking-wider">{row.label}</p>
                    <p className={`text-sm font-bold ${row.color && row.color.includes('bg-') ? row.color.split(' ')[0] : row.color}`}>{row.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 11: FINAL CTA ───────────────────────────────── */}
      <section
        id="final-cta"
        className="py-16 md:py-28 px-6 md:px-14 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3730a3 0%, #4c1d95 50%, #1e1b4b 100%)" }}
      >
        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="max-w-2xl mx-auto relative z-10">
          <Reveal>
            <p className="text-xs font-bold text-indigo-300 uppercase tracking-[0.15em] mb-5">
              We are building this with the people who will use it
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-[-0.02em] leading-tight mb-6">
              Be Part Of The First Group On STUTAP
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-base md:text-lg text-indigo-200 leading-relaxed mb-5 max-w-xl mx-auto">
              We are onboarding a small group of verified tutors and early students before opening this to everyone.
              Join the waitlist now and you will be among the first to get access, the first to try a free session,
              and the first to shape what this becomes.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-indigo-300/80 text-sm italic mb-10 max-w-lg mx-auto">
              This is not a finished product asking for your trust blindly. It is a new way to learn and teach,
              built in front of you, with your name on the early list.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="flex justify-center">
              <WaitlistForm variant="hero" dark={true} />
            </div>
            <p className="text-indigo-300/70 text-xs mt-5 font-medium">
              No payment required to join · No spam · Just early access the moment we open the doors
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-gray-50 py-14 px-6 md:px-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-10">
            <div className="max-w-xs">
              <div className="flex items-center p-0 mb-4">
                <img src="/background-removed.png" alt="STUTAP Logo" className="h-18 md:h-20 w-auto object-contain" />
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Pakistan's first tutor marketplace. Choose your tutor. Book one session. Pay only for what you need.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-12 text-sm">
              {[
                { title: "Waitlist", links: [["Students", "#hero-cta"], ["Tutors", "#tutors"], ["Consultants", "#consultants"], ["Parents", "#parents"]] },
                { title: "Company", links: [["About", "#"], ["Blog", "#"], ["Contact", "#"]] },
                { title: "Legal", links: [["Privacy", "#"], ["Terms", "#"], ["Refund policy", "#"]] },
              ].map((col) => (
                <div key={col.title}>
                  <p className="font-bold text-gray-900 mb-3">{col.title}</p>
                  <ul className="space-y-2 text-gray-500">
                    {col.links.map(([label, href]) => (
                      <li key={label}><a href={href} className="hover:text-gray-900 transition-colors">{label}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} STUTAP Pakistan. All rights reserved.</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>🇵🇰 Built for Pakistan</span>
              <span>·</span>
              <span>JazzCash · EasyPaisa · Cards</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Keyframe styles ──────────────────────────────────────── */}
      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
