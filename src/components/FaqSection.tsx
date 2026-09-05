import { useState } from 'react'

type FaqItem = {
  slug: string
  number: string
  question: string
  answer: string
}

type FaqSectionProps = {
  chapterNumber?: string
}

const faqItems: FaqItem[] = [
  {
    slug: 'duration',
    number: '01',
    question: 'المشروع بياخد قد إيه؟',
    answer:
      'المدة بتختلف حسب نوع المشروع ونطاقه. بعد ما نفهم المطلوب بنحدد مدة تنفيذ واضحة قبل بداية التنفيذ.',
  },
  {
    slug: 'pricing',
    number: '02',
    question: 'السعر بيتحدد إزاي؟',
    answer:
      'السعر بيتحدد حسب نطاق المشروع، حجم المحتوى، والوظائف المطلوبة. بعد فهم المشروع بنحدد نطاق واضح وتسعير مناسب له.',
  },
  {
    slug: 'revisions',
    number: '03',
    question: 'التعديلات بتكون إزاي؟',
    answer:
      'كل مرحلة رئيسية بتشمل جولتين تعديلات ضمن النطاق المتفق عليه، وأي تغيير خارج النطاق بنتفق عليه بشكل منفصل قبل تنفيذه.',
  },
  {
    slug: 'content-management',
    number: '04',
    question: 'هل هقدر أعدل محتوى الموقع بعد التسليم؟',
    answer:
      'حسب نوع المشروع. لو المشروع محتاج إدارة محتوى، بنحدد من البداية إيه اللي هتقدر تعدله وإزاي.',
  },
  {
    slug: 'domain-hosting',
    number: '05',
    question: 'الدومين والاستضافة داخلين في المشروع؟',
    answer:
      'الدومين والاستضافة مش داخلين في تكلفة المشروع. بيكونوا باسم العميل، ونقدر نساعدك في اختيارهم وتجهيزهم وربط الموقع عليهم.',
  },
  {
    slug: 'custom-solutions',
    number: '06',
    question: 'بتعملوا حلول مخصصة؟',
    answer:
      'أيوه. لو شغلك محتاج طريقة عمل أو منطق خاص ومش مناسب لقالب جاهز، بنحدد الحل حسب طريقة شغلك ومتطلبات المشروع.',
  },
  {
    slug: 'after-submission',
    number: '07',
    question: 'إيه اللي بيحصل بعد ما أبعت تفاصيل المشروع؟',
    answer:
      'بنراجع التفاصيل الأول، وبعدها بنتواصل معاك عشان نفهم المشروع أكتر ونحدد النطاق والخطوة المناسبة للبدء.',
  },
]

export default function FaqSection({ chapterNumber = '07' }: FaqSectionProps) {
  const [openSlug, setOpenSlug] = useState(faqItems[0].slug)

  return (
    <section
      className="faq-section"
      id="faq"
      aria-labelledby="faq-title"
      dir="rtl"
    >
      <div className="faq-section__grid" aria-hidden="true" />

      <div className="faq-section__canvas">
        <div className="faq-section__chapter" aria-label={`${chapterNumber} FAQ`}>
          <span className="faq-section__chapter-index" dir="ltr">
            {chapterNumber} / FAQ
          </span>
          <span className="faq-section__chapter-label" dir="ltr">
            FAQ / BEFORE WE START
          </span>
        </div>

        <div className="faq-section__intro">
          <h2 className="faq-section__headline" id="faq-title">
            <span>قبل ما نبدأ،</span>
            <strong>غالبًا عندك كام سؤال.</strong>
          </h2>
          <p className="faq-section__supporting-copy">
            جمعنا أكتر الحاجات اللي بتتكرر قبل بداية أي مشروع.
            <br />
            ولو لسه عندك حاجة محتاجة توضيح، بنتكلم فيها معاك قبل ما نبدأ.
          </p>
        </div>

        <div className="faq-section__content">
          <svg
            className="faq-section__signal"
            viewBox="0 0 240 520"
            fill="none"
            aria-hidden="true"
          >
            <path d="M28 14V506" />
            <path d="M0 160H28C144 160 216 256 216 334C216 410 142 474 28 506" />
            <circle cx="28" cy="160" r="3" />
            <circle cx="28" cy="506" r="5" />
          </svg>

          <div className="faq-section__list">
            {faqItems.map((item) => {
              const isOpen = openSlug === item.slug
              const triggerId = `faq-trigger-${item.slug}`
              const panelId = `faq-panel-${item.slug}`

              return (
                <article
                  className={`faq-section__item${isOpen ? ' is-open' : ''}`}
                  key={item.slug}
                >
                  <button
                    className="faq-section__trigger"
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenSlug(item.slug)}
                  >
                    <span className="faq-section__number" dir="ltr">
                      {item.number}
                    </span>
                    <span className="faq-section__question">{item.question}</span>
                    <span className="faq-section__indicator" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </button>

                  <div
                    className="faq-section__answer-shell"
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    aria-hidden={!isOpen}
                  >
                    <div className="faq-section__answer-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
