import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Check, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SUBJECTS_LIST = [
  "MDCAT Biology", "MDCAT Chemistry", "MDCAT Physics", 
  "ECAT Math", "ECAT Physics", 
  "O-Level Math", "O-Level Physics", "O-Level Chemistry", 
  "A-Level Biology", "A-Level Math", "A-Level Economics", 
  "English", "Computer Science", "OOP", "DSA"
];

const LANGUAGES_LIST = ["Urdu", "English", "Sindhi", "Punjabi"];

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  location: z.string().min(1, "Location is required"),
  subjects: z.array(z.string()).min(1, "Select at least one subject"),
  qualification: z.string().min(1, "Qualification is required"),
  hourlyRate: z.coerce.number().min(500, "Minimum rate is 500").max(5000, "Maximum rate is 5000"),
  sessionFormat: z.enum(["online", "in-person", "both"]),
  languages: z.array(z.string()).min(1, "Select at least one language"),
});

export default function ProfileBuilder() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "John Doe",
      bio: "",
      location: "",
      subjects: [],
      qualification: "",
      hourlyRate: 1500,
      sessionFormat: "online",
      languages: ["Urdu"],
    },
  });

  const watchAllFields = form.watch();

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await form.trigger(["name", "bio", "location"]);
    } else if (step === 2) {
      isValid = await form.trigger(["subjects", "qualification"]);
    } else if (step === 3) {
      isValid = await form.trigger(["hourlyRate", "sessionFormat", "languages"]);
    }
    
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast({
      title: "Profile published!",
      description: "You're now visible to students.",
    });
    setLocation("/profile");
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-in fade-in duration-300">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Build your tutor profile</h1>
        <p className="text-muted-foreground">Complete your profile to start receiving booking requests.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start mt-8">
        <div className="flex-1 max-w-xl">
          <div className="flex justify-between items-center mb-8 relative">
            <div className="absolute left-0 top-1/2 w-full h-1 bg-muted -z-10 -translate-y-1/2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-in-out" 
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
            </div>
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                  step >= i ? "bg-primary border-primary text-primary-foreground" : "bg-card border-muted text-muted-foreground"
                }`}
              >
                {step > i ? <Check className="h-5 w-5" /> : i}
              </div>
            ))}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              
              {/* Step 1 */}
              <div className={step === 1 ? "block" : "hidden"}>
                <div className="bg-card rounded-2xl border p-6 space-y-5 mb-6">
                  <div className="text-lg font-bold mb-5 flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-primary/10 text-primary text-sm font-black flex items-center justify-center">1</div>
                    About You
                  </div>
                  
                  <div className="border-2 border-dashed border-primary/30 rounded-2xl p-10 text-center hover:border-primary/60 hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center">
                    <UploadCloud className="h-12 w-12 text-primary/40 mb-3" />
                    <p className="text-sm text-muted-foreground">Click to upload your professional photo</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Recommended size: 400x400px (JPG or PNG)</p>
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input className="h-11 rounded-xl border-2 focus:border-primary" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 rounded-xl border-2 focus:border-primary" data-testid="select-location">
                              <SelectValue placeholder="Select your city" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Karachi">Karachi</SelectItem>
                            <SelectItem value="Lahore">Lahore</SelectItem>
                            <SelectItem value="Islamabad">Islamabad</SelectItem>
                            <SelectItem value="Rawalpindi">Rawalpindi</SelectItem>
                            <SelectItem value="Peshawar">Peshawar</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell students about your teaching experience and methodology..." 
                            className="min-h-[120px] rounded-xl border-2 focus:border-primary p-3"
                            {...field} 
                            data-testid="textarea-bio"
                          />
                        </FormControl>
                        <FormDescription>Minimum 50 characters.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Step 2 */}
              <div className={step === 2 ? "block" : "hidden"}>
                <div className="bg-card rounded-2xl border p-6 space-y-5 mb-6">
                  <div className="text-lg font-bold mb-5 flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-primary/10 text-primary text-sm font-black flex items-center justify-center">2</div>
                    Subjects & Qualifications
                  </div>

                  <FormField
                    control={form.control}
                    name="subjects"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subjects Taught</FormLabel>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value?.map((subject) => (
                            <div key={subject} className="bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1.5">
                              {subject}
                              <X 
                                className="h-3.5 w-3.5 hover:text-destructive cursor-pointer transition-all duration-200" 
                                onClick={() => field.onChange(field.value.filter(s => s !== subject))}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="mt-4">
                          <Select onValueChange={(val) => {
                            if (!field.value.includes(val)) field.onChange([...field.value, val])
                          }}>
                            <SelectTrigger className="h-11 rounded-xl border-2 focus:border-primary">
                              <SelectValue placeholder="Add a subject..." />
                            </SelectTrigger>
                            <SelectContent>
                              {SUBJECTS_LIST.filter(s => !field.value.includes(s)).map(s => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="qualification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Highest Qualification</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 rounded-xl border-2 focus:border-primary" data-testid="select-qualification">
                              <SelectValue placeholder="Select qualification" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                            <SelectItem value="Master">Master's Degree</SelectItem>
                            <SelectItem value="PhD">PhD</SelectItem>
                            <SelectItem value="Medical Graduate">Medical Graduate</SelectItem>
                            <SelectItem value="Engineering Graduate">Engineering Graduate</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-5 mt-6">
                    <FormLabel className="mb-3 block text-indigo-900 dark:text-indigo-200">MDCAT/ECAT Score Card (Optional)</FormLabel>
                    <div className="border-dashed border-2 border-indigo-300 dark:border-indigo-700 rounded-xl p-5 text-center text-sm cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors flex flex-col items-center justify-center">
                      <UploadCloud className="h-8 w-8 text-indigo-400 mb-2" />
                      <p className="font-medium text-indigo-900 dark:text-indigo-200">Click to upload score card</p>
                      <p className="text-indigo-600/70 dark:text-indigo-400/70 mt-1">PNG, JPG or PDF (max. 5MB)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className={step === 3 ? "block" : "hidden"}>
                <div className="bg-card rounded-2xl border p-6 space-y-5 mb-6">
                  <div className="text-lg font-bold mb-5 flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-primary/10 text-primary text-sm font-black flex items-center justify-center">3</div>
                    Pricing & Availability
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="hourlyRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hourly Rate (PKR)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">PKR</span>
                            <Input 
                              type="number" 
                              className="pl-14 h-11 rounded-xl border-2 focus:border-primary" 
                              {...field} 
                              data-testid="input-rate"
                            />
                          </div>
                        </FormControl>
                        <FormDescription>Between 500 and 5000 PKR per hour.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sessionFormat"
                    render={({ field }) => (
                      <FormItem className="space-y-4 pt-2">
                        <FormLabel>Session Format</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-3"
                            data-testid="radio-format"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 p-3 border-2 rounded-xl focus-within:border-primary hover:border-primary/50 cursor-pointer transition-colors">
                              <FormControl>
                                <RadioGroupItem value="online" />
                              </FormControl>
                              <FormLabel className="font-medium cursor-pointer w-full h-full">Online Only</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 p-3 border-2 rounded-xl focus-within:border-primary hover:border-primary/50 cursor-pointer transition-colors">
                              <FormControl>
                                <RadioGroupItem value="in-person" />
                              </FormControl>
                              <FormLabel className="font-medium cursor-pointer w-full h-full">In-Person Only</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 p-3 border-2 rounded-xl focus-within:border-primary hover:border-primary/50 cursor-pointer transition-colors">
                              <FormControl>
                                <RadioGroupItem value="both" />
                              </FormControl>
                              <FormLabel className="font-medium cursor-pointer w-full h-full">Both Online & In-Person</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="languages"
                    render={() => (
                      <FormItem className="pt-2">
                        <FormLabel>Languages Spoken</FormLabel>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {LANGUAGES_LIST.map((lang) => (
                            <FormField
                              key={lang}
                              control={form.control}
                              name="languages"
                              render={({ field }) => {
                                return (
                                  <FormItem key={lang} className="flex flex-row items-start space-x-3 space-y-0 p-3 border-2 rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(lang)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, lang])
                                            : field.onChange(
                                                field.value?.filter((value) => value !== lang)
                                              )
                                        }}
                                        disabled={lang === "Urdu" && field.value?.length === 1 && field.value?.includes("Urdu")}
                                        data-testid={`checkbox-lang-${lang}`}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-medium cursor-pointer">{lang}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Step 4 */}
              <div className={step === 4 ? "block" : "hidden"}>
                <div className="bg-card rounded-2xl border p-6 space-y-5 mb-6">
                  <div className="text-lg font-bold mb-5 flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-primary/10 text-primary text-sm font-black flex items-center justify-center">4</div>
                    Review & Publish
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-xl flex gap-3 text-green-800 dark:text-green-300">
                      <Check className="h-5 w-5 shrink-0 mt-0.5" />
                      <div className="text-sm">Your profile looks great! You're almost ready to start receiving students. Please verify the information below.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-8">
                {step > 1 ? (
                  <Button type="button" variant="outline" className="h-12 rounded-xl font-semibold px-8 border-2" onClick={prevStep} data-testid="button-prev">
                    Back
                  </Button>
                ) : (
                  <div /> // Spacer
                )}

                {step < 4 ? (
                  <Button type="button" className="h-12 rounded-xl font-semibold px-8" onClick={nextStep} data-testid="button-next">
                    Continue Step {step}/3
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" className="h-12 rounded-xl font-semibold px-6 border-2" onClick={() => toast({ description: "Draft saved!" })} data-testid="button-save-draft">
                      Save Draft
                    </Button>
                    <Button type="submit" className="h-12 rounded-xl font-semibold px-8 shadow-md" data-testid="button-publish">
                      Publish Profile
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </Form>
        </div>

        {/* Live Preview Panel (Desktop) */}
        <div className="w-80 shrink-0 hidden lg:block sticky top-24">
          <h3 className="font-bold text-muted-foreground uppercase tracking-wider text-xs mb-4 px-2">Live preview</h3>
          <div className="bg-card rounded-3xl border-2 overflow-hidden shadow-xl shadow-primary/5">
            <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            <div className="px-6 pb-6 relative">
              <Avatar className="w-20 h-20 border-4 border-card shadow-sm absolute -top-10 left-6">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=tutor" />
                <AvatarFallback>TU</AvatarFallback>
              </Avatar>
              
              <div className="pt-12">
                <h2 className="text-xl font-bold truncate">{watchAllFields.name || "Your Name"}</h2>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1 truncate">
                  {watchAllFields.location || "City, Pakistan"}
                </p>
                
                <div className="mt-4 pt-4 border-t border-dashed">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">Subjects</div>
                  <div className="flex flex-wrap gap-1.5">
                    {watchAllFields.subjects.length > 0 ? (
                      watchAllFields.subjects.map((sub, i) => i < 3 ? (
                        <Badge key={sub} variant="secondary" className="text-[10px] py-0.5 px-2">{sub}</Badge>
                      ) : null)
                    ) : (
                      <Badge variant="secondary" className="text-[10px] py-0.5 px-2 text-muted-foreground/50 border-dashed">Select subjects</Badge>
                    )}
                    {watchAllFields.subjects.length > 3 && (
                      <Badge variant="secondary" className="text-[10px] py-0.5 px-2">+{watchAllFields.subjects.length - 3}</Badge>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-dashed flex justify-between items-end">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Rate</div>
                    <div className="font-bold text-primary">Rs {watchAllFields.hourlyRate}/hr</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Format</div>
                    <div className="text-sm font-medium capitalize">{watchAllFields.sessionFormat}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
