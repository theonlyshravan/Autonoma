"use client";

import { useEffect, useState } from "react";
import { InsightsOverview } from "@/components/InsightsOverview";
import { RCADetailView } from "@/components/RCADetailView";

interface Insight {
    id: string;
    component: string;
    pattern: string;
    affected_batch: string;
    recommendation: string;
    confidence: number;
    created_at: string;
}

export default function ManufacturingDashboard() {
    const [insights, setInsights] = useState<Insight[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/insights/")
            .then(res => res.json())
            .then(data => setInsights(data))
            .catch(err => console.error("Failed to fetch insights", err));
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-display font-bold text-foreground">MANUFACTURING_INTEL</h2>
                    <p className="text-muted-foreground font-mono text-xs">PLANT_ID: GIGA-TEXAS // STATUS: ACTIVE</p>
                </div>
            </div>

            <InsightsOverview insights={insights} />

            <RCADetailView insights={insights} />
        </div>
    );
}
