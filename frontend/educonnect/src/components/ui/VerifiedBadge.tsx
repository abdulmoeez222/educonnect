import { ShieldCheck, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  type: 'expert' | 'topper';
  size?: 'sm' | 'md';
  className?: string;
}

export function VerifiedBadge({ type, size = 'sm', className }: VerifiedBadgeProps) {
  const isExpert = type === 'expert';
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  if (isExpert) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium',
          'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
          textSize,
          className
        )}
        data-testid="badge-verified-expert"
      >
        <ShieldCheck className={iconSize} />
        {size === 'md' && 'Verified Expert'}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium',
        'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400',
        textSize,
        className
      )}
      data-testid="badge-verified-topper"
    >
      <Award className={iconSize} />
      {size === 'md' && 'Verified Topper'}
    </span>
  );
}
