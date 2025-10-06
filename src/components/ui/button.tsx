import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-aiplace-blue via-aiplace-purple to-aiplace-cyan text-white hover:from-aiplace-blue/90 hover:via-aiplace-purple/90 hover:to-aiplace-cyan/90 shadow-xl shadow-aiplace-blue/30 hover:shadow-2xl hover:shadow-aiplace-purple/40 hover:-translate-y-1 hover:scale-105",
        secondary:
          "bg-white text-aiplace-navy border-2 border-aiplace-blue/30 hover:border-aiplace-blue hover:bg-aiplace-blue/5 shadow-lg hover:shadow-xl hover:-translate-y-0.5",
        ghost:
          "text-slate-600 hover:text-aiplace-blue hover:bg-aiplace-blue/5",
        outline:
          "border-2 border-aiplace-blue text-aiplace-blue hover:bg-gradient-to-r hover:from-aiplace-blue hover:to-aiplace-purple hover:text-white shadow-md hover:shadow-xl hover:-translate-y-0.5",
        link: "text-aiplace-blue underline-offset-4 hover:underline hover:text-aiplace-purple",
      },
      size: {
        default: "h-12 px-8 py-3 text-base",
        sm: "h-10 rounded-lg px-5 text-sm",
        lg: "h-14 rounded-xl px-10 text-lg",
        xl: "h-16 rounded-2xl px-12 text-xl",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
