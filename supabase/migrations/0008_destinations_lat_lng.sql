-- Phase 8: Maps + GIS
-- Adds coordinates to destinations so they can be plotted on a Leaflet map.
-- Additive only — does not touch any other table or existing column.

alter table destinations
  add column if not exists lat double precision,
  add column if not exists lng double precision;

-- Backfill the four seeded pilot destinations with real approximate
-- coordinates (Sylhet region, Bangladesh).
update destinations set lat = 25.1728, lng = 92.0170 where slug = 'jaflong';
update destinations set lat = 25.1590, lng = 91.9930 where slug = 'khasia-punji';
update destinations set lat = 25.1050, lng = 91.9600 where slug = 'rena';
update destinations set lat = 24.9400, lng = 91.8800 where slug = 'tea-garden-belt';
