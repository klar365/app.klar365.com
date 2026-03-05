import QualityApi, {
    accepted202,
    noContent204,
    RequestContentType,
    unauthorized401
} from "qualityapi";
import z from "zod";
import Database from "@/utils/Database";
import bcrypt from "bcrypt";
import * as otplib from "otplib";
import cookie from "cookie";
import crypto from "node:crypto";
import { COOKIE_NAME, COOKIE_SETTINGS } from "@/utils/globals";

async function createSession(userId: number) {
    const sessionId = crypto.randomBytes(24).toString("hex");

    await Database.query(`
        INSERT INTO sessions (id, user_id)
        VALUES ($1, $2)
    `, [sessionId, userId]);

    return sessionId;
}

async function createResponseWithCookie(userId: number) {
    const response = noContent204();

    const sessionId = await createSession(userId);

    response.headers.set(
        "Set-Cookie",
        cookie.serialize(COOKIE_NAME, `${sessionId}`, COOKIE_SETTINGS)
    );

    return response;
}

export const POST =
    QualityApi.createEndpointBuilder(RequestContentType.JSON)
        .body(
            z.object({
                emailAddress: z.email(),
                password: z.string(),
                totp: z.string().length(6).optional()
            })
        )
        .endpoint(async ({ body }) => {
            const queryResult = await Database.query<{
                id: number;
                password: string;
                mfaSecret: string | null;
                isMfaValid: boolean;
            }>(`
                SELECT
                    id,
                    password,
                    mfa_secret,
                    (
                        mfa_secret IS NOT NULL AND
                        is_mfa_valid
                    ) AS is_mfa_valid
                FROM users
                WHERE LOWER(email_address) = LOWER($1)
            `, [body.emailAddress]);

            const [user] = queryResult.rows;

            if (!user) return unauthorized401();

            // const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
            const isPasswordCorrect = body.password === user.password;

            if (!isPasswordCorrect) return unauthorized401();

            if (!user.isMfaValid) return createResponseWithCookie(user.id);

            if (!body.totp) return accepted202();

            const { valid: isTotpValid } = await otplib.verify({
                token: body.totp,
                secret: user.mfaSecret!
            });

            if (!isTotpValid) return unauthorized401();

            return createResponseWithCookie(user.id);
        });