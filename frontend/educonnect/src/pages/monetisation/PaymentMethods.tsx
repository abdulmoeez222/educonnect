import { useState } from "react";
import { Plus, Star, Trash2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethod {
  id: string;
  type: 'jazzcash' | 'easypaisa' | 'card';
  label: string;
  detail: string;
  isDefault: boolean;
}

const METHOD_ICONS: Record<string, string> = { jazzcash: 'JC', easypaisa: 'EP', card: '💳' };

const INITIAL_METHODS: PaymentMethod[] = [
  { id: 'pm-1', type: 'jazzcash', label: 'JazzCash', detail: '0301-2345678', isDefault: true },
  { id: 'pm-2', type: 'easypaisa', label: 'EasyPaisa', detail: '0312-9876543', isDefault: false },
];

export default function PaymentMethods() {
  const { toast } = useToast();
  const [methods, setMethods] = useState(INITIAL_METHODS);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newType, setNewType] = useState<string>('');
  const [newNumber, setNewNumber] = useState('');

  const setDefault = (id: string) => {
    setMethods(prev => prev.map(m => ({ ...m, isDefault: m.id === id })));
    toast({ title: 'Default payment method updated' });
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setMethods(prev => prev.filter(m => m.id !== deleteId));
    setDeleteId(null);
    toast({ title: 'Payment method removed' });
  };

  const handleAdd = () => {
    if (!newType || !newNumber.trim()) return;
    const labels: Record<string, string> = { jazzcash: 'JazzCash', easypaisa: 'EasyPaisa', card: 'Card' };
    const nm: PaymentMethod = {
      id: `pm-${Date.now()}`,
      type: newType as 'jazzcash' | 'easypaisa' | 'card',
      label: labels[newType],
      detail: newNumber.trim(),
      isDefault: false,
    };
    setMethods(prev => [...prev, nm]);
    setAddOpen(false);
    setNewType('');
    setNewNumber('');
    toast({ title: 'Payment method added' });
  };

  return (
    <div className="max-w-xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Payment methods</h1>
          <p className="text-muted-foreground">Manage your saved payment methods.</p>
        </div>
        <Button onClick={() => setAddOpen(true)} data-testid="btn-add-method">
          <Plus className="mr-2 h-4 w-4" /> Add Method
        </Button>
      </div>

      <div className="space-y-3">
        {methods.map(m => (
          <Card key={m.id} className={`border ${m.isDefault ? 'border-primary' : ''}`}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-10 w-14 rounded-xl border bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                {METHOD_ICONS[m.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{m.label}</span>
                  {m.isDefault && <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">Default</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{m.detail}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {!m.isDefault && (
                  <Button
                    variant="ghost" size="sm"
                    className="text-xs text-muted-foreground"
                    onClick={() => setDefault(m.id)}
                    data-testid={`btn-set-default-${m.id}`}
                  >
                    <Star className="h-3.5 w-3.5 mr-1" /> Set default
                  </Button>
                )}
                <Button
                  variant="ghost" size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
                  onClick={() => setDeleteId(m.id)}
                  disabled={m.isDefault}
                  data-testid={`btn-delete-${m.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 border-dashed">
        <CardContent className="p-4 text-center">
          <CreditCard className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Your payment details are encrypted and stored securely.</p>
        </CardContent>
      </Card>

      {/* Add modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Method type</Label>
              <Select value={newType} onValueChange={setNewType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jazzcash">JazzCash</SelectItem>
                  <SelectItem value="easypaisa">EasyPaisa</SelectItem>
                  <SelectItem value="card">Debit / Credit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{newType === 'card' ? 'Card number (last 4 digits)' : 'Phone number'}</Label>
              <Input
                value={newNumber}
                onChange={e => setNewNumber(e.target.value)}
                placeholder={newType === 'card' ? 'e.g. 4321' : 'e.g. 0301-1234567'}
                data-testid="input-method-number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!newType || !newNumber.trim()} data-testid="btn-confirm-add">
              Add Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove payment method?</DialogTitle>
            <DialogDescription>This method will be removed from your account. This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} data-testid="btn-confirm-delete">Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
