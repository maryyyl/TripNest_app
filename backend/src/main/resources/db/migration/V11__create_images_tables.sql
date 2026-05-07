
CREATE TABLE smestuvanje_sliki (
                                   id              BIGSERIAL PRIMARY KEY,
                                   smestuvanje_id  BIGINT NOT NULL REFERENCES smestuvanja(id) ON DELETE CASCADE,
                                   url             VARCHAR(1000) NOT NULL,
                                   redosled        INTEGER DEFAULT 0,
                                   created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
                                   updated_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE gastronomija_sliki (
                                    id              BIGSERIAL PRIMARY KEY,
                                    gastronomija_id BIGINT NOT NULL REFERENCES gastronomija(id) ON DELETE CASCADE,
                                    url             VARCHAR(1000) NOT NULL,
                                    redosled        INTEGER DEFAULT 0,
                                    created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
                                    updated_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE atrakcija_sliki (
                                 id              BIGSERIAL PRIMARY KEY,
                                 atrakcija_id    BIGINT NOT NULL REFERENCES atrakcii(id) ON DELETE CASCADE,
                                 url             VARCHAR(1000) NOT NULL,
                                 redosled        INTEGER DEFAULT 0,
                                 created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
                                 updated_at       TIMESTAMP NOT NULL DEFAULT NOW()
);