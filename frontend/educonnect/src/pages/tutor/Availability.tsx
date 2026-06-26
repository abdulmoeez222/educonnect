import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIMES = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM

// Mock initial availability
const initialSlots = new Set([
  "Mon-14", "Mon-15", "Mon-16",
  "Wed-14", "Wed-15", "Wed-16",
  "Fri-14", "Fri-15", "Fri-16",
  "Sat-10", "Sat-11", "Sat-12"
]);

export default function Availability() {
  const [activeSlots, setActiveSlots] = useState<Set<string>>(initialSlots);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const { toast } = useToast();

  const toggleSlot = (day: string, time: number) => {
    const slotKey = `${day}-${time}`;
    const newSlots = new Set(activeSlots);
    if (newSlots.has(slotKey)) {
      newSlots.delete(slotKey);
    } else {
      newSlots.add(slotKey);
    }
    setActiveSlots(newSlots);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    // Check if date is already in array
    const isBlocked = blockedDates.some(d => 
      d.getDate() === date.getDate() && 
      d.getMonth() === date.getMonth() && 
      d.getFullYear() === date.getFullYear()
    );

    if (isBlocked) {
      setBlockedDates(blockedDates.filter(d => 
        !(d.getDate() === date.getDate() && 
          d.getMonth() === date.getMonth() && 
          d.getFullYear() === date.getFullYear())
      ));
    } else {
      setBlockedDates([...blockedDates, date]);
    }
  };

  const removeBlockedDate = (dateToRemove: Date) => {
    setBlockedDates(blockedDates.filter(d => d !== dateToRemove));
  };

  const handleSave = () => {
    toast({
      title: "Availability Updated",
      description: "Availability settings saved successfully.",
    });
  };

  const formatTime = (hour: number) => {
    return hour > 12 ? `${hour - 12} PM` : hour === 12 ? "12 PM" : `${hour} AM`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Availability calendar</h1>
        <p className="text-muted-foreground">Manage your working hours and time off.</p>
      </div>

      {/* Section 1 - Weekly recurring slots */}
      <div className="bg-card rounded-3xl border-2 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-bold mb-1">Weekly recurring slots</h2>
        <p className="text-muted-foreground mb-6">Select the hours you are generally available each week.</p>
        
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid grid-cols-8 gap-2 mb-2">
              <div className="h-10"></div>
              {DAYS.map(day => (
                <div key={day} className="text-center font-semibold text-sm text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              {TIMES.map(time => (
                <div key={time} className="grid grid-cols-8 gap-2">
                  <div className="flex items-center justify-end pr-4 text-xs font-medium text-muted-foreground">
                    {formatTime(time)}
                  </div>
                  {DAYS.map(day => {
                    const isAvailable = activeSlots.has(`${day}-${time}`);
                    return (
                      <button
                        key={`${day}-${time}`}
                        onClick={() => toggleSlot(day, time)}
                        className={`h-10 rounded-xl text-xs transition-all ${
                          isAvailable 
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 border-transparent font-medium transform hover:scale-105' 
                            : 'bg-card border-2 border-dashed border-muted-foreground/20 text-muted-foreground hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20'
                        }`}
                        data-testid={`slot-${day}-${time}`}
                      >
                        {isAvailable ? "Available" : "—"}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section 2 - Block specific dates */}
        <div className="bg-card rounded-3xl border-2 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-1">Block specific dates</h2>
          <p className="text-muted-foreground mb-6">Taking a vacation? Block off specific days.</p>
          
          <div className="flex flex-col items-center">
            <Calendar
              mode="single"
              selected={undefined}
              onSelect={handleDateSelect}
              className="border-2 rounded-2xl shadow-sm mb-6 p-4"
              modifiers={{ blocked: blockedDates }}
              modifiersStyles={{ 
                blocked: { textDecoration: 'line-through', color: 'red' } 
              }}
            />
            
            <div className="w-full">
              <h4 className="text-sm font-medium mb-3">Blocked dates</h4>
              {blockedDates.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {blockedDates.map((date, i) => (
                    <Badge key={i} variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 rounded-xl px-4 py-1.5 flex items-center font-medium">
                      {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      <button 
                        className="ml-2 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-full p-0.5 transition-colors"
                        onClick={() => removeBlockedDate(date)}
                      >
                        ✕
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No dates blocked.</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 3 - Advance notice settings */}
        <div className="bg-card rounded-3xl border-2 p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-1">Booking settings</h2>
          <p className="text-muted-foreground mb-6">Control how students can book you.</p>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">Minimum Advance Notice</label>
              <Select defaultValue="24h">
                <SelectTrigger className="h-12 rounded-xl border-2 focus:border-indigo-500">
                  <SelectValue placeholder="Select notice period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="same-day">Same day</SelectItem>
                  <SelectItem value="12h">12 hours ahead</SelectItem>
                  <SelectItem value="24h">24 hours ahead</SelectItem>
                  <SelectItem value="48h">48 hours ahead</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Students can't book a session within this notice period.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} size="lg" className="h-12 rounded-xl font-semibold px-8 shadow-md hover:scale-105 transition-all" data-testid="button-save-availability">Save Availability</Button>
      </div>
    </div>
  );
}
