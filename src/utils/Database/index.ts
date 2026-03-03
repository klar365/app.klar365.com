import { Client, QueryResult, QueryResultRow } from "pg";
import { Casing } from "qualityapi/utils";

import path from "node:path";
import fs from "node:fs";

const MIGRATIONS_FOLDER = path.join(process.cwd(), "src", "utils", "Database", "migrations");

namespace Database {

    export async function connect() {
        if (globalThis.__db) return;

        try {
            console.log("🔃 Connecting to database...");

            const client = new Client({
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_DB
            });

            await client.connect();

            globalThis.__db = client;

            console.log("✅ Connected to database!");
        }
        catch (error) {
            console.log(`⚠️ Could not connect to database!\n${error}`)
        }
    }

    export async function query<T extends QueryResultRow>(sql: string, bindParams: any[] = []) {
        const queryResult = await globalThis.__db.query<{}>(sql, bindParams);

        return {
            ...queryResult,
            rows: queryResult.rows?.map(Casing.toCamelCase)
        } as QueryResult<T>;
    }

    export async function applyMigrations() {
        const allMigrationFiles = fs.readdirSync(MIGRATIONS_FOLDER);

        const appliedMigrationFiles =
            (await query<{ fileName: string; }>("SELECT file_name FROM applied_migrations")).rows
                .map(({ fileName }) => fileName)
                .toSorted((a, b) => a.localeCompare(b));

        const unappliedMigrationFiles = allMigrationFiles.filter(mf => !appliedMigrationFiles.includes(mf));

        for (const mf of unappliedMigrationFiles) {
            const sql = fs.readFileSync(path.join(MIGRATIONS_FOLDER, mf), "utf-8");

            try {
                console.log(`🔃 Applying migration '${mf}'...`);

                await query(sql);
                await query(`
                    INSERT INTO applied_migrations (file_name)
                    VALUES ($1)
                `, [mf]);

                console.log(`✅ Applied migration '${mf}'!`);
            }
            catch (error) {
                console.log(`⚠️ Could not apply migration '${mf}'!\n${error}`);
            }
        }
    }

}

export default Database;