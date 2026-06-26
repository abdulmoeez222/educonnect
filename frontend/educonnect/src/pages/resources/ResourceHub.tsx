import { useState, useEffect, useMemo } from "react";
import { Filter, Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { resources } from "@/lib/mock-data/resources";

const CATEGORIES = [
  "All", "Academic Exams", "Academic Subjects", "Computer Science", 
  "AI & Technology", "Business & Career", "Marketing", "Finance", 
  "Languages", "Skills & Lifestyle", "University Courses"
];

export default function ResourceHub() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [types, setTypes] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleTypeToggle = (type: string) => {
    setTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const filteredResources = useMemo(() => {
    let result = resources;
    if (search) result = result.filter(r => r.title.toLowerCase().includes(search.toLowerCase()) || r.subject.toLowerCase().includes(search.toLowerCase()));
    if (category !== "All") result = result.filter(r => r.category === category);
    if (types.length > 0) result = result.filter(r => types.includes(r.type));
    if (priceFilter === "free") result = result.filter(r => r.price === 0);
    if (priceFilter === "paid") result = result.filter(r => r.price > 0);
    if (ratingFilter === "4") result = result.filter(r => r.rating >= 4);
    if (ratingFilter === "3") result = result.filter(r => r.rating >= 3);

    // Sort
    if (sort === "popular") result.sort((a, b) => b.downloads - a.downloads);
    else if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [search, category, types, priceFilter, ratingFilter, sort]);

  const SidebarContent = () => (
    <div className="space-y-6">
      <div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search resources..." 
            className="h-12 rounded-xl border-2 pl-12 focus:border-primary text-base placeholder:text-muted-foreground/60" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="input-search-resources"
          />
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3 text-sm">Categories</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {CATEGORIES.map(c => (
            <button 
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-5 py-2 text-sm font-medium border whitespace-nowrap cursor-pointer transition-all duration-150 shrink-0 ${category === c ? 'bg-teal-600 text-white border-teal-600 shadow-sm' : 'bg-card border-border text-muted-foreground hover:border-teal-400 hover:text-teal-700 dark:hover:text-teal-400'}`}
              data-testid={`btn-category-${c.replace(/\s+/g, '-')}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3 text-sm">Resource type</h3>
        <div className="space-y-2">
          {[
            { id: 'pdf', label: 'PDF Document' },
            { id: 'video', label: 'Video Course' },
            { id: 'notes', label: 'Study Notes' },
            { id: 'practice-test', label: 'Practice Test' }
          ].map(t => (
            <div key={t.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`type-${t.id}`} 
                checked={types.includes(t.id)}
                onCheckedChange={() => handleTypeToggle(t.id)}
                data-testid={`checkbox-type-${t.id}`}
              />
              <Label htmlFor={`type-${t.id}`} className="text-sm font-normal">{t.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3 text-sm">Price</h3>
        <RadioGroup value={priceFilter} onValueChange={setPriceFilter}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="price-all" data-testid="radio-price-all" />
            <Label htmlFor="price-all" className="text-sm font-normal">All Prices</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="free" id="price-free" data-testid="radio-price-free" />
            <Label htmlFor="price-free" className="text-sm font-normal">Free</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paid" id="price-paid" data-testid="radio-price-paid" />
            <Label htmlFor="price-paid" className="text-sm font-normal">Paid</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-medium mb-3 text-sm">Rating</h3>
        <RadioGroup value={ratingFilter} onValueChange={setRatingFilter}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="rating-all" data-testid="radio-rating-all" />
            <Label htmlFor="rating-all" className="text-sm font-normal">Any Rating</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="rating-4" data-testid="radio-rating-4" />
            <Label htmlFor="rating-4" className="text-sm font-normal">4 Stars & Up</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="rating-3" data-testid="radio-rating-3" />
            <Label htmlFor="rating-3" className="text-sm font-normal">3 Stars & Up</Label>
          </div>
        </RadioGroup>
      </div>

      <Button 
        variant="ghost" 
        className="w-full text-muted-foreground"
        onClick={() => {
          setCategory("All"); setTypes([]); setPriceFilter("all"); setRatingFilter("all"); setSearch("");
        }}
        data-testid="btn-clear-filters"
      >
        Clear filters
      </Button>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resource hub</h1>
          <p className="text-muted-foreground mt-1">Discover study materials, past papers, and video courses.</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden flex items-center gap-2" data-testid="btn-mobile-filters">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px]">
            <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
            <div className="mt-6"><SidebarContent /></div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <aside className="hidden md:block col-span-1">
          <SidebarContent />
        </aside>
        
        <div className="md:col-span-3 space-y-6">
          <div className="flex items-center justify-between bg-muted/30 border rounded-xl px-4 py-3">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-bold text-foreground">{filteredResources.length}</span> resources
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm whitespace-nowrap text-muted-foreground">Sort by:</Label>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="h-9 rounded-2xl bg-background border text-sm w-[180px]" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[340px] w-full rounded-xl" />
              ))}
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-24 border-2 border-dashed rounded-2xl bg-muted/10 col-span-full">
              <div className="h-20 w-20 rounded-3xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-center mx-auto mb-5">
                <BookOpen className="h-10 w-10 text-teal-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">No resources found</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">Try a different category or search term</p>
              <Button variant="outline" className="rounded-xl border-2" onClick={() => {
                setCategory("All"); setTypes([]); setPriceFilter("all"); setRatingFilter("all"); setSearch("");
              }}>Clear filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}