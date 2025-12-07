"use client";

import { ProblematicVehiclesList } from "@/components/ProblematicVehiclesList";
import { Badge } from "@/components/ui/badge";

export default function ManufacturingDashboard() {
    // Mock Data
    const problematicVehicles = [
        { vin: "EV-8823-X", issue: "Battery Cell Overheat", root_cause: "Coolant Pump Logic Fault (FW v2.3)", severity: "Critical" as const, confidence: 0.98, batch_id: "BATCH-2025-Q1" },
        { vin: "EV-5541-A", issue: "Structural Vibration", root_cause: "Motor Mount Bolt Torque Variance", severity: "High" as const, confidence: 0.92, batch_id: "BATCH-2025-Q1" },
        { vin: "EV-9912-B", issue: "Inverter Signal Loss", root_cause: "Harness Connector Type B Corrosion", severity: "Medium" as const, confidence: 0.76, batch_id: "BATCH-2024-Q4" },
        { vin: "EV-3321-C", issue: "Regen Braking Lag", root_cause: "Software Latency in Module C", severity: "Low" as const, confidence: 0.65, batch_id: "BATCH-2025-Q1" },
    ];

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col p-6 gap-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground">MANUFACTURING_INTEL <span className="text-primary">// QA</span></h1>
                    <p className="text-muted-foreground">Prioritized list of vehicle defects and root causes.</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="border-destructive text-destructive">2 CRITICAL_ISSUES</Badge>
                </div>
            </header>

            <div className="flex-1 overflow-hidden">
                <ProblematicVehiclesList vehicles={problematicVehicles} />
            </div>
        </div>
    );
}
