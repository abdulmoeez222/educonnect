import { Link, useLocation } from "wouter";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Auth() {
  const [, setLocation] = useLocation();

  const handleAuth = (e: React.FormEvent, isSignUp: boolean) => {
    e.preventDefault();
    if (isSignUp) {
      setLocation("/onboarding");
    } else {
      setLocation("/home");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row animate-in fade-in duration-300">
      {/* Left side - Branding */}
      <div className="hidden md:flex flex-col bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 p-10 lg:p-20 flex-1 border-r text-white">
        <div className="font-bold text-2xl text-white flex items-center gap-2 mb-auto">
          <div className="h-8 w-8 bg-white/20 rounded-2xl flex items-center justify-center text-white p-1.5">
            <GraduationCap className="h-full w-full" />
          </div>
          <span>STUTAP</span>
        </div>
        <div>
          <h1 className="text-white font-black text-4xl lg:text-5xl leading-tight mb-6">Your academic journey starts here.</h1>
          <p className="text-lg text-indigo-100 mb-8 max-w-md leading-relaxed">
            Join thousands of students and expert educators across Pakistan building a better future.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5">
              <div className="text-white font-black text-2xl mb-1">500+</div>
              <div className="text-indigo-200 text-sm">Verified Tutors</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5">
              <div className="text-white font-black text-2xl mb-1">50k+</div>
              <div className="text-indigo-200 text-sm">Resources</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-card sm:bg-background">
        <div className="w-full max-w-md">
          <div className="md:hidden font-bold text-2xl text-primary flex items-center justify-center gap-2 mb-8">
            <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center text-white p-1.5">
              <GraduationCap className="h-full w-full" />
            </div>
            <span className="font-extrabold tracking-tight">STUTAP</span>
          </div>

          <Card className="border-0 shadow-none sm:border sm:shadow-xl sm:rounded-3xl overflow-hidden">
            <CardHeader className="p-6 sm:p-8 pb-0">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Sign in to your account or create a new one.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 pt-6">
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted rounded-xl p-1">
                  <TabsTrigger value="signin" className="rounded-2xl">Sign In</TabsTrigger>
                  <TabsTrigger value="signup" className="rounded-2xl">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin">
                  <form onSubmit={(e) => handleAuth(e, false)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
                      <Input id="email" type="email" placeholder="ali@example.com" required className="h-11 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
                        <a href="#" className="text-xs text-primary hover:underline transition-all duration-200">Forgot password?</a>
                      </div>
                      <Input id="password" type="password" required className="h-11 rounded-xl" />
                    </div>
                    <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold active:scale-[0.98] transition-transform duration-75">Sign In</Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={(e) => handleAuth(e, true)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">First name</Label>
                        <Input id="firstName" placeholder="Ali" required className="h-11 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last name</Label>
                        <Input id="lastName" placeholder="Khan" required className="h-11 rounded-xl" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email-signup" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
                      <Input id="email-signup" type="email" placeholder="ali@example.com" required className="h-11 rounded-xl" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone number</Label>
                      <div className="flex gap-2">
                        <Select defaultValue="+92">
                          <SelectTrigger className="w-[100px] h-11 rounded-xl">
                            <SelectValue placeholder="+92" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+92">🇵🇰 +92</SelectItem>
                            <SelectItem value="+1">🇺🇸 +1</SelectItem>
                            <SelectItem value="+44">🇬🇧 +44</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input id="phone" type="tel" placeholder="300 1234567" className="flex-1 h-11 rounded-xl" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password-signup" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</Label>
                      <Input id="password-signup" type="password" required className="h-11 rounded-xl" />
                    </div>
                    <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold active:scale-[0.98] transition-transform duration-75">Create Account</Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background sm:bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="bg-card h-11 rounded-xl border-2 font-medium active:scale-[0.98] transition-transform duration-75">
                  Google
                </Button>
                <Button variant="outline" className="bg-card h-11 rounded-xl border-2 font-medium active:scale-[0.98] transition-transform duration-75">
                  Apple
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
