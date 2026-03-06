BEGIN;

CREATE TABLE IF NOT EXISTS applied_migrations (
--  Name        Type        Keywords
    file_name   TEXT        PRIMARY KEY
);

COMMIT;