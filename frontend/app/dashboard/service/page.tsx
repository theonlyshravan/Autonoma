"use client";

import { useState } from "react";
import { ServiceCalendar } from "@/components/ServiceCalendar";
import { NotificationSidebar } from "@/components/NotificationSidebar";
import { Badge } from "@/components/ui/badge";

export default function ServiceDashboard() {
    // Mock Data
    const bookings = [
        { id: "1", vin: "OD 07 AP 6654", owner: "John Doe", time: "11:00 AM", date: "2025-12-12", issue: "Battery Overheating", severity: "Critical" as const, status: "PENDING" as const },
        { id: "2", vin: "TS 09 XY 1234", owner: "Sarah Smith", time: "02:00 PM", date: "2025-12-12", issue: "Tire Alignment", severity: "Medium" as const, status: "CONFIRMED" as const },
        { id: "3", vin: "KA 01 AB 9999", owner: "Mike Ross", time: "10:00 AM", date: "2025-12-13", issue: "Coolant Leak", severity: "High" as const, status: "PENDING" as const },
    ];

    const notifications = [
        { id: "1", type: "BOOKING" as const, message: "Car number OD 07 AP 6654 is scheduled at 11 AM on 12th of December. Problem: battery got overheated, coolant is not working.", timestamp: "2 mins ago" },
        { id: "2", type: "ALERT" as const, message: "New Anomaly Detected: VIN TS 09 XY 1234 reported high vibration levels during highway driving.", timestamp: "15 mins ago" },
    ];

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col p-6 gap-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground">SERVICE_CENTER <span className="text-primary">// OPS</span></h1>
                    <p className="text-muted-foreground">Manage appointments and active vehicle alerts.</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="border-primary text-primary">3 PENDING_TASKS</Badge>
                </div>
            </header>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
                <div className="lg:col-span-2 h-full">
                    <ServiceCalendar bookings={bookings} />
                </div>
                <div className="h-full">
                    <NotificationSidebar notifications={notifications} />
                </div>
            </div>
        </div>
    );
}
