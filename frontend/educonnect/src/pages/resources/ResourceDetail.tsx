import { useState } from "react";
import { useParams, Link } from "wouter";
import { Star, Download, ShieldCheck, Share2, Lock, FileText, Play, FileCheck, FileCode, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { PriceTag } from "@/components/ui/PriceTag";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { resources, bundles } from "@/lib/mock-data/resources";

export default function ResourceDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const resource = resources.find(r => r.id === id);
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  if (!resource) {
    return <div className="py-20 text-center text-muted-foreground">Resource not found.</div>;
  }

  const related = resources.filter(r => r.subject === resource.subject && r.id !== resource.id).slice(0, 4);
  const bundle = bundles.find(b => b.resourceIds.includes(resource.id));

  const handlePurchase = () => {
    setPurchaseOpen(false);
    toast({
      title: "Purchase Successful",
      description: "You now have access to this resource.",
    });
  };

  const getIcon = () => {
    switch (resource.type) {
      case 'pdf': return <FileText className="h-5 w-5" />;
      case 'video': return <Play className="h-5 w-5" />;
      case 'notes': return <FileCheck className="h-5 w-5" />;
      case 'practice-test': return <FileCode className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getBgClass = () => {
    switch (resource.type) {
      case 'video': return "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border-indigo-100 dark:border-indigo-900";
      case 'pdf': return "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/40 dark:to-cyan-950/40 border-blue-100 dark:border-blue-900";
      case 'notes': return "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border-amber-100 dark:border-amber-900";
      case 'practice-test': return "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-emerald-100 dark:border-emerald-900";
      default: return "bg-gradient-to-br from-muted to-muted/50 border-border";
    }
  };

  return (
    <div className="space-y-10 pb-10">
      <div className="flex items-center text-sm text-muted-foreground gap-2">
        <Link href="/resources" className="hover:text-foreground transition-all duration-200">Resources</Link>
        <span>/</span>
        <span>{resource.category || "General"}</span>
        <span>/</span>
        <span className="text-foreground font-medium truncate max-w-[200px]">{resource.title}</span>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-8">
          <div className={`rounded-3xl p-8 mb-6 flex flex-col md:flex-row items-start gap-6 ${getBgClass()}`}>
            <div className="h-20 w-20 bg-white dark:bg-card rounded-3xl shadow-lg flex items-center justify-center shrink-0">
              {getIcon()}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">{resource.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{resource.preview}</p>
              <div className="flex flex-wrap gap-3 mt-3">
                <div className="inline-flex items-center gap-1.5 bg-white/60 dark:bg-card/60 backdrop-blur-sm border rounded-full px-3 py-1.5 text-xs font-medium">
                  {getIcon()}
                  <span className="capitalize">{resource.type.replace('-', ' ')}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-white/60 dark:bg-card/60 backdrop-blur-sm border rounded-full px-3 py-1.5 text-xs font-medium">
                  {resource.subject}
                </div>
              </div>
            </div>
          </div>
            
          <div className="bg-muted/30 rounded-2xl border p-4 flex items-center gap-4 mt-6">
            <Avatar className="h-12 w-12 ring-2 ring-teal-100 dark:ring-teal-900">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${resource.creator}`} />
              <AvatarFallback>{resource.creator[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{resource.creator}</p>
              <div className="flex items-center text-sm text-muted-foreground gap-3">
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> {resource.creatorRating || resource.rating}</span>
                <span className="flex items-center gap-1">{(resource.creatorStudents || resource.downloads).toLocaleString()} students</span>
              </div>
            </div>
            <Link href={`/tutor/mock-tutor-id`} className="text-sm text-teal-600 dark:text-teal-400 font-medium hover:underline transition-all duration-200">
              More by this creator
            </Link>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Description</h2>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
              <p>{resource.description || resource.preview}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">What's included</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Comprehensive coverage of {resource.subject}</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Lifetime access to updates</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /> Downloadable for offline use</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Preview</h2>
            <div className="bg-muted/20 border-2 border-dashed rounded-2xl p-8 text-center relative overflow-hidden flex flex-col items-center justify-center">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Preview (first 3 questions)
              </div>
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center mt-12">
                <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Purchase to unlock full content</h3>
                <p className="text-muted-foreground text-sm max-w-xs">Preview shows first 3 pages. Get full access by purchasing.</p>
              </div>
              <div className="w-full max-w-sm space-y-4 opacity-30 mt-6">
                <div className="h-4 bg-foreground/20 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-foreground/20 rounded w-full"></div>
                <div className="h-4 bg-foreground/20 rounded w-5/6 mx-auto"></div>
                <div className="h-4 bg-foreground/20 rounded w-full"></div>
              </div>
            </div>
          </div>

          {resource.tags && resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {resource.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="font-normal text-xs">#{tag}</Badge>
              ))}
            </div>
          )}

          {resource.reviews && resource.reviews.length > 0 && (
            <div className="space-y-6 pt-6 border-t">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Reviews</h2>
                <Button variant="link" className="text-primary">See all {resource.reviewCount} reviews</Button>
              </div>
              <div className="space-y-4">
                {resource.reviews.map(review => (
                  <div key={review.id} className="p-4 border rounded-xl bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{review.reviewerName}</div>
                      <div className="text-xs text-muted-foreground">{review.date}</div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-muted'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-2xl border-2 border-teal-200 dark:border-teal-800 shadow-xl bg-card p-6">
              <div className="flex items-end justify-between mb-6">
                <div>
                  {resource.price > 0 ? (
                    <div className="text-4xl font-black text-foreground mb-1">${resource.price.toFixed(2)}</div>
                  ) : (
                    <div className="text-4xl font-black text-teal-600 mb-1">Free</div>
                  )}
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-1 pb-1">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="font-medium text-foreground">{resource.rating}</span>
                  <span>({resource.reviewCount || 0})</span>
                </div>
              </div>

              {resource.price > 0 ? (
                <>
                  <Dialog open={purchaseOpen} onOpenChange={setPurchaseOpen}>
                    <DialogTrigger asChild>
                      <Button className="h-12 w-full rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-sm transition-all duration-200" data-testid="btn-buy-now">Buy Now</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Complete Purchase</DialogTitle>
                        <DialogDescription>You are purchasing {resource.title}</DialogDescription>
                      </DialogHeader>
                      <div className="py-6 flex items-center justify-between border-y my-2">
                        <span className="font-medium">Total Amount</span>
                        <PriceTag price={resource.price} className="text-xl" />
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setPurchaseOpen(false)}>Cancel</Button>
                        <Button onClick={handlePurchase} data-testid="btn-confirm-purchase">Confirm Purchase</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <div className="text-xs text-muted-foreground text-center mt-3">Preview available</div>
                </>
              ) : (
                <Button className="h-12 w-full rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-all duration-200" onClick={() => {
                  toast({ title: "Download Started", description: "Your file is downloading." })
                }} data-testid="btn-download-free">
                  <Download className="mr-2 h-5 w-5" /> Download Free
                </Button>
              )}

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                <span>EduConnect Buyer Protection — full refund within 7 days</span>
              </div>
            </div>

            {bundle && (
              <div className="border rounded-xl p-5 bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900">
                <Badge className="bg-indigo-500 mb-3">Bundle Offer</Badge>
                <h3 className="font-medium text-indigo-950 dark:text-indigo-200 mb-2">Also available in {bundle.title}</h3>
                <p className="text-sm text-indigo-800/70 dark:text-indigo-300/70 mb-4">Save {bundle.savingsPercent}% when you buy this as part of the bundle.</p>
                <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-100 dark:border-indigo-800 dark:text-indigo-300 transition-all duration-200" asChild>
                  <Link href={`/resource-bundle/${bundle.id}`}>View Bundle</Link>
                </Button>
              </div>
            )}

            <div className="flex items-center justify-center">
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast({ title: "Link copied to clipboard" });
              }}>
                <Share2 className="h-4 w-4 mr-2" /> Share this resource
              </Button>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="pt-10 border-t mt-10 space-y-6">
          <h2 className="text-xl font-bold">More from {resource.subject}</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
            {related.map(r => (
              <div key={r.id} className="min-w-[280px] w-[280px] snap-start">
                <ResourceCard resource={r} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}