import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { ArrowLeft, Clock, Upload, CreditCard, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { consultants } from "@/lib/mock-data/consultants";

const schema = z.object({
  question: z.string().min(100, 'Please describe your question in at least 100 characters'),
});

type FormValues = z.infer<typeof schema>;

export default function AsyncConsultation() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const consultant = consultants.find(c => c.id === id) ?? consultants[0];

  const [payment, setPayment] = useState<'card' | 'easypaisa' | 'jazzcash'>('card');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { question: '' },
  });

  const questionLength = (watch('question') ?? '').length;

  const onSubmit = () => {
    setSubmitted(true);
    toast({ title: 'Question submitted!', description: 'Expect a response within 48 hours.' });
    setTimeout(() => navigate('/sessions'), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <Button variant="ghost" className="-ml-4 mb-6" asChild>
        <Link href={`/consultant/${consultant.id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-2">Async consultation</h1>
      <p className="text-muted-foreground mb-8">Submit your question in writing and receive a detailed response.</p>

      {/* Consultant info */}
      <Card className="mb-6 bg-card">
        <CardContent className="p-4 flex items-center gap-4">
          <Avatar className="h-14 w-14 border">
            <AvatarImage src={consultant.avatarUrl} />
            <AvatarFallback>{consultant.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold">{consultant.name}</div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {consultant.expertise.slice(0, 2).map(e => (
                <Badge key={e} variant="secondary" className="text-xs bg-amber-500/10 text-amber-700 border-amber-500/20">{e}</Badge>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-primary text-lg">PKR {consultant.packages.single.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Async Q&A</div>
          </div>
        </CardContent>
      </Card>

      {/* Expectation banner */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-6">
        <Clock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-amber-800 dark:text-amber-400 text-sm">Response within 48 hours</p>
          <p className="text-amber-700 dark:text-amber-500 text-xs mt-0.5">
            Your question will be reviewed personally by {consultant.name}. You will receive a detailed written response via the platform.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Question */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Your question <span className="text-destructive">*</span>
          </label>
          <Textarea
            {...register('question')}
            placeholder="Describe your question or situation in detail. The more context you provide, the more specific and actionable the response will be..."
            rows={8}
            data-testid="textarea-question"
            className={errors.question ? 'border-destructive' : ''}
          />
          <div className="flex justify-between items-center">
            {errors.question ? (
              <p className="text-xs text-destructive">{errors.question.message}</p>
            ) : (
              <p className="text-xs text-muted-foreground">Minimum 100 characters</p>
            )}
            <p className={`text-xs ${questionLength >= 100 ? 'text-green-600' : 'text-muted-foreground'}`}>
              {questionLength} / 100+
            </p>
          </div>
        </div>

        {/* Document upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Supporting document <span className="text-muted-foreground font-normal">(optional)</span></label>
          <div
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${fileUploaded ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-border hover:border-primary/50 bg-muted/30'}`}
            onClick={() => setFileUploaded(true)}
            data-testid="upload-zone"
          >
            {fileUploaded ? (
              <div className="flex flex-col items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-8 w-8" />
                <p className="text-sm font-medium">document_upload.pdf</p>
                <button type="button" className="text-xs text-muted-foreground hover:underline transition-all duration-200" onClick={e => { e.stopPropagation(); setFileUploaded(false); }}>Remove</button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Upload className="h-8 w-8" />
                <p className="text-sm font-medium">Upload a PDF, Word doc, or image</p>
                <p className="text-xs">Click to browse — max 10 MB</p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Payment */}
        <div className="space-y-3">
          <h3 className="font-semibold">Payment method</h3>
          {[
            { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
            { id: 'easypaisa', name: 'EasyPaisa', icon: () => <span className="font-bold text-green-600 text-xs">EP</span> },
            { id: 'jazzcash', name: 'JazzCash', icon: () => <span className="font-bold text-red-600 text-xs">JC</span> },
          ].map(method => (
            <div
              key={method.id}
              className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-colors ${payment === method.id ? 'border-primary bg-primary/5' : 'bg-card hover:bg-muted'}`}
              onClick={() => setPayment(method.id as typeof payment)}
              data-testid={`payment-${method.id}`}
            >
              <div className="flex items-center gap-3">
                <method.icon className="h-5 w-5" />
                <span className="font-medium">{method.name}</span>
              </div>
              <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${payment === method.id ? 'border-primary bg-primary' : ''}`}>
                {payment === method.id && <div className="h-2 w-2 bg-primary-foreground rounded-full" />}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-muted/50 p-4 rounded-2xl text-sm text-muted-foreground">
          This is a mock application. No real payment will be processed.
        </div>

        <Button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white transition-all duration-200"
          size="lg"
          disabled={submitted}
          data-testid="btn-submit-question"
        >
          {submitted
            ? 'Question Submitted — Redirecting...'
            : `Submit Question — PKR ${consultant.packages.single.toLocaleString()}`}
        </Button>
      </form>
    </div>
  );
}
