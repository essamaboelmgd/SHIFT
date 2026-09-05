# SHIFT FAQ Editorial Accordion Design Specification

## Objective

Build the homepage FAQ chapter as a calm, practical objection-removal section placed after `06 / WHY SHIFT` and immediately before the future final project CTA. It must feel native to SHIFT while prioritizing clarity over spectacle.

## Approved Direction

Use the supplied reference as the composition direction: a right-aligned Arabic headline area followed by a wide, line-based editorial accordion. A restrained signal path occupies the left negative space on desktop. The section must not use FAQ cards, shadows, boxed rows, parallax, or entrance reveals.

## Chapter and Header

- Chapter: `07 / FAQ`, derived from the visible `06 / WHY SHIFT` chapter that precedes it.
- Small label: `FAQ / BEFORE WE START`.
- Headline line one: `قبل ما نبدأ،` in off-white.
- Headline line two: `غالبًا عندك كام سؤال.` in Signal Orange.
- Supporting copy:
  - `جمعنا أكتر الحاجات اللي بتتكرر قبل بداية أي مشروع.`
  - `ولو لسه عندك حاجة محتاجة توضيح، بنتكلم فيها معاك قبل ما نبدأ.`

## FAQ Data

Store all FAQ entries in one typed array so the section can later consume CMS or backend data without changing its rendering model.

1. `المشروع بياخد قد إيه؟`
   - `المدة بتختلف حسب نوع المشروع ونطاقه. بعد ما نفهم المطلوب بنحدد Timeline واضحة قبل بداية التنفيذ.`
2. `السعر بيتحدد إزاي؟`
   - `السعر بيتحدد حسب نطاق المشروع، حجم المحتوى، والوظائف المطلوبة. بعد فهم المشروع بنحدد Scope واضح وتسعير مناسب له.`
3. `التعديلات بتكون إزاي؟`
   - `كل مرحلة رئيسية بتشمل جولتين تعديلات ضمن النطاق المتفق عليه، وأي تغيير خارج النطاق بنتفق عليه بشكل منفصل قبل تنفيذه.`
4. `هل هقدر أعدل محتوى الموقع بعد التسليم؟`
   - `حسب نوع المشروع. لو المشروع محتاج إدارة محتوى، بنحدد من البداية إيه اللي هتقدر تعدله وإزاي.`
5. `الدومين والاستضافة داخلين في المشروع؟`
   - `الدومين والاستضافة مش داخلين في تكلفة المشروع. بيكونوا باسم العميل، ونقدر نساعدك في اختيارهم وتجهيزهم وربط الموقع عليهم.`
6. `بتعملوا حلول مخصصة؟`
   - `أيوه. لو شغلك محتاج منطق أو Workflow خاص ومش مناسب لقالب جاهز، بنحدد الحل حسب طريقة شغلك ومتطلبات المشروع.`
7. `إيه اللي بيحصل بعد ما أبعت تفاصيل المشروع؟`
   - `بنراجع التفاصيل الأول، وبعدها بنتواصل معاك عشان نفهم المشروع أكتر ونحدد النطاق والخطوة المناسبة للبدء.`

## Accordion Behavior

- The first item is open by default.
- Exactly one item is open at a time.
- Clicking the currently open item keeps it open; the section never enters an ambiguous all-closed state.
- Each row uses a real `button` with `aria-expanded` and `aria-controls`.
- Each answer region has a stable id, `role="region"`, and an accessible relationship to its button.
- Native button keyboard behavior handles Enter and Space. Visible global focus treatment remains active.
- The answer animation uses a grid-row expansion (`0fr` to `1fr`) with an inner overflow wrapper, not a fixed `max-height`.
- Reduced-motion users receive an effectively immediate state change.

## Visual Composition

- Reuse the existing `min(92%, 1480px)` desktop canvas convention and global SHIFT tokens.
- Use a deep near-black surface, off-white text, muted warm copy, Signal Orange, and thin low-contrast separators.
- Header copy sits on the right with deliberate negative space on the left.
- The accordion begins below the header and spans most of the canvas width.
- Every row contains only the two-digit number, Arabic question, plus/minus indicator, answer, and separator.
- Active state uses an orange number, brighter question, and one thin orange signal line or marker.
- The desktop left field may contain one low-opacity path and endpoint marker derived from the supplied reference. It must remain subordinate to the FAQ content.
- No item background, large radius, shadow, icon tile, or SaaS-card treatment.

## Responsive Rules

- Desktop: right-aligned header above a broad accordion; the left signal path uses otherwise empty space without reducing answer width.
- Tablet: preserve the same hierarchy, reduce the decorative field, and keep questions and indicators comfortably spaced.
- Mobile around 390px and 360px: header first, then a full-width accordion; hide or simplify the decorative path; keep question and answer type readable; preserve RTL alignment and touch targets at least 44px tall.
- Use logical properties and explicit LTR only for English microcopy and numerals so the structure can support English later.
- No horizontal overflow.

## Architecture and Scope

- Create `src/components/FaqSection.tsx`.
- Add the component after `WhyShiftSection` in `src/App.tsx`.
- Add one uniquely scoped `.faq-section` CSS block to `src/index.css`.
- Do not modify the markup, behavior, or styles of existing homepage sections.
- Because other agents are working in the same repository, re-read shared files immediately before patching and make minimal context-based edits only.

## Verification

- Verify default and switched open states.
- Verify Enter, Space, Tab order, `aria-expanded`, and `aria-controls`.
- Inspect desktop at 1280, 1440, and 1600; tablet at 768; mobile at 390 and 360.
- Confirm RTL alignment, answer readability, no overflow, restrained motion, and visual continuity after Why SHIFT.
- Run `npm run build`, `git diff --check`, browser console checks, and the Impeccable detector on only the FAQ implementation targets.
