import QualityApi, { noContent204 } from "qualityapi";
import Database from "@/utils/Database";

export const GET =
    QualityApi.createEndpointBuilder()
        .authenticate()
        .endpoint(async ({ session }) => {
            await Database.query(`
                DELETE FROM sessions
                WHERE id = $1
            `, [session.id]);

            const response = noContent204();

            response.headers.set("Clear-Site-Data", "*");

            return response;
        });