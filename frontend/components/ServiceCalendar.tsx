"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

type Booking = {
    id: string;
    vin: string;
    owner: string;
    time: string;
    date: string; // YYYY-MM-DD
    issue: string;
    severity: "Critical" | "High" | "Medium" | "Low";
    status: "PENDING" | "CONFIRMED" | "COMPLETED";
};

export function ServiceCalendar({ bookings }: { bookings: Booking[] }) {
    // Mock Calendar Grid for Dec 2025
    // Simple 7x5 grid visualization
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <Card className="h-full bg-card/50 backdrop-blur-sm border-white/10 flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    SERVICE_SCHEDULE // DEC 2025
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono text-muted-foreground mb-2">
                    <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {/* Padding for start of month (Dec 1 is Mon) */}
                    <div className="h-24 bg-transparent" />

                    {days.map(day => {
                        const dayBookings = bookings.filter(b => b.date === `2025-12-${day.toString().padStart(2, '0')}`);
                        return (
                            <div key={day} className="h-24 bg-black/20 border border-white/5 rounded p-1 flex flex-col gap-1 relative group hover:border-primary/30 transition-colors">
                                <span className="text-muted-foreground text-[10px] absolute top-1 right-2">{day}</span>
                                <div className="mt-4 flex flex-col gap-1 overflow-y-auto max-h-full no-scrollbar">
                                    {dayBookings.map(booking => (
                                        <div
                                            key={booking.id}
                                            className={`
                                                text-[9px] p-1 rounded truncate cursor-pointer
                                                ${booking.severity === "Critical" ? "bg-red-500/20 text-red-200 border border-red-500/30" :
                                                    booking.severity === "High" ? "bg-orange-500/20 text-orange-200 border border-orange-500/30" :
                                                        "bg-blue-500/20 text-blue-200 border border-blue-500/30"}
                                            `}
                                            title={`${booking.vin}: ${booking.issue}`}
                                        >
                                            {booking.time} - {booking.vin}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
