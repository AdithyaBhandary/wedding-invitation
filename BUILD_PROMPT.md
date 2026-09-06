# Angular Wedding Invitation - Completed Implementation

Use this prompt to recreate or extend the completed Angular 20 wedding invitation for Adithya and Sameeksha.

## Stack and Structure

- Angular 20 standalone components with strict TypeScript
- SCSS, RxJS, `zone.js`, and `DecimalPipe`
- Main files: `src/app/app.component.ts`, `app.component.html`, and `app.component.scss`
- Blessings data: `src/app/with-blessings.const.ts`
- Assets: `src/assets/`
- Production output: `dist/wedding-invitation/browser`
- Angular copies assets with `"assets": ["src/assets"]`

## Page Flow

1. Interactive Save the Date cover
2. Opening Names Reveal
3. Welcome / Light Reveal story
4. Scratch to reveal Save the Date
5. With Blessings
6. Event Timeline
7. Venue
8. Counting Down
9. Separate Photo Frames
10. Best Wishes

## Completed Features

### Cover

- Full-screen fixed cover with circular Save / the / Date seal.
- Seal click starts the opening animation, fades the cover, and scrolls to the invitation.
- Preserve the `entered`, `opening`, and `cover--hidden` states.

### Opening Names Reveal

- Render `Adithya & Sameeksha` from invitation data.
- Keep the names exactly centered inside the circular floral wreath.
- Move the names and wreath together when adjusting vertical position.
- Keep the lower empty space below the wreath for the illustration.
- Display `Bride-Groom-transparent.png` below the names on the left with responsive sizing.
- Keep the blue wreath, falling blue flowers, and natural blue petals behind the names.
- Keep falling motion subtle, staggered, and reduced-motion friendly.
- Do not reintroduce the removed rectangular border.

### Welcome / Light Reveal

- Render `invitation.story` dynamically.
- Use compact vertical spacing and the light-blue `#dceff4` background.
- Preserve Cormorant Garamond typography and drifting petals.

Current story:

```text
Two hearts, two journeys, and two beautifully different worlds came together at just the right moment. What began as a simple connection slowly blossomed into a bond filled with love, laughter, and countless memories. Today, we celebrate the beginning of a beautiful journey together.
```

### Scratch to Reveal

- Dark blue Save the Date section with an interactive canvas scratch card.
- Reveal November, Sunday 22, 2026, and the event time.
- Keep the mobile card tall enough for all text.
- Update scratch state from pointer interaction and clean up resources.

### With Blessings

- Appears immediately after Scratch to Reveal.
- All content is rendered from `src/app/with-blessings.const.ts` via `withBlessings`.
- Keep the compact light-blue responsive card layout with family cards, connector, date/time, and venue.
- Do not hardcode this section's content in the template.

### Timeline and Venue

- Timeline events: Muhurtham at 11:45 AM and Lunch at 12:30 PM.
- Keep the compact timeline connector and circular nodes.
- Venue is independent from Timeline and uses background `#dceff4`.
- Preserve the illustrated map, Barkuru label, and Google Maps button.

### Counting Down

- Real-time countdown to November 22, 2026, updated every second.
- Clear the timer in `ngOnDestroy`.
- Keep four compact counters in one row on mobile.
- Keep counter boxes independent with no attached pseudo-element nodes.
- Preserve the dark-blue theme and compact spacing.

### Photo Frames

- Separate from Counting Down.
- Use `couple_1.png`, `couple_2.png`, `couple_3.png`, and `couple_4.png` with centered `object-fit: cover`.
- Each frame owns its hook, thread, clip, and node.
- Preserve the subtle staggered hanging/swaying animation.
- Use light-blue `#dceff4` background and responsive desktop/mobile grids.

### Best Wishes

- Final section with the reference-inspired wave transition.
- Preserve the blue palette, paper texture, invitation message, and FAMILY & FRIENDS content.
- Keep responsive spacing and reduced-motion support.

## Design Rules

- Use only the existing blue wedding palette; do not introduce burgundy.
- Reuse `$sky`, `$sky-deep`, `$navy`, `$night`, `$blush`, `$champagne`, `$paper`, `$ink`, and `$rose`.
- Preserve Cormorant Garamond and Italianno typography.
- Keep layouts responsive across desktop, tablet, and mobile.
- Keep decoration behind important content and use semantic accessible markup.
- Preserve reduced-motion fallbacks and manual user edits.

## Current Data and Assets

Invitation data in `app.component.ts`:

- Groom: Adithya
- Bride: Sameeksha
- Date: Sunday, 22 November 2026
- Time: 11:45 AM
- Venue: Kacchuru Nageshwara temple, Barkur, Udupi

With Blessings data is stored in `src/app/with-blessings.const.ts`.

Assets include `Bride-Groom.png` as the preserved source, `Bride-Groom-transparent.png` as the runtime image, `bride-groom.svg`, `couple_1.png` through `couple_4.png`, and the design references `first-section.png`, `WithBlessings.png`, `counting-down-design.png`, and `Best-Wishes.png`.

## Validation and Deployment

```bash
npm run build
npm run build -- --base-href /wedding-invitation/
```

`.github/workflows/deploy-pages.yml` deploys on pushes to `main`, uses Node.js 24, runs `npm ci`, builds with `/wedding-invitation/`, uploads `dist/wedding-invitation/browser`, and publishes through GitHub Pages.

Public URL:

```text
https://adithyabhandary.github.io/wedding-invitation/
```
