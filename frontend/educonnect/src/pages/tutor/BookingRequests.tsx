import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CalendarX } from "lucide-react";
import { bookingRequests as mockRequests } from "@/lib/mock-data/booking-requests";
import { BookingRequestCard } from "@/components/cards/BookingRequestCard";

export default function BookingRequests() {
  const [requests, setRequests] = useState(mockRequests);
  const { toast } = useToast();

  const handleAccept = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'accepted' } : req
    ));
    toast({
      title: "Request Accepted",
      description: "The student has been notified.",
    });
  };

  const handleDecline = (id: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'declined' } : req
    ));
    toast({
      title: "Request Declined",
      variant: "destructive"
    });
  };

  const handleProposeTime = (id: string, newTime: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { 
        ...req, 
        requestedTime: newTime,
        message: `Tutor proposed a new time: ${newTime}. Original message: ${req.message}`
      } : req
    ));
    toast({
      title: "New Time Proposed",
      description: "Waiting for student to confirm.",
    });
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  const renderTabContent = (statusFilter: string) => {
    const filtered = statusFilter === 'all' 
      ? requests 
      : requests.filter(r => r.status === statusFilter);

    if (filtered.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-center border-2 rounded-3xl border-dashed mt-6 bg-card">
          <CalendarX className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-muted-foreground">No requests here</h3>
          <p className="text-sm text-muted-foreground/70 mt-1">
            {statusFilter === 'pending' ? 'You are all caught up!' : 'Check back later.'}
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        {filtered.map(req => (
          <BookingRequestCard 
            key={req.id} 
            request={req}
            onAccept={handleAccept}
            onDecline={handleDecline}
            onProposeNewTime={handleProposeTime}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-bold mb-2">Booking requests</h1>
        <p className="text-muted-foreground">Manage your incoming session requests.</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="p-1 bg-muted/30 rounded-2xl inline-flex w-auto mb-8 border">
          <TabsTrigger value="all" className="rounded-xl px-6 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm data-[state=active]:border-indigo-100">All</TabsTrigger>
          <TabsTrigger value="pending" className="relative rounded-xl px-6 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm data-[state=active]:border-indigo-100">
            Pending
            {pendingCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1.5 text-[10px] flex items-center justify-center bg-indigo-600 text-white border-2 border-background rounded-full shadow-sm hover:bg-indigo-700 transition-all duration-200">
                {pendingCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="accepted" className="rounded-xl px-6 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm data-[state=active]:border-indigo-100">Accepted</TabsTrigger>
          <TabsTrigger value="declined" className="rounded-xl px-6 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm data-[state=active]:border-indigo-100">Declined</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">{renderTabContent('all')}</TabsContent>
        <TabsContent value="pending" className="mt-0">{renderTabContent('pending')}</TabsContent>
        <TabsContent value="accepted" className="mt-0">{renderTabContent('accepted')}</TabsContent>
        <TabsContent value="declined" className="mt-0">{renderTabContent('declined')}</TabsContent>
      </Tabs>
    </div>
  );
}
