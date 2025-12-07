"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Correct hook for App Router
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Wrench,
    Factory,
    Settings,
    LogOut,
    ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
    {
        role: "customer",
        items: [
            { name: "My Vehicle", href: "/dashboard/customer", icon: LayoutDashboard },
            { name: "Settings", href: "/dashboard/customer/settings", icon: Settings },
        ]
    },
    {
        role: "service",
        items: [
            { name: "Service Queue", href: "/dashboard/service", icon: Wrench },
            { name: "Diagnostics", href: "/dashboard/service/diagnostics", icon: ShieldCheck },
        ]
    },
    {
        role: "manufacturing",
        items: [
            { name: "Insights", href: "/dashboard/manufacturing", icon: Factory },
            { name: "RCA Reports", href: "/dashboard/manufacturing/rca", icon: LayoutDashboard },
        ]
    }
];

// For now, we'll show all or mock strict role. Let's make it generic for the shell.
// In reality, we filter by user role.
// Mocking "customer" view as default for visual dev.

export function Sidebar() {
    const pathname = usePathname();
    // TODO: Get role from Auth Context
    const currentRole = "customer";

    const activeGroup = navItems.find(g => g.role === currentRole)?.items || [];

    return (
        <div className="flex flex-col h-full w-64 border-r border-[#1F2937]/30 bg-[#0A0A0A]/50 backdrop-blur-md">
            <div className="p-6 border-b border-[#1F2937]/30">
                <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tighter">
                    AUTONOMA
                </h1>
                <p className="text-xs text-muted-foreground font-mono mt-1 tracking-widest">
                    SYSTEM V1.0
                </p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {activeGroup.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <Button
                            variant={pathname === item.href ? "cyber" : "ghost"}
                            className={cn("w-full justify-start", pathname === item.href ? "text-primary border-primary/20 bg-primary/5" : "text-muted-foreground")}
                        >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.name}
                        </Button>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-[#1F2937]/30">
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20">
                    <LogOut className="mr-2 h-4 w-4" />
                    Disconnect
                </Button>
            </div>
        </div>
    );
}
