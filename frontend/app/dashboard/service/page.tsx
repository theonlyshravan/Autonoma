"use client";

import { useEffect, useState } from "react";
import { AppointmentQueue } from "@/components/AppointmentQueue";
import { VehicleDiagnostics } from "@/components/VehicleDiagnostics";

// Types matching mock data
interface Booking {
    id: string;
    vin: string;
    owner: string;
    time: string;
    status: "PENDING" | "CONFIRMED" | "COMPLETED";
    issue: string;
}

export default function ServiceDashboard() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<Booking | undefined>(undefined);
    const [history, setHistory] = useState<any[]>([]);

    // Fetch Bookings
    useEffect(() => {
        fetch("http://localhost:8000/api/vehicles/bookings/all")
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(err => console.error("Failed to fetch bookings", err));
    }, []);

    // Fetch History when selection changes
    useEffect(() => {
        if (selectedBooking) {
            fetch(`http://localhost:8000/api/vehicles/${selectedBooking.vin}/history`)
                .then(res => res.json())
                .then(data => setHistory(data))
                .catch(err => console.error("Failed to fetch history", err));
        } else {
            setHistory([]);
        }
    }, [selectedBooking]);

    return (
        <div className="h-[calc(100vh-2rem)] grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Queue */}
            <div className="lg:col-span-1 h-full min-h-0">
                <AppointmentQueue
                    bookings={bookings}
                    onSelect={setSelectedBooking}
                    selectedId={selectedBooking?.id}
                />
            </div>

            {/* Right Col: Diagnostics */}
            <div className="lg:col-span-2 h-full min-h-0">
                <VehicleDiagnostics
                    vin={selectedBooking?.vin || ""}
                    history={history}
                />
            </div>
        </div>
    );
}
