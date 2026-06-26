import { useParams, Link } from "wouter";
import { Star, ExternalLink, Video, MessageSquare, FileText, CheckCircle2, Clock, ArrowLeft, ShieldCheck, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { consultants } from "@/lib/mock-data/consultants";

const FORMAT_ICONS = {
  'video': { icon: Video, label: 'Video Call' },
  'async-qa': { icon: MessageSquare, label: 'Async Q&A' },
  'document-review': { icon: FileText, label: 'Document Review' },
};

const QUESTION_TYPE_LABELS = {
  'short-text': 'Short answer',
  'long-text': 'Long answer',
  'multiple-choice': 'Multiple choice',
};

export default function ConsultantProfile() {
  const { id } = useParams();
  const consultant = consultants.find(c => c.id === id) ?? consultants[0];

  const formats = consultant.sessionFormats ?? ['video'];
  const hasAsync = formats.includes('async-qa');

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-in fade-in duration-300">
      <Button variant="ghost" className="-ml-4 mb-6 rounded-xl hover:bg-muted transition-all duration-200" asChild>
        <Link href="/consultants">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Consultants
        </Link>
      </Button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 space-y-8">
          {/* Header */}
          <div className="flex items-start gap-5">
            <Avatar className="h-24 w-24 border-2 border-border shadow-sm shrink-0 ring-4 ring-amber-100 dark:ring-amber-900">
              <AvatarImage src={consultant.avatarUrl} alt={consultant.name} />
              <AvatarFallback className="text-xl">{consultant.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold">{consultant.name}</h1>
                {consultant.isVerified && <ShieldCheck className="h-5 w-5 text-amber-500" />}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="font-semibold text-foreground">{consultant.rating}</span>
                  <span>({consultant.reviews} reviews)</span>
                </div>
                <span>·</span>
                <span>{consultant.yearsExperience} yrs experience</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {consultant.expertise.map(e => (
                  <span key={e} className="bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 rounded-full px-3 py-1.5 text-sm font-medium">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="rounded-2xl border bg-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mb-1">{consultant.rating}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Rating</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border bg-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mb-1">{consultant.reviews}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Reviews</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border bg-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mb-1">{consultant.yearsExperience}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Years Exp.</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border bg-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mb-1">100+</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Sessions</div>
              </CardContent>
            </Card>
          </div>

          {/* Bio */}
          <div>
            <h2 className="font-semibold text-lg mb-3">Background</h2>
            {(consultant.background ?? consultant.bio).split('\n\n').map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-3">{para}</p>
            ))}
          </div>

          {/* Industries + Formats */}
          <div className="grid sm:grid-cols-2 gap-6">
            {(consultant.industries ?? []).length > 0 && (
              <div>
                <h3 className="font-medium mb-2 text-sm text-muted-foreground uppercase tracking-wider">Industries</h3>
                <div className="flex flex-wrap gap-2">
                  {(consultant.industries ?? []).map(ind => (
                    <span key={ind} className="text-sm px-2.5 py-1 rounded-xl bg-muted text-foreground border border-border">{ind}</span>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="font-medium mb-2 text-sm text-muted-foreground uppercase tracking-wider">Session formats</h3>
              <div className="flex flex-wrap gap-2">
                {formats.map(fmt => {
                  const { icon: Icon, label } = FORMAT_ICONS[fmt] ?? { icon: Video, label: fmt };
                  return (
                    <span key={fmt} className="inline-flex items-center gap-1.5 text-sm px-2.5 py-1 rounded-xl bg-muted text-foreground border border-border">
                      <Icon className="h-3.5 w-3.5 text-amber-600" />
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Portfolio link */}
          {consultant.portfolioLink && (
            <div className="flex items-center gap-2 text-sm">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <a
                href={`https://${consultant.portfolioLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:underline transition-all duration-200"
                data-testid="link-portfolio"
              >
                {consultant.portfolioLink}
              </a>
            </div>
          )}

          <Separator />

          {/* Packages */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Package options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {/* Single */}
              <div className="rounded-2xl border-2 p-6 text-center hover:border-amber-300 transition-all bg-card">
                <div className="text-base font-bold mb-2">Single Session</div>
                <div className="text-3xl font-black text-foreground mt-3 mb-1">PKR {consultant.packages.single.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground h-10 mb-2">One focused session tailored to your needs.</p>
                <Button className="w-full h-11 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold mt-4 transition-all duration-200" asChild>
                  <Link href={`/book-consultation/${consultant.id}`}>Book this</Link>
                </Button>
              </div>

              {/* 3-pack */}
              <div className="rounded-2xl border-2 border-amber-400 ring-2 ring-amber-200/50 dark:ring-amber-800/50 p-6 text-center relative bg-card">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white rounded-full px-4 py-1 text-xs font-bold whitespace-nowrap">
                  Best Value
                </div>
                <div className="text-base font-bold mb-2">3-Session Pack</div>
                <div className="text-3xl font-black text-foreground mt-3 mb-1">PKR {consultant.packages.threePack.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mb-1">PKR {Math.round(consultant.packages.threePack / 3).toLocaleString()} per session</div>
                <p className="text-sm text-muted-foreground h-10 mb-2">Three structured sessions for sustained progress.</p>
                <Button className="w-full h-11 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold mt-4 shadow-md transition-all duration-200" asChild>
                  <Link href={`/book-consultation/${consultant.id}`}>Book this</Link>
                </Button>
              </div>

              {/* Retainer */}
              <div className="rounded-2xl border-2 p-6 text-center hover:border-amber-300 transition-all bg-card">
                <div className="text-base font-bold mb-2">Monthly Retainer</div>
                <div className="text-3xl font-black text-foreground mt-3 mb-1">PKR {consultant.packages.retainer.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground h-10 mb-2">Ongoing monthly support with priority access.</p>
                <Button variant="outline" className="w-full h-11 rounded-xl font-semibold mt-4 border-2 hover:bg-muted transition-all duration-200" asChild>
                  <Link href={`/book-consultation/${consultant.id}`}>Enquire</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Intake form preview */}
          {(consultant.intakeQuestions ?? []).length > 0 && (
            <div>
              <h2 className="font-semibold text-lg mb-3">This consultant will ask you…</h2>
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 mt-4">
                <div className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  Consultant's pre-session questions
                </div>
                <div className="space-y-0">
                  {(consultant.intakeQuestions ?? []).map((q, i) => (
                    <div key={q.id} className="text-sm text-amber-900 dark:text-amber-200 py-2 border-b border-amber-200/50 dark:border-amber-800/50 last:border-0 flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-amber-200/50 dark:bg-amber-800/50 text-amber-700 dark:text-amber-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <span className="font-medium">{q.question}</span>
                        {q.required && <span className="text-destructive ml-1">*</span>}
                        <div className="text-xs opacity-70 mt-0.5">{QUESTION_TYPE_LABELS[q.type]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Testimonials */}
          {(consultant.testimonials ?? []).length > 0 && (
            <div>
              <h2 className="font-semibold text-lg mb-4">What clients say</h2>
              <div className="space-y-4">
                {(consultant.testimonials ?? []).map(t => (
                  <Card key={t.id} className="bg-card rounded-2xl border shadow-sm">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-medium text-sm">{t.clientName}</div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-3.5 w-3.5 ${i < t.rating ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'}`} />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">{t.date}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <Card className="sticky top-24 shadow-md border-amber-200 dark:border-amber-800 rounded-2xl border-2">
            <CardContent className="p-6 space-y-5">
              <h3 className="font-bold text-xl">Book a consultation</h3>

              <div className="text-sm text-muted-foreground">
                Starting from <span className="text-4xl font-black text-foreground block mt-1">PKR {consultant.packages.single.toLocaleString()}</span>
              </div>

              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white h-12 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg" asChild>
                <Link href={`/book-consultation/${consultant.id}`}>
                  <Video className="mr-2 h-5 w-5" /> Book Video Session
                </Link>
              </Button>

              {hasAsync && (
                <Button variant="outline" className="w-full h-11 rounded-xl font-medium border-2 hover:bg-muted transition-all duration-200" asChild>
                  <Link href={`/async-consultation/${consultant.id}`}>
                    <MessageSquare className="mr-2 h-4 w-4" /> Submit Async Question
                  </Link>
                </Button>
              )}

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1 font-semibold">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    {consultant.rating} ({consultant.reviews})
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-semibold">{consultant.yearsExperience} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Response time</span>
                  <span className="font-semibold">Within 24 hrs</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-xs font-medium">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Availability is updated weekly. Book early to secure your preferred slot.</span>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted text-xs text-muted-foreground font-medium">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Sessions are conducted in Urdu or English based on your preference.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
