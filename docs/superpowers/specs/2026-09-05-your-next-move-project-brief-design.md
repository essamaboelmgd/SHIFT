# Your Next Move — Project Brief Design Specification

## Objective

Create the final major homepage conversion section directly before the footer. The section closes SHIFT's next-stage narrative by collecting only the information needed to understand a project and by explaining what happens after submission.

## Approved Direction

Use the supplied CTA reference as the hierarchy guide and translate it into the established SHIFT visual system. The approved composition is **Editorial Brief + Route Ledger**:

- Chapter: `08 / YOUR NEXT MOVE`, because FAQ is chapter 07 in the current homepage sequence.
- Keep the chapter number in section config rather than embedding it in layout markup. This lets a future Client Proof section change the sequence without restructuring the component.
- Context label: `THE SHIFT / PROJECT BRIEF`.
- A large centered Arabic headline and concise supporting line lead the section.
- Below the headline, use a two-column desktop layout with the Project Brief form as the primary area on the right and What Happens Next as the supporting area on the left.
- Preserve the reference's strong final-CTA feeling while reducing its dashboard/HUD qualities: fewer boxes, no icon tiles, no heavy glow, and thinner structural lines.
- On mobile, render headline, form, then What Happens Next.

## Content

### Headline

- Line one: `عندك الخطوة الجاية؟`
- Accent line: `نحددها سوا.`
- Supporting copy: `شاركنا مشروعك، ونحدد معاك أنسب بداية للمرحلة الجاية.`

### Form

Fields:

1. `الاسم` — required text input.
2. `الشركة / البراند` — optional text input.
3. `نوع المشروع` — required single-choice option group:
   - Landing Page
   - Business Website
   - E-commerce
   - Education Platform
   - Portfolio / Personal Brand
   - Custom Web Solution
4. `وصف مختصر عن المشروع` — required textarea.
   - Helper: `احكيلنا باختصار عن شغلك، الهدف، وإيه اللي محتاج يتغير.`
5. `وسيلة التواصل المفضلة` — required single-choice option group:
   - WhatsApp
   - Phone
   - Email
6. A required contact-value field whose visible label, input type, input mode, and autocomplete adapt to the selected contact method.

Primary CTA: `أرسل تفاصيل مشروعك`.

Use explicit labels and Arabic inline validation messages. Placeholders may provide examples but never replace labels.

### What Happens Next

Render exactly three steps as one vertical editorial route without cards or icons:

1. `01` — `نفهم مشروعك` — `بنراجع التفاصيل ونحدد الأسئلة المهمة.`
2. `02` — `نحدد الخطوة المناسبة` — `بنتواصل معاك ونحدد النطاق والاتجاه المناسب.`
3. `03` — `نرتب البداية` — `بعد الاتفاق بيكون عندنا Scope وخطوة تالية واضحة.`

Do not promise a response time.

## Interaction and State

The form has four explicit states:

- `idle`: all inputs and the CTA are available.
- `loading`: disable duplicate submission and show a clear Arabic sending label inside the CTA.
- `success`: replace the form body with an inline SHIFT-styled confirmation: `وصلتنا التفاصيل.` and `هنراجع المشروع ونتواصل معاك بالطريقة اللي اخترتها.`
- `error`: keep the user's values, show a human Arabic error summary, and allow immediate retry.

Do not use `alert()`, page navigation, or a success modal.

## Validation

- Validate name, project type, description, contact method, and contact value on the client.
- Validate email syntax when Email is selected.
- Validate that phone-based methods contain a plausible phone value without enforcing a country-specific format.
- Associate every error with its field using accessible descriptions.
- Move focus to the first invalid field after a failed submit.
- Preserve entered values when project type or contact method changes.

## Submission Architecture

Define a clean payload:

```ts
type ProjectBriefPayload = {
  name: string
  company: string
  projectType: ProjectType
  description: string
  contactMethod: ContactMethod
  contactValue: string
  locale: 'ar'
  source: 'homepage-project-brief'
}
```

Keep submission behind an injectable async adapter. A mock adapter may simulate success only in development or test mode. In production, the component must never show a success state unless a real adapter confirms that the payload was transmitted successfully.

When no real production adapter exists, render an explicit unconnected state and disable submission with a human message explaining that online project submission is not available yet. Do not discard entered values. The component handles rejected adapter promises as the error state. This boundary can later be replaced with the backend/dashboard API without changing the UI or schema.

## Visual System

- Reuse `#050505`, `#FDFBF9`, `#FE5E0E`, existing muted colors, IBM Plex Sans Arabic, and configured English fonts.
- Use the same `min(92%, 1480px)` desktop canvas and mobile side spacing as current sections.
- Use a dark editorial surface, low-opacity structural grid, thin rules, and one subtle route/path curve tying the form and explanation together.
- Use Signal Orange for the accent headline, selected options, focus/validation signals, step markers, and the primary CTA.
- Keep the form trustworthy and tactile: strong labels, calm input surfaces, readable contrast, and minimal containment.
- Avoid large decorative glow, icon cards, glass panels, sci-fi controls, and generic native-select styling.

## Responsive and I18N

- Desktop: headline above; form right and steps left in a stable two-column composition.
- Tablet: preserve readable form width and balanced supporting steps; stack before columns become cramped.
- Mobile at 390px and 360px: headline, form, steps; large option targets; no horizontal overflow.
- Keep the component Arabic-first and RTL while using logical CSS properties and typed data so future LTR support does not require duplicate markup.

## Integration Boundaries

- Create a dedicated `ProjectBriefSection` component, a small submission module with an injectable adapter, and a section config containing the current chapter number `08`.
- Mount the section after the current final content section and before the future footer.
- Scope styles under `project-brief`.
- Do not alter existing sections.
- Because other agents are editing the same project, re-read `App.tsx` and the end of `index.css` immediately before applying integration edits, and limit patches to the new import/render line and a uniquely namespaced CSS block.

## Quality and Acceptance Criteria

- Empty submit shows Arabic field validation and focuses the first invalid field.
- Project and contact options work with mouse, touch, and keyboard.
- The contact field adapts correctly for WhatsApp, Phone, and Email.
- Loading blocks duplicate submission.
- Development/test mock success and rejected-adapter error render inline without losing layout stability.
- A production build without a real adapter exposes an honest unavailable state and cannot produce fake success.
- The section works at desktop, tablet, 390px, and 360px with no overflow.
- Runtime console is clean and the production build passes.
- Existing homepage sections remain untouched visually and functionally.
