"use client";

import { IconCalendarBolt, IconId } from "@tabler/icons-react";
import { t } from "i18next";
import getIconSize from "@/utils/functions/getIconSize";
import DataCard from "@/components/organisms/DataCard";

type AppointmentCardProps = {
    vehicleId: number;
    vehicleName: string | null;
    vehiclePlateNumber: string;
    vehicleUpcomingAppointmentsCount: number;
};

function AppointmentCard({
    vehicleId,
    vehicleName,
    vehiclePlateNumber,
    vehicleUpcomingAppointmentsCount
}: Readonly<AppointmentCardProps>) {
    return (
        <DataCard
            title={vehicleName ?? undefined}
            href={`/vehicles/${vehicleId}`}
            entries={[
                {
                    label: t("common.plateNumber"),
                    name: <IconId size={getIconSize("lg")} />,
                    value: vehiclePlateNumber
                },
                {
                    label: t("common.upcomingAppointmentsCount"),
                    name: <IconCalendarBolt size={getIconSize("lg")} />,
                    value: vehicleUpcomingAppointmentsCount
                }
            ]}
        />
    );
}

export default AppointmentCard;