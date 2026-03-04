"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@mantine/core";

import AppointmentCard from "@/components/molecules/AppointmentCard";
import axios from "axios";

export enum Timing {
    All = "all",
    Upcoming = "upcoming",
    Previous = "previous"
}

export type Appointment = {
    id: number;
    serviceName: string;
    start: string;
    vehicleName: string | null;
    vehiclePlateNumber: string;
};

type AppointmentListProps = {
    timing?: Timing;
};

function AppointmentList({
    timing = Timing.Upcoming
}: Readonly<AppointmentListProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [appointments, setAppointments] = useState<Appointment[] | null>(null);

    useEffect(() => {
        setIsLoading(true);

        axios.get<Appointment[]>("/api/appointments", {
            params: { timing }
        })
            .then(response => {
                setAppointments(response.data);

                setIsLoading(false);
            })
            .catch(() => {});
    }, [timing]);

    if (!isLoading && !appointments) return null;

    if (isLoading) return Array.from({ length: 5 }).map((_, i) => (
        <Skeleton height={128.59} key={i} />
    ));

    return appointments?.map(a => (
        <li key={a.id}>
            <AppointmentCard
                appointmentId={a.id}
                appointmentServiceName={a.serviceName}
                appointmentStart={new Date(a.start)}
                appointmentVehicleLabel={
                    a.vehicleName
                        ? `${a.vehicleName} (${a.vehiclePlateNumber})`
                        : a.vehiclePlateNumber
                }
            />
        </li>
    ));
}

export default AppointmentList;