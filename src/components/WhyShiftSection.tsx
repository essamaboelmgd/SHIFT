const whyShiftContent = {
  chapter: '06 / WHY SHIFT',
  context: 'THE SHIFT / THE PARTNER',
  eyebrow: 'مش مجرد تنفيذ.',
  headline: ['مش بتتعامل مع تسليم.', 'بتتعامل مع شريك.'],
  body: [
    'من أول فهم الهدف لحد الإطلاق، بنفضل قريبين من القرار والشغل نفسه.',
    'مش مجرد تنفيذ وتسليم، لكن مسؤولية عن إن الحل يخدم المرحلة اللي شغلك فيها.',
  ],
} as const

const founder = {
  image: '/assets/why-shift/founder-portrait.webp',
  alt: 'مؤسس SHIFT في بورتريه بإضاءة دافئة وخلفية داكنة',
  width: 1122,
  height: 1402,
} as const

const principles = [
  {
    label: '01 / DIRECT',
    title: 'تواصل مباشر',
    body: 'تتعامل معانا مباشرة، من غير طبقات تعطل القرار.',
    mark: 'direct',
  },
  {
    label: '02 / OWNERSHIP',
    title: 'مسؤولية كاملة',
    body: 'بنتعامل مع المشروع كمسؤولية، مش مجرد قائمة مهام.',
    mark: 'ownership',
  },
  {
    label: '03 / LONG VIEW',
    title: 'تفكير للمرحلة الجاية',
    body: 'بنبني الحل عشان يكمل مع شغلك، مش بس عشان يوم الإطلاق.',
    mark: 'long-view',
  },
] as const

function PrincipleMark({ type }: { type: (typeof principles)[number]['mark'] }) {
  if (type === 'direct') {
    return (
      <svg viewBox="0 0 52 34" aria-hidden="true">
        <path d="M6 6.5h24c8.8 0 16 5.1 16 11.5s-7.2 11.5-16 11.5H18l-8 3v-6.2C7.5 24.2 6 21.3 6 18V6.5Z" />
        <circle cx="18" cy="18" r="1.5" /><circle cx="26" cy="18" r="1.5" /><circle cx="34" cy="18" r="1.5" />
      </svg>
    )
  }

  if (type === 'ownership') {
    return (
      <svg viewBox="0 0 52 34" aria-hidden="true">
        <circle cx="26" cy="17" r="13" /><circle cx="26" cy="17" r="6" /><path d="M3 17h8M41 17h8" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 52 34" aria-hidden="true">
      <path d="M4 17h34" /><path d="m29 7 10 10-10 10M39 7l10 10-10 10" />
    </svg>
  )
}

export default function WhyShiftSection() {
  return (
    <section className="why-shift" id="why-shift" aria-labelledby="why-shift-title">
      <div className="why-shift__grid" aria-hidden="true" />

      <div className="why-shift__canvas">
        <header className="why-shift__topline">
          <p className="why-shift__chapter" dir="ltr">{whyShiftContent.chapter}</p>
          <p className="why-shift__context" dir="ltr">
            {whyShiftContent.context}
            <span aria-hidden="true" />
          </p>
        </header>

        <div className="why-shift__stage">
          <div className="why-shift__copy" dir="rtl">
            <p className="why-shift__eyebrow">{whyShiftContent.eyebrow}</p>
            <h2 className="why-shift__headline" id="why-shift-title">
              <span>{whyShiftContent.headline[0]}</span>
              <span className="why-shift__headline-accent">{whyShiftContent.headline[1]}</span>
            </h2>
            <div className="why-shift__body">
              {whyShiftContent.body.map((line) => <p key={line}>{line}</p>)}
            </div>
          </div>

          <figure className="why-shift__portrait">
            <div className="why-shift__portrait-shell">
              <div className="why-shift__portrait-media">
                <img
                  src={founder.image}
                  width={founder.width}
                  height={founder.height}
                  alt={founder.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <svg className="why-shift__portrait-orbit" viewBox="0 0 720 760" preserveAspectRatio="none" aria-hidden="true">
                <path d="M90 690C112 344 242 70 652 8" />
                <path d="M165 760C245 452 402 181 720 106" />
                <circle cx="90" cy="690" r="4" />
                <circle cx="652" cy="8" r="4" />
                <circle cx="505" cy="232" r="3" />
              </svg>
              <span className="why-shift__portrait-corner" aria-hidden="true" />
              <span className="why-shift__portrait-signal" aria-hidden="true" />
              <span className="why-shift__portrait-line" aria-hidden="true" />
              <span className="why-shift__portrait-note" aria-hidden="true">FOCUSED&nbsp;&nbsp; / &nbsp;&nbsp;ALIGNED&nbsp;&nbsp; / &nbsp;&nbsp;COMMITTED</span>
            </div>
          </figure>

          <div className="why-shift__principles-wrap">
            <div className="why-shift__principles-heading" aria-hidden="true">
              <span>ما يميز شراكتنا</span>
              <i />
            </div>
            <ol className="why-shift__principles" aria-label="مبادئ الشراكة">
              {principles.map((principle) => (
                <li className="why-shift__principle" key={principle.label} dir="rtl">
                  <PrincipleMark type={principle.mark} />
                  <span className="why-shift__principle-label" dir="ltr">{principle.label}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
