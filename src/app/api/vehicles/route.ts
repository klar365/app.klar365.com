import QualityApi, { ok200 } from "qualityapi";
import Database from "@/utils/Database";

export const GET =
    QualityApi.createEndpointBuilder()
        .authenticate()
        .endpoint(async ({ session }) => {
            const queryResult = await Database.query<{
                id: number;
                name: string;
                plateNumber: string;
                upcomingAppointmentsCount: number;
            }>(`
                SELECT
                    id,
                    name,
                    plate_number,
                    (
                        SELECT COUNT(id) FROM appointments a
                        WHERE a.start > (NOW() AT TIME ZONE ('utc'))
                    ) as upcoming_appointments_count
                FROM vehicles v
                WHERE v.owner_user_id = $1
            `, [session.user.id]);

            return ok200(queryResult.rows);
        });