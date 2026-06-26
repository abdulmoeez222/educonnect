import { useState } from "react";
import { useLocation } from "wouter";
import { GraduationCap, ArrowRight, ArrowLeft, Book, Briefcase, Users, LayoutGrid, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStore } from "@/lib/store";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const { setRole, setOnboardingComplete } = useStore();

  const [accountType, setAccountType] = useState<string | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [budget, setBudget] = useState([2000]);

  const handleNext = () => {
    if (step === 1 && accountType) {
      setRole(accountType as any);
    }
    
    if (step < 5) {
      setStep(step + 1);
    } else {
      setOnboardingComplete(true);
      setLocation("/home");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleSelection = (item: string, list: string[], setter: (val: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col animate-in fade-in duration-300">
      <header className="h-16 border-b flex items-center px-6 sticky top-0 bg-background z-10">
        <div className="font-bold text-xl text-primary flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center text-white p-1.5">
            <GraduationCap className="h-full w-full" />
          </div>
          <span>EduConnect</span>
        </div>
      </header>

      <div className="w-full max-w-2xl mx-auto pt-8 px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          {[1,2,3,4,5].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all
                ${step > s ? 'bg-green-500 border-green-500 text-white' : 
                  step === s ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' : 
                  'bg-background border-border text-muted-foreground'}`}>
                {step > s ? '✓' : s}
              </div>
              {s < 5 && <div className={`h-0.5 w-8 transition-colors ${step > s ? 'bg-green-500' : 'bg-border'}`} />}
            </div>
          ))}
        </div>
        <Progress value={(step / 5) * 100} className="h-1.5 mb-8" />
      </div>

      <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 pb-20">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-400">
            <h1 className="text-3xl font-bold mb-2">Welcome! how will you use EduConnect?</h1>
            <p className="text-muted-foreground mb-8">Select your primary role. You can always change this later.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card 
                className={`relative p-6 sm:p-8 min-h-[150px] rounded-2xl cursor-pointer transition-all duration-200 ${accountType === 'student' ? 'border-2 border-primary bg-primary/8 ring-4 ring-primary/15 shadow-md' : 'border hover:border-primary/50 hover:shadow-md'}`}
                onClick={() => setAccountType('student')}
              >
                {accountType === 'student' && <CheckCircle2 className="absolute top-4 right-4 h-5 w-5 text-primary" />}
                <Book className={`h-12 w-12 mb-4 transition-colors ${accountType === 'student' ? 'text-primary' : 'text-muted-foreground'}`} />
                <h3 className="font-semibold text-lg mb-1">Student / parent</h3>
                <p className="text-sm text-muted-foreground">Find tutors, buy resources, and book consultations.</p>
              </Card>
              
              <Card 
                className={`relative p-6 sm:p-8 min-h-[150px] rounded-2xl cursor-pointer transition-all duration-200 ${accountType === 'tutor' ? 'border-2 border-primary bg-primary/8 ring-4 ring-primary/15 shadow-md' : 'border hover:border-primary/50 hover:shadow-md'}`}
                onClick={() => setAccountType('tutor')}
              >
                {accountType === 'tutor' && <CheckCircle2 className="absolute top-4 right-4 h-5 w-5 text-primary" />}
                <Users className={`h-12 w-12 mb-4 transition-colors ${accountType === 'tutor' ? 'text-primary' : 'text-muted-foreground'}`} />
                <h3 className="font-semibold text-lg mb-1">Tutor</h3>
                <p className="text-sm text-muted-foreground">Teach students online or in-person and earn money.</p>
              </Card>
              
              <Card 
                className={`relative p-6 sm:p-8 min-h-[150px] rounded-2xl cursor-pointer transition-all duration-200 ${accountType === 'consultant' ? 'border-2 border-primary bg-primary/8 ring-4 ring-primary/15 shadow-md' : 'border hover:border-primary/50 hover:shadow-md'}`}
                onClick={() => setAccountType('consultant')}
              >
                {accountType === 'consultant' && <CheckCircle2 className="absolute top-4 right-4 h-5 w-5 text-primary" />}
                <Briefcase className={`h-12 w-12 mb-4 transition-colors ${accountType === 'consultant' ? 'text-primary' : 'text-muted-foreground'}`} />
                <h3 className="font-semibold text-lg mb-1">Consultant</h3>
                <p className="text-sm text-muted-foreground">Offer career, admission, or specialized guidance.</p>
              </Card>

              <Card 
                className={`relative p-6 sm:p-8 min-h-[150px] rounded-2xl cursor-pointer transition-all duration-200 ${accountType === 'academy' ? 'border-2 border-primary bg-primary/8 ring-4 ring-primary/15 shadow-md' : 'border hover:border-primary/50 hover:shadow-md'}`}
                onClick={() => setAccountType('academy')}
              >
                {accountType === 'academy' && <CheckCircle2 className="absolute top-4 right-4 h-5 w-5 text-primary" />}
                <LayoutGrid className={`h-12 w-12 mb-4 transition-colors ${accountType === 'academy' ? 'text-primary' : 'text-muted-foreground'}`} />
                <h3 className="font-semibold text-lg mb-1">Academy</h3>
                <p className="text-sm text-muted-foreground">Manage multiple tutors and sell bulk resources.</p>
              </Card>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-400">
            <h1 className="text-3xl font-bold mb-2">What brings you here?</h1>
            <p className="text-muted-foreground mb-8">Select all that apply.</p>
            
            <div className="flex flex-wrap gap-3">
              {['Find a Tutor', 'Prepare for MDCAT', 'Cambridge Exams (O/A Levels)', 'Career Counseling', 'Buy Study Notes', 'University Admissions', 'IELTS Prep'].map(goal => (
                <Badge 
                  key={goal}
                  variant="outline" 
                  className={`px-5 py-2.5 text-sm rounded-full cursor-pointer font-medium transition-all duration-150 ${goals.includes(goal) ? 'bg-primary text-primary-foreground border-primary shadow-sm scale-[1.02]' : 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted/50'}`}
                  onClick={() => toggleSelection(goal, goals, setGoals)}
                >
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-400">
            <h1 className="text-3xl font-bold mb-2">Select subjects of interest</h1>
            <p className="text-muted-foreground mb-8">This helps us personalize your feed.</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-xs text-muted-foreground mb-3 uppercase tracking-wider">Medical & engineering</h3>
                <div className="flex flex-wrap gap-2.5">
                  {['MDCAT Biology', 'MDCAT Chemistry', 'MDCAT Physics', 'ECAT Math', 'ECAT Physics'].map(sub => (
                    <Badge 
                      key={sub}
                      variant="outline" 
                      className={`px-5 py-2.5 text-sm rounded-full cursor-pointer font-medium transition-all duration-150 ${subjects.includes(sub) ? 'bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-500 shadow-sm scale-[1.02]' : 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted/50'}`}
                      onClick={() => toggleSelection(sub, subjects, setSubjects)}
                    >
                      {sub}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-xs text-muted-foreground mb-3 uppercase tracking-wider">Cambridge</h3>
                <div className="flex flex-wrap gap-2.5">
                  {['O-Level Math', 'O-Level Physics', 'O-Level Chemistry', 'A-Level Biology', 'A-Level Math', 'A-Level Economics'].map(sub => (
                    <Badge 
                      key={sub}
                      variant="outline" 
                      className={`px-5 py-2.5 text-sm rounded-full cursor-pointer font-medium transition-all duration-150 ${subjects.includes(sub) ? 'bg-teal-600 text-white border-teal-600 dark:bg-teal-500 shadow-sm scale-[1.02]' : 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted/50'}`}
                      onClick={() => toggleSelection(sub, subjects, setSubjects)}
                    >
                      {sub}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-xs text-muted-foreground mb-3 uppercase tracking-wider">Other</h3>
                <div className="flex flex-wrap gap-2.5">
                  {['English', 'Computer Science', 'OOP', 'DSA', 'IELTS'].map(sub => (
                    <Badge 
                      key={sub}
                      variant="outline" 
                      className={`px-5 py-2.5 text-sm rounded-full cursor-pointer font-medium transition-all duration-150 ${subjects.includes(sub) ? 'bg-amber-600 text-white border-amber-600 dark:bg-amber-500 shadow-sm scale-[1.02]' : 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted/50'}`}
                      onClick={() => toggleSelection(sub, subjects, setSubjects)}
                    >
                      {sub}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-400">
            <h1 className="text-3xl font-bold mb-2">When is your target exam?</h1>
            <p className="text-muted-foreground mb-8">Optional: Helps tutors know your timeline.</p>
            
            <div className="max-w-md space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Exam Type</label>
                <Select>
                  <SelectTrigger className="rounded-xl h-11">
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdcat">MDCAT</SelectItem>
                    <SelectItem value="ecat">ECAT</SelectItem>
                    <SelectItem value="olevel">O-Levels (CAIE)</SelectItem>
                    <SelectItem value="alevel">A-Levels (CAIE)</SelectItem>
                    <SelectItem value="ielts">IELTS</SelectItem>
                    <SelectItem value="other">Other / General Study</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Target Year</label>
                <Select>
                  <SelectTrigger className="rounded-xl h-11">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-400">
            <h1 className="text-3xl font-bold mb-2">What's your preferred hourly budget?</h1>
            <p className="text-muted-foreground mb-12">Set a maximum hourly rate in PKR.</p>
            
            <div className="px-2">
              <Slider 
                defaultValue={[2000]} 
                max={5000} 
                step={100}
                onValueChange={setBudget}
                className="mb-8"
              />
              <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
                <span>PKR 0</span>
                <span className="text-2xl font-black text-foreground bg-primary/8 border border-primary/20 rounded-xl px-6 py-3">Up to PKR {budget[0]} / hr</span>
                <span>PKR 5000+</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-auto pt-8 flex items-center justify-between">
          <Button variant="ghost" onClick={handleBack} disabled={step === 1} className={step === 1 ? 'invisible' : 'h-12 px-6 rounded-xl active:scale-[0.98] transition-transform duration-75'}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleNext} disabled={step === 1 && !accountType} className="h-12 px-8 rounded-xl font-semibold active:scale-[0.98] transition-transform duration-75">
            {step === 5 ? 'Complete Setup' : 'Continue'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
