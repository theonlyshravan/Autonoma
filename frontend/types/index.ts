export interface TelemetryData {
    battery_temperature: number;
    vibration_level: number;
    motor_rpm: number;
    velocity: number;
}

export interface AgentAlert {
    type: "alert";
    data: {
        reason: string;
        severity: "Low" | "Medium" | "High" | "Critical";
        diagnosis: string;
        rul: number;
    };
}

export interface ChatMessage {
    type: "chat";
    data: {
        sender: string;
        content: string;
    }
}

export interface WebSocketMessage {
    type: "telemetry" | "alert" | "chat";
    data: TelemetryData | AgentAlert["data"] | ChatMessage["data"];
}
