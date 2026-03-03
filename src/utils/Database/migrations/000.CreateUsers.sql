BEGIN;

CREATE TABLE settings_schemas (
    id                  SERIAL                  PRIMARY KEY,
    allow_animations    BOOLEAN                 NOT NULL DEFAULT TRUE
);

CREATE TABLE bans (
    id                  SERIAL                  PRIMARY KEY,
    reason              TEXT                    NOT NULL DEFAULT '',
    given_by_user_id    INT
);

CREATE TABLE users (
    id                  SERIAL                  PRIMARY KEY,
    first_name          TEXT                    NOT NULL DEFAULT '',
    last_name           TEXT                    NOT NULL DEFAULT '',
    email_address       TEXT                    NOT NULL UNIQUE,
    password            TEXT                    NOT NULL,
    is_administrator    BOOLEAN                 NOT NULL DEFAULT FALSE,
    ban_id              INT,
    settings_schema_id  INT                     NOT NULL,

    FOREIGN KEY (ban_id) REFERENCES bans,
    FOREIGN KEY (settings_schema_id) REFERENCES settings_schemas
);

ALTER TABLE bans
ADD FOREIGN KEY (given_by_user_id) REFERENCES users;

COMMIT;