"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, AlertTriangle, CalendarCheck } from "lucide-react";

type Notification = {
    id: string;
    type: "ALERT" | "BOOKING";
    message: string;
    timestamp: string;
};

export function NotificationSidebar({ notifications }: { notifications: Notification[] }) {
    return (
        <Card className="h-full bg-card/50 backdrop-blur-sm border-white/10 flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    LIVE_FEED
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-4">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className="p-3 bg-black/20 border border-white/5 rounded-lg text-sm relative pl-8"
                    >
                        <div className="absolute left-2 top-3">
                            {notif.type === "ALERT" ? (
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                            ) : (
                                <CalendarCheck className="w-4 h-4 text-primary" />
                            )}
                        </div>
                        <p className="text-foreground leading-snug">{notif.message}</p>
                        <p className="text-[10px] text-muted-foreground mt-2 font-mono">{notif.timestamp}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
