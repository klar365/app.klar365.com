import QualityApi, { ok200, ResponseBody } from "qualityapi";
import Database from "@/utils/Database";
import z from "zod";
import Timing from "@/types/common/Timing";

export const GET =
    QualityApi.createEndpointBuilder()
        .authenticate()
        .searchParams(
            z.object({
                timing: z.enum(Timing)
            })
        )
        .endpoint(async ({ session, searchParams }) => {
            const queryResult = await Database.query<{
                id: number;
                serviceName: string;
                start: Date;
                lengthHours: number;
                vehicleName: string;
                vehiclePlateNumber: string;
            }>(`
                SELECT
                    a.id,
                    s.name as service_name,
                    a.start,
                    s.length_hours as length_hours,
                    v.name as vehicle_name,
                    v.plate_number as vehicle_plate_number
                FROM appointments a
                JOIN vehicles v ON a.vehicle_id = v.id
                JOIN services s ON a.service_id = s.id
                WHERE (
                    ($1 = 'all') OR
                    ($1 = 'upcoming' AND a.start > NOW()) OR
                    ($1 = 'previous' AND a.start < NOW())
                ) AND a.user_id = $2
            `, [searchParams.timing, session.user.id]);

            return ok200(queryResult.rows);
        });