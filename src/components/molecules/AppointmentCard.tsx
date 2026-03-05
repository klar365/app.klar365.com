"use client";

import { IconCar, IconClock, IconHourglass } from "@tabler/icons-react";
import { t } from "i18next";
import getIconSize from "@/utils/functions/getIconSize";
import formatDateTime from "@/utils/functions/formatDateTime";
import DataCard from "@/components/organisms/DataCard";

type AppointmentCardProps = {
    appointmentId: number;
    appointmentServiceName: string;
    appointmentStart: Date;
    appointmentLengthHours: number;
    appointmentVehicleLabel: string;
};

function AppointmentCard({
    appointmentId,
    appointmentServiceName,
    appointmentStart,
    appointmentLengthHours,
    appointmentVehicleLabel
}: Readonly<AppointmentCardProps>) {
    return (
        <DataCard
            title={appointmentServiceName}
            href={`/appointments/${appointmentId}`}
            entries={[
                {
                    label: t("common.datetime"),
                    name: <IconClock size={getIconSize("lg")} />,
                    value: (
                        <time>
                            {formatDateTime(appointmentStart)}
                        </time>
                    )
                },
                {
                    label: t("common.lengthInHours"),
                    name: <IconHourglass size={getIconSize("lg")} />,
                    value: (
                        <>
                            <span>{appointmentLengthHours}</span>
                            <span aria-hidden> t.</span>
                        </>
                    )
                },
                {
                    label: t("vehicles.vehicle"),
                    name: <IconCar size={getIconSize("lg")} />,
                    value: appointmentVehicleLabel
                }
            ]}
        />
    );
}

export default AppointmentCard;