import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-[120px] font-black text-primary leading-none mb-4 select-none">
        404
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Page not found</h1>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        We couldn't find the page you were looking for. It might have been moved, deleted, or perhaps you mistyped the URL.
      </p>
      
      <div className="flex items-center gap-4">
        <Button className="h-11 rounded-xl px-6 font-semibold" asChild>
          <Link href="/">Go back home</Link>
        </Button>
        <Button variant="outline" className="h-11 rounded-xl px-6 font-semibold border-2" asChild>
          <Link href="/help">Contact support</Link>
        </Button>
      </div>
    </div>
  );
}
