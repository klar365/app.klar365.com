"use client";

import { Paper, Text } from "@mantine/core";
import { IconCar, IconClock } from "@tabler/icons-react";
import { t } from "i18next";

import Link from "next/link";
import DataTable from "@/components/organisms/DataTable";
import iconSize from "@/utils/functions/iconSize";
import formatDateTime from "@/utils/functions/formatDateTime";

type AppointmentCardProps = {
    appointmentId: number;
    appointmentServiceName: string;
    appointmentStart: Date;
    appointmentVehicleLabel: string;
};

function AppointmentCard({
    appointmentId,
    appointmentServiceName,
    appointmentStart = new Date(),
    appointmentVehicleLabel
}: Readonly<AppointmentCardProps>) {
    return (
        <Paper
            withBorder
            shadow="md"
            component={Link}
            href={`/appointments/${appointmentId}`}
            className="p-4 focus-visible:border-(--mantine-primary-color-filled)">
            <Text size="xl" component="span">
                {appointmentServiceName}
            </Text>

            <DataTable
                size="lg"
                entries={[
                    {
                        label: t("common.datetime"),
                        name: <IconClock size={iconSize("lg")} />,
                        value: (
                            <time>
                                {formatDateTime(appointmentStart)}
                            </time>
                        )
                    },
                    {
                        label: t("vehicles.vehicle"),
                        name: <IconCar size={iconSize("lg")} />,
                        value: appointmentVehicleLabel
                    }
                ]}
            />
        </Paper>
    );
}

export default AppointmentCard;