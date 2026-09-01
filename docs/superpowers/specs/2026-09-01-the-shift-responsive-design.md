# The SHIFT Responsive Section Design

## Goal

Rebuild the second landing-page section from the Figma Premium Signal references while using the Figma artwork and visual relationships as guidance, not as a fixed-size artboard. The section must remain visually coherent from phone widths through large desktop screens.

## Visual direction

- Preserve the near-black canvas, orange accent, warm paper text, faint SHIFT watermark, circular aperture, orbit artwork, signal progress line, and three capability stages.
- Desktop keeps the editorial two-column composition: copy on the left and aperture/orbit artwork on the right, with the progress rail spanning the lower edge.
- Mobile stacks the artwork, copy, handoff/progress, and capability rows in the same visual order as the Figma mobile reference.
- The blue line visible in the supplied mobile screenshot is treated as a Figma selection overlay and is not part of the rendered design.

## Responsive behavior

- Use CSS grid, flexbox, `clamp()`, percentages, and viewport-relative spacing.
- Do not use a fixed Figma artboard, JavaScript resize scaling, or `transform: scale()` for layout.
- Keep the section at least one viewport high, allowing additional height where the mobile capability rows need it.
- Keep decorative artwork clipped inside the section and prevent horizontal page overflow.

## Typography and assets

- English headings use Satoshi; English metadata/body UI uses Inter.
- Arabic copy uses IBM Plex Sans Arabic.
- Reuse the existing Figma-exported aperture, orbit, marker, and atmosphere assets from `public/assets`.

## Accessibility

- Keep a labelled section heading and meaningful image role/label for the aperture artwork.
- Decorative watermark, orbit, and atmosphere assets remain hidden from assistive technology.
- Preserve visible focus styles from the site-wide stylesheet.
