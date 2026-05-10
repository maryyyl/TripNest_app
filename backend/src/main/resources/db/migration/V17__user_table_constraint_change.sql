-- V11__add_unique_email_constraint.sql

ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE (email);