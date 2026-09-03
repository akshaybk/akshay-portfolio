-- Store public portfolio section visibility in the existing site settings row.
-- Run this once in the Supabase SQL editor before using the new admin controls.

ALTER TABLE public.site_settings
ADD COLUMN IF NOT EXISTS section_visibility jsonb NOT NULL DEFAULT '{
  "hero": true,
  "about": true,
  "skills": true,
  "experience": true,
  "education": true,
  "projects": true,
  "contact": true
}'::jsonb;

COMMENT ON COLUMN public.site_settings.section_visibility IS 'Controls which public portfolio sections are visible.';
