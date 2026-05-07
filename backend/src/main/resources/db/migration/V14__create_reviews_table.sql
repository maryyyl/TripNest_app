CREATE TABLE reviews (
                         id              BIGSERIAL PRIMARY KEY,
                         smestuvanje_id  BIGINT NOT NULL REFERENCES smestuvanja(id) ON DELETE CASCADE,
                         users_id        BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                         ocenka          INTEGER NOT NULL CHECK (ocenka BETWEEN 1 AND 5),
                         komentar        VARCHAR(1000),
                         created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
                         updated_at      TIMESTAMP NOT NULL DEFAULT NOW(),
                         UNIQUE (smestuvanje_id, users_id)
);