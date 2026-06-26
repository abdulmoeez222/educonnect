import { useState } from "react";
import { TrendingUp, Star, Eye, Zap, CheckCircle2, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const BENEFITS = [
  { icon: TrendingUp, text: 'Appear at the top of search results for your subject' },
  { icon: Eye, text: 'Bold "Featured" label on your profile card' },
  { icon: Star, text: '3× more profile views on average' },
  { icon: Zap, text: 'Priority placement in AI-recommended tutor lists' },
];

function MockBoostCard() {
  return (
    <Card className="border-2 border-amber-400 shadow-lg relative overflow-hidden max-w-sm mx-auto">
      <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400" />
      <div className="absolute top-3 right-3">
        <Badge className="bg-amber-500 text-white text-xs font-bold border-0">
          <Zap className="h-3 w-3 mr-1" /> Featured
        </Badge>
      </div>
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-14 w-14 rounded-full bg-muted overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=YourProfile" className="h-full w-full" alt="" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-bold">Your Name</p>
              <BadgeCheck className="h-4 w-4 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Biology · MDCAT Specialist</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-semibold">4.9</span>
              <span className="text-xs text-muted-foreground">(80 reviews)</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mb-3">
          {['MDCAT', 'Cell Biology', 'Genetics'].map(t => (
            <span key={t} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{t}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">From <strong className="text-foreground">PKR 1,500</strong>/hr</span>
          <Button size="sm" className="h-7 text-xs">Book Now</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FeaturedPlacement() {
  const { toast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handlePurchase = () => {
    setConfirmOpen(false);
    toast({ title: 'Featured Placement activated!', description: 'Your profile is now boosted for the next 30 days.' });
  };

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3 bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border-amber-200 dark:border-amber-800">
          <Zap className="h-3 w-3 mr-1" /> For Tutors & Consultants
        </Badge>
        <h1 className="text-3xl font-bold mb-2">Featured placement</h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Get your profile seen first. Featured tutors appear at the top of search results and receive 3× more booking requests.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Benefits */}
        <div className="space-y-4">
          <h2 className="font-bold text-base">What you get</h2>
          {BENEFITS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-2xl bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-amber-700 dark:text-amber-400" />
              </div>
              <p className="text-sm leading-relaxed mt-1">{text}</p>
            </div>
          ))}

          <Card className="mt-6 border-2 border-amber-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Featured Placement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-amber-600 dark:text-amber-400">PKR 4,000 <span className="text-sm font-normal text-muted-foreground">/month</span></p>
              <ul className="mt-3 space-y-1.5">
                {['30-day boost', 'Cancel any time', 'Instant activation', 'Analytics showing impression lift'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white transition-all duration-200" onClick={() => setConfirmOpen(true)} data-testid="btn-feature-purchase">
                <Zap className="mr-2 h-4 w-4" /> Activate Featured Placement
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Card preview */}
        <div>
          <h2 className="font-bold text-base mb-4">Preview — how your card looks when boosted</h2>
          <MockBoostCard />
          <p className="text-xs text-muted-foreground text-center mt-3">The amber badge and top-border appear on your card in all search results and recommendation feeds.</p>
        </div>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Featured Placement</DialogTitle>
            <DialogDescription>
              PKR 4,000 will be charged monthly to your default payment method (JazzCash). You can cancel at any time from your subscription settings.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white transition-all duration-200" onClick={handlePurchase} data-testid="btn-confirm-feature">
              Confirm — PKR 4,000/month
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
