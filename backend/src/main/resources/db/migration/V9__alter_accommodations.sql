ALTER TABLE smestuvanja
ADD COLUMN check_in TIME default NULL,
ADD COLUMN check_out TIME default NULL;

UPDATE smestuvanja
SET check_in = '12:00',
    check_out = '10:00';