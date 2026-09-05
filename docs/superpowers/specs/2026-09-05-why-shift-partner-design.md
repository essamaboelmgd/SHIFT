# Why SHIFT — The Partner Design Specification

## Objective

Build the sixth homepage chapter as a calm, human counterpoint to the technical and editorial intensity of Hero, The SHIFT, Selected Work, What We Build, and Process. The section explains partnership and responsibility without becoming an About Us or founder-profile section.

## Approved Direction

The approved direction is **Quiet Partner Stage**.

- Place the section directly after Process.
- Use a near 50/50 desktop split with Arabic content on the left and the founder portrait on the right, matching the established editorial composition of the site and the supplied directional reference.
- Keep the headline as the dominant visual element. The portrait is a major element, but its apparent scale and contrast must not overpower the headline.
- Follow the split with one full-width editorial principles rail.
- On mobile, use the order: content, portrait, principles.

## Content

### Chapter line

- Primary label: `06 / WHY SHIFT`
- Supporting label: `THE SHIFT / THE PARTNER`

### Main copy

- Eyebrow: `مش مجرد تنفيذ.`
- Headline line one: `مش بتتعامل مع تسليم.`
- Headline line two: `بتتعامل مع شريك.`
- Highlight the second headline line with Signal Orange.
- Supporting copy:
  - `من أول فهم الهدف لحد الإطلاق، بنفضل قريبين من القرار والشغل نفسه.`
  - `مش مجرد تنفيذ وتسليم، لكن مسؤولية عن إن الحل يخدم المرحلة اللي شغلك فيها.`

### Principles

Render the principles from one structured data array. Each principle contains only an English micro label, Arabic title, and one Arabic explanatory line.

1. `01 / DIRECT` — `تواصل مباشر` — `تتعامل معانا مباشرة، من غير طبقات تعطل القرار.`
2. `02 / OWNERSHIP` — `مسؤولية كاملة` — `بنتعامل مع المشروع كمسؤولية، مش مجرد قائمة مهام.`
3. `03 / LONG VIEW` — `تفكير للمرحلة الجاية` — `بنبني الحل عشان يكمل مع شغلك، مش بس عشان يوم الإطلاق.`

## Portrait Treatment

- Use only the supplied real founder portrait.
- Preserve the face, body proportions, and photographic content without AI modification.
- Use a deliberate crop and a subtle dark/warm color treatment compatible with the source image.
- Avoid face distortion and excessive crop on all breakpoints.
- Use one understated geometric frame treatment: a thin neutral line, one distinctive corner, and a very limited orange signal marker.
- Do not use a strong glow, fake 3D, office decoration, profile-card styling, biography, or founder credentials.

## Visual Language

- Reuse the existing project tokens and fonts.
- Background: `#050505` with a restrained warm atmosphere.
- Text: `#FDFBF9` and existing muted text colors.
- Accent: `#FE5E0E`, limited to the highlighted headline phrase and small signal details.
- Use IBM Plex Sans Arabic and the already configured English label font.
- Use the same container width, chapter line, thin rules, and editorial microcopy conventions as the existing homepage.
- Keep the background grid lower-opacity than the preceding sections.
- Do not add icons, cards, counters, technology marks, skill bars, statistics, or new decorative systems.

## Principles Rail

- Render one continuous full-width editorial rail, not three cards.
- Use thin separators between principles on desktop.
- Use minimal orange markers and no icons.
- Keep Arabic copy clearly RTL and English labels explicitly LTR.
- On mobile, stack the principles vertically with horizontal separators.

## Responsive Behavior

- Desktop: balanced near 50/50 split, followed by the full-width principles rail.
- Tablet: preserve portrait and text balance without narrow text columns; reduce headline and frame scale fluidly.
- Mobile around 390px and 360px: content first, portrait second with controlled height, principles last as a vertical list.
- Prevent horizontal overflow and maintain comfortable line lengths and touch-safe focus behavior.
- Use logical layout properties and isolated `dir` attributes so the component can support LTR later without structural rewriting.

## Architecture

- Create a dedicated `WhyShiftSection` component.
- Store section copy, founder image metadata, and principles in clean data/config objects.
- Add the section to `App.tsx` directly after `ProcessSection`.
- Scope all styling under a unique `why-shift` namespace in `index.css`.
- Copy the supplied portrait into `public/assets/why-shift/` using an optimized web format while preserving visual quality.
- Do not modify existing homepage sections unless a technical integration issue makes a minimal change necessary.

## Motion and Interaction

- No complex scroll or entrance animation.
- The layout is static.
- Only restrained hover/focus feedback may be used where semantically appropriate.
- Respect `prefers-reduced-motion` for any micro-transition.

## Acceptance Criteria

- The transition from Process to Why SHIFT visibly lowers the page's intensity without introducing a different design language.
- The headline remains the primary visual focus and the portrait remains clearly important.
- The portrait uses the real supplied image and has no artificial facial or scene edits.
- The section does not resemble a corporate About Us block or SaaS feature cards.
- Desktop, tablet, 390px, and 360px layouts are visually balanced and free of overflow.
- RTL reading order and alignment are intentional; English micro labels remain editorial and LTR.
- Existing sections remain visually and functionally unchanged.
- Production build passes and the browser console is clean.
