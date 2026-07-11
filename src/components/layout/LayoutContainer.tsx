import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const layoutContainerVariants = cva(
  "w-full mx-auto px-4 md:px-6 lg:px-8",
  {
    variants: {
      size: {
        default: "max-w-7xl",
        wide: "max-w-screen-2xl",
        reading: "max-w-4xl",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface LayoutContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layoutContainerVariants> {
  as?: React.ElementType;
}

export function LayoutContainer({
  className,
  size,
  as: Component = "div",
  ...props
}: LayoutContainerProps) {
  return (
    <Component
      className={cn(layoutContainerVariants({ size, className }))}
      {...props}
    />
  );
}
