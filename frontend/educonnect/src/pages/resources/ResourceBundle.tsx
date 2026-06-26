import { useParams, Link } from "wouter";
import { Star, Package, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceTag } from "@/components/ui/PriceTag";
import { useToast } from "@/hooks/use-toast";
import { bundles, resources } from "@/lib/mock-data/resources";
import { ResourceCard } from "@/components/cards/ResourceCard";

export default function ResourceBundlePage() {
  const { id } = useParams();
  const { toast } = useToast();
  const bundle = bundles.find(b => b.id === id);

  if (!bundle) {
    return <div className="py-20 text-center text-muted-foreground">Bundle not found.</div>;
  }

  const includedResources = bundle.resourceIds.map(rId => resources.find(r => r.id === rId)).filter(Boolean) as typeof resources;

  const handlePurchase = () => {
    toast({
      title: "Bundle Purchased!",
      description: "All resources have been added to your library.",
    });
  };

  return (
    <div className="space-y-10 pb-10">
      <div className="flex items-center text-sm text-muted-foreground gap-2">
        <Link href="/resources" className="hover:text-foreground transition-all duration-200">Resources</Link>
        <span>/</span>
        <span>Bundles</span>
        <span>/</span>
        <span className="text-foreground font-medium truncate">{bundle.title}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <Badge className="bg-indigo-500 hover:bg-indigo-600 mb-4 gap-1.5 px-3 py-1 text-sm transition-all duration-200">
              <Package className="h-4 w-4" /> Resource Bundle
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{bundle.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{bundle.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <span>Created by <strong className="text-foreground">{bundle.creator}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-500 text-amber-500" /> {bundle.rating} ({bundle.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Included in this bundle ({includedResources.length})</h2>
            <div className="grid gap-4">
              {includedResources.map((res, i) => (
                <div key={res.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl bg-card hover:bg-muted/50 transition-colors gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-1"><Link href={`/resource/${res.id}`} className="hover:underline transition-all duration-200">{res.title}</Link></h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="font-normal text-xs">{res.type}</Badge>
                        <Badge variant="outline" className="font-normal text-xs border-primary/20 text-primary">{res.subject}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 sm:ml-auto">
                    <PriceTag price={res.price} variant="strike" className="text-sm" />
                    <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600 transition-all duration-200"><Check className="h-3 w-3 mr-1"/> Included</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 border-2 border-indigo-500/20 rounded-2xl p-6 bg-card shadow-lg space-y-6">
            <div className="bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 p-3 rounded-2xl text-center font-medium border border-green-200 dark:border-green-900/50">
              Save PKR {bundle.savings.toLocaleString()} ({bundle.savingsPercent}%)
            </div>
            
            <div className="flex flex-col items-center py-4 border-b border-dashed">
              <span className="text-muted-foreground line-through mb-1">PKR {bundle.originalTotal.toLocaleString()}</span>
              <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">PKR {bundle.bundlePrice.toLocaleString()}</div>
            </div>
            
            <Button size="lg" className="w-full text-lg h-14 bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200" onClick={handlePurchase} data-testid="btn-buy-bundle">
              Buy Bundle Now
            </Button>
            
            <ul className="space-y-3 text-sm text-muted-foreground px-2">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> Instant access to all {includedResources.length} items</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> Lifetime validity</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> 7-day money-back guarantee</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-16 mt-10 border-t">
        <h2 className="text-2xl font-bold mb-6">Frequently bought together</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {resources.slice(10, 13).map(r => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      </div>
    </div>
  );
}