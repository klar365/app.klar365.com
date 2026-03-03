import { Configuration } from "qualityapi";

const QUALITYAPI_CONFIG: Configuration = {
    authentication: {
        authenticate: request => {
            return null;
        }
    }
};

export default QUALITYAPI_CONFIG;