"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Battery, Zap, AlertTriangle, MessageSquare } from "lucide-react";
import { useTelemetry } from "@/hooks/useTelemetry";
import { TelemetryChart } from "@/components/TelemetryChart";

export default function CustomerDashboard() {
    const { telemetry, telemetryHistory, alert, messages, isConnected } = useTelemetry();

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-display font-bold text-foreground">VEHICLE_STATUS</h2>
                    <p className="text-muted-foreground font-mono text-xs">ID: EV-8823-X // {isConnected ? "CONNECTED" : "DISCONNECTED"}</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant={isConnected ? "neon" : "outline"}>{isConnected ? "SYSTEM ONLINE" : "OFFLINE"}</Badge>
                    <Badge variant="outline" className="border-accent text-accent">HEALTH: {alert ? "ATTENTION" : "98%"}</Badge>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Visuals & Key Metrics */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Hero Vehicle Representation (Placeholder) */}
                    <Card className="h-64 flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                        <div className="text-center z-10">
                            <div className="w-32 h-32 rounded-full border-2 border-primary/30 mx-auto mb-4 flex items-center justify-center relative">
                                <div className={`absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-20 ${alert ? "animate-ping duration-500" : ""}`} />
                                <Zap className={`w-12 h-12 ${alert ? "text-red-500" : "text-primary"}`} />
                            </div>
                            <p className="font-display text-xl tracking-widest text-primary">MODEL_S_PLRAID</p>
                            {alert && <p className="text-red-500 font-bold animate-pulse">{alert.reason}</p>}
                        </div>
                        {/* Decorative Grid Lines */}
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    </Card>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <TelemetryChart data={telemetryHistory} dataKey="velocity" title="SPEED" unit="km/h" color="#0ea5e9" />
                        <TelemetryChart data={telemetryHistory} dataKey="battery_temperature" title="BATTERY TEMP" unit="°C" color="#ef4444" />
                        <TelemetryChart data={telemetryHistory} dataKey="motor_rpm" title="MOTOR RPM" unit="RPM" color="#22c55e" />
                        <TelemetryChart data={telemetryHistory} dataKey="vibration_level" title="VIBRATION" unit="G" color="#f97316" />
                    </div>

                    {/* Chart Placeholder / Data Stream View */}
                    <Card className="h-64 p-6">
                        <CardHeader className="px-0 pt-0">
                            <CardTitle>LIVE_TELEMETRY_LOG</CardTitle>
                        </CardHeader>
                        <div className="h-full w-full bg-black/40 rounded border border-white/5 p-4 font-mono text-xs overflow-y-auto">
                            {telemetry ? (
                                <div className="space-y-1">
                                    <p className="text-primary"> RX &gt; VELOCITY: {telemetry.velocity}</p>
                                    <p className="text-primary"> RX &gt; BATT_TEMP: {telemetry.battery_temperature}</p>
                                    <p className="text-primary"> RX &gt; VIBRATION: {telemetry.vibration_level}</p>
                                    <p className="text-muted-foreground"> ...streaming...</p>
                                </div>
                            ) : (
                                <p className="text-muted-foreground">AWAITING_DATA_STREAM...</p>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Right Column: Intelligent Agent Chat */}
                <div className="lg:col-span-1">
                    <Card className="h-full min-h-[500px] flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-primary" />
                                AUTONOMA_AGENT
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col">
                            <div className="flex-1 space-y-4 mb-4 overflow-y-auto max-h-[400px]">
                                {/* System Init */}
                                <div className="flex justify-start">
                                    <div className="bg-primary/10 border border-primary/20 text-primary-foreground p-3 rounded-br-lg rounded-tr-lg rounded-bl-lg max-w-[85%] text-sm">
                                        <p className="font-mono text-[10px] text-primary mb-1">SYSTEM</p>
                                        Vehicle diagnostics initialized. All systems nominal.
                                    </div>
                                </div>
                                {/* Live Messages */}
                                {messages.map((msg, idx) => (
                                    <div key={idx} className="flex justify-start">
                                        <div className="bg-primary/10 border border-primary/20 text-primary-foreground p-3 rounded-br-lg rounded-tr-lg rounded-bl-lg max-w-[85%] text-sm">
                                            <p className="font-mono text-[10px] text-primary mb-1">AI</p>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto pt-4 border-t border-white/10">
                                <input
                                    className="w-full bg-black/50 border border-white/10 rounded p-2 text-sm text-foreground focus:border-primary/50 focus:outline-none font-mono"
                                    placeholder="Type command..."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ label, value, icon: Icon, color = "text-primary" }: any) {
    return (
        <Card className="p-4 flex flex-col items-center justify-center text-center space-y-2 hover:bg-white/5 transition-colors">
            <Icon className={`w-6 h-6 ${color} opacity-80`} />
            <div>
                <p className="text-2xl font-display font-bold">{value}</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
            </div>
        </Card>
    )
}
