-- Add an "Övrigt" catch-all free-text field to supplier submissions. Captures
-- capabilities/materials/methods not in the controlled chip lists — a UX escape
-- hatch AND a taxonomy-growth signal (recurring entries → candidate new slugs).
-- It is NOT a matching input; a human maps it to slugs (or proposes a new one)
-- during /admin review, so nothing is lost but free text never enters the join.
alter table supplier_submissions add column if not exists ovrigt text;
