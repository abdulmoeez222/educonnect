import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SessionRow } from "@/components/cards/SessionRow";
import { sessions } from "@/lib/mock-data/sessions";
import { CalendarX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Sessions() {
  const upcoming = sessions.filter(s => s.status === 'upcoming');
  const completed = sessions.filter(s => s.status === 'completed');
  const cancelled = sessions.filter(s => s.status === 'cancelled');

  const EmptyState = ({ title, desc }: { title: string, desc: string }) => (
    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-2xl bg-muted/10 text-center">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <CalendarX className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-sm">{desc}</p>
      <Button className="rounded-xl mt-2" asChild>
        <Link href="/search">Find a Tutor</Link>
      </Button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">My sessions</h1>
          <p className="text-muted-foreground">Manage your upcoming and past classes.</p>
        </div>
        <Button asChild className="hidden sm:flex rounded-xl h-10 px-5 font-medium">
          <Link href="/search">Book New</Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="bg-muted rounded-xl p-1 border max-w-sm grid grid-cols-3 mb-6">
          <TabsTrigger value="upcoming" className="rounded-2xl font-medium data-[state=active]:shadow-sm">
            Upcoming <span className="ml-2 bg-primary/15 text-primary rounded-full px-2 py-0.5 text-xs font-bold">{upcoming.length}</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="rounded-2xl font-medium data-[state=active]:shadow-sm">
            Completed
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="rounded-2xl font-medium data-[state=active]:shadow-sm">
            Cancelled
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcoming.length > 0 ? (
            upcoming.map(session => <SessionRow key={session.id} session={session} />)
          ) : (
            <EmptyState title="No upcoming sessions" desc="You don't have any classes scheduled. Book a tutor to get started." />
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {completed.length > 0 ? (
            completed.map(session => <SessionRow key={session.id} session={session} />)
          ) : (
            <EmptyState title="No completed sessions" desc="Your finished classes will appear here." />
          )}
        </TabsContent>
        
        <TabsContent value="cancelled" className="space-y-4">
          {cancelled.length > 0 ? (
            cancelled.map(session => <SessionRow key={session.id} session={session} />)
          ) : (
            <EmptyState title="No cancelled sessions" desc="You have no cancelled classes." />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
