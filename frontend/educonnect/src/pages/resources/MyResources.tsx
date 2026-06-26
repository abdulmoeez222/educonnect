import { useState } from "react";
import { Link } from "wouter";
import { Library, Bookmark, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { resources } from "@/lib/mock-data/resources";
import { Button } from "@/components/ui/button";

export default function MyResources() {
  const [activeTab, setActiveTab] = useState("all");

  const purchased = resources.slice(0, 6);
  const bookmarked = resources.slice(6, 9);
  
  const all = [...purchased, ...bookmarked].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

  const renderGrid = (items: typeof resources, emptyText: string) => {
    if (items.length === 0) {
      return (
        <div className="py-20 flex flex-col items-center justify-center text-center border rounded-xl border-dashed bg-muted/10">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">{emptyText}</h3>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/resources">Browse the Resource Hub</Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map(r => (
          <ResourceCard key={r.id} resource={r} showDownload={true} />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Library className="h-8 w-8 text-primary" /> My Resources
          </h1>
          <p className="text-muted-foreground mt-1">Access your purchased materials and saved items.</p>
        </div>
        <Button asChild>
          <Link href="/resources">Browse Hub</Link>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="w-[100px]">All</TabsTrigger>
          <TabsTrigger value="purchased" className="w-[120px]">Purchased</TabsTrigger>
          <TabsTrigger value="bookmarked" className="w-[120px] flex items-center gap-1.5"><Bookmark className="h-3.5 w-3.5" /> Bookmarked</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-0">
          {renderGrid(all, "No resources yet")}
        </TabsContent>
        <TabsContent value="purchased" className="mt-0">
          {renderGrid(purchased, "No purchased resources yet")}
        </TabsContent>
        <TabsContent value="bookmarked" className="mt-0">
          {renderGrid(bookmarked, "No bookmarked resources yet")}
        </TabsContent>
      </Tabs>
    </div>
  );
}