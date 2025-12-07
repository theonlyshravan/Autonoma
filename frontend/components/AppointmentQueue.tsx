"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Clock } from "lucide-react";

interface Booking {
    id: string;
    vin: string;
    owner: string;
    time: string;
    status: "PENDING" | "CONFIRMED" | "COMPLETED";
    issue: string;
}

interface AppointmentQueueProps {
    bookings: Booking[];
    onSelect: (booking: Booking) => void;
    selectedId?: string;
}

export function AppointmentQueue({ bookings, onSelect, selectedId }: AppointmentQueueProps) {
    return (
        <Card className="h-full bg-card/50 backdrop-blur-sm border-white/10 flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    SERVICE_QUEUE
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
                <div className="space-y-3">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            onClick={() => onSelect(booking)}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedId === booking.id
                                    ? "bg-primary/20 border-primary"
                                    : "bg-black/40 border-white/5 hover:bg-white/5"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-bold text-sm tracking-wide text-foreground">{booking.vin}</p>
                                    <p className="text-xs text-muted-foreground">{booking.owner}</p>
                                </div>
                                <Badge variant={booking.status === "PENDING" ? "outline" : "default"} className={booking.status === "PENDING" ? "border-yellow-500 text-yellow-500" : ""}>
                                    {booking.status}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                <Clock className="w-3 h-3" />
                                {booking.time}
                            </div>
                            <p className="text-sm text-primary font-mono bg-primary/10 p-1 rounded inline-block">
                                {booking.issue}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
