import { Link } from "wouter";
import { Star, ShieldCheck, Trophy, MapPin, Video, Users } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tutor } from "@/lib/mock-data/tutors";

interface TutorCardProps {
  tutor: Tutor;
}

export function TutorCard({ tutor }: TutorCardProps) {
  return (
    <Card className="h-full flex flex-col rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-200 group relative overflow-hidden">
      {tutor.isFeatured && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded-bl-xl rounded-tr-2xl z-10 tracking-wide uppercase">
          Featured
        </div>
      )}
      
      <CardHeader className="p-4 pb-2 flex flex-row items-start gap-4">
        <Avatar className="h-16 w-16 ring-2 ring-indigo-100 dark:ring-indigo-900 shadow-sm">
          <AvatarImage src={tutor.avatarUrl} alt={tutor.name} />
          <AvatarFallback>{tutor.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="font-semibold text-lg truncate" title={tutor.name}>{tutor.name}</h3>
            {tutor.isVerified && <ShieldCheck className="h-4 w-4 text-indigo-500 shrink-0" />}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 flex-wrap">
            <div className="flex items-center">
              <span className="font-medium text-foreground text-sm">{tutor.rating}</span>
              <div className="flex items-center gap-0.5 ml-1 mr-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`h-3 w-3 ${s <= Math.floor(tutor.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`} />
                ))}
              </div>
              <span className="text-muted-foreground text-xs">({tutor.reviews})</span>
            </div>
            <span>•</span>
            <div className="flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {tutor.location}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 flex-1 flex flex-col gap-3">
        {tutor.isTopTutor && (
          <div className="w-fit flex items-center bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 rounded-full px-2.5 py-0.5 text-xs font-semibold">
            <Trophy className="h-3 w-3 mr-1" />
            <span>Top rated tutor</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1.5">
          {tutor.subjects.slice(0, 3).map(subject => (
            <span key={subject} className="bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800 rounded-full text-xs px-2.5 py-0.5 font-medium">
              {subject}
            </span>
          ))}
          {tutor.subjects.length > 3 && (
            <span className="border border-border text-muted-foreground rounded-full text-xs px-2.5 py-0.5 font-medium bg-card">
              +{tutor.subjects.length - 3} more
            </span>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {tutor.bio}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            {tutor.sessionFormat === 'online' || tutor.sessionFormat === 'both' ? (
              <Badge variant="secondary" className="font-normal text-xs px-1.5 py-0.5"><Video className="h-3 w-3 mr-1" /> Online</Badge>
            ) : null}
            {tutor.sessionFormat === 'in-person' || tutor.sessionFormat === 'both' ? (
              <Badge variant="secondary" className="font-normal text-xs px-1.5 py-0.5"><Users className="h-3 w-3 mr-1" /> In-person</Badge>
            ) : null}
          </div>
          <div className="text-lg font-bold text-foreground">
            PKR {tutor.hourlyRate}<span className="text-muted-foreground font-normal text-xs">/hr</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 gap-2">
        <Button variant="outline" className="flex-1 bg-card h-9 font-medium text-sm rounded-xl border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 active:scale-[0.98] transition-transform duration-75" asChild>
          <Link href={`/tutor/${tutor.id}`}>View Profile</Link>
        </Button>
        <Button className="flex-1 h-9 font-medium text-sm rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white active:scale-[0.98] transition-transform duration-75" asChild>
          <Link href={`/book/${tutor.id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
