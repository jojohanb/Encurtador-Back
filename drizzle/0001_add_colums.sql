ALTER TABLE urls ADD COLUMN legenda text;
ALTER TABLE urls ADD COLUMN clicks integer DEFAULT 0;
ALTER TABLE urls ADD COLUMN updated_at timestamp DEFAULT now();
