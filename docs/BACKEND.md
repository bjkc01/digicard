# Backend guide

Logic and data with no UI: card data, saving, sign-in, and the database. Almost all of it is in **`src/backend/`**.
A few backend files have to live elsewhere because Next.js requires it: API endpoints in `src/app/api/`, and `src/middleware.ts`.

Files are ranked from **most to least important**: start at the top. To open a file fast in VS Code, press `Ctrl+P` and type its name.
Pages, forms, and styling are in [FRONTEND.md](FRONTEND.md).

---

## How a save works

```
Form in src/frontend/…            e.g. create-card-form.tsx
  → action in src/backend/actions/  e.g. card.ts  (runs on the server)
    → src/backend/workspace/settings.ts   validates the data
      → Supabase (src/backend/supabase/)  if configured
      → or a signed browser cookie         if not
```

Pages read data the other way: `requireWorkspaceUser()` (who is signed in) → `getWorkspaceView()` (their cards + summary) → page.

---

## 1. Core: read these first

| # | File | What it does | Find inside (Ctrl+F) |
| - | ---- | ------------ | -------------------- |
| 1 | `src/backend/data.ts` | Card types (`DigiCard`), the `templates` list (every card design), sidebar `navigationItems`, homepage `featureItems` | `templates` · `navigationItems` |
| 2 | `src/backend/workspace/settings.ts` | **Main data layer**: card/profile types, validation, saving to Supabase or cookie, all save/delete functions | Types at top (`WorkspaceSettings`, `WorkspaceProfile`) · validation: `isValidWebsite`, `isValidPhone`, `normalizeLinkedIn`, `validateWorkspaceProfileInput` · cookie: `encodePayload` / `decodePayload` · saving: `persistWorkspaceSettings` · public functions start at `getWorkspaceSettings` |
| 3 | `src/backend/actions/card.ts` | Runs when the create-card form is submitted: save / delete the main card | `saveWorkspaceCardAction` · `deleteWorkspaceCardAction` |
| 4 | `src/backend/actions/settings.ts` | Runs when Settings forms are submitted: profile, default template, notifications, clear cards, sign out | |
| 5 | `src/backend/auth/config.ts` | Auth.js setup: Google + email-code sign-in, which pages need sign-in (`protectedRoutes`), local dev bypass | `protectedRoutes` · `devAuthBypassEnabled` |
| 6 | `src/backend/workspace/view.ts` | `getWorkspaceView()`: builds what app pages show (cards, profile progress) | |
| 7 | `src/backend/workspace/auth.ts` | `requireWorkspaceUser()`: gets the signed-in user or sends them to login | |

## 2. Sign-in and accounts

| # | File | What it does |
| - | ---- | ------------ |
| 8 | `src/backend/actions/login.ts` | Runs when sign-in buttons are pressed: Google, send email code, verify code |
| 9 | `src/backend/auth/email.ts` | Creates and checks 6-digit email codes, sends them via Resend (prints to console in local dev) |
| 10 | `src/backend/auth/login-flow.ts` | Safe redirect after login, login error/notice messages |
| 11 | `src/backend/auth/limits.ts` | Rate limiting so sign-in can't be spammed |
| 12 | `src/backend/actions/sign-out.ts` | Sign-out action used by the sidebar and mobile menu |

## 3. Database (Supabase)

| # | File | What it does |
| - | ---- | ------------ |
| 13 | `src/backend/supabase/profiles.ts` | Read / write the `profiles` table |
| 14 | `src/backend/supabase/workspace-cards.ts` | Read / write / delete the `workspace_cards` table |
| 15 | `src/backend/supabase/server.ts` | Creates the server-side Supabase connection (normal + admin) |
| 16 | `src/backend/supabase/types.ts` | TypeScript shapes of the database tables |
| 17 | `src/backend/supabase/env.ts` | Reads Supabase keys; `supabaseEnabled` turns cloud saving on/off |
| 18 | `supabase/schema.sql` (repo root) | Full database schema |
| 19 | `supabase/migrations/` (repo root) | Database changes; run in filename order |
| 20 | `src/backend/supabase/browser.ts` | Browser-side Supabase connection, **not used yet** (planned feature) |

## 4. Features and helpers

| # | File | What it does |
| - | ---- | ------------ |
| 21 | `src/backend/actions/extra-card.ts` | Save / delete additional cards beyond the main one |
| 22 | `src/backend/site-config.ts` | Site name and URL; `getCardShareTarget` decides where a card's QR points (website → LinkedIn → email) |
| 23 | `src/backend/apple-wallet.ts` | Builds and signs Apple Wallet `.pkpass` files |
| 24 | `src/app/api/wallet/apple/route.ts` | Download endpoint for the Apple Wallet pass |
| 25 | `src/backend/workspace/settings-options.ts` | Notification options and QR destination options |
| 26 | `src/backend/workspace/format.ts` | Formats "last saved" times |
| 27 | `src/backend/workspace/avatar.ts` | Profile photo size limits and initials |

## 5. Rarely touched

| # | File | What it does |
| - | ---- | ------------ |
| 28 | `src/backend/actions/card-state.ts`, `settings-state.ts` | Shape of the success/error message a form gets back (kept separate because `"use server"` files may only export functions) |
| 29 | `src/backend/auth/env.ts` | Reads auth secrets and Google keys from environment variables |
| 30 | `src/middleware.ts` | Hooks Auth.js into every request (Next.js requires this file at `src/`) |
| 31 | `src/app/api/auth/[...nextauth]/route.ts` | Auth.js sign-in / callback endpoint |
| 32 | `src/types/next-auth.d.ts` | Adds custom fields to the session type |
| 33 | `tests/backend.test.cjs` (repo root) | Backend tests: email codes, redirects, rate limits, saving cards. Run `npm test` |
| 34 | `.env.example` (repo root) | Environment variables to copy into `.env.local` |
| 35 | `next.config.ts` (repo root) | Next.js settings + security headers |
