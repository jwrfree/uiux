import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default:
          "bg-background shadow-xs hover:bg-accent dark:bg-input/30 dark:hover:bg-input/50",
        primary:
          "relative overflow-hidden bg-black/40 backdrop-blur-lg text-white shadow-xs hover:shadow-lg hover:shadow-black/20 active:scale-95 dark:bg-white/20 dark:text-black before:content-[''] before:absolute before:inset-0 before:bg-black/50 dark:before:bg-white/50 before:scale-x-0 before:origin-left before:transition-transform before:duration-700 before:ease-in-out hover:before:scale-x-100 [&>*]:relative [&>*]:z-10",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 dark:bg-destructive/60",
        secondary:
          "relative overflow-hidden bg-white/40 backdrop-blur-lg text-foreground shadow-xs hover:shadow-lg hover:shadow-white/20 active:scale-95 dark:bg-black/30 before:content-[''] before:absolute before:inset-0 before:bg-white/60 dark:before:bg-black/60 before:scale-x-0 before:origin-left before:transition-transform before:duration-700 before:ease-in-out hover:before:scale-x-100 [&>*]:relative [&>*]:z-10",
        ghost:
          "hover:bg-accent dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        glass:
          "relative overflow-hidden bg-white/20 backdrop-blur-lg text-foreground shadow-xs hover:shadow-lg hover:shadow-primary/20 active:scale-95 dark:bg-black/20 before:content-[''] before:absolute before:inset-0 before:bg-white/50 dark:before:bg-black/50 before:scale-x-0 before:origin-left before:transition-transform before:duration-700 before:ease-in-out hover:before:scale-x-100 [&>*]:relative [&>*]:z-10",
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
    />
  )
}

export { Button, buttonVariants }
