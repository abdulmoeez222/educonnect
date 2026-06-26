import { Link } from "wouter";
import { Calendar, Clock, Video, Users, Star, MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Session } from "@/lib/mock-data/sessions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SessionRowProps {
  session: Session;
}

export function SessionRow({ session }: SessionRowProps) {
  const getStatusBadge = () => {
    switch (session.status) {
      case 'upcoming':
        return <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 rounded-full">Upcoming</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/40 dark:text-green-300 rounded-full">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="secondary" className="bg-muted text-muted-foreground border rounded-full line-through">Cancelled</Badge>;
    }
  };

  return (
    <Card className="rounded-2xl p-5 hover:shadow-md hover:border-primary/30 transition-all duration-200 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex items-center gap-4 flex-1">
        <Avatar className="h-12 w-12 ring-2 ring-border">
          <AvatarImage src={session.tutorAvatar} alt={session.tutorName} />
          <AvatarFallback>{session.tutorName.substring(0, 2)}</AvatarFallback>
        </Avatar>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-base">{session.tutorName}</h4>
            <span className="text-muted-foreground text-sm hidden sm:inline">•</span>
            <span className="text-sm font-medium text-primary">{session.subject}</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-2">
            <div className="inline-flex items-center gap-1.5 bg-muted rounded-full px-3 py-1 text-xs font-medium">
              <Calendar className="h-3.5 w-3.5" />
              {session.dateTime}
            </div>
            <div className="inline-flex items-center gap-1.5 bg-muted rounded-full px-3 py-1 text-xs font-medium">
              <Clock className="h-3.5 w-3.5" />
              {session.duration} min
            </div>
            <div className="inline-flex items-center gap-1.5 bg-muted rounded-full px-3 py-1 text-xs font-medium">
              {session.format === 'online' ? <Video className="h-3.5 w-3.5" /> : <Users className="h-3.5 w-3.5" />}
              <span className="capitalize">{session.format}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0">
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          {session.status === 'completed' && session.rating && (
            <div className="flex items-center text-sm font-medium ml-2">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
              {session.rating}.0
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {session.status === 'upcoming' && (
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl h-9 px-4 text-sm font-semibold" asChild>
              <Link href={session.joinLink || "#"}>Join Session</Link>
            </Button>
          )}
          
          {session.status === 'completed' && !session.rating && (
            <Button variant="outline" className="rounded-xl border-2 h-9 px-4 text-sm font-medium">Leave Review</Button>
          )}
          
          {session.status === 'cancelled' && (
            <Button variant="outline" className="rounded-xl border-2 h-9 px-4 text-sm font-medium">Rebook</Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/tutor/${session.tutorName.toLowerCase().replace(' ', '-')}`}>View Profile</Link>
              </DropdownMenuItem>
              {session.status === 'upcoming' && (
                <>
                  <DropdownMenuItem>Reschedule</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Cancel Session</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
