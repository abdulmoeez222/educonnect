import { useState } from "react";
import { GripVertical, Trash2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type QuestionType = 'short-text' | 'long-text' | 'multiple-choice';

interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  required: boolean;
}

const initQuestions: Question[] = [
  { id: 'q1', type: 'long-text', question: 'What specific challenge or goal would you like to discuss?', options: [], required: true },
  { id: 'q2', type: 'multiple-choice', question: 'Have you worked with a consultant before?', options: ['Yes', 'No', 'Somewhat'], required: false },
  { id: 'q3', type: 'short-text', question: 'What is your timeline for achieving this goal?', options: [], required: true },
];

const TYPE_LABELS: Record<QuestionType, string> = {
  'short-text': 'Short Text',
  'long-text': 'Long Text',
  'multiple-choice': 'Multiple Choice',
};

export default function IntakeFormBuilder() {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>(initQuestions);

  const addQuestion = () => {
    setQuestions(prev => [...prev, {
      id: `q${Date.now()}`,
      type: 'short-text',
      question: '',
      options: [],
      required: false,
    }]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, patch: Partial<Question>) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...patch } : q));
  };

  const addOption = (id: string) => {
    setQuestions(prev => prev.map(q =>
      q.id === id ? { ...q, options: [...q.options, `Option ${q.options.length + 1}`] } : q
    ));
  };

  const updateOption = (qId: string, idx: number, value: string) => {
    setQuestions(prev => prev.map(q =>
      q.id === qId ? { ...q, options: q.options.map((o, i) => i === idx ? value : o) } : q
    ));
  };

  const removeOption = (qId: string, idx: number) => {
    setQuestions(prev => prev.map(q =>
      q.id === qId ? { ...q, options: q.options.filter((_, i) => i !== idx) } : q
    ));
  };

  const handleSave = () => {
    toast({ title: 'Intake form saved', description: 'Clients will see these questions when booking.' });
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Intake form builder</h1>
        <p className="text-muted-foreground">Clients will fill this out before booking a session with you.</p>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <Card key={q.id} className="border-border" data-testid={`question-card-${q.id}`}>
            <CardContent className="p-4 space-y-4">
              {/* Header */}
              <div className="flex items-start gap-3">
                <GripVertical className="h-5 w-5 text-muted-foreground mt-2 shrink-0 cursor-grab" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs font-normal">Q{idx + 1}</Badge>
                    <Select value={q.type} onValueChange={v => updateQuestion(q.id, { type: v as QuestionType, options: v === 'multiple-choice' && q.options.length === 0 ? ['Option 1', 'Option 2'] : q.options })}>
                      <SelectTrigger className="h-7 w-40 text-xs" data-testid={`select-type-${q.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short-text">Short Text</SelectItem>
                        <SelectItem value="long-text">Long Text</SelectItem>
                        <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Input
                      value={q.question}
                      onChange={e => updateQuestion(q.id, { question: e.target.value })}
                      placeholder="Enter your question..."
                      data-testid={`input-question-${q.id}`}
                    />
                  </div>

                  {/* Multiple choice options */}
                  {q.type === 'multiple-choice' && (
                    <div className="mt-3 space-y-2">
                      <Label className="text-xs text-muted-foreground">Options</Label>
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full border border-muted-foreground shrink-0" />
                          <Input
                            value={opt}
                            onChange={e => updateOption(q.id, optIdx, e.target.value)}
                            className="h-8 text-sm"
                            data-testid={`option-${q.id}-${optIdx}`}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive transition-all duration-200"
                            onClick={() => removeOption(q.id, optIdx)}
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-muted-foreground"
                        onClick={() => addOption(q.id)}
                        data-testid={`btn-add-option-${q.id}`}
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add option
                      </Button>
                    </div>
                  )}

                  {/* Short / Long text preview */}
                  {q.type === 'short-text' && (
                    <div className="mt-2 h-8 rounded border border-dashed border-border bg-muted/30 flex items-center px-3">
                      <span className="text-xs text-muted-foreground">Short answer input</span>
                    </div>
                  )}
                  {q.type === 'long-text' && (
                    <div className="mt-2 h-16 rounded border border-dashed border-border bg-muted/30 flex items-start p-3">
                      <span className="text-xs text-muted-foreground">Long answer textarea</span>
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0 transition-all duration-200"
                  onClick={() => removeQuestion(q.id)}
                  data-testid={`btn-delete-${q.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t pt-3">
                <span className="text-xs text-muted-foreground">{TYPE_LABELS[q.type]}</span>
                <div className="flex items-center gap-2">
                  <Label htmlFor={`req-${q.id}`} className="text-xs text-muted-foreground cursor-pointer">Required</Label>
                  <Switch
                    id={`req-${q.id}`}
                    checked={q.required}
                    onCheckedChange={v => updateQuestion(q.id, { required: v })}
                    data-testid={`toggle-required-${q.id}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed"
          onClick={addQuestion}
          data-testid="btn-add-question"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Question
        </Button>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700 text-white transition-all duration-200" data-testid="btn-save-form">
            Save Intake Form
          </Button>
        </div>
      </div>
    </div>
  );
}
