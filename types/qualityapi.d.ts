import "qualityapi";

declare module "qualityapi/authentication" {
    export interface User {
        id: number;
        firstName: string;
        lastName: string;
        emailAddress: string;
    }
}