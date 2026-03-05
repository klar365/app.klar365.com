import { SerializeOptions } from "cookie";

export const COOKIE_NAME = "sessionId";

export const COOKIE_SETTINGS: SerializeOptions = {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
};