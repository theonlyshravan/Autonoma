"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, AlertCircle } from "lucide-react";

interface Insight {
    id: string;
    component: string;
    pattern: string;
    affected_batch: string;
    confidence: number;
}

interface InsightsOverviewProps {
    insights: Insight[];
}

export function InsightsOverview({ insights }: InsightsOverviewProps) {
    // Take top 3
    const topInsights = insights.slice(0, 3);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {topInsights.map((insight, idx) => (
                <Card key={insight.id} className="bg-card/50 backdrop-blur-sm border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <AlertTriangle className="w-24 h-24 text-red-500" />
                    </div>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <Badge variant="outline" className="border-red-500 text-red-500 bg-red-500/10">
                                CRITICAL_PATTERN
                            </Badge>
                            <span className="text-2xl font-bold font-display text-white">0{idx + 1}</span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-1">{insight.component}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{insight.pattern}</p>

                        <div className="flex items-center gap-4 text-xs font-mono">
                            <div className="flex items-center gap-1 text-primary">
                                <AlertCircle className="w-3 h-3" />
                                Batch: {insight.affected_batch}
                            </div>
                            <div className="flex items-center gap-1 text-accent">
                                <TrendingUp className="w-3 h-3" />
                                Conf: {(insight.confidence * 100).toFixed(0)}%
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
