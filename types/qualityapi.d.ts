import "qualityapi";

declare module "qualityapi/authentication" {
    export interface Session {
        id: number;
        user: {
            id: number;
            firstName: string;
            lastName: string;
            emailAddress: string;
            isAdministrator: boolean;
        }
    }
}