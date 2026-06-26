import { Link } from "wouter";
import { FileText, Play, FileCheck, FileCode, Star, Download } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Resource } from "@/lib/mock-data/resources";
import { PriceTag } from "@/components/ui/PriceTag";

interface ResourceCardProps {
  resource: Resource;
  showDownload?: boolean;
}

export function ResourceCard({ resource, showDownload }: ResourceCardProps) {
  const getIcon = () => {
    switch (resource.type) {
      case 'pdf': return <FileText className="h-7 w-7 text-red-500" />;
      case 'video': return <Play className="h-7 w-7 text-blue-500" />;
      case 'notes': return <FileCheck className="h-7 w-7 text-green-500" />;
      case 'practice-test': return <FileCode className="h-7 w-7 text-purple-500" />;
    }
  };

  const getTypeName = () => {
    switch (resource.type) {
      case 'pdf': return 'PDF Document';
      case 'video': return 'Video Course';
      case 'notes': return 'Study Notes';
      case 'practice-test': return 'Practice Test';
    }
  };

  const getBgClass = () => {
    switch (resource.type) {
      case 'pdf': return 'from-red-50 to-rose-100 dark:from-red-950/30 dark:to-rose-950/20';
      case 'video': return 'from-blue-50 to-sky-100 dark:from-blue-950/30 dark:to-sky-950/20';
      case 'notes': return 'from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/20';
      case 'practice-test': return 'from-purple-50 to-violet-100 dark:from-purple-950/30 dark:to-violet-950/20';
      default: return 'from-muted to-muted';
    }
  };

  return (
    <Card className="h-full flex flex-col rounded-2xl hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-lg transition-all duration-200 group overflow-hidden">
      <div className={`h-32 flex flex-col items-center justify-center relative p-4 text-center border-b bg-gradient-to-br ${getBgClass()}`}>
        {resource.isFeatured && (
          <Badge className="absolute top-2 right-2 bg-primary/20 text-primary hover:bg-primary/30 border-none z-10">
            Featured
          </Badge>
        )}
        {showDownload && (
          <Button size="icon" variant="secondary" className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-sm z-10 active:scale-[0.98] transition-transform duration-75">
            <Download className="h-4 w-4" />
          </Button>
        )}
        <div className="bg-white dark:bg-card p-3 rounded-2xl shadow-sm mb-2 group-hover:scale-110 transition-transform duration-200">
          {getIcon()}
        </div>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{getTypeName()}</span>
      </div>
      
      <CardContent className="p-4 pt-3 flex-1 flex flex-col">
        <Badge variant="outline" className="w-fit mb-2 text-xs bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800 rounded-full font-medium">
          {resource.subject}
        </Badge>
        
        <h3 className="font-semibold text-base leading-tight mb-1 line-clamp-2" title={resource.title}>
          {resource.title}
        </h3>
        
        <p className="text-xs text-muted-foreground mb-3">By {resource.creator}</p>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {resource.preview}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
          <div className="flex items-center gap-1 text-xs font-medium">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span className="font-medium text-foreground">{resource.rating}</span>
          </div>
          <div className="flex items-center text-teal-600 dark:text-teal-400">
            <Download className="h-3.5 w-3.5 mr-1" />
            <span>{resource.downloads >= 1000 ? `${(resource.downloads / 1000).toFixed(1)}k` : resource.downloads}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <PriceTag price={resource.price} />
        <Button 
          size="sm" 
          variant={resource.price === 0 ? "default" : "secondary"} 
          className={`rounded-xl active:scale-[0.98] transition-transform duration-75 ${resource.price === 0 ? 'bg-teal-600 hover:bg-teal-700 text-white' : ''}`}
          asChild
        >
          <Link href={`/resource/${resource.id}`}>
            {resource.price === 0 ? 'Download' : 'Purchase'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
