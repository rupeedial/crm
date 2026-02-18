import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-accent/10 text-accent border-accent/20",
        warning: "border-transparent bg-warning/10 text-warning border-warning/20",
        high: "border-transparent bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
        medium: "border-transparent bg-amber-500/10 text-amber-600 border-amber-500/20",
        low: "border-transparent bg-red-500/10 text-red-600 border-red-500/20",
        new: "border-transparent bg-blue-500/10 text-blue-600 border-blue-500/20",
        contacted: "border-transparent bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
        documents: "border-transparent bg-purple-500/10 text-purple-600 border-purple-500/20",
        logged: "border-transparent bg-pink-500/10 text-pink-600 border-pink-500/20",
        sanctioned: "border-transparent bg-orange-500/10 text-orange-600 border-orange-500/20",
        disbursed: "border-transparent bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
