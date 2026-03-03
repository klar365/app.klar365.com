export async function register() {

    if (process.env.NEXT_RUNTIME !== "nodejs") return;

    const { default: QualityApi } = await import("qualityapi");
    const { default: QUALITYAPI_CONFIG } = await import("@/utils/qualityapi.config");
    const { default: Database } = await import("@/utils/Database");

    QualityApi.configure(QUALITYAPI_CONFIG);

    await Database.connect();
    await Database.applyMigrations();
}