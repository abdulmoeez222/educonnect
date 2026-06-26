import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ACADEMY_TUTORS, ACADEMY_STUDENTS, SCHEDULE_TIME_SLOTS, SCHEDULE_DAYS, MOCK_SCHEDULE } from "@/lib/mock-data/academy-data";

export default function Scheduling() {
  const { toast } = useToast();
  const [schedule, setSchedule] = useState(MOCK_SCHEDULE);
  const [slotOpen, setSlotOpen] = useState<{ tutor: string; day: string; time: string } | null>(null);
  const [assignStudent, setAssignStudent] = useState('');

  const tutors = ACADEMY_TUTORS.filter(t => t.status === 'active');

  const getCellKey = (tutorId: string, day: string, time: string) => `${day}-${time}`;

  const handleAssign = () => {
    if (!slotOpen || !assignStudent) return;
    const student = ACADEMY_STUDENTS.find(s => s.id === assignStudent);
    if (!student) return;
    const key = getCellKey(slotOpen.tutor, slotOpen.day, slotOpen.time);
    setSchedule(prev => ({
      ...prev,
      [slotOpen.tutor]: { ...(prev[slotOpen.tutor] || {}), [key]: student.name },
    }));
    setSlotOpen(null);
    setAssignStudent('');
    toast({ title: 'Session assigned', description: `${student.name} with ${tutors.find(t => t.id === slotOpen.tutor)?.name} on ${slotOpen.day} at ${slotOpen.time}` });
  };

  const handleClear = (tutorId: string, day: string, time: string) => {
    const key = getCellKey(tutorId, day, time);
    setSchedule(prev => {
      const next = { ...prev, [tutorId]: { ...(prev[tutorId] || {}) } };
      delete next[tutorId][key];
      return next;
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Bulk scheduling</h1>
        <p className="text-muted-foreground">Assign sessions across all tutors. Click any empty slot to assign a student.</p>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded bg-primary/20 border border-primary/40" />Assigned</div>
        <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded bg-muted border border-dashed border-border" />Available</div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Day headers */}
          <div className="grid gap-px mb-px" style={{ gridTemplateColumns: `180px repeat(${SCHEDULE_DAYS.length}, 1fr)` }}>
            <div className="h-10 flex items-center px-3 bg-muted rounded-tl-lg">
              <span className="text-xs font-medium text-muted-foreground">Tutor / Slot</span>
            </div>
            {SCHEDULE_DAYS.map(day => (
              <div key={day} className="h-10 flex items-center justify-center bg-muted text-xs font-semibold text-muted-foreground last:rounded-tr-lg">
                {day}
              </div>
            ))}
          </div>

          {/* Tutor rows */}
          {tutors.map((tutor, ti) => (
            <div key={tutor.id}>
              {SCHEDULE_TIME_SLOTS.map((time, si) => (
                <div key={time} className="grid gap-px mb-px" style={{ gridTemplateColumns: `180px repeat(${SCHEDULE_DAYS.length}, 1fr)` }}>
                  {/* Tutor label — only on first time slot */}
                  <div className={`flex items-center px-3 bg-muted/60 min-h-[2.5rem] ${si === 0 ? 'border-t border-border' : ''}`}>
                    {si === 0 ? (
                      <div>
                        <p className="text-xs font-semibold truncate">{tutor.name}</p>
                        <p className="text-[10px] text-muted-foreground">{tutor.subject}</p>
                      </div>
                    ) : (
                      <span className="text-[10px] text-muted-foreground pl-2">{time}</span>
                    )}
                  </div>

                  {SCHEDULE_DAYS.map(day => {
                    const key = getCellKey(tutor.id, day, time);
                    const studentName = schedule[tutor.id]?.[key];
                    return (
                      <div key={day} className={`min-h-[2.5rem] border ${si === 0 ? 'border-t border-border' : 'border-transparent'}`}>
                        {studentName ? (
                          <div
                            className="h-full min-h-[2.5rem] bg-primary/10 border border-primary/30 rounded flex items-center justify-between px-2 cursor-pointer group hover:bg-primary/20 transition-colors"
                            onClick={() => handleClear(tutor.id, day, time)}
                            title="Click to clear"
                            data-testid={`cell-${tutor.id}-${day}-${time}`}
                          >
                            <span className="text-[10px] font-medium text-primary truncate">{studentName}</span>
                            <span className="text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 shrink-0 transition-all duration-200">✕</span>
                          </div>
                        ) : (
                          <button
                            className="h-full w-full min-h-[2.5rem] border border-dashed border-border rounded hover:border-primary/50 hover:bg-primary/5 transition-colors"
                            onClick={() => setSlotOpen({ tutor: tutor.id, day, time })}
                            data-testid={`empty-${tutor.id}-${day}-${time}`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!slotOpen} onOpenChange={() => { setSlotOpen(null); setAssignStudent(''); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Session</DialogTitle>
          </DialogHeader>
          {slotOpen && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Tutor:</span> <span className="font-medium">{tutors.find(t => t.id === slotOpen.tutor)?.name}</span></div>
                <div><span className="text-muted-foreground">Day:</span> <span className="font-medium">{slotOpen.day}</span></div>
                <div><span className="text-muted-foreground">Time:</span> <span className="font-medium">{slotOpen.time}</span></div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Select student</label>
                <Select value={assignStudent} onValueChange={setAssignStudent}>
                  <SelectTrigger data-testid="select-student">
                    <SelectValue placeholder="Choose a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {ACADEMY_STUDENTS.filter(s => s.status === 'active').map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.name} — {s.grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSlotOpen(null)}>Cancel</Button>
            <Button onClick={handleAssign} disabled={!assignStudent} data-testid="btn-assign-session">
              Assign Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
