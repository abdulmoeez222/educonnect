import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutGrid, List, ChevronRight } from "lucide-react";
import { TutorCard } from "@/components/cards/TutorCard";
import { ConsultantCard } from "@/components/cards/ConsultantCard";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { tutors } from "@/lib/mock-data/tutors";
import { consultants } from "@/lib/mock-data/consultants";
import { resources } from "@/lib/mock-data/resources";

export default function Home() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilter, setActiveFilter] = useState('All');

  const featuredTutors = tutors.filter(t => t.isFeatured);
  const recommendedTutors = tutors.slice(0, 4);
  const topConsultants = consultants.slice(0, 4);
  const freeResources = resources.filter(r => r.price === 0).slice(0, 4);

  const filters = ['All', 'Tutoring', 'Resources', 'Consultations', 'Online', 'In-person', 'MDCAT', 'O-Levels'];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Filters Bar */}
      <div className="flex items-center justify-between gap-4 sticky top-16 bg-background/80 backdrop-blur-md py-3 border-b -mx-4 px-4 md:-mx-6 md:px-6 z-10">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-2">
            {filters.map((filter) => (
              <button 
                key={filter} 
                className={`rounded-full px-4 py-2 text-sm font-medium border cursor-pointer transition-all duration-150 whitespace-nowrap active:scale-[0.98] ${filter === activeFilter ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
        <div className="hidden sm:flex items-center gap-0.5 bg-muted rounded-2xl p-1 border">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 active:scale-[0.98] transition-transform duration-75 ${viewMode === 'grid' ? 'bg-card shadow-sm rounded-xl' : 'text-muted-foreground'}`}
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 active:scale-[0.98] transition-transform duration-75 ${viewMode === 'list' ? 'bg-card shadow-sm rounded-xl' : 'text-muted-foreground'}`}
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Featured Tutors */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Featured tutors</h2>
          <a className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 font-medium cursor-pointer active:scale-[0.98] transition-all">
            View all <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="relative">
          <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 hidden md:block" />
          <ScrollArea>
            <div className="flex gap-4 pb-4 w-max">
              {featuredTutors.map(tutor => (
                <div key={tutor.id} className="w-[300px] sm:w-[350px]">
                  <TutorCard tutor={tutor} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>

      {/* Recommended Tutors Grid */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Recommended for you</h2>
          <p className="text-sm text-muted-foreground mt-1">Based on your MDCAT preparation</p>
        </div>
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}>
          {recommendedTutors.map(tutor => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </section>

      {/* Top Consultants */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Top consultants</h2>
          <a className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 font-medium cursor-pointer active:scale-[0.98] transition-all">
            View all <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="relative">
          <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 hidden md:block" />
          <ScrollArea>
            <div className="flex gap-4 pb-4 w-max">
              {topConsultants.map(consultant => (
                <div key={consultant.id} className="w-[300px] sm:w-[350px]">
                  <ConsultantCard consultant={consultant} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>

      {/* Free Resources */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Free Resources
            <span className="text-teal-600 dark:text-teal-400 ml-2 text-sm font-normal hidden sm:inline">(no payment required)</span>
          </h2>
          <a className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 font-medium cursor-pointer active:scale-[0.98] transition-all">
            Browse library <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {freeResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

    </div>
  );
}
