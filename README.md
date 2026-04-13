# DigiCard

DigiCard is a Next.js workspace for building digital professional cards for students and early-career professionals.

Production URL: `https://getmycard.vercel.app/`

## Current behavior

- The signed-in workspace lets you create and manage one saved card experience across Dashboard, My Cards, Templates, and Settings.
- QR codes resolve to the best public destination already present on the card: website first, then LinkedIn, then email.
- Per-user public card hosting is not wired up yet. The current card data lives inside the authenticated workspace state, so it is not yet available as a public profile page from another device.

## Run locally

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` and make sure this value is set:

```bash
NEXT_PUBLIC_APP_URL=https://getmycard.vercel.app
```

## Supabase foundation

The repo now includes a minimal Supabase setup so we can move the workspace profile out of signed browser cookies and into a real database.

Files added for the integration:

- `lib/supabase-env.ts` for safe environment variable access
- `lib/supabase/browser.ts` and `lib/supabase/server.ts` for typed Supabase clients
- `lib/supabase/profiles.ts` for the first profile-table queries
- `supabase/migrations/20260413_create_profiles.sql` for the initial database table

To connect your own Supabase project:

1. Create a Supabase project.
2. Copy these values into `.env.local` and your deployment environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Open the Supabase SQL editor and run each SQL file inside `supabase/migrations` in filename order.
4. Restart the dev server after adding the environment variables.

`SUPABASE_SERVICE_ROLE_KEY` is server-only. In this repo it is meant for server actions, route handlers, and server utilities such as `lib/supabase/profiles.ts`. The first `profiles` table is also locked behind Row Level Security, so browser-side writes are not expected until you later switch to Supabase Auth or add explicit policies.

The current UI still reads workspace data from the signed cookie flow in `lib/workspace-settings.ts`. The new Supabase files are the foundation for the next step, which is swapping the profile save/load path over to the `profiles` table.

## Google login setup

The app already uses Auth.js with a Google provider. To turn login on locally or on Vercel:

1. Create an OAuth client in Google Cloud with type `Web application`.
2. Add authorized JavaScript origins for:
   - `http://localhost:3000`
   - `https://getmycard.vercel.app`
3. Add authorized redirect URIs for:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://getmycard.vercel.app/api/auth/callback/google`
4. Add these environment variables in Vercel and in your local `.env.local`:
   - `NEXT_PUBLIC_APP_URL`
   - `AUTH_SECRET`
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`
   - Optional aliases also supported: `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
5. Redeploy after adding the production variables.
6. If Google still shows an unverified app warning, open the OAuth consent screen in Google Cloud:
   - set the app audience and branding
   - add your Google accounts as test users while the app is still in testing
   - publish or verify the app if you want the warning removed for everyone

Protected routes are handled through `middleware.ts`, and unauthenticated visitors are redirected to `/login` before they can open the dashboard, templates, create-card flow, or settings.

## Temporary ID and password setup

If you need a short-term fallback while the main sign-in methods are still being fixed, DigiCard also supports a temporary ID and password.

1. Add these environment variables in Vercel and in your local `.env.local`:
   - `NEXT_PUBLIC_APP_URL`
   - `AUTH_SECRET`
   - `AUTH_TEMP_LOGIN_ID`
   - `AUTH_TEMP_LOGIN_PASSWORD`
   - `AUTH_TEMP_LOGIN_NAME` (optional)
   - `AUTH_TEMP_LOGIN_EMAIL` (optional)
2. Redeploy after adding the production variables.
3. Open `/login` and use the temporary credentials form.

## Email code login setup

The login page also supports a one-time email code flow.

1. Add these environment variables in Vercel and in your local `.env.local`:
   - `NEXT_PUBLIC_APP_URL`
   - `AUTH_SECRET`
   - `AUTH_EMAIL_FROM`
   - `AUTH_RESEND_API_KEY`
2. Verify the sender domain in Resend and use that address in `AUTH_EMAIL_FROM`.
3. Redeploy after adding the production variables.

During local development, if `AUTH_SECRET` is set but the Resend values are missing, DigiCard falls back to printing the 6-digit email sign-in code to the server console so you can still test the flow end to end.

## Temporary local dashboard preview

If sign-in is still being wired up and you just want to inspect the protected UI locally:

1. Add `AUTH_DEV_BYPASS=true` to your `.env.local`
2. Restart `npm run dev`
3. Open `/dashboard` directly

This bypass only works outside production and is meant for short-term local previewing while authentication is under construction.

## GitHub repo website link

The website shown in the GitHub repo sidebar is not controlled by the README or app code. If GitHub still shows `digicard-gamma.vercel.app`, update the repo `Website` field in the GitHub sidebar or repository settings to `https://getmycard.vercel.app/`.
