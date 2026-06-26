import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface PriceTagProps {
  price: number;
  variant?: 'free' | 'paid' | 'bundle' | 'strike';
  className?: string;
}

export function PriceTag({ price, variant, className }: PriceTagProps) {
  const determinedVariant = variant || (price === 0 ? 'free' : 'paid');

  if (determinedVariant === 'free') {
    return (
      <span className={cn("text-teal-600 font-semibold", className)}>
        Free
      </span>
    );
  }

  const formattedPrice = `PKR ${price.toLocaleString()}`;

  if (determinedVariant === 'strike') {
    return (
      <span className={cn("line-through text-muted-foreground", className)}>
        {formattedPrice}
      </span>
    );
  }

  if (determinedVariant === 'bundle') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <span className="text-indigo-600 font-bold">{formattedPrice}</span>
        <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none px-1.5 py-0">Bundle</Badge>
      </div>
    );
  }

  return (
    <span className={cn("font-semibold text-foreground", className)}>
      {formattedPrice}
    </span>
  );
}
