
CREATE TABLE contact_messages (
                                  id          BIGSERIAL PRIMARY KEY,
                                  ime         VARCHAR(255) NOT NULL,
                                  email       VARCHAR(255) NOT NULL,
                                  subject     VARCHAR(255) NOT NULL,
                                  poraka      TEXT NOT NULL,
                                  procitana   BOOLEAN NOT NULL DEFAULT FALSE,
                                  created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
                                  updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);