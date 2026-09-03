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
  "contact": true,
  "footer": true
}'::jsonb;

-- Existing rows created before the visibility feature may have a JSON object
-- without the footer key. Add it without overwriting any existing choices.
UPDATE public.site_settings
SET section_visibility = COALESCE(section_visibility, '{}'::jsonb) || '{"footer": true}'::jsonb
WHERE NOT (COALESCE(section_visibility, '{}'::jsonb) ? 'footer');

COMMENT ON COLUMN public.site_settings.section_visibility IS 'Controls which public portfolio sections are visible.';

-- Refresh PostgREST's schema cache immediately after the column is added.
NOTIFY pgrst, 'reload schema';
