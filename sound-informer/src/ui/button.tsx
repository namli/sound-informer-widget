import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "si-inline-flex si-items-center si-justify-center si-whitespace-nowrap si-rounded-md si-text-sm si-font-medium si-ring-offset-white si-transition-colors focus-visible:si-outline-none focus-visible:si-ring-2 focus-visible:si-ring-gray-950 focus-visible:si-ring-offset-2 disabled:si-pointer-events-none disabled:si-opacity-50",
  {
    variants: {
      variant: {
        default: "si-bg-gray-900 si-text-gray-50 hover:si-bg-gray-900/90",
        destructive:
          "si-bg-red-500 si-text-gray-50 hover:si-bg-red-500/90",
        outline:
          "si-border si-border-gray-200 si-bg-white hover:si-bg-gray-100 hover:si-text-gray-900",
        secondary:
          "si-bg-gray-100 si-text-gray-900 hover:si-bg-gray-100/80",
        ghost: "hover:si-bg-gray-100 hover:si-text-gray-900",
        link: "si-text-gray-900 si-underline-offset-4 hover:si-underline",
      },
      size: {
        default: "si-h-10 si-px-4 si-py-2",
        sm: "si-h-9 si-rounded-md si-px-3",
        lg: "si-h-11 si-rounded-md si-px-8",
        icon: "si-h-10 si-w-10",
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
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
