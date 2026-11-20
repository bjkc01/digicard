# Frontend guide

Everything a visitor sees: pages, forms, card designs, menus, and styling.

- **`src/frontend/`**: UI components, grouped by where they appear.
- **`src/app/`**: the pages. The folder name is the URL (`src/app/cards/page.tsx` → `/cards`). Next.js requires this folder to be called `app`.

Files are ranked from **most to least important**: start at the top. To open a file fast in VS Code, press `Ctrl+P` and type its name.
Logic and data (saving, sign-in, database) are in [BACKEND.md](BACKEND.md).

---

## 1. Core screens: the product itself

| # | File | What it does | Find inside (Ctrl+F) |
| - | ---- | ------------ | -------------------- |
| 1 | `src/frontend/create-card/create-card-form.tsx` | Create / edit card form with live preview, QR choice, Apple & Google Wallet buttons | `profileFields`, `contactFields` (the inputs) · `formatPhone` · `Apple Wallet` (wallet buttons) · `Field` (one input) |
| 2 | `src/frontend/cards/card-preview.tsx` | Draws a card in every design | `studentThemes` (colors per design) · one function per design: `ExecutiveSlate`, `StudioIvory`, `Blueprint`, `SignalMono`, `Crest`, `Horizon`, `Ember`, `Forest`, `Obsidian`, `Dawn`, `ClassicNight`, `ArchitectColumn` · `CardPreview` (bottom; picks the design) |
| 3 | `src/app/page.tsx` | **Homepage** `/`: hero, how it works, features, use cases, final call to action | `<h1` (hero headline) · `id="how-it-works"` · `id="use-cases"` |
| 4 | `src/frontend/login/home-auth-modal-card.tsx` | Sign-in popup: Google button, email field, 6-digit code step | `StatusMessage` · `ActionSurface` |
| 5 | `src/frontend/settings/settings-shell.tsx` | The whole Settings page: profile + photo, default template, notifications, saved cards, sign out | `createAvatarDataUrl` (photo upload) · `SectionHeader` · `SummaryCard` · `ProfileField` |
| 6 | `src/frontend/cards/cards-section.tsx` | Card grid with search, sort, and empty state (used on Dashboard and My Cards) | `Search cards` · `Sort cards` |
| 7 | `src/app/dashboard/page.tsx` | `/dashboard`: welcome header, profile progress, your cards | |
| 8 | `src/app/cards/page.tsx` | `/cards`: "My Cards" page | |
| 9 | `src/app/create-card/page.tsx` | `/create-card`: loads the form above | |
| 10 | `src/app/templates/page.tsx` | `/templates`: browse card designs by category | |
| 11 | `src/app/settings/page.tsx` | `/settings`: loads `settings-shell.tsx` | |

## 2. App shell and navigation: what wraps every signed-in page

| # | File | What it does |
| - | ---- | ------------ |
| 12 | `src/frontend/dashboard/sidebar.tsx` | Desktop left sidebar: nav links and sign out (the links themselves are `navigationItems` in `src/backend/data.ts`) |
| 13 | `src/frontend/dashboard/mobile-nav.tsx` | Mobile slide-out menu |
| 14 | `src/frontend/dashboard/dashboard-header.tsx` | Page title + subtitle at the top of app pages |
| 15 | `src/frontend/cards/dashboard-card-surface.tsx` | One card tile with Edit and Delete buttons |
| 16 | `src/frontend/cards/template-tile.tsx` | One design tile on the Templates page |
| 17 | `src/frontend/cards/templates-filter.tsx` | Category filter buttons on the Templates page |
| 18 | `src/app/layout.tsx` | Wraps every page: font, site title/SEO metadata, toast pop-ups |
| 19 | `src/app/globals.css` | Site-wide styles: panels, titles, mobile nav, hero animations, scroll reveal, sign-in modal, hover effects |
| 20 | `tailwind.config.ts` (repo root) | Brand colors, shadows, font, animations |

## 3. Homepage pieces

| # | File | What it does |
| - | ---- | ------------ |
| 21 | `src/frontend/landing/premium-header.tsx` | Homepage top navigation bar |
| 22 | `src/frontend/landing/hero-phone/` | Draggable 3D iPhone in the hero. Its screen loops like a screen recording: live card → tap "Add to Apple Wallet" → Wallet stack → DigiCard pass with QR → swipe home. Files: `interactive-hero-preview.tsx` (name inputs, stage, drag + fling), `use-phone-playback.ts` (`TIMELINE`: scene order and timing), `iphone-model.tsx` (phone body, status bar), `card-screen.tsx` (live card), `wallet-screen.tsx` (Wallet app + DigiCard pass), `sample-passes.tsx` (made-up cards in the stack), `touch-dot.tsx` (finger taps), `preview-person.ts` (sample name/initials). Components have a matching `.module.css` |
| 23 | `src/frontend/landing/use-cases-ticket-grid.tsx` | "Built for the places where students meet…" grid |
| 24 | `src/frontend/landing/scroll-reveal.tsx` | Fades sections in as you scroll |
| 25 | `src/frontend/login/home-auth-modal.tsx` | Opens/closes the sign-in popup based on the URL |
| 26 | `src/frontend/login/home-auth-modal-content.tsx` | Checks which sign-in methods are turned on and passes them to the popup |
| 27 | `src/frontend/login/auth-benefits-showcase.tsx` | Benefits panel next to the sign-in form |

## 4. Reusable building blocks (`src/frontend/ui/`)

| # | File | What it does |
| - | ---- | ------------ |
| 28 | `button.tsx` | Standard button / link-button with style variants |
| 29 | `profile-avatar.tsx` | Round profile photo with initials fallback |
| 30 | `empty-state.tsx` | "Nothing here yet" box with icon and action |
| 31 | `pending-submit.tsx` | Loading state while a form submits |
| 32 | `brand-mark.tsx` | DigiCard logo |
| 33 | `src/frontend/utils.ts` | `cn()`: combines Tailwind class names |

## 5. Rarely touched

| # | File | What it does |
| - | ---- | ------------ |
| 34 | `src/app/*/loading.tsx` | Loading skeletons for dashboard, cards, templates |
| 35 | `src/app/error.tsx` | Shown when a page crashes |
| 36 | `src/app/not-found.tsx` | 404 page |
| 37 | `src/app/template.tsx` | Fade-in transition between pages |
| 38 | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` | Privacy policy and terms |
| 39 | `src/app/login/page.tsx` | `/login`: redirects to the homepage with the sign-in popup open |
| 40 | `src/app/robots.ts`, `src/app/sitemap.ts` | SEO files for search engines |
| 41 | `src/frontend/dashboard/wallet-coming-soon.tsx` | Wallet button section, **not on any page yet** (bjkc01 is working on it) |
| 42 | `public/favicon.svg` | Browser tab icon |
