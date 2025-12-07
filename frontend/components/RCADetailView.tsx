"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";

interface Insight {
    id: string;
    component: string;
    pattern: string;
    affected_batch: string;
    recommendation: string;
    confidence: number;
    created_at: string;
}

interface RCADetailViewProps {
    insights: Insight[];
}

export function RCADetailView({ insights }: RCADetailViewProps) {
    return (
        <Card className="bg-card/50 backdrop-blur-sm border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>ROOT_CAUSE_ANALYSIS_LOG</CardTitle>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Search className="w-4 h-4" /> Filter
                    </Button>
                    <Button variant="default" size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Download className="w-4 h-4" /> Export CSV
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/10 hover:bg-white/5">
                            <TableHead className="text-muted-foreground">COMPONENT</TableHead>
                            <TableHead className="text-muted-foreground">FAILURE PATTERN</TableHead>
                            <TableHead className="text-muted-foreground">BATCH</TableHead>
                            <TableHead className="text-muted-foreground">RECOMMENDATION</TableHead>
                            <TableHead className="text-right text-muted-foreground">CONFIDENCE</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {insights.map((item) => (
                            <TableRow key={item.id} className="border-white/10 hover:bg-white/5">
                                <TableCell className="font-medium text-foreground">{item.component}</TableCell>
                                <TableCell className="text-muted-foreground">{item.pattern}</TableCell>
                                <TableCell className="font-mono text-xs">{item.affected_batch}</TableCell>
                                <TableCell className="text-primary">{item.recommendation}</TableCell>
                                <TableCell className="text-right font-mono text-accent">
                                    {(item.confidence * 100).toFixed(0)}%
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
