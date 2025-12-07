import * as React from "react"
// import { Slot } from "@radix-ui/react-slot" - Removed unused import
// Actually, standardizing on simple props is better without extra deps if not needed.
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "ghost" | "link" | "cyber"
    size?: "default" | "sm" | "lg" | "icon"
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {

        // Core Styles
        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-sans tracking-wide uppercase"

        const variants = {
            default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)]",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            cyber: "bg-transparent border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary relative overflow-hidden group"
        }

        const sizes = {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10",
        }

        return (
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            >
                {variant === 'cyber' && (
                    <span className="absolute inset-0 w-full h-full bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -skew-x-12" />
                )}
                <span className="relative z-10 flex items-center gap-2">
                    {props.children}
                </span>
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button }
