"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, CheckCircle } from "lucide-react";

interface AnomalyEvent {
    id: string;
    timestamp: string;
    anomaly_type: string;
    severity: string;
    diagnosis: string;
    confidence: number;
}

interface VehicleDiagnosticsProps {
    vin: string;
    history: AnomalyEvent[];
}

export function VehicleDiagnostics({ vin, history }: VehicleDiagnosticsProps) {
    if (!vin) {
        return (
            <Card className="h-full bg-card/50 backdrop-blur-sm border-white/10 flex items-center justify-center text-muted-foreground">
                <p>Select a vehicle to view diagnostics</p>
            </Card>
        );
    }

    return (
        <Card className="h-full bg-card/50 backdrop-blur-sm border-white/10 flex flex-col">
            <CardHeader className="border-b border-white/5">
                <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-accent" />
                    DIAGNOSTIC_LOG // {vin}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-6">
                {history.length === 0 ? (
                    <p className="text-muted-foreground text-center pt-10">No anomalies recorded.</p>
                ) : (
                    history.map((event) => (
                        <div key={event.id} className="relative pl-6 pb-2 border-l border-white/10 last:border-0">
                            <div className={`absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full ${event.severity === "High" ? "bg-red-500" : "bg-yellow-500"}`} />
                            <div className="mb-1 flex items-center gap-2">
                                <span className="text-xs font-mono text-muted-foreground">{new Date(event.timestamp).toLocaleString()}</span>
                                <Badge variant="outline" className={`text-[10px] ${event.severity === "High" ? "border-red-500 text-red-500" : "border-yellow-500 text-yellow-500"}`}>{event.severity}</Badge>
                            </div>
                            <h4 className="text-sm font-bold text-foreground mb-1">{event.anomaly_type}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                                {event.diagnosis}
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-primary font-mono">Confidence: {(event.confidence * 100).toFixed(0)}%</span>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
