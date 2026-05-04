
CREATE TABLE reservations (
                              id               BIGSERIAL PRIMARY KEY,
                              smestuvanja_id   BIGINT NOT NULL REFERENCES smestuvanja(id) ON DELETE CASCADE,
                              users_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                              datum_od         DATE NOT NULL,
                              datum_do         DATE NOT NULL,
                              broj_lica        INTEGER NOT NULL,
                              napomena         VARCHAR(500),
                              status           VARCHAR(20) NOT NULL DEFAULT 'PENDING',
                              created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
                              updated_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE accommodation_requests (
                                        id           BIGSERIAL PRIMARY KEY,
                                        users_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                                        naslov       VARCHAR(500) NOT NULL,
                                        lokacija     VARCHAR(255) NOT NULL,
                                        link         VARCHAR(1000),
                                        opis         TEXT,
                                        slika        VARCHAR(500),
                                        cena_od_den  DOUBLE PRECISION,
                                        napomena     VARCHAR(500),
                                        status       VARCHAR(20) NOT NULL DEFAULT 'PENDING',
                                        created_at   TIMESTAMP NOT NULL DEFAULT NOW(),
                                        updated_at   TIMESTAMP NOT NULL DEFAULT NOW()
);