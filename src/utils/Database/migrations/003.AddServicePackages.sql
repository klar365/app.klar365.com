BEGIN;

CREATE TABLE packages (
    id                  SERIAL              PRIMARY KEY,
    name                TEXT                NOT NULL DEFAULT '',
    description         TEXT                NOT NULL DEFAULT ''
);

CREATE TABLE package_service (
    id                  SERIAL              PRIMARY KEY,
    package_id          INT                 NOT NULL,
    service_id          INT                 NOT NULL,

    FOREIGN KEY (package_id) REFERENCES packages ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services ON DELETE CASCADE
);

COMMIT;