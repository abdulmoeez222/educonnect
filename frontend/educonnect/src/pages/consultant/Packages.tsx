import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface PackageState {
  enabled: boolean;
  price: string;
  description: string;
  duration?: string;
  sessionsPerMonth?: string;
}

export default function ConsultantPackages() {
  const { toast } = useToast();

  const [single, setSingle] = useState<PackageState>({
    enabled: true,
    price: '2500',
    description: 'One focused session tailored to your immediate needs and goals.',
    duration: '60',
  });
  const [threePack, setThreePack] = useState<PackageState>({
    enabled: true,
    price: '7000',
    description: 'Three structured sessions for sustained progress on your goals.',
  });
  const [retainer, setRetainer] = useState<PackageState>({
    enabled: false,
    price: '18000',
    description: 'Ongoing monthly support with priority access and async availability.',
    sessionsPerMonth: '4',
  });

  const perSessionPrice = threePack.price ? Math.round(Number(threePack.price) / 3) : 0;

  const handleSave = () => {
    toast({ title: 'Package settings saved', description: 'Your package options are updated on your public profile.' });
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-in fade-in duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Package builder</h1>
        <p className="text-muted-foreground">Configure what clients see when they visit your profile.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Single Session */}
        <Card className={`rounded-2xl border-2 space-y-4 flex flex-col ${single.enabled ? 'bg-card' : 'opacity-60 bg-muted/20'}`}>
          <div className="p-6 pb-0 flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Single Session</CardTitle>
            <Switch checked={single.enabled} onCheckedChange={v => setSingle(p => ({ ...p, enabled: v }))} data-testid="toggle-single" />
          </div>
          <CardContent className="p-6 pt-0 space-y-5 flex-1 flex flex-col">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Price</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">PKR</span>
                <Input 
                  type="number" 
                  value={single.price} 
                  onChange={e => setSingle(p => ({ ...p, price: e.target.value }))} 
                  disabled={!single.enabled} 
                  className="h-12 rounded-xl border-2 pl-12 text-xl font-bold focus:border-amber-500"
                  data-testid="input-single-price" 
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Duration</Label>
              <Select value={single.duration} onValueChange={v => setSingle(p => ({ ...p, duration: v }))} disabled={!single.enabled}>
                <SelectTrigger className="h-12 rounded-xl border-2 focus:border-amber-500" data-testid="select-single-duration"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1.5 flex-1">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 flex justify-between">
                <span>Description</span>
              </Label>
              <Textarea 
                value={single.description} 
                onChange={e => setSingle(p => ({ ...p, description: e.target.value.substring(0, 120) }))} 
                disabled={!single.enabled} 
                className="rounded-xl border-2 min-h-[80px] resize-none text-sm focus:border-amber-500"
                data-testid="input-single-desc" 
              />
              <p className="text-xs text-muted-foreground text-right mt-1">{single.description.length}/120 chars</p>
            </div>
          </CardContent>
        </Card>

        {/* 3-Session Pack */}
        <Card className={`relative rounded-2xl border-2 space-y-4 flex flex-col ${threePack.enabled ? 'border-amber-400 ring-2 ring-amber-200/50 dark:ring-amber-800/50 bg-card' : 'opacity-60 bg-muted/20 border-border'}`}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white rounded-full px-4 py-1 text-xs font-bold whitespace-nowrap shadow-sm">
            Best Value
          </div>
          <div className="p-6 pb-0 flex items-center justify-between pt-8">
            <CardTitle className="text-lg font-bold">3-Session Pack</CardTitle>
            <Switch checked={threePack.enabled} onCheckedChange={v => setThreePack(p => ({ ...p, enabled: v }))} data-testid="toggle-three-pack" />
          </div>
          <CardContent className="p-6 pt-0 space-y-5 flex-1 flex flex-col">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Bundle Price</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">PKR</span>
                <Input 
                  type="number" 
                  value={threePack.price} 
                  onChange={e => setThreePack(p => ({ ...p, price: e.target.value }))} 
                  disabled={!threePack.enabled} 
                  className="h-12 rounded-xl border-2 pl-12 text-xl font-bold focus:border-amber-500"
                  data-testid="input-three-pack-price" 
                />
              </div>
              {threePack.price && <p className="text-xs text-amber-600 font-semibold mt-1">PKR {perSessionPrice.toLocaleString()} per session</p>}
            </div>
            
            <div className="space-y-1.5 flex-1">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 flex justify-between">
                <span>Description</span>
              </Label>
              <Textarea 
                value={threePack.description} 
                onChange={e => setThreePack(p => ({ ...p, description: e.target.value.substring(0, 120) }))} 
                disabled={!threePack.enabled} 
                className="rounded-xl border-2 min-h-[80px] resize-none text-sm focus:border-amber-500"
                data-testid="input-three-pack-desc" 
              />
              <p className="text-xs text-muted-foreground text-right mt-1">{threePack.description.length}/120 chars</p>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Retainer */}
        <Card className={`rounded-2xl border-2 space-y-4 flex flex-col ${retainer.enabled ? 'bg-card' : 'opacity-60 bg-muted/20'}`}>
          <div className="p-6 pb-0 flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Monthly Retainer</CardTitle>
            <Switch checked={retainer.enabled} onCheckedChange={v => setRetainer(p => ({ ...p, enabled: v }))} data-testid="toggle-retainer" />
          </div>
          <CardContent className="p-6 pt-0 space-y-5 flex-1 flex flex-col">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Monthly Price</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">PKR</span>
                <Input 
                  type="number" 
                  value={retainer.price} 
                  onChange={e => setRetainer(p => ({ ...p, price: e.target.value }))} 
                  disabled={!retainer.enabled} 
                  className="h-12 rounded-xl border-2 pl-12 text-xl font-bold focus:border-amber-500"
                  data-testid="input-retainer-price" 
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">Sessions/mo</Label>
              <Select value={retainer.sessionsPerMonth} onValueChange={v => setRetainer(p => ({ ...p, sessionsPerMonth: v }))} disabled={!retainer.enabled}>
                <SelectTrigger className="h-12 rounded-xl border-2 focus:border-amber-500" data-testid="select-sessions-per-month"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 sessions</SelectItem>
                  <SelectItem value="4">4 sessions</SelectItem>
                  <SelectItem value="8">8 sessions</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1.5 flex-1">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 flex justify-between">
                <span>Description</span>
              </Label>
              <Textarea 
                value={retainer.description} 
                onChange={e => setRetainer(p => ({ ...p, description: e.target.value.substring(0, 120) }))} 
                disabled={!retainer.enabled} 
                className="rounded-xl border-2 min-h-[80px] resize-none text-sm focus:border-amber-500"
                data-testid="input-retainer-desc" 
              />
              <p className="text-xs text-muted-foreground text-right mt-1">{retainer.description.length}/120 chars</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end mt-8">
        <Button onClick={handleSave} className="h-12 px-8 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-base shadow-sm transition-all duration-200" data-testid="btn-save-packages">
          Save Package Settings
        </Button>
      </div>
    </div>
  );
}
