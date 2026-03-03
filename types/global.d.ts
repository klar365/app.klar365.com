import { Client } from "pg";

declare global {
    var __db: Client;
}