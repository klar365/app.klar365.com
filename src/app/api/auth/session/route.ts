import QualityApi, { ok200 } from "qualityapi";

export const GET =
    QualityApi.createEndpointBuilder()
        .authenticate()
        .endpoint(({ user }) => {
            return ok200({ ...user });
        });