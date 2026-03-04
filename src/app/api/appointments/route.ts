import QualityApi, { ok200, ResponseBody } from "qualityapi";
import Database from "@/utils/Database";
import z from "zod";

import { Timing } from "@/components/organisms/AppointmentList";

export const GET =
    QualityApi.createEndpointBuilder()
        // .authenticate()
        // .searchParams(z.object({ timing: z.enum(Timing) }))
        .endpoint(async ({ searchParams }) => {

            const queryResult = await Database.query<{
                id: number;
                serviceName: string;
                start: Date;
                vehicleName: string;
                vehiclePlateNumber: string;
            }>(`
                SELECT
                    a.id,
                    s.name as service_name,
                    a.start,
                    v.name as vehicle_name,
                    v.plate_number as vehicle_plate_number
                FROM appointments a
                JOIN vehicles v ON a.vehicle_id = v.id
                JOIN services s ON a.service_id = s.id
                WHERE
                    ($1 = 'all') OR
                    ($1 = 'upcoming' AND a.start > NOW()) OR
                    ($1 = 'previous' AND a.start < NOW())
            `, ["all"]);

            return ok200(queryResult.rows as ResponseBody);
        });