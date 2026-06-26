import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, UserSearch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConsultantCard } from "@/components/cards/ConsultantCard";
import { consultants } from "@/lib/mock-data/consultants";

const CATEGORIES = [
  'All',
  'Agency & Freelancing',
  'Career Guidance',
  'Startup & Business',
  'Digital Marketing',
  'Tech & Coding',
  'Finance & Investment',
  'Study Strategy',
  'Life & Mindset',
  'Influencer & Creator',
];

export default function ConsultantFeed() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('relevance');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = consultants
    .filter(c => {
      const matchesCategory = activeCategory === 'All' || (c.categories ?? []).includes(activeCategory);
      const matchesSearch = search.trim() === '' ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.expertise.some(e => e.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'price-asc') return a.packages.single - b.packages.single;
      if (sort === 'price-desc') return b.packages.single - a.packages.single;
      return 0;
    });

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-in fade-in duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Expert consultants</h1>
        <p className="text-muted-foreground mt-1">Book one-on-one sessions with verified professionals</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          className="h-12 rounded-xl border-2 pl-12 focus:border-amber-500 dark:focus:border-amber-400 text-base placeholder:text-muted-foreground/60 transition-colors"
          placeholder="Search by name or expertise..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          data-testid="input-consultant-search"
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide -mx-1 px-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            data-testid={`pill-${cat}`}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium border whitespace-nowrap cursor-pointer transition-all duration-200
              ${activeCategory === cat
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                : 'bg-card border-border text-muted-foreground hover:border-amber-400 hover:text-amber-700 dark:hover:text-amber-400'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort row */}
      <div className="bg-muted/30 border rounded-xl px-4 py-3 flex items-center justify-between mb-8">
        <p className="text-sm font-medium text-muted-foreground">
          {loading ? 'Loading...' : `${filtered.length} consultant${filtered.length !== 1 ? 's' : ''} found`}
        </p>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-44 h-9 rounded-2xl border-2 focus:border-amber-500 text-sm font-medium" data-testid="select-sort">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4 border-2 rounded-2xl p-5 bg-card">
              <div className="flex gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="flex-1 space-y-2 py-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
              <div className="flex gap-3 pt-2">
                <Skeleton className="h-10 flex-1 rounded-xl" />
                <Skeleton className="h-10 flex-1 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl bg-muted/10 mt-8">
          <UserSearch className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="font-semibold text-lg mb-1">No consultants found</h3>
          <p className="text-muted-foreground text-sm max-w-sm mb-6">We couldn't find any consultants matching your current filters. Try adjusting your search or category.</p>
          <Button variant="outline" className="h-11 rounded-xl px-6 border-2 font-medium" onClick={() => { setActiveCategory('All'); setSearch(''); }}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(c => (
            <ConsultantCard key={c.id} consultant={c} />
          ))}
        </div>
      )}
    </div>
  );
}
