import React, { useState as useReactState } from "react";
import { Calendar, Clock, MapPin, Video, Check, X, Edit2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookingRequest } from "@/lib/mock-data/booking-requests";
import { Input } from "@/components/ui/input";

interface BookingRequestCardProps {
  request: BookingRequest;
  role?: 'tutor' | 'consultant';
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  onProposeNewTime: (id: string, newTime: string) => void;
}

export function BookingRequestCard({
  request,
  role = 'tutor',
  onAccept,
  onDecline,
  onProposeNewTime
}: BookingRequestCardProps) {
  const [isProposingTime, setIsProposingTime] = useReactState(false);
  const [newTime, setNewTime] = useReactState("");

  const getStatusBadge = () => {
    switch (request.status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-amber-500/10 text-amber-700 border-amber-500/20">Pending</Badge>;
      case 'accepted':
        return <Badge variant="secondary" className="bg-green-500/10 text-green-700 border-green-500/20">Accepted</Badge>;
      case 'declined':
        return <Badge variant="secondary" className="bg-red-500/10 text-red-700 border-red-500/20">Declined</Badge>;
    }
  };

  const handleProposeTime = () => {
    if (newTime.trim()) {
      onProposeNewTime(request.id, newTime);
      setIsProposingTime(false);
    }
  };

  return (
    <Card className="p-5 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={request.studentAvatar} alt={request.studentName} />
            <AvatarFallback>{request.studentName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-base">{request.studentName}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant="outline" className="text-xs font-normal text-primary border-primary/30">
                {request.subject}
              </Badge>
              {getStatusBadge()}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-lg text-green-600 dark:text-green-500">
            PKR {request.price.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Earnings</div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-3 text-sm space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{request.requestedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{request.requestedTime}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          {request.format === 'online' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
          <span className="capitalize">{request.format}</span>
        </div>
      </div>

      {request.message && (
        <div className="text-sm">
          <span className="font-medium">Message: </span>
          <span className="text-muted-foreground italic">"{request.message}"</span>
        </div>
      )}

      {request.status === 'pending' && (
        <div className="pt-2 border-t flex flex-col gap-3">
          {isProposingTime ? (
            <div className="flex items-center gap-2">
              <Input 
                placeholder="e.g. Tomorrow, 5:00 PM" 
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="h-9"
                data-testid={`input-propose-time-${request.id}`}
              />
              <Button size="sm" onClick={handleProposeTime} data-testid={`button-confirm-time-${request.id}`}>Confirm</Button>
              <Button size="sm" variant="ghost" onClick={() => setIsProposingTime(false)}>Cancel</Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none" 
                onClick={() => onAccept(request.id)}
                data-testid={`button-accept-${request.id}`}
              >
                <Check className="h-4 w-4 mr-2" />
                Accept
              </Button>
              <Button 
                variant="outline" 
                className="text-destructive hover:bg-destructive/10 border-destructive/20 flex-1 sm:flex-none"
                onClick={() => onDecline(request.id)}
                data-testid={`button-decline-${request.id}`}
              >
                <X className="h-4 w-4 mr-2" />
                Decline
              </Button>
              <Button 
                variant="ghost" 
                className="text-muted-foreground w-full sm:w-auto"
                onClick={() => setIsProposingTime(true)}
                data-testid={`button-propose-${request.id}`}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Propose new time
              </Button>
            </div>
          )}
        </div>
      )}
      
      {request.status !== 'pending' && (
        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground text-center">
            You have {request.status} this request.
          </p>
        </div>
      )}
    </Card>
  );
}
