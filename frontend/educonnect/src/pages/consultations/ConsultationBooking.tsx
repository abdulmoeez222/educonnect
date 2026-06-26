import { useState } from "react";
import { useParams, Link } from "wouter";
import { Calendar as CalendarIcon, Clock, Video, CheckCircle2, ChevronRight, CreditCard, ArrowLeft, Package, FileText, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { consultants } from "@/lib/mock-data/consultants";

type PackageKey = 'single' | 'threePack' | 'retainer';

const PACKAGE_INFO: Record<PackageKey, { label: string; desc: string }> = {
  single: { label: 'Single Session', desc: 'One focused session for your immediate needs.' },
  threePack: { label: '3-Session Pack', desc: 'Three structured sessions for sustained progress.' },
  retainer: { label: 'Monthly Retainer', desc: 'Ongoing monthly support with priority access.' },
};

const TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:30 PM", "05:00 PM", "07:00 PM", "08:00 PM"];

const STEPS = ['Package & Format', 'Date & Time', 'Intake Form', 'Payment', 'Confirm'];

export default function ConsultationBooking() {
  const { id } = useParams();
  const consultant = consultants.find(c => c.id === id) ?? consultants[0];

  const formats = consultant.sessionFormats ?? ['video'];
  const hasAsync = formats.includes('async-qa');

  const [step, setStep] = useState(1);
  const [pkg, setPkg] = useState<PackageKey>('single');
  const [format, setFormat] = useState<'video' | 'async-qa'>('video');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | null>(null);
  const [intakeAnswers, setIntakeAnswers] = useState<Record<string, string>>({});
  const [payment, setPayment] = useState<'card' | 'easypaisa' | 'jazzcash'>('card');

  const questions = consultant.intakeQuestions ?? [];
  const price = consultant.packages[pkg];

  const intakeValid = questions.every(q => {
    if (!q.required) return true;
    return (intakeAnswers[q.id] ?? '').trim().length > 0;
  });

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-in fade-in duration-300">
      <div className="mb-8">
        <Button variant="ghost" className="-ml-4 mb-4 rounded-xl hover:bg-muted transition-all duration-200" asChild>
          <Link href={`/consultant/${consultant.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Book a consultation</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main */}
        <div className="flex-1 order-2 lg:order-1">
          {/* Progress */}
          <div className="flex items-center mb-10 overflow-x-auto pb-2 scrollbar-hide">
            {STEPS.map((label, i) => {
              const stepNum = i + 1;
              const isActive = step === stepNum;
              const isDone = step > stepNum;
              return (
                <div key={label} className="flex items-center flex-1 last:flex-none min-w-[80px]">
                  <div className="flex flex-col items-center">
                    <div className={`h-9 w-9 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all
                      ${isDone ? 'bg-green-500 border-green-500 text-white' : 
                        isActive ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/30' : 
                        'bg-background border-border text-muted-foreground'}`}>
                      {isDone ? <CheckCircle2 className="h-5 w-5" /> : stepNum}
                    </div>
                    <span className={`text-xs mt-1.5 font-medium whitespace-nowrap ${isActive ? 'text-amber-600 dark:text-amber-500' : 'text-muted-foreground'}`}>{label}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 mx-3 mb-4 transition-colors ${isDone ? 'bg-green-500' : 'bg-border'}`} />}
                </div>
              );
            })}
          </div>

          {/* Step 1: Package */}
          {step === 1 && (
            <div className="animate-in fade-in space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Choose a package</h2>
                <div className="grid gap-4">
                  {(Object.entries(PACKAGE_INFO) as [PackageKey, typeof PACKAGE_INFO[PackageKey]][]).map(([key, info]) => (
                    <Card
                      key={key}
                      className={`p-4 cursor-pointer transition-all rounded-2xl border-2 ${pkg === key ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm' : 'hover:border-amber-400 hover:shadow-sm bg-card'}`}
                      onClick={() => setPkg(key)}
                      data-testid={`package-${key}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${pkg === key ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-600' : 'bg-muted text-muted-foreground'}`}>
                            <Package className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="font-bold flex items-center gap-2 text-base">
                              {info.label}
                              {key === 'threePack' && <Badge className="bg-amber-500 text-white text-xs px-2 rounded-full border-none">Best Value</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{info.desc}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <div className="font-black text-lg text-foreground">PKR {consultant.packages[key].toLocaleString()}</div>
                          {key === 'threePack' && (
                            <div className="text-xs text-amber-600 font-semibold mt-0.5">PKR {Math.round(consultant.packages[key] / 3).toLocaleString()}/session</div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Session format</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card 
                    className={`rounded-2xl border-2 p-6 cursor-pointer transition-all duration-200 ${
                      format === 'video' 
                        ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20' 
                        : 'hover:border-amber-400 hover:shadow-sm bg-card'
                    }`}
                    onClick={() => setFormat('video')}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-12 w-12 bg-blue-100 dark:bg-blue-950/40 text-blue-600 rounded-2xl flex items-center justify-center">
                        <Video className="h-6 w-6" />
                      </div>
                      {format === 'video' && <CheckCircle2 className="h-6 w-6 text-amber-500" />}
                    </div>
                    <h4 className="font-bold">Video call</h4>
                    <p className="text-sm text-muted-foreground mt-1">Live 1-on-1 consultation</p>
                  </Card>
                  
                  <Card 
                    className={`rounded-2xl border-2 p-6 transition-all duration-200 ${
                      !hasAsync 
                        ? 'opacity-50 cursor-not-allowed bg-card' 
                        : 'cursor-pointer hover:border-amber-400 hover:shadow-sm bg-card'
                    } ${
                      format === 'async-qa' 
                        ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20' 
                        : ''
                    }`}
                    onClick={() => hasAsync && setFormat('async-qa')}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-12 w-12 bg-purple-100 dark:bg-purple-950/40 text-purple-600 rounded-2xl flex items-center justify-center">
                        <FileText className="h-6 w-6" />
                      </div>
                      {format === 'async-qa' && <CheckCircle2 className="h-6 w-6 text-amber-500" />}
                    </div>
                    <h4 className="font-bold">Async Q&A</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {hasAsync ? 'Get detailed written responses' : 'Not offered by this consultant'}
                    </p>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => setStep(format === 'async-qa' ? 3 : 2)} size="lg" className="h-12 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 transition-all duration-200">
                  Next Step <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && format === 'video' && (
            <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
              <h2 className="text-xl font-bold">Select date and time</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-3 border-2 rounded-2xl bg-card shadow-sm inline-block">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-xl"
                    disabled={d => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </Card>
                <div>
                  <h3 className="font-semibold mb-4 flex items-center"><Clock className="mr-2 h-5 w-5 text-muted-foreground" /> Available Slots</h3>
                  {date ? (
                    <div className="grid grid-cols-2 gap-3">
                      {TIME_SLOTS.map(slot => (
                        <Button
                          key={slot}
                          variant="outline"
                          className={`h-12 rounded-xl border-2 font-medium transition-all justify-start ${time === slot ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 ring-2 ring-amber-200/50 text-amber-700 dark:text-amber-300' : 'bg-card hover:border-amber-400'}`}
                          onClick={() => setTime(slot)}
                          data-testid={`slot-${slot}`}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm p-6 border-2 border-dashed rounded-2xl bg-muted/30 text-center font-medium">
                      Please select a date first
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between pt-6 border-t">
                <Button variant="outline" className="h-12 rounded-xl font-semibold px-6" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)} disabled={!date || !time} size="lg" className="h-12 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 transition-all duration-200">
                  Next Step <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Intake Form */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
              <div>
                <h2 className="text-xl font-bold">Before your session</h2>
                <p className="text-muted-foreground mt-1">Please answer these questions so {consultant.name} can prepare for your session.</p>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 mt-4">
                <div className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  Consultant's pre-session questions
                </div>
                
                {questions.length === 0 ? (
                  <p className="text-sm text-amber-900/70 dark:text-amber-200/70">No intake questions for this consultant.</p>
                ) : (
                  <div className="space-y-6">
                    {questions.map((q, i) => (
                      <div key={q.id} className="space-y-3 py-2 border-b border-amber-200/50 dark:border-amber-800/50 last:border-0">
                        <Label className="text-sm font-semibold text-amber-900 dark:text-amber-200 flex items-start gap-2">
                          <span className="shrink-0">{i + 1}.</span> 
                          <span>{q.question}{q.required && <span className="text-destructive ml-1">*</span>}</span>
                        </Label>
                        <div className="pl-5">
                          {q.type === 'short-text' && (
                            <Input
                              className="h-11 rounded-xl border-2 focus:border-amber-500 bg-background"
                              value={intakeAnswers[q.id] ?? ''}
                              onChange={e => setIntakeAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                              placeholder="Your answer..."
                              data-testid={`intake-${q.id}`}
                            />
                          )}
                          {q.type === 'long-text' && (
                            <Textarea
                              className="rounded-xl border-2 focus:border-amber-500 bg-background resize-none min-h-[100px]"
                              value={intakeAnswers[q.id] ?? ''}
                              onChange={e => setIntakeAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                              placeholder="Your detailed answer..."
                              data-testid={`intake-${q.id}`}
                            />
                          )}
                          {q.type === 'multiple-choice' && (
                            <RadioGroup
                              value={intakeAnswers[q.id] ?? ''}
                              onValueChange={val => setIntakeAnswers(prev => ({ ...prev, [q.id]: val }))}
                              data-testid={`intake-${q.id}`}
                            >
                              {(q.options ?? []).map(opt => (
                                <div key={opt} className="flex items-center gap-3 bg-background p-3 rounded-xl border">
                                  <RadioGroupItem value={opt} id={`${q.id}-${opt}`} className="text-amber-600" />
                                  <Label htmlFor={`${q.id}-${opt}`} className="font-medium cursor-pointer flex-1">{opt}</Label>
                                </div>
                              ))}
                            </RadioGroup>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-6 border-t mt-8">
                <Button variant="outline" className="h-12 rounded-xl font-semibold px-6" onClick={() => setStep(format === 'async-qa' ? 1 : 2)}>Back</Button>
                <Button onClick={() => setStep(4)} disabled={!intakeValid} size="lg" className="h-12 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 transition-all duration-200">
                  Next Step <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
              <h2 className="text-xl font-bold">Payment</h2>
              <div className="space-y-3">
                {[
                  { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
                  { id: 'easypaisa', name: 'EasyPaisa', icon: () => <span className="font-bold text-green-600 text-sm bg-green-100 px-2 py-0.5 rounded">EP</span> },
                  { id: 'jazzcash', name: 'JazzCash', icon: () => <span className="font-bold text-red-600 text-sm bg-red-100 px-2 py-0.5 rounded">JC</span> },
                ].map(method => (
                  <div
                    key={method.id}
                    className={`flex items-center justify-between p-5 border-2 rounded-2xl cursor-pointer transition-all ${payment === method.id ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm' : 'bg-card hover:border-amber-400'}`}
                    onClick={() => setPayment(method.id as typeof payment)}
                    data-testid={`payment-${method.id}`}
                  >
                    <div className="flex items-center gap-4">
                      <method.icon className="h-6 w-6 text-muted-foreground" />
                      <span className="font-bold">{method.name}</span>
                    </div>
                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${payment === method.id ? 'border-amber-500 bg-amber-500' : 'border-muted-foreground/30'}`}>
                      {payment === method.id && <div className="h-2 w-2 bg-white rounded-full" />}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 p-4 rounded-xl text-sm text-amber-800 dark:text-amber-300 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span>This is a mock application. No real payment will be processed. Feel free to proceed.</span>
              </div>
              <div className="flex justify-between pt-6 border-t mt-8">
                <Button variant="outline" className="h-12 rounded-xl font-semibold px-6" onClick={() => setStep(3)}>Back</Button>
                <Button onClick={() => setStep(5)} size="lg" className="h-12 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 transition-all duration-200">
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="animate-in zoom-in-95 duration-500 text-center py-16 space-y-6">
              <div className="h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h2 className="text-3xl font-black tracking-tight">Booking confirmed!</h2>
              <p className="text-muted-foreground max-w-md mx-auto text-lg leading-relaxed">
                Your {PACKAGE_INFO[pkg].label} with {consultant.name} has been confirmed. You will receive an email with details.
              </p>
              <Card className="max-w-sm mx-auto text-left bg-card mt-8 rounded-2xl border-2 shadow-sm">
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center text-amber-600">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-bold">{PACKAGE_INFO[pkg].label}</div>
                      <div className="text-sm text-muted-foreground font-medium">PKR {price.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  {format === 'video' && (
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center text-amber-600">
                        <CalendarIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-bold">{date?.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
                        <div className="text-sm text-muted-foreground font-medium">{time}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center text-amber-600">
                      {format === 'video' ? <Video className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="font-bold capitalize">{format === 'video' ? 'Video Consultation' : 'Async Q&A'}</div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {format === 'video' ? 'Link will be sent 15 min before' : 'Consultant will reply within 48h'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Button variant="outline" className="h-12 rounded-xl font-semibold px-8 border-2" asChild><Link href="/home">Return Home</Link></Button>
                <Button className="h-12 rounded-xl font-semibold px-8 bg-amber-600 hover:bg-amber-700 text-white transition-all duration-200" asChild><Link href="/sessions">My Sessions</Link></Button>
              </div>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        {step < 5 && (
          <div className="w-full lg:w-80 order-1 lg:order-2 shrink-0">
            <Card className="sticky top-24 border-amber-200 dark:border-amber-800 shadow-md bg-card rounded-2xl border-2">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-6">Summary</h3>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-14 w-14 border-2 shadow-sm ring-2 ring-amber-100 dark:ring-amber-900">
                    <AvatarImage src={consultant.avatarUrl} />
                    <AvatarFallback>{consultant.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-lg leading-tight">{consultant.name}</div>
                    <div className="text-sm text-muted-foreground font-medium mt-1">{consultant.expertise[0]}</div>
                  </div>
                </div>
                <Separator className="my-6" />
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Package</span>
                    <span className="font-bold text-right text-foreground">{PACKAGE_INFO[pkg].label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Format</span>
                    <span className="font-bold text-right text-foreground capitalize">{format === 'video' ? 'Video Call' : 'Async Q&A'}</span>
                  </div>
                  {format === 'video' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-medium">Date</span>
                        <span className="font-bold text-right text-foreground">{date?.toLocaleDateString() ?? 'Not selected'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground font-medium">Time</span>
                        <span className="font-bold text-right text-foreground">{time ?? 'Not selected'}</span>
                      </div>
                    </>
                  )}
                </div>
                <Separator className="my-6" />
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg">Total</span>
                  <span className="text-3xl font-black text-amber-600">PKR {price.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
