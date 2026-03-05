"use client";

import ListTemplate from "@/components/templates/ListTemplate";
import { t } from "i18next";
import VehicleList from "@/components/organisms/VehicleList";

function VehiclesPage() {
    return (
        <ListTemplate
            heading={t("vehicles.vehicles")}
            list={<VehicleList />}
        />
    );
}

export default VehiclesPage;