import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = ["Academic Exams", "Academic Subjects", "Computer Science", "AI & Technology", "Business & Career", "Marketing", "Finance", "Languages"];

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  category: z.string().min(1, "Please select a category"),
  subject: z.string().min(1, "Please select a subject"),
  type: z.enum(["pdf", "video", "notes", "practice-test"]),
  isFree: z.boolean(),
  price: z.number().optional().refine(val => {
    // If not free, price must be between 100 and 5000
    return true; 
  }),
  previewPages: z.array(z.number()).min(1, "Select at least 1 page for preview"),
});

export default function UploadResource() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      subject: "",
      type: "pdf",
      isFree: true,
      price: 0,
      previewPages: [1],
    },
  });

  const isFree = form.watch("isFree");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!file) {
      toast({ title: "Error", description: "Please upload a file first.", variant: "destructive" });
      return;
    }
    if (!values.isFree && (!values.price || values.price < 100 || values.price > 5000)) {
      form.setError("price", { type: "manual", message: "Price must be between PKR 100 and 5,000" });
      return;
    }
    toast({
      title: "Resource published!",
      description: "It's now visible in the Resource Hub.",
    });
    form.reset();
    setFile(null);
    setTags([]);
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload resource</h1>
        <p className="text-muted-foreground mt-1">Share your study materials and earn money.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b pb-2">1. upload file</h2>
            <div 
              className={`border-2 border-dashed rounded-xl p-10 text-center flex flex-col items-center justify-center transition-colors cursor-pointer ${file ? 'border-green-500 bg-green-50/10' : 'border-muted-foreground/25 hover:bg-muted/50'}`}
              onClick={() => {
                // Mock file selection
                setFile(new File([""], "my_notes.pdf", { type: "application/pdf" }));
              }}
              data-testid="dropzone-upload"
            >
              {file ? (
                <>
                  <CheckCircle2 className="h-10 w-10 text-green-500 mb-3" />
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">2.4 MB • Ready to upload</p>
                  <Button type="button" variant="link" size="sm" className="mt-2 text-destructive" onClick={(e) => { e.stopPropagation(); setFile(null); }}>Remove file</Button>
                </>
              ) : (
                <>
                  <UploadCloud className="h-10 w-10 text-muted-foreground mb-3" />
                  <p className="font-medium text-foreground">Drag your PDF here or click to browse</p>
                  <p className="text-sm text-muted-foreground mt-1">Supported: PDF, max 50MB</p>
                </>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b pb-2">2. resource details</h2>
            
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl><Input placeholder="e.g. Complete A-Level Physics Notes" {...field} data-testid="input-title" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea rows={4} placeholder="Describe what's included..." {...field} data-testid="input-desc" /></FormControl>
                <FormDescription>Minimum 50 characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid sm:grid-cols-2 gap-6">
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="subject" render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="space-y-2">
              <FormLabel>Tags</FormLabel>
              <Input 
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type a tag and press Enter"
                data-testid="input-tags"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(t => (
                  <Badge key={t} variant="secondary" className="px-2 py-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors" onClick={() => setTags(tags.filter(tag => tag !== t))}>
                    {t} ×
                  </Badge>
                ))}
              </div>
            </div>

            <FormField control={form.control} name="type" render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Resource Type</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="pdf" /></FormControl>
                      <FormLabel className="font-normal">PDF Document</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="video" /></FormControl>
                      <FormLabel className="font-normal">Video Course</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="notes" /></FormControl>
                      <FormLabel className="font-normal">Study Notes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl><RadioGroupItem value="practice-test" /></FormControl>
                      <FormLabel className="font-normal">Practice Test</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b pb-2">3. pricing</h2>
            
            <FormField control={form.control} name="isFree" render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup onValueChange={(v) => field.onChange(v === 'true')} value={field.value ? 'true' : 'false'} className="flex flex-col space-y-3">
                    <div className={`border rounded-2xl p-4 transition-colors ${field.value ? 'border-primary bg-primary/5' : ''}`}>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl><RadioGroupItem value="true" /></FormControl>
                        <FormLabel className="font-medium w-full cursor-pointer">Offer for free<span className="block text-sm font-normal text-muted-foreground mt-1">Great for building an audience</span></FormLabel>
                      </FormItem>
                    </div>
                    <div className={`border rounded-2xl p-4 transition-colors ${!field.value ? 'border-primary bg-primary/5' : ''}`}>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl><RadioGroupItem value="false" /></FormControl>
                        <FormLabel className="font-medium w-full cursor-pointer">Paid Resource<span className="block text-sm font-normal text-muted-foreground mt-1">Earn money from your hard work</span></FormLabel>
                      </FormItem>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )} />

            {!isFree && (
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (PKR)</FormLabel>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground font-medium">PKR</span>
                    <FormControl>
                      <Input type="number" placeholder="500" className="pl-12" {...field} onChange={e => field.onChange(parseInt(e.target.value))} data-testid="input-price" />
                    </FormControl>
                  </div>
                  <FormDescription>Creators keep 70% of each sale. EduConnect retains 30% as platform fee.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b pb-2">4. preview pages</h2>
            <FormLabel>Select preview pages to show to users before they buy</FormLabel>
            <div className="grid grid-cols-5 gap-4 mt-2">
              {[1, 2, 3, 4, 5].map(pageNum => (
                <FormField key={pageNum} control={form.control} name="previewPages" render={({ field }) => {
                  return (
                    <FormItem className="relative aspect-[3/4] border-2 rounded-xl overflow-hidden cursor-pointer">
                      <div className={`absolute inset-0 flex items-center justify-center transition-colors ${field.value?.includes(pageNum) ? 'bg-primary/20 border-primary' : 'bg-muted hover:bg-muted/80'}`}>
                        <FormControl>
                          <Checkbox 
                            checked={field.value?.includes(pageNum)}
                            onCheckedChange={(checked) => {
                              const current = field.value || [];
                              const updated = checked ? [...current, pageNum] : current.filter(p => p !== pageNum);
                              field.onChange(updated);
                            }}
                            className="absolute top-2 left-2 z-10"
                          />
                        </FormControl>
                        <span className="font-bold text-3xl opacity-20">Pg {pageNum}</span>
                      </div>
                    </FormItem>
                  )
                }} />
              ))}
            </div>
            {form.formState.errors.previewPages && <p className="text-[0.8rem] font-medium text-destructive">{form.formState.errors.previewPages.message}</p>}
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <Button type="button" variant="outline" className="flex-1" onClick={() => toast({ title: "Draft saved" })}>Save as Draft</Button>
            <Button type="submit" className="flex-1" data-testid="btn-publish">Publish Resource</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}