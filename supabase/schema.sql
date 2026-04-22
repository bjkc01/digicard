-- DigiCard Supabase Schema
-- Run this to set up a fresh Supabase project from scratch.

-- profiles
-- One row per user. Stores workspace settings and profile details.
CREATE TABLE IF NOT EXISTS public.profiles (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now(),
  user_id                 text NOT NULL,
  owner_email             text NOT NULL,
  email                   text NOT NULL,
  name                    text NOT NULL,
  title                   text,
  company                 text,
  phone                   text,
  linkedin                text,
  website                 text,
  avatar_url              text,
  default_template_id     text NOT NULL DEFAULT 'classic',
  qr_preference           text NOT NULL DEFAULT 'auto',
  notifications           jsonb NOT NULL DEFAULT '{"cardOpens":false,"newSaves":false,"qrScans":false,"weeklyDigest":false}'::jsonb,
  cards_updated_at        timestamptz,
  notifications_updated_at timestamptz,
  profile_updated_at      timestamptz,
  template_updated_at     timestamptz
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- workspace_cards
-- Extra cards (non-primary) linked to a profile.
CREATE TABLE IF NOT EXISTS public.workspace_cards (
  id            text PRIMARY KEY,
  profile_id    uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_id       text NOT NULL,
  name          text NOT NULL,
  email         text NOT NULL,
  title         text NOT NULL,
  company       text,
  phone         text,
  linkedin      text,
  website       text,
  label         text NOT NULL DEFAULT 'Card',
  template_id   text NOT NULL DEFAULT 'classic',
  qr_preference text NOT NULL DEFAULT 'auto',
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.workspace_cards ENABLE ROW LEVEL SECURITY;
