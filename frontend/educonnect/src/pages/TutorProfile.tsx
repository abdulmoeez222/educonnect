import { useParams, Link } from "wouter";
import { MapPin, Star, ShieldCheck, CheckCircle, Clock, Video, Users, BookOpen, MessageSquare, Calendar, Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { tutors } from "@/lib/mock-data/tutors";

export default function TutorProfile() {
  const { id } = useParams();
  // Fallback to first tutor if not found (for mock purposes)
  const tutor = tutors.find(t => t.id === id) || tutors[0];

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 pb-20">
      {/* Main Column */}
      <div className="flex-1 space-y-8">
        
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <Avatar className="h-32 w-32 md:h-40 md:w-40 ring-4 ring-indigo-100 dark:ring-indigo-900 border-4 border-card shadow-md">
            <AvatarImage src={tutor.avatarUrl} alt={tutor.name} />
            <AvatarFallback className="text-3xl">{tutor.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">{tutor.name}</h1>
              {tutor.isVerified && <ShieldCheck className="h-6 w-6 text-indigo-500" />}
            </div>
            
            <p className="text-lg text-muted-foreground mb-4">
              {tutor.subjects.join(", ")}
            </p>
            
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-1.5 bg-muted rounded-full px-3 py-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {tutor.location}
              </div>
              <div className="inline-flex items-center gap-1.5 bg-muted rounded-full px-3 py-1.5 text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                {tutor.yearsExperience} Years Experience
              </div>
              <div className="inline-flex items-center gap-1.5 bg-muted rounded-full px-3 py-1.5 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                Speaks {tutor.languages.join(", ")}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="rounded-2xl p-5 text-center border hover:border-primary/30 transition-colors bg-card">
            <CardContent className="p-0 flex flex-col items-center justify-center">
              <div className="flex items-center mb-1">
                <Star className="h-5 w-5 text-amber-500 fill-amber-500 mr-1" />
                <span className="text-3xl font-black text-primary">{tutor.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">{tutor.reviews} Reviews</span>
            </CardContent>
          </Card>
          <Card className="rounded-2xl p-5 text-center border hover:border-primary/30 transition-colors bg-card">
            <CardContent className="p-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-primary mb-1">{tutor.totalStudents}+</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Students Taught</span>
            </CardContent>
          </Card>
          <Card className="rounded-2xl p-5 text-center border hover:border-primary/30 transition-colors bg-card">
            <CardContent className="p-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-primary mb-1">100%</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Response Rate</span>
            </CardContent>
          </Card>
          <Card className="rounded-2xl p-5 text-center border hover:border-primary/30 transition-colors bg-card">
            <CardContent className="p-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-primary mb-1 capitalize">{tutor.sessionFormat}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Session Format</span>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* About */}
        <div className="bg-muted/20 rounded-2xl p-6 border">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <div className="h-5 w-1 bg-primary rounded-full" />
            About Me
          </h2>
          <div className="prose dark:prose-invert max-w-none text-muted-foreground">
            <p>{tutor.bio}</p>
            <p>I believe in interactive learning where students are encouraged to ask questions. My methodology involves breaking down complex concepts into digestible chunks, followed by rigorous past-paper practice to ensure exam readiness.</p>
            <p>I provide my own compiled notes and worksheets for all my students.</p>
          </div>
        </div>

        <Separator />

        {/* Subjects */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <div className="h-5 w-1 bg-primary rounded-full" />
            Subjects Taught
          </h2>
          <div className="flex flex-wrap gap-2">
            {tutor.subjects.map(sub => (
              <span key={sub} className="bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800 rounded-full px-3 py-1.5 text-sm font-medium">
                {sub}
              </span>
            ))}
          </div>
        </section>

        <Separator />

        {/* Reviews */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Student reviews</h2>
            <div className="flex items-center text-lg font-bold">
              <Star className="h-5 w-5 text-amber-500 fill-amber-500 mr-2" />
              {tutor.rating} <span className="text-muted-foreground font-normal text-sm ml-2">({tutor.reviews} reviews)</span>
            </div>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3].map((i) => {
              const reviewRating = i === 2 ? 4 : 5;
              return (
                <div key={i} className="bg-muted/20 rounded-2xl p-5 border flex gap-4">
                  <Avatar className="h-10 w-10 border">
                    <AvatarFallback>S{i}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold mr-2">Student Name</span>
                        <span className="text-xs text-muted-foreground">2 weeks ago</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className={`h-3 w-3 ${star <= reviewRating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground/30'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Excellent tutor! Explained the concepts very clearly and helped me improve my grade significantly. Highly recommended."
                    </p>
                  </div>
                </div>
              );
            })}
            <Button variant="outline" className="w-full border-2 border-dashed rounded-2xl h-11">Load More Reviews</Button>
          </div>
        </section>

      </div>

      {/* Sticky Sidebar */}
      <aside className="w-full md:w-80 shrink-0">
        <div className="sticky top-24 space-y-6">
          <Card className="rounded-2xl border-2 border-indigo-600 dark:border-indigo-500 shadow-2xl bg-card">
            <CardContent className="p-6">
              <div className="mb-6">
                <span className="text-5xl font-black tracking-tight text-foreground">PKR {tutor.hourlyRate}</span>
                <span className="text-xl text-muted-foreground font-normal">/hr</span>
              </div>

              <div className="flex flex-col mb-6">
                <div className="flex items-center gap-3 text-sm py-2 border-b border-border/50">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>60 min sessions</span>
                </div>
                {tutor.sessionFormat !== 'in-person' && (
                  <div className="flex items-center gap-3 text-sm py-2 border-b border-border/50">
                    <Video className="h-4 w-4 text-muted-foreground" />
                    <span>Online video call</span>
                  </div>
                )}
                {tutor.sessionFormat !== 'online' && (
                  <div className="flex items-center gap-3 text-sm py-2 border-b border-border/50">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>In-person at student's home</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm py-2 last:border-0">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-primary font-medium">{tutor.availability}</span>
                </div>
              </div>

              <Button className="h-12 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold shadow-sm hover:shadow-md transition-all mb-3" asChild>
                <Link href={`/book/${tutor.id}`}>Book a Session</Link>
              </Button>
              <Button variant="outline" className="h-12 w-full rounded-xl border-2 text-base font-semibold">
                Message Tutor
              </Button>
            </CardContent>
          </Card>

          <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="font-semibold block mb-1 text-foreground">STUTAP Guarantee</span>
              <span className="text-muted-foreground">Your payment is held securely until the session is completed successfully.</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}


