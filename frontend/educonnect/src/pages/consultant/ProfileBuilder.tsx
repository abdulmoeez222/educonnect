import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Camera, Globe, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const EXPERTISE_OPTIONS = [
  'MDCAT Strategy', 'Career Counseling', 'University Admissions', 'Study Abroad',
  'CSS Preparation', 'Freelancing', 'Digital Marketing', 'Startup Advice',
  'Finance & Investment', 'Life & Mindset', 'Tech & Coding', 'Influencer Strategy',
];

const INDUSTRY_OPTIONS = [
  'Education', 'Healthcare', 'Technology', 'Finance', 'Marketing', 'Media', 'Law', 'Engineering',
];

const FORMAT_OPTIONS = [
  { id: 'video', label: 'Video Call' },
  { id: 'async-qa', label: 'Async Q&A (Written)' },
  { id: 'document-review', label: 'Document Review' },
];

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
  portfolioLink: z.string().url('Enter a valid URL').or(z.literal('')).optional(),
  singlePrice: z.string().min(1, 'Enter a price'),
  threePackPrice: z.string().optional(),
  retainerPrice: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ConsultantProfileBuilder() {
  const { toast } = useToast();
  const [expertise, setExpertise] = useState<string[]>(['Career Counseling']);
  const [industries, setIndustries] = useState<string[]>(['Education']);
  const [formats, setFormats] = useState<string[]>(['video']);
  const [enableThreePack, setEnableThreePack] = useState(false);
  const [enableRetainer, setEnableRetainer] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: 'Hamza Khan', bio: '', portfolioLink: '', singlePrice: '2500' },
  });

  const bioLength = (watch('bio') ?? '').length;

  const toggleExpertise = (tag: string) => {
    setExpertise(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };
  const toggleIndustry = (ind: string) => {
    setIndustries(prev => prev.includes(ind) ? prev.filter(i => i !== ind) : [...prev, ind]);
  };
  const toggleFormat = (fmt: string) => {
    setFormats(prev => prev.includes(fmt) ? prev.filter(f => f !== fmt) : [...prev, fmt]);
  };

  const onPublish = handleSubmit(() => {
    if (expertise.length === 0) { toast({ title: 'Select at least one expertise tag', variant: 'destructive' }); return; }
    if (formats.length === 0) { toast({ title: 'Select at least one session format', variant: 'destructive' }); return; }
    toast({ title: 'Profile published!', description: 'Students can now book consultations with you.' });
  });

  const onDraft = () => {
    toast({ title: 'Draft saved', description: 'Your profile has been saved as a draft.' });
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Consultant profile</h1>
        <p className="text-muted-foreground">Set up your public profile so students can discover and book you.</p>
      </div>

      <div className="space-y-8">
        {/* About */}
        <Card>
          <CardHeader><CardTitle>About</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center border-2 border-dashed border-amber-400 cursor-pointer hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors" data-testid="btn-upload-photo">
                <Camera className="h-7 w-7 text-amber-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Profile Photo</p>
                <p className="text-xs text-muted-foreground">Click to upload. JPG or PNG, max 5 MB.</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...register('name')} data-testid="input-name" />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="bio">Bio <span className="text-destructive">*</span></Label>
              <Textarea id="bio" {...register('bio')} rows={5} placeholder="Introduce yourself — your background, what you help clients achieve, and what makes your approach unique..." data-testid="input-bio" />
              <div className="flex justify-between">
                {errors.bio ? <p className="text-xs text-destructive">{errors.bio.message}</p> : <span />}
                <p className={`text-xs ${bioLength >= 50 ? 'text-green-600' : 'text-muted-foreground'}`}>{bioLength} / 50+</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expertise */}
        <Card>
          <CardHeader><CardTitle>Expertise Tags</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Select all that apply. Shown prominently on your profile and used for discovery.</p>
            <div className="flex flex-wrap gap-2">
              {EXPERTISE_OPTIONS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleExpertise(tag)}
                  data-testid={`expertise-${tag}`}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${expertise.includes(tag) ? 'bg-amber-600 text-white border-amber-600' : 'bg-card border-border hover:border-amber-500 text-foreground'}`}
                >
                  {expertise.includes(tag) && <span className="mr-1">✓</span>}{tag}
                </button>
              ))}
            </div>
            {expertise.length === 0 && <p className="text-xs text-destructive mt-2">Select at least one expertise tag</p>}
          </CardContent>
        </Card>

        {/* Background */}
        <Card>
          <CardHeader><CardTitle>Background</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <div>
              <Label className="mb-2 block">Industries</Label>
              <div className="flex flex-wrap gap-2">
                {INDUSTRY_OPTIONS.map(ind => (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => toggleIndustry(ind)}
                    data-testid={`industry-${ind}`}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${industries.includes(ind) ? 'bg-primary text-white border-primary' : 'bg-card border-border hover:border-primary/50 text-foreground'}`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="portfolioLink">
                <Globe className="inline h-3.5 w-3.5 mr-1" />Portfolio / LinkedIn URL <span className="text-muted-foreground font-normal text-xs">(optional)</span>
              </Label>
              <Input id="portfolioLink" {...register('portfolioLink')} placeholder="https://linkedin.com/in/yourname" data-testid="input-portfolio" />
              {errors.portfolioLink && <p className="text-xs text-destructive">{errors.portfolioLink.message}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Session Formats */}
        <Card>
          <CardHeader><CardTitle>Session Formats</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {FORMAT_OPTIONS.map(fmt => (
              <div
                key={fmt.id}
                className={`flex items-center justify-between p-3 border rounded-2xl cursor-pointer transition-colors ${formats.includes(fmt.id) ? 'border-primary bg-primary/5' : 'hover:bg-muted'}`}
                onClick={() => toggleFormat(fmt.id)}
                data-testid={`format-${fmt.id}`}
              >
                <span className="font-medium text-sm">{fmt.label}</span>
                <div className={`h-5 w-5 rounded border flex items-center justify-center transition-colors ${formats.includes(fmt.id) ? 'bg-primary border-primary' : 'border-border'}`}>
                  {formats.includes(fmt.id) && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                </div>
              </div>
            ))}
            {formats.length === 0 && <p className="text-xs text-destructive">Select at least one format</p>}
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <Label>Single Session Price (PKR) <span className="text-destructive">*</span></Label>
              <Input type="number" {...register('singlePrice')} placeholder="2500" data-testid="input-single-price" />
              {errors.singlePrice && <p className="text-xs text-destructive">{errors.singlePrice.message}</p>}
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Enable 3-Session Pack</p>
                <p className="text-xs text-muted-foreground">Offer a discounted bundle price</p>
              </div>
              <Switch checked={enableThreePack} onCheckedChange={setEnableThreePack} data-testid="toggle-three-pack" />
            </div>
            {enableThreePack && (
              <div className="space-y-1.5 ml-0">
                <Label>3-Pack Bundle Price (PKR)</Label>
                <Input type="number" {...register('threePackPrice')} placeholder="7000" data-testid="input-three-pack-price" />
              </div>
            )}

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Enable Monthly Retainer</p>
                <p className="text-xs text-muted-foreground">Ongoing monthly engagement</p>
              </div>
              <Switch checked={enableRetainer} onCheckedChange={setEnableRetainer} data-testid="toggle-retainer" />
            </div>
            {enableRetainer && (
              <div className="space-y-1.5">
                <Label>Monthly Retainer Price (PKR)</Label>
                <Input type="number" {...register('retainerPrice')} placeholder="18000" data-testid="input-retainer-price" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" type="button" onClick={onDraft} data-testid="btn-save-draft">Save Draft</Button>
          <Button type="button" onClick={onPublish} className="bg-amber-600 hover:bg-amber-700 text-white transition-all duration-200" data-testid="btn-publish">Publish Profile</Button>
        </div>
      </div>
    </div>
  );
}
