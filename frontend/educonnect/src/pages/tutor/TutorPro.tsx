import { useState } from "react";
import { useStore } from "@/lib/store";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TutorPro() {
  const { isPro, setIsPro } = useStore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpgrade = () => {
    setIsPro(true);
    setIsDialogOpen(false);
    toast({
      title: "Welcome to Tutor Pro! 🎉",
      description: "You now have access to all premium features.",
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in zoom-in-95 duration-500 relative pb-12">
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-b from-indigo-600/20 to-transparent -z-10 dark:from-indigo-900/30 rounded-t-3xl -mx-4 sm:-mx-8"></div>
      
      {!isPro && (
        <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-4 py-3 rounded-xl flex items-center justify-between mb-8 shadow-sm">
          <p className="text-sm font-medium">Unlock analytics, unlimited bookings, and more with Tutor Pro.</p>
        </div>
      )}

      <div className="text-center space-y-4 max-w-2xl mx-auto mb-16 pt-8">
        <h1 className="text-4xl font-bold tracking-tight">Take your tutoring to the next level</h1>
        <p className="text-xl text-muted-foreground">
          Get the tools you need to grow your student base and manage your business efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto items-start">
        {/* Free Tier */}
        <div className="bg-card rounded-3xl border-2 p-8 shadow-sm flex flex-col h-full">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Basic</h2>
            <p className="text-muted-foreground text-sm mt-1">Everything you need to get started</p>
            <div className="mt-6 font-bold text-5xl tracking-tighter">Free</div>
          </div>
          
          <div className="flex-1 space-y-4">
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>Basic profile listing</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>Up to 10 bookings/month</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>Standard search ranking</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>Basic session history</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground opacity-50">
                <X className="h-5 w-5 shrink-0" />
                <span>Unlimited bookings</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground opacity-50">
                <X className="h-5 w-5 shrink-0" />
                <span>Analytics dashboard</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-8">
            <Button className="w-full h-12 rounded-xl text-md font-semibold" variant="outline" disabled={!isPro}>
              {isPro ? "Downgrade to Basic" : "Current Plan"}
            </Button>
          </div>
        </div>

        {/* Pro Tier */}
        <div className="bg-card rounded-3xl border-2 border-indigo-500 p-8 shadow-xl shadow-indigo-500/10 flex flex-col relative transform lg:-translate-y-4 h-full z-10">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
            Most Popular
          </div>
          
          <div className="mb-8 mt-2">
            <h2 className="text-2xl font-bold">Pro</h2>
            <p className="text-muted-foreground text-sm mt-1">For serious tutors</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-bold text-5xl tracking-tighter">PKR 1,999</span>
              <span className="text-muted-foreground font-medium">/month</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>Unlimited bookings</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>Priority search placement</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>Analytics dashboard</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>Student progress tracker</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>Earnings trend charts</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>Featured profile badge</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>Custom availability windows</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>Priority support</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-8 flex flex-col gap-3">
            {isPro ? (
              <Button className="w-full h-14 rounded-xl text-md font-semibold" disabled>Current Plan</Button>
            ) : (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full h-14 rounded-xl text-md font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg text-white transition-all duration-200" data-testid="button-upgrade-trigger">Upgrade to Pro</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Complete Your Upgrade</DialogTitle>
                    <DialogDescription className="text-base">
                      You will be charged <span className="font-bold text-foreground">PKR 1,999</span> per month. Cancel anytime.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-6">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold">Select Payment Method</label>
                      <Select defaultValue="jazzcash">
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jazzcash">JazzCash</SelectItem>
                          <SelectItem value="easypaisa">EasyPaisa</SelectItem>
                          <SelectItem value="card">Credit/Debit Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="rounded-xl h-12" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpgrade} className="rounded-xl h-12 bg-indigo-600 hover:bg-indigo-700 font-bold px-8 shadow-md transition-all duration-200" data-testid="button-confirm-upgrade">Confirm Upgrade</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            {!isPro && (
              <p className="text-xs text-muted-foreground text-center font-medium mt-1">
                or <a href="#" className="underline hover:text-indigo-600 transition-colors">try free for 7 days</a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
