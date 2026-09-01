# SHIFT Orbit Hero

## Surface

Arabic-first persuasive landing-page hero for SHIFT Creative Solutions. The implementation follows the approved Figma page `08 — Hero Direction / Orbit`, using desktop node `68:7` and mobile node `68:64` from file `Uibom7vJup44tJ6VgXX3kG`.

## Visual world

- Near-black field: `#0A0A0A` with a warm-black right drift.
- Signal orange: `#FE5E0E`, reserved for action, directional accents, and the visual field.
- Warm paper type: `#F7F4EF`; muted copy: `#9B938A`; hairlines: `#3A302B`.
- IBM Plex Sans Arabic carries all Arabic copy. Satoshi carries English display headings, while Inter handles English body copy, metadata, and navigation descriptors.
- The real glass-field image is the visual mechanism, not a decorative placeholder: it makes movement and next-stage progress tangible.

## Composition

Desktop uses the approved 1440×900 canvas as a centered proposition over a full-bleed glass field, a floating navigation pill, a single hero CTA plus the header CTA, quiet grid lines, and a low metadata rail. Mobile uses the approved 390×900 canvas, centered Arabic copy, a framed visual stage, and a small bridge card that intentionally hands off to the next section. The live shell is viewport-filling: the Figma artboard radius is an internal reference detail and is not applied to the browser viewport.

## Responsive rules

- Desktop is rendered on a fixed 1440×900 reference canvas, scaled proportionally to fit the viewport and centered inside a full-bleed shell. The glass field belongs to the desktop composition itself; the shell does not add a second image layer.
- Mobile is rendered on a fixed 390×900 reference canvas, scaled proportionally to fit the viewport and centered over the shell gradient; the glass field appears only inside the rounded visual stage rather than behind the page.
- The mobile menu is keyboard-operable and exposes its expanded state. Reduced-motion users receive the same static composition without transitions.

## Assets

- `public/logo/wordmark-white.png` — supplied SHIFT wordmark.
- `public/favicon.svg` — supplied favicon.
- `public/assets/shift-glass-field.png` — approved glass-field visual exported from the Figma asset source.
- `public/assets/desktop-*-atmosphere.svg` and `public/assets/mobile-*-atmosphere.svg` — exact Figma atmosphere layers.
- `public/assets/primary-arrow.svg`, `public/assets/mobile-primary-arrow.svg`, `public/assets/orange-dot.svg`, `public/assets/mobile-menu.svg`, and `public/assets/mobile-bridge-arrow.svg` — exact Figma control assets.

## Intentional detector findings

The detector flags Inter as common and a grid overlay. These are intentional constraints inherited from the approved Figma direction: Inter is limited to metadata and the grid is the Orbit field's measuring surface.
