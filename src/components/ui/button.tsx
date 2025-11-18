import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const frostedGlassEffect = [
  "relative",
  "isolate",
  "overflow-hidden",
  "backdrop-blur-[30px]",
  "backdrop-saturate-[220%]",
  "before:content-['']",
  "before:absolute",
  "before:inset-0",
  "before:-z-10",
  "before:rounded-[inherit]",
  "before:opacity-90",
  "before:transition-opacity",
  "before:duration-[350ms]",
  "before:ease-[cubic-bezier(0.4,0,0.2,1)]",
  "hover:before:opacity-100",
  "[&>*]:relative",
  "[&>*]:z-10"
].join(" ")

const buttonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "whitespace-nowrap",
    "rounded-md",
    "font-medium",
    "transition-all",
    "duration-300",
    "ease-out",
    "active:scale-95",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "[&_svg]:pointer-events-none",
    "[&_svg:not([class*='size-'])]:size-4",
    "shrink-0",
    "[&_svg]:shrink-0",
    "outline-none",
    "aria-invalid:ring-destructive/20",
    "dark:aria-invalid:ring-destructive/40",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-background hover:bg-accent dark:bg-input/30 dark:hover:bg-input/50",
        primary: `bg-gradient-to-b from-primary to-[#191b18] text-primary-foreground`,
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 dark:bg-destructive/60",
        secondary: `bg-secondary hover:bg-secondary/80 text-secondary-foreground`,
        ghost: "hover:bg-accent dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        frosted: `${frostedGlassEffect} bg-white/45 border border-white/60 saturate-150 dark:bg-white/10 dark:border-white/20 before:bg-white/60 dark:before:bg-white/25`,
      },
      size: {
        default: "h-10 sm:h-11 px-4 text-sm",
        sm: "h-9 sm:h-10 px-3 text-sm",
        lg: "h-11 sm:h-12 px-6 text-base",
        xl: "h-12 sm:h-14 px-8 text-base",
        icon: "size-10 sm:size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
