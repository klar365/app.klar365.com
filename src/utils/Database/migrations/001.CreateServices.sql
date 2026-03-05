BEGIN;

CREATE TABLE services (
    id                  SERIAL                  PRIMARY KEY,
    name                TEXT                    NOT NULL DEFAULT '',
    description         TEXT                    NOT NULL DEFAULT '',
    length_hours        INT                     NOT NULL DEFAULT 1
);

CREATE TABLE vehicles (
    id                  SERIAL                  PRIMARY KEY,
    name                TEXT,
    plate_number        TEXT                    NOT NULL UNIQUE,
    owner_user_id       INT                     NOT NULL,

    FOREIGN KEY (owner_user_id) REFERENCES users ON DELETE CASCADE
);

CREATE TABLE appointments (
    id                  SERIAL                  PRIMARY KEY,
    start               TIMESTAMP               NOT NULL,
    user_id             INT                     NOT NULL,
    vehicle_id          INT                     NOT NULL,
    service_id          INT                     NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services ON DELETE CASCADE
);

COMMIT;