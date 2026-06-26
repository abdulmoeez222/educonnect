import { useState } from "react";
import { useParams, Link } from "wouter";
import { Calendar as CalendarIcon, Clock, Video, Users, CheckCircle2, ChevronRight, CreditCard, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { tutors } from "@/lib/mock-data/tutors";

export default function Booking() {
  const { tutorId } = useParams();
  const tutor = tutors.find(t => t.id === tutorId) || tutors[0];
  
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | null>(null);
  const [format, setFormat] = useState<'online' | 'in-person'>(tutor.sessionFormat === 'in-person' ? 'in-person' : 'online');
  const [payment, setPayment] = useState<'card' | 'easypaisa' | 'jazzcash'>('card');

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "02:00 PM", "03:30 PM", "05:00 PM",
    "07:00 PM", "08:00 PM"
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-8">
        <Button variant="ghost" className="-ml-4 mb-4" asChild>
          <Link href={`/tutor/${tutor.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Book a session</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Form Area */}
        <div className="flex-1 order-2 lg:order-1">
          {/* Progress */}
          <div className="flex items-center mb-10">
            {['Date & Time', 'Details', 'Payment'].map((label, i) => {
              const stepNum = i + 1;
              const isActive = step === stepNum;
              const isDone = step > stepNum;
              return (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div className={`h-9 w-9 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all
                      ${isDone ? 'bg-green-500 border-green-500 text-white' : 
                        isActive ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' : 
                        'bg-background border-border text-muted-foreground'}`}>
                      {isDone ? '✓' : stepNum}
                    </div>
                    <span className={`text-xs mt-1.5 font-medium whitespace-nowrap ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{label}</span>
                  </div>
                  {i < 2 && <div className={`h-0.5 flex-1 mx-3 mb-4 transition-colors ${isDone ? 'bg-green-500' : 'bg-border'}`} />}
                </div>
              );
            })}
          </div>

          {/* Steps Content */}
          {step === 1 && (
            <div className="animate-in fade-in space-y-6">
              <h2 className="text-xl font-bold">Select date and time</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="rounded-2xl border-2 p-3 bg-card shadow-sm inline-block">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-xl"
                    disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                  />
                </Card>
                <div>
                  <h3 className="font-medium mb-3 flex items-center"><Clock className="mr-2 h-4 w-4 text-muted-foreground"/> Available Slots</h3>
                  {date ? (
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map(slot => (
                        <Button 
                          key={slot} 
                          variant="outline"
                          className={`h-11 rounded-xl border-2 font-medium text-sm transition-all justify-start ${
                            time === slot 
                              ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20 shadow-sm' 
                              : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
                          }`}
                          onClick={() => setTime(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm p-4 border rounded-xl bg-muted/50 text-center">
                      Please select a date first
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button onClick={() => setStep(2)} disabled={!date || !time} size="lg">
                  Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
              <h2 className="text-xl font-bold">Session details</h2>
              
              <div className="space-y-4">
                <h3 className="font-medium">Format</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card 
                    className={`rounded-2xl border-2 p-6 cursor-pointer transition-all duration-200 ${
                      format === 'online' 
                        ? 'border-primary ring-2 ring-primary/20 bg-primary/5' 
                        : 'hover:border-primary/40 hover:shadow-sm'
                    }`}
                    onClick={() => tutor.sessionFormat !== 'in-person' && setFormat('online')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-12 w-12 bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
                        <Video className="h-5 w-5" />
                      </div>
                      {format === 'online' && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </div>
                    <h4 className="font-semibold">Online session</h4>
                    <p className="text-sm text-muted-foreground mt-1">Via secure video call</p>
                  </Card>
                  
                  <Card 
                    className={`rounded-2xl border-2 p-6 transition-all duration-200 ${
                      tutor.sessionFormat === 'online' 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'cursor-pointer hover:border-primary/40 hover:shadow-sm'
                    } ${
                      format === 'in-person' 
                        ? 'border-primary ring-2 ring-primary/20 bg-primary/5' 
                        : ''
                    }`}
                    onClick={() => tutor.sessionFormat !== 'online' && setFormat('in-person')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-12 w-12 bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center">
                        <Users className="h-5 w-5" />
                      </div>
                      {format === 'in-person' && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    </div>
                    <h4 className="font-semibold">In-person</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {tutor.sessionFormat === 'online' ? 'Not offered by this tutor' : `At location in ${tutor.location}`}
                    </p>
                  </Card>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)} size="lg">
                  Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
              <h2 className="text-xl font-bold">Payment</h2>
              
              <div className="space-y-3">
                {[
                  { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
                  { id: 'easypaisa', name: 'EasyPaisa', icon: () => <span className="text-green-600 font-bold text-sm h-5 w-5 flex items-center justify-center">ep</span> },
                  { id: 'jazzcash', name: 'JazzCash', icon: () => <span className="text-red-600 font-bold text-sm h-5 w-5 flex items-center justify-center">jc</span> }
                ].map(method => (
                  <div 
                    key={method.id}
                    className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${payment === method.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/30 hover:bg-muted/30'}`}
                    onClick={() => setPayment(method.id as any)}
                  >
                    <div className="flex items-center gap-3">
                      <method.icon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{method.name}</span>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${payment === method.id ? 'border-primary bg-primary' : 'border-muted-foreground/30'}`}>
                      {payment === method.id && <div className="h-1.5 w-1.5 bg-white rounded-full" />}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 p-4 rounded-2xl text-sm text-muted-foreground">
                This is a mock application. No real payment will be processed.
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={() => setStep(4)} size="lg" className="bg-green-600 hover:bg-green-700 transition-all duration-200">
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in zoom-in-95 fade-in duration-500 text-center py-12 space-y-6">
              <div className="h-24 w-24 bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h2 className="text-3xl font-bold">Booking confirmed!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your session with {tutor.name} has been successfully scheduled. We've sent a confirmation email with the details.
              </p>
              
              <Card className="rounded-2xl border-2 border-border bg-card shadow-sm max-w-sm mx-auto text-left">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{date?.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
                      <div className="text-sm text-muted-foreground">{time} (60 min)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {format === 'online' ? <Video className="h-5 w-5 text-primary" /> : <Users className="h-5 w-5 text-primary" />}
                    <div>
                      <div className="font-medium capitalize">{format} Session</div>
                      <div className="text-sm text-muted-foreground">
                        {format === 'online' ? 'Link will be available 15m before' : 'Location details in email'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Button variant="outline" asChild>
                  <Link href="/home">Return Home</Link>
                </Button>
                <Button asChild>
                  <Link href="/sessions">Go to My Sessions</Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        {step < 4 && (
          <div className="w-full lg:w-80 order-1 lg:order-2 shrink-0">
            <Card className="sticky top-24 rounded-2xl border-2 border-primary/20 shadow-md bg-card">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Summary</h3>
                
                <div className="flex items-center gap-3 mb-6">
                  <Avatar className="h-12 w-12 border">
                    <AvatarImage src={tutor.avatarUrl} />
                    <AvatarFallback>{tutor.name.substring(0,2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{tutor.name}</div>
                    <div className="text-sm text-muted-foreground">{tutor.subjects[0]}</div>
                  </div>
                </div>

                <div className="divide-y divide-border/50">
                  <div className="space-y-3 text-sm pb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium text-right">{date?.toLocaleDateString() || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium text-right">{time || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Format</span>
                      <span className="font-medium capitalize text-right">{format}</span>
                    </div>
                  </div>

                  <div className="space-y-2 py-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Hourly Rate</span>
                      <span>PKR {tutor.hourlyRate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Platform Fee</span>
                      <span>PKR 0</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-black text-xl pt-4 text-primary">
                    <span>Total</span>
                    <span>PKR {tutor.hourlyRate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
