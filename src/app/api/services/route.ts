import QualityApi from "qualityapi";
import Database from "@/utils/Database";

export const GET =
    QualityApi.createEndpointBuilder()
        .authenticate()
        .endpoint(() => {

        });