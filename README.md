# DigiCard

Modern frontend dashboard for managing digital professional business cards, built with Next.js and Tailwind CSS.

## Pages

- Landing page
- Dashboard
- Template selection
- Create card form with live preview

## Run locally

```bash
npm install
npm run dev
```

## Google login setup

The app already uses Auth.js with a Google provider. To turn login on locally or on Vercel:

1. Create an OAuth client in Google Cloud with type `Web application`.
2. Add authorized JavaScript origins for:
   - `http://localhost:3000`
   - `https://<your-vercel-domain>`
3. Add authorized redirect URIs for:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://<your-vercel-domain>/api/auth/callback/google`
4. Add these environment variables in Vercel and in your local `.env.local`:
   - `AUTH_SECRET`
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`
5. Redeploy after adding the production variables.
6. If Google still shows an "unverified app" warning, open the OAuth consent screen in Google Cloud:
   - set the app audience and branding
   - add your Google accounts as test users while the app is still in testing
   - publish/verify the app if you want the warning removed for everyone

Protected routes are handled through `middleware.ts`, and unauthenticated visitors are redirected to `/login` before they can open the dashboard, templates, create-card flow, or settings.

## Temporary ID and password setup

If you need a short-term fallback while the main sign-in methods are still being fixed, DigiCard also supports a temporary ID and password.

1. Add these environment variables in Vercel and in your local `.env.local`:
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
