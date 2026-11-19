# DigiCard: guide for AI assistants and developers

This file is the single source of instructions for any AI tool (Claude, Codex, Cursor, Copilot, …) and for people new to the repo.
`CLAUDE.md` just points here, so keep everything in this file.

DigiCard is a web app for creating and sharing digital professional cards.
Stack: Next.js 15 (App Router) + React 19 + Tailwind 3 + Auth.js (next-auth v5) + Supabase.

## Project layout

```
src/
├── app/        Pages and URLs (Next.js requires this name; folder = URL)
├── frontend/   UI components: cards, create-card, dashboard, landing, login, settings, ui
├── backend/    Logic and data: actions (form handlers), auth, supabase, workspace, data.ts
├── types/      Type add-ons for libraries
└── middleware.ts
docs/
├── FRONTEND.md  Every UI file, ranked most → least important
└── BACKEND.md   Every logic/data file, ranked most → least important, plus how a save flows
public/          Static files (favicon)
supabase/        Database schema and migrations
tests/           Backend tests
```

The `@/` import alias points to `src/` (e.g. `@/frontend/ui/button` → `src/frontend/ui/button.tsx`).

**Before editing, find the right file in `docs/FRONTEND.md` or `docs/BACKEND.md`.** Each row says what the file does and which names to search for inside it.

## Quick lookup

| Want to change…                          | Look in |
| ---------------------------------------- | ------- |
| Homepage text, sections, buttons         | `src/app/page.tsx` |
| Sign-in popup                            | `src/frontend/login/home-auth-modal-card.tsx` |
| What a card looks like (any design)      | `src/frontend/cards/card-preview.tsx` |
| List of card designs                     | `src/backend/data.ts` → `templates` |
| Create / edit card form                  | `src/frontend/create-card/create-card-form.tsx` |
| Settings page                            | `src/frontend/settings/settings-shell.tsx` |
| Sidebar / menu links                     | `src/backend/data.ts` → `navigationItems` |
| What happens when a form is submitted    | `src/backend/actions/` |
| How card data is validated and saved     | `src/backend/workspace/settings.ts` |
| Where a QR code points                   | `src/backend/site-config.ts` → `getCardShareTarget` |
| Which pages require sign-in              | `src/backend/auth/config.ts` → `protectedRoutes` |
| Global styles / brand colors             | `src/app/globals.css`, `tailwind.config.ts` |

## Where new code goes

| Adding…                                   | Put it in |
| ----------------------------------------- | --------- |
| A new page / URL                          | `src/app/<url>/page.tsx` (keep it thin: load data, render components) |
| A UI component for one area               | `src/frontend/<area>/` (e.g. `frontend/cards/`) |
| A small reusable UI piece                 | `src/frontend/ui/` |
| A form submit handler (`"use server"`)    | `src/backend/actions/<feature>.ts` |
| Data logic, validation, saving            | `src/backend/<area>/` (`workspace/`, `auth/`, `supabase/`) |
| A database table query                    | `src/backend/supabase/<table>.ts` |
| A database change                         | new file in `supabase/migrations/` named `YYYYMMDD_description.sql` |
| An API endpoint                           | `src/app/api/<name>/route.ts` (logic itself in `src/backend/`) |

## Rules

1. **Keep the guides current.** When you add, move, rename, or delete a file, update its row in `docs/FRONTEND.md` or `docs/BACKEND.md`, in the right importance tier.
2. **Keep files focused.** If a file grows past ~400 lines or does several unrelated things, split it into a folder of smaller, clearly named files.
3. **Imports:** use the `@/` alias (`@/backend/data`), not relative paths like `../../`.
4. **No code at the repo root.** Root holds only config files; all source goes in `src/`.
5. **Frontend never talks to the database directly.** UI calls an action in `src/backend/actions/`, which calls `src/backend/`.
6. **Check your work** before saying a change is done:
   - `npm run typecheck`: TypeScript
   - `npm run lint`: ESLint
   - `npm test`: backend tests
   - `npm run build`: full production build (needed after moving files or changing config)
7. **This repo is shared by two people.** Never commit or push without the owner's explicit approval. Pull the latest `main` before large changes.

## Commands

- `npm run dev`: local dev server at http://localhost:3000
- `npm run typecheck` / `npm run lint` / `npm test` / `npm run build`

Environment variables are listed in `.env.example`; setup details are in `README.md`.
