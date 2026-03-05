import { Configuration } from "qualityapi";
import cookie from "cookie";
import Database from "@/utils/Database";

const QUALITYAPI_CONFIG: Configuration = {
    authentication: {
        authenticate: async request => {
            const header = request.headers.get("Cookie");

            if (!header) return null;

            const { sessionId } = cookie.parseCookie(header);

            if (!sessionId) return null;

            const queryResult = await Database.query<{
                id: number;
                userId: number;
                userFirstName: string;
                userLastName: string;
                userEmailAddress: string;
                isUserAdministrator: boolean;
            }>(`
                SELECT
                    s.id,
                    u.id as user_id,
                    u.first_name as user_first_name,
                    u.last_name as user_last_name,
                    u.email_address as user_email_address,
                    u.is_administrator as is_user_administrator
                FROM sessions s
                JOIN users u ON u.id = s.user_id
                WHERE s.id = $1
            `, [sessionId]);

            const [session] = queryResult.rows;

            if (!session) return null;

            return {
                id: session.id,
                user: {
                    id: session.userId,
                    firstName: session.userFirstName,
                    lastName: session.userLastName,
                    emailAddress: session.userEmailAddress,
                    isAdministrator: session.isUserAdministrator
                }
            };
        }
    }
};

export default QUALITYAPI_CONFIG;