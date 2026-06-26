import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceTag } from "@/components/ui/PriceTag";
import { useToast } from "@/hooks/use-toast";
import { creatorResources } from "@/lib/mock-data/creator-resources";

export default function BundleBuilder() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const publishedPaidResources = creatorResources.filter(r => r.status === 'published' && !r.isFree);
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bundleName, setBundleName] = useState("");
  const [bundlePrice, setBundlePrice] = useState<number | "">("");

  const selectedResources = useMemo(() => {
    return publishedPaidResources.filter(r => selectedIds.includes(r.id));
  }, [selectedIds, publishedPaidResources]);

  const originalTotal = useMemo(() => {
    return selectedResources.reduce((sum, r) => sum + r.price, 0);
  }, [selectedResources]);

  const savings = useMemo(() => {
    if (typeof bundlePrice === "number" && bundlePrice < originalTotal) {
      return originalTotal - bundlePrice;
    }
    return 0;
  }, [originalTotal, bundlePrice]);

  const savingsPercent = originalTotal > 0 && savings > 0 
    ? Math.round((savings / originalTotal) * 100) 
    : 0;

  const isValid = selectedIds.length >= 2 && bundleName.length >= 5 && typeof bundlePrice === "number" && bundlePrice > 0 && bundlePrice < originalTotal;

  const handleCreate = () => {
    toast({
      title: "Bundle created!",
      description: "Students can now buy it together.",
    });
    setLocation("/tutor/resources/sales");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create resource bundle</h1>
        <p className="text-muted-foreground mt-1">Group your resources together and offer them at a discount.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b pb-2">1. select resources</h2>
            <p className="text-sm text-muted-foreground">Select at least 2 paid resources to include in this bundle.</p>
            
            <div className="border rounded-xl bg-card overflow-hidden">
              {publishedPaidResources.map(resource => (
                <div key={resource.id} className="flex flex-row items-center justify-between p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      id={`res-${resource.id}`}
                      checked={selectedIds.includes(resource.id)}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedIds([...selectedIds, resource.id]);
                        else setSelectedIds(selectedIds.filter(id => id !== resource.id));
                      }}
                    />
                    <Label htmlFor={`res-${resource.id}`} className="font-medium cursor-pointer">{resource.title}</Label>
                    <Badge variant="outline" className="ml-2 font-normal">{resource.type}</Badge>
                  </div>
                  <PriceTag price={resource.price} className="text-sm" />
                </div>
              ))}
            </div>
            <div className="text-sm font-medium">{selectedIds.length} items selected</div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold border-b pb-2">2. bundle details</h2>
            
            <div className="space-y-3">
              <Label>Bundle Name</Label>
              <Input 
                value={bundleName} 
                onChange={e => setBundleName(e.target.value)} 
                placeholder="e.g. Complete O-Level Physics Pack"
                data-testid="input-bundle-name"
              />
            </div>

            <div className="space-y-3">
              <Label>Bundle Price (PKR)</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground font-medium">PKR</span>
                <Input 
                  type="number" 
                  value={bundlePrice} 
                  onChange={e => setBundlePrice(e.target.value ? parseInt(e.target.value) : "")} 
                  placeholder="Must be less than original total" 
                  className="pl-12"
                  data-testid="input-bundle-price"
                />
              </div>
              {typeof bundlePrice === "number" && bundlePrice >= originalTotal && originalTotal > 0 && (
                <p className="text-sm text-destructive font-medium">Bundle price must be less than the original total (PKR {originalTotal.toLocaleString()}).</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-24 border-2 border-indigo-500/20 rounded-2xl p-6 bg-card shadow-lg space-y-6">
            <h3 className="font-bold text-xl border-b pb-3">Bundle preview</h3>
            
            {selectedResources.length === 0 ? (
              <div className="text-muted-foreground text-center py-10 text-sm">
                Select resources to preview
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {selectedResources.map(r => (
                    <div key={r.id} className="flex justify-between text-sm">
                      <span className="truncate max-w-[200px] text-muted-foreground">{r.title}</span>
                      <span>PKR {r.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-muted-foreground line-through">
                    <span>Original total</span>
                    <span>PKR {originalTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl text-indigo-600 dark:text-indigo-400">
                    <span>Bundle price</span>
                    <span>PKR {typeof bundlePrice === 'number' ? bundlePrice.toLocaleString() : '0'}</span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 p-2.5 rounded text-sm text-center font-medium mt-4 border border-green-200 dark:border-green-900/50">
                      Students save PKR {savings.toLocaleString()} ({savingsPercent}%)
                    </div>
                  )}
                  
                  {typeof bundlePrice === 'number' && bundlePrice > 0 && (
                    <div className="text-sm text-center text-muted-foreground mt-4 pt-4 border-t">
                      You keep 70% → <strong className="text-foreground">PKR {Math.round(bundlePrice * 0.7).toLocaleString()}</strong> (estimated per sale)
                    </div>
                  )}
                </div>
              </>
            )}

            <Button 
              className="w-full h-12 text-base mt-6 bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200" 
              disabled={!isValid}
              onClick={handleCreate}
              data-testid="btn-create-bundle"
            >
              Create Bundle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}