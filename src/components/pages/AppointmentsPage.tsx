"use client";

import ListTemplate from "@/components/templates/ListTemplate";
import { useState } from "react";
import Timing from "@/types/common/Timing";
import AppointmentListFilters from "@/components/molecules/AppointmentListFilters";
import AppointmentList from "@/components/organisms/AppointmentList";
import { t } from "i18next";

function AppointmentsPage() {
    const [timing, setTiming] = useState<Timing>(Timing.Upcoming);

    return (
        <ListTemplate
            heading={t("appointments.appointments")}
            filters={
                <AppointmentListFilters
                    timing={timing}
                    setTiming={setTiming}
                />
            }
            list={
                <AppointmentList timing={timing} />
            }
        />
    );
}

export default AppointmentsPage;