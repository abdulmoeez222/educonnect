import { useState } from "react";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TutorCard } from "@/components/cards/TutorCard";
import { tutors } from "@/lib/mock-data/tutors";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fake filter state
  const [priceRange, setPriceRange] = useState([5000]);

  const filteredTutors = tutors.filter(tutor => 
    tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutor.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const FilterContent = () => (
    <div className="space-y-8">
      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Category</h4>
        <div className="space-y-1">
          {['Tutors', 'Consultants', 'Resources'].map(cat => {
            const isActive = cat === 'Tutors';
            return (
              <button
                key={cat}
                type="button"
                className={`w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer active:scale-[0.99] duration-75 ${isActive ? 'bg-primary/10 text-primary font-semibold rounded-2xl' : 'text-muted-foreground hover:bg-muted hover:text-foreground rounded-2xl'}`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Subjects</h4>
        <div className="space-y-2">
          {['MDCAT Biology', 'O-Level Math', 'ECAT Physics', 'Computer Science', 'English'].map(sub => (
            <div key={sub} className="flex items-center space-x-2">
              <Checkbox id={`sub-${sub}`} />
              <label htmlFor={`sub-${sub}`} className="text-sm leading-none">{sub}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-sm">Max price (PKR)</h4>
          <span className="text-xs text-muted-foreground">{priceRange[0]}/hr</span>
        </div>
        <Slider defaultValue={[5000]} max={10000} step={500} onValueChange={setPriceRange} />
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Format</h4>
        <div className="space-y-2">
          {['Online', 'In-person'].map(fmt => (
            <div key={fmt} className="flex items-center space-x-2">
              <Checkbox id={`fmt-${fmt}`} />
              <label htmlFor={`fmt-${fmt}`} className="text-sm leading-none">{fmt}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full min-h-[calc(100vh-8rem)] animate-in fade-in duration-300">
      
      {/* Desktop Sidebar Filters */}
      <aside className="hidden md:block w-64 shrink-0 space-y-6">
        <h3 className="font-bold text-lg border-b pb-4">Filters</h3>
        <ScrollArea className="h-[calc(100vh-14rem)]">
          <FilterContent />
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 space-y-6">
        
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search tutors, subjects, or keywords..." 
              className="pl-12 h-12 rounded-xl border-2 focus:border-primary text-base bg-card"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12 md:hidden rounded-xl active:scale-[0.98] transition-transform duration-75">
                  <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader className="mb-6 border-b pb-4 text-left">
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
                  <FilterContent />
                </ScrollArea>
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
                  <Button className="w-full rounded-xl active:scale-[0.98] transition-transform duration-75">Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Results Info & Sort Bar */}
        <div className="bg-muted/30 border rounded-xl p-3 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredTutors.length}</span> results
          </div>
          
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[160px] h-9 rounded-2xl bg-background">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid or Empty State */}
        {filteredTutors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
            {filteredTutors.map(tutor => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border-2 border-dashed rounded-2xl bg-muted/10 animate-in fade-in duration-300">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">Try adjusting your filters or search with different keywords</p>
            <Button variant="outline" className="rounded-xl active:scale-[0.98] transition-transform duration-75" onClick={() => setSearchQuery("")}>Clear all filters</Button>
          </div>
        )}

      </div>
    </div>
  );
}
