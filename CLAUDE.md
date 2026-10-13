# CLAUDE.md — Sub20

## What this is
A one-page marketing site for Sub20, a speedcubing coaching service run by two people: Izhak and Danilo. Hosted free on Vercel (Hobby plan). Goal: look like a small, serious, well-designed studio, not a template.

## Facts (use only these, never invent more)
- Service: speedcubing (Rubik's Cube) coaching
- Entry requirement: any single solve under 1:00 (confirmed by owners)
- Commitment: 5 hours per student, per week
- Price: $15/hour
- Applications are reviewed by the team (not automatic acceptance)
- Result: most students improve their solve time by about 200% (3x faster, e.g. 60s down to ~20s)
- Applications are CLOSED right now
- Team: Izhak and Danilo. No last names, ages, locations or other personal details on the site.
- No testimonials, student names, awards or numbers beyond the above. Do not fabricate anything.

## Stack
- Next.js (App Router) + TypeScript, static export friendly
- Tailwind CSS
- No backend, no database, no paid services
- Animation: hand-built CSS 3D + requestAnimationFrame (no Three.js, keeps the bundle small)
- Fonts via next/font: Instrument Serif (headings), Geist (body), Geist Mono (numbers/timer)
- Deploy: push to GitHub, import in Vercel, default settings. Free URL: sub20.vercel.app (or whichever is free)

## Design direction (anti-slop rules)
- Palette: warm paper background #F4F1EA, ink #111111, muted grey #6B6B63. Cube colors (white, yellow, red, orange, blue, green) are accents only, used in the cube and tiny details.
- Do NOT use: purple/blue gradients, glassmorphism, glowing blobs, emoji icons, stock illustrations, generic three-identical-cards rows, "revolutionize/unlock/elevate" copy, centered-everything layouts.
- DO use: big serif headlines, tight grid, generous whitespace, thin 1px rules, monospace for all numbers, left-aligned editorial layout, one strong asymmetric hero.
- Copy: short, plain, confident. Write like a person, not marketing.
- Motion: purposeful only (cube, number count-ups, subtle fade-in on scroll). Respect `prefers-reduced-motion` (show a static solved cube and final numbers).
- Accessibility: WCAG AA contrast, visible focus states, alt text on photos, semantic headings, keyboard navigable.
- Mobile first. Must look good at 375px.

## Cube animation (hero centerpiece)
Build a 3x3 cube from 27 cubies using CSS 3D transforms, each with 6 sticker faces (standard color scheme, dark plastic body).
Sequence (loops, ~12s):
1. Cube starts solved, slowly rotating on an isometric angle.
2. Scrambles with ~12 fast face turns.
3. Pauses a beat, then a mono timer starts at 1:00.00.
4. Cube solves by replaying the scramble in reverse with smooth easing. The timer counts DOWN from 1:00.00 to 0:20.00 as it solves, landing on 0:20.00.
5. Holds solved for ~2s, then repeats.
Implementation notes:
- Store the cube as an array of cubies with position + orientation; a face turn rotates the 9 cubies on that layer by 90° with eased interpolation, then commits the new state.
- Moves from a fixed list (R, L, U, D, F, B and primes) so the reverse is exact. Seeded scramble so it is deterministic.
- Pause when off-screen (IntersectionObserver) and when the tab is hidden.
- Keep it under ~150 lines of logic in `components/Cube.tsx` plus a `lib/cubeMoves.ts` helper.
- Reduced motion: render the solved cube and the "0:20.00" label, no loop.

## Site structure (single page, anchored sections)
1. Nav: wordmark "Sub20" left, links (How it works, Team, Pricing, FAQ) right, and a status pill: "Applications closed". Sticky, minimal.
2. Hero: headline (e.g. "Get faster. Much faster."), one-line subhead, the animated cube on the right, status line "Applications are closed right now." with a secondary "Get notified when we reopen" (see Open Items).
3. Stats strip: four large mono numbers with small labels: `1:00` entry solve time / `5 hrs` per student weekly / `$15` per hour / `3x` faster on average (about 200% improvement). Count-up on scroll.
4. How it works: 3 numbered steps in a vertical editorial list (not cards): Apply with your current solve time, we review every application, train 5 hours a week with us.
5. Team: Izhak and Danilo, side by side. Their photos are provided and should be used (see Photos). Short two-line bio placeholder each, to be supplied by the owners. No invented bios.
6. Pricing & commitment: $15/hour, 5 hours a week per student, in a plain ruled table. State clearly what the entry requirement is.
7. Application status block: large, honest "Applications are closed" message with the notify mechanism. When open, this swaps to an Apply button (controlled by a single `APPLICATIONS_OPEN` constant in `config.ts`).
8. FAQ: 4–5 questions using native `<details>` (who it's for, what counts as a 1 minute solve, how applications work, how often we reopen, how sessions run). Answers must only use confirmed facts; unknowns marked TODO.
9. Footer: wordmark, "Run by Izhak and Danilo", contact placeholder, year.

## Photos
- Two provided photos: `public/images/izhak.jpg` (first photo) and `public/images/danilo.jpg` (second photo).
- The owner chose to use them as-is despite being casual candids. Crop each tightly around the person using `object-fit: cover` and tuned `object-position`, in a consistent aspect ratio (4:5).
- Make them feel intentional: consistent warm tone via a subtle CSS filter, thin ink border, mono caption (name + role). Rotate the Izhak photo upright (it was shot sideways/upside-down) with a CSS transform or by re-exporting the file.
- Use Next `<Image>` with width/height and descriptive alt text.

## File layout
```
app/layout.tsx
app/page.tsx
app/globals.css
components/{Nav,Hero,Cube,StatsStrip,HowItWorks,Team,Pricing,ApplicationStatus,Faq,Footer}.tsx
lib/cubeMoves.ts
config.ts            // APPLICATIONS_OPEN, contact/notify settings
public/images/{izhak,danilo}.jpg
```

## Build steps
1. Scaffold: `npx create-next-app@latest sub20 --ts --tailwind --app`
2. Set tokens (colors, fonts) in Tailwind config and globals.css.
3. Build static sections top to bottom, desktop then mobile.
4. Build the cube component and hero timer sync last, after layout is solid.
5. Add scroll count-ups and reduced-motion handling.
6. Lighthouse check: aim for 95+ on all four categories.
7. Push to GitHub, import into Vercel, confirm production URL.

## Definition of done
- Looks designed, not generated: passes the anti-slop rules above.
- Cube loop runs smoothly at 60fps on a mid phone and pauses off-screen.
- Every claim on the page appears in the Facts section.
- Works at 375px, 768px, 1440px.
- Lighthouse 95+.

## Open items (ask the owners, do not guess)
- (resolved) Entry = any single solve under 1:00. Notify mechanism = none. Contact = 314 934 5630.
- Notify mechanism for closed applications: none for now, email link, or a free form service.
- Contact email or handle for the footer.
- Short bios for Izhak and Danilo.
- Final brand name (Sub20 is a working name) and desired domain.
- Reopen date, if any.
