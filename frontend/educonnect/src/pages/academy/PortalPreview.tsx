import { useState } from "react";
import { Eye, GraduationCap, BookOpen, CalendarDays, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ACCENT_PRESETS = [
  { name: 'Royal Blue', value: '#1D4ED8' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Amber', value: '#D97706' },
  { name: 'Purple', value: '#7C3AED' },
  { name: 'Rose', value: '#E11D48' },
];

export default function PortalPreview() {
  const { toast } = useToast();
  const [academyName, setAcademyName] = useState('Lahore Medical Academy');
  const [tagline, setTagline] = useState('Pakistan\'s Premier MDCAT Preparation Institute');
  const [accent, setAccent] = useState('#1D4ED8');

  const NAV_ITEMS = [
    { icon: Home, label: 'Home' },
    { icon: BookOpen, label: 'My Subjects' },
    { icon: CalendarDays, label: 'Sessions' },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Config panel */}
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Branded portal preview</h1>
          <p className="text-muted-foreground">Customise how your students see the platform. Changes preview instantly.</p>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label>Academy name</Label>
            <Input value={academyName} onChange={e => setAcademyName(e.target.value)} data-testid="input-academy-name" />
          </div>
          <div className="space-y-1.5">
            <Label>Tagline</Label>
            <Input value={tagline} onChange={e => setTagline(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Brand accent colour</Label>
            <div className="flex gap-2 flex-wrap">
              {ACCENT_PRESETS.map(p => (
                <button
                  key={p.value}
                  onClick={() => setAccent(p.value)}
                  className={`h-8 w-8 rounded-full border-2 transition-all ${accent === p.value ? 'scale-110 border-foreground' : 'border-transparent'}`}
                  style={{ backgroundColor: p.value }}
                  title={p.name}
                  data-testid={`accent-${p.name.toLowerCase().replace(' ', '-')}`}
                />
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accent}
                  onChange={e => setAccent(e.target.value)}
                  className="h-8 w-8 rounded cursor-pointer border border-border"
                />
                <span className="text-xs text-muted-foreground">{accent}</span>
              </div>
            </div>
          </div>
          <Button
            className="w-full"
            onClick={() => toast({ title: 'Portal settings saved', description: 'Changes will reflect for all students within 5 minutes.' })}
            data-testid="btn-save-portal"
          >
            Save Portal Settings
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            White-labelling is available on the Academy Enterprise plan.
          </p>
        </div>
      </div>

      {/* Live preview */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Eye className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Student view preview</span>
        </div>

        <div className="rounded-2xl border-2 shadow-xl overflow-hidden bg-background" style={{ borderColor: accent + '40' }}>
          {/* Preview header */}
          <div className="flex items-center gap-3 px-5 py-3 border-b" style={{ backgroundColor: accent + '10' }}>
            <GraduationCap className="h-5 w-5" style={{ color: accent }} />
            <div>
              <p className="font-bold text-sm leading-tight" style={{ color: accent }}>{academyName || 'Academy Name'}</p>
              <p className="text-[10px] text-muted-foreground">{tagline}</p>
            </div>
          </div>

          {/* Preview nav */}
          <div className="flex items-center gap-1 px-3 py-2 border-b bg-muted/30">
            {NAV_ITEMS.map((item, i) => (
              <div key={item.label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs ${i === 0 ? 'font-semibold text-white' : 'text-muted-foreground'}`}
                style={i === 0 ? { backgroundColor: accent } : {}}>
                <item.icon className="h-3 w-3" />
                {item.label}
              </div>
            ))}
          </div>

          {/* Preview content */}
          <div className="p-5 space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Welcome back</p>
              <p className="font-bold text-base">Hamza Khan</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Sessions', 'Subjects'].map((label, i) => (
                <div key={label} className="rounded-2xl p-3 text-center border" style={{ borderColor: accent + '30', backgroundColor: accent + '08' }}>
                  <p className="text-lg font-bold" style={{ color: accent }}>{[8, 4][i]}</p>
                  <p className="text-[10px] text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Upcoming Sessions</p>
              {['Biology with Dr. Ayesha — Today 3PM', 'Chemistry with Usman — Tomorrow 4PM'].map(s => (
                <div key={s} className="flex items-center gap-2 text-xs py-2 border-b last:border-0">
                  <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                  {s}
                </div>
              ))}
            </div>
            <div className="rounded-2xl px-4 py-2.5 text-xs text-center font-medium text-white" style={{ backgroundColor: accent }}>
              View All Sessions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
