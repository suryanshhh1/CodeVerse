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
      offset: {
        none: "",
        navbar: "pt-16 md:pt-20",
      },
    },
    defaultVariants: {
      size: "default",
      offset: "navbar",
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
  offset,
  as: Component = "div",
  ...props
}: LayoutContainerProps) {
  return (
    <Component
      className={cn(layoutContainerVariants({ size, offset, className }))}
      {...props}
    />
  );
}
