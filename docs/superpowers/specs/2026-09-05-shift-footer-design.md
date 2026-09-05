# SHIFT Footer Design

## Direction

Implement the approved footer reference as the calm closing surface after the project brief. Preserve its composition: wordmark on the left, Arabic brand statement on the right, a long signal divider, one horizontal navigation row, three information columns, and a final baseline. The footer reuses the current SHIFT canvas, type, palette, RTL behavior, and real wordmark asset.

## Content and data

- Arabic statement: `برمجيات تحرّك أعمالك للأمام.`
- English line: `SOFTWARE THAT MOVES BUSINESS FORWARD.`
- Navigation uses the real anchors `#work`, `#services`, `#process`, `#why-shift`, and `#contact`.
- Contact and social values live in a footer-specific config. Temporary email and WhatsApp placeholders are explicitly replaceable; social links with empty URLs are not rendered.
- Arabic is shown as active. English is visible but non-interactive until locale switching exists.
- Copyright year is derived at runtime.
- Closing microcopy: `MAKING WHAT MOVES NEXT`.

## Layout

Desktop follows the approved reference closely and remains content-height rather than a full storytelling section. Mobile reorders to logo, statement, slogan, navigation, contact, social, language, and copyright without horizontal overflow.

## Accessibility

Use semantic `footer` and `nav`, labelled groups, proper links, external-link safety attributes, visible focus states, and decorative SVG geometry hidden from assistive technology.

## Scope

Create isolated footer component, config, and stylesheet files. Modify `App.tsx` only to integrate the footer after `ProjectBriefSection`. Do not modify previous sections.
