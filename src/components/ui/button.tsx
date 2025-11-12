import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const glassmorphismEffect = [
  "relative",
  "overflow-hidden",
  "backdrop-blur-lg",
  "shadow-xs",
  "hover:shadow-lg",
  "active:scale-95",
  "before:content-['''']",
  "before:absolute",
  "before:inset-0",
  "before:w-0",
  "before:origin-left",
  "before:transition-width",
  "before:duration-700",
  "before:ease-in-out",
  "hover:before:w-full",
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
          "bg-background shadow-xs hover:bg-accent dark:bg-input/30 dark:hover:bg-input/50",
        primary: `${glassmorphismEffect} bg-black/60 text-white hover:shadow-black/20 dark:bg-white/20 dark:text-black before:bg-black/50 dark:before:bg-white/50`,
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 dark:bg-destructive/60",
        secondary: `${glassmorphismEffect} bg-white/20 border border-white/20 text-foreground hover:shadow-white/20 dark:bg-black/30 before:bg-white/60 dark:before:bg-black/60`,
        ghost: "hover:bg-accent dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        glass: `${glassmorphismEffect} bg-white/20 text-foreground hover:shadow-primary/20 dark:bg-black/20 before:bg-white/50 dark:before:bg-black/50`,
      },
      size: {
        default: "h-10 px-4 text-sm",
        sm: "h-9 px-3 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-base",
        icon: "size-12",
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
