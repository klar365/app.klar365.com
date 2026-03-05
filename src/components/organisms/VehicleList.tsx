"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@mantine/core";
import axios from "axios";
import VehicleCard from "@/components/molecules/VehicleCard";

export type Vehicle = {
    id: number;
    name: string | null;
    plateNumber: string;
    upcomingAppointmentsCount: number;
};

function VehicleList() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [vehicles, setVehicles] = useState<Vehicle[] | null>(null);

    useEffect(() => {
        setIsLoading(true);

        axios.get<Vehicle[]>("/api/vehicles")
            .then(response => {
                setVehicles(response.data);

                setIsLoading(false);
            })
            .catch(() => {});
    }, []);

    if (!isLoading && !vehicles) return null;

    if (isLoading) return Array.from({ length: 5 }).map((_, i) => (
        <Skeleton height={120.59} key={i} />
    ));

    return vehicles?.map(v => (
        <li key={v.id}>
            <VehicleCard
                vehicleId={v.id}
                vehicleName={v.name}
                vehiclePlateNumber={v.plateNumber}
                vehicleUpcomingAppointmentsCount={v.upcomingAppointmentsCount}
            />
        </li>
    ));
}

export default VehicleList;