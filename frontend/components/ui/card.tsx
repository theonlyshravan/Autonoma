import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "glass" | "outline";
}

export function Card({ className, variant = "glass", children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "relative rounded-lg p-6 overflow-hidden transition-all duration-300",
                // Clip Path style for "Hardware" look - we can do this with CSS or SVG.
                // For simplicity and responsiveness, let's use a subtle border radius + pseudo-element for the "cut" if needed.
                // Actually, let's just use the glass-panel class we defined + specific heavy borders.

                variant === "glass" && "glass-panel bg-card/60",
                variant === "default" && "bg-card border border-border/50 shadow-sm",
                variant === "outline" && "bg-transparent border border-primary/20 hover:border-primary/50",

                // The "Cut Corner" Aesthetic using clip-path could be excessive for all cards,
                // but let's add a decorative element.
                "group h-full",
                className
            )}
            {...props}
        >
            {/* Decorative "Cyber" corners */}
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-primary/20">
                    <path d="M0 0 L100 0 L100 100 Z" />
                </svg>
            </div>

            {children}
        </div>
    );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props}>{children}</div>;
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className={cn("font-display text-lg font-semibold leading-none tracking-tight text-foreground uppercase", className)} {...props}>{children}</h3>;
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("text-sm text-muted-foreground", className)} {...props}>{children}</div>;
}
