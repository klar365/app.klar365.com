import QualityApi, { ok200 } from "qualityapi";

export const GET =
    QualityApi.createEndpointBuilder()
        .authenticate()
        .endpoint(({ session }) => ok200(session));