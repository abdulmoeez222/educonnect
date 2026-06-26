import { Link } from "wouter";
import { Star, ShieldCheck, BadgeCheck, Briefcase } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Consultant } from "@/lib/mock-data/consultants";

interface ConsultantCardProps {
  consultant: Consultant;
}

export function ConsultantCard({ consultant }: ConsultantCardProps) {
  return (
    <Card className="h-full flex flex-col rounded-2xl hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-lg transition-all duration-200 group relative overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row items-start gap-4">
        <Avatar className="h-16 w-16 ring-2 ring-amber-100 dark:ring-amber-900 shadow-sm">
          <AvatarImage src={consultant.avatarUrl} alt={consultant.name} />
          <AvatarFallback>{consultant.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="font-semibold text-lg truncate" title={consultant.name}>{consultant.name}</h3>
            {consultant.isVerified && <ShieldCheck className="h-4 w-4 text-amber-500 shrink-0" />}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 mr-1" />
              <span className="font-medium text-foreground">{consultant.rating}</span>
              <span className="ml-1">({consultant.reviews})</span>
            </div>
            <span>•</span>
            <div className="flex items-center text-xs">
              <Briefcase className="h-3.5 w-3.5 mr-1" />
              {consultant.yearsExperience} yrs exp
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 flex-1 flex flex-col gap-3">
        {consultant.isVerified && (
          <div className="w-fit bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 rounded-full px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1">
            <BadgeCheck className="h-3 w-3" />
            <span>Verified expert</span>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {consultant.expertise.slice(0, 3).map(exp => (
            <span key={exp} className="bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 rounded-full text-xs px-2.5 py-0.5 font-medium">
              {exp}
            </span>
          ))}
          {consultant.expertise.length > 3 && (
            <span className="border border-border text-muted-foreground rounded-full text-xs px-2.5 py-0.5 font-medium bg-card">
              +{consultant.expertise.length - 3}
            </span>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {consultant.bio}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between text-sm">
          <div className="text-xs text-muted-foreground">Starts from</div>
          <div className="text-lg font-bold text-foreground">
            PKR {consultant.packages.single}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 gap-2">
        <Button variant="outline" className="flex-1 bg-card h-9 font-medium text-sm rounded-xl border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 active:scale-[0.98] transition-transform duration-75" asChild>
          <Link href={`/consultant/${consultant.id}`}>View Profile</Link>
        </Button>
        <Button className="flex-1 h-9 font-medium text-sm rounded-xl bg-amber-600 hover:bg-amber-700 text-white active:scale-[0.98] transition-transform duration-75" asChild>
          <Link href={`/book-consultation/${consultant.id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
