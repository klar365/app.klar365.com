import Timing from "@/types/common/Timing";
import { Dispatch, SetStateAction } from "react";
import { Select } from "@mantine/core";
import { t } from "i18next";

type AppointmentListFiltersProps = {
    timing: Timing;
    setTiming: Dispatch<SetStateAction<Timing>>;
};

function AppointmentListFilters({ timing, setTiming }: Readonly<AppointmentListFiltersProps>) {
    return (
        <Select
            allowDeselect={false}
            value={timing}
            onChange={value => setTiming(value as Timing)}
            data={Object.values(Timing).map(i => ({
                value: i,
                label: t(`common.${i}`)
            }))}
        />
    );
}

export default AppointmentListFilters;