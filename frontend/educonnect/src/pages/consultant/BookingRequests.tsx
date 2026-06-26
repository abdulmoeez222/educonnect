import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookingRequestCard } from "@/components/cards/BookingRequestCard";
import { BookingRequest } from "@/lib/mock-data/booking-requests";

const MOCK_REQUESTS: BookingRequest[] = [
  { id: 'cr-1', studentName: 'Hania Arif', studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hania', subject: 'Career Counseling — Single Session', requestedDate: 'Jul 3, 2025', requestedTime: '11:00 AM', format: 'online', status: 'pending', price: 2000, message: 'I need guidance on choosing between engineering and CS.' },
  { id: 'cr-2', studentName: 'Bilal Chaudhry', studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bilal', subject: 'MDCAT Strategy — 3-Pack Session 1', requestedDate: 'Jul 4, 2025', requestedTime: '02:00 PM', format: 'online', status: 'pending', price: 4500, message: 'My MDCAT is in 3 months. I need a full study plan.' },
  { id: 'cr-3', studentName: 'Sara Memon', studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara', subject: 'University Admissions — Monthly Retainer', requestedDate: 'Jul 5, 2025', requestedTime: '04:00 PM', format: 'online', status: 'accepted', price: 15000, message: '' },
  { id: 'cr-4', studentName: 'Omar Qureshi', studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar', subject: 'Study Abroad Guidance — Single Session', requestedDate: 'Jul 6, 2025', requestedTime: '09:00 AM', format: 'online', status: 'accepted', price: 2500, message: '' },
  { id: 'cr-5', studentName: 'Fatima Rehan', studentAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima', subject: 'Career Counseling — Single Session', requestedDate: 'Jul 2, 2025', requestedTime: '03:30 PM', format: 'online', status: 'declined', price: 2000, message: '' },
];

export default function ConsultantBookingRequests() {
  const [requests, setRequests] = useState<BookingRequest[]>(MOCK_REQUESTS);
  const [tab, setTab] = useState('all');

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  const accept = (id: string) => setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'accepted' } : r));
  const decline = (id: string) => setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'declined' } : r));
  const proposeNew = (id: string) => {
    console.log('Propose new time for', id);
  };

  const filtered = tab === 'all' ? requests : requests.filter(r => r.status === tab);

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Booking requests</h1>
        <p className="text-muted-foreground">Review and manage consultation requests from clients.</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            All
            <Badge variant="secondary" className="ml-2">{requests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            {pendingCount > 0 && (
              <Badge className="ml-2 bg-amber-500 text-white">{pendingCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="declined">Declined</TabsTrigger>
        </TabsList>

        <TabsContent value={tab}>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <CalendarDays className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <h3 className="font-semibold text-lg">No {tab === 'all' ? '' : tab} requests</h3>
              <p className="text-muted-foreground text-sm mt-1">Booking requests from clients will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map(r => (
                <BookingRequestCard
                  key={r.id}
                  request={r}
                  role="consultant"
                  onAccept={() => accept(r.id)}
                  onDecline={() => decline(r.id)}
                  onProposeNewTime={() => proposeNew(r.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
