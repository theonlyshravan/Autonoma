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
import { Badge } from "@/components/ui/badge";
import { AlertOctagon, ArrowRight } from "lucide-react";

type VehicleProblem = {
    vin: string;
    issue: string;
    root_cause: string;
    severity: "Critical" | "High" | "Medium" | "Low";
    confidence: number;
    batch_id: string;
};

export function ProblematicVehiclesList({ vehicles }: { vehicles: VehicleProblem[] }) {
    // Sort by severity (Critical > High > Medium > Low)
    const sortedVehicles = [...vehicles].sort((a, b) => {
        const severityMap = { "Critical": 4, "High": 3, "Medium": 2, "Low": 1 };
        return severityMap[b.severity] - severityMap[a.severity];
    });

    return (
        <Card className="h-full bg-card/50 backdrop-blur-sm border-white/10 flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <AlertOctagon className="w-5 h-5 text-destructive" />
                    PRIORITY_DEFECT_LIST
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="text-muted-foreground">VIN</TableHead>
                            <TableHead className="text-muted-foreground">ISSUE_DETECTED</TableHead>
                            <TableHead className="text-muted-foreground">ROOT_CAUSE (AI)</TableHead>
                            <TableHead className="text-muted-foreground">SEVERITY</TableHead>
                            <TableHead className="text-muted-foreground">CONFIDENCE</TableHead>
                            <TableHead className="text-right text-muted-foreground">ACTION</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedVehicles.map((vehicle) => (
                            <TableRow key={vehicle.vin} className="border-white/5 hover:bg-white/5">
                                <TableCell className="font-mono text-xs">{vehicle.vin}</TableCell>
                                <TableCell className="font-medium text-foreground">{vehicle.issue}</TableCell>
                                <TableCell className="text-muted-foreground italic">{vehicle.root_cause}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={
                                            vehicle.severity === "Critical" ? "border-red-500 text-red-500 bg-red-500/10" :
                                                vehicle.severity === "High" ? "border-orange-500 text-orange-500 bg-orange-500/10" :
                                                    "border-yellow-500 text-yellow-500 bg-yellow-500/10"
                                        }
                                    >
                                        {vehicle.severity.toUpperCase()}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary"
                                                style={{ width: `${vehicle.confidence * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-mono">{(vehicle.confidence * 100).toFixed(0)}%</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge className="cursor-pointer hover:bg-primary/80">INVESTIGATE <ArrowRight className="w-3 h-3 ml-1" /></Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
