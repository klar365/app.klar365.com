BEGIN;

CREATE TABLE services (
    id                  SERIAL                  PRIMARY KEY,
    name                TEXT                    NOT NULL DEFAULT '',
    description         TEXT                    NOT NULL DEFAULT '',
    length_hours        INT                     NOT NULL DEFAULT 1
);

CREATE TABLE appointments (
    id                  SERIAL                  PRIMARY KEY,
    start               TIMESTAMP               NOT NULL,
    user_id             INT                     NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users
);

COMMIT;