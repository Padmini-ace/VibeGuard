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
        urgencyLow: "border-transparent bg-urgency-low text-white",
        urgencyMedium: "border-transparent bg-urgency-medium text-white",
        urgencyHigh: "border-transparent bg-urgency-high text-white",
        urgencyCritical: "border-transparent bg-urgency-critical text-white animate-pulse",
        statusPending: "border-status-pending/30 bg-status-pending/15 text-status-pending",
        statusInProgress: "border-status-in-progress/30 bg-status-in-progress/15 text-status-in-progress",
        statusResolved: "border-status-resolved/30 bg-status-resolved/15 text-status-resolved",
        statusEscalated: "border-status-escalated/30 bg-status-escalated/15 text-status-escalated",
        categoryInfrastructure: "border-transparent bg-category-infrastructure text-white",
        categoryHealth: "border-transparent bg-category-health text-white",
        categoryEducation: "border-transparent bg-category-education text-white",
        categoryFinance: "border-transparent bg-category-finance text-white",
        categoryEnvironment: "border-transparent bg-category-environment text-white",
        categoryLaw: "border-transparent bg-category-law text-white",
        categorySocial: "border-transparent bg-category-social text-white",
        categoryOther: "border-transparent bg-category-other text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
