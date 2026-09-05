import { useMemo, useRef, useState, type FormEvent } from 'react'

import {
  contactFieldByMethod,
  contactMethodOptions,
  nextSteps,
  projectBriefSectionConfig,
  projectTypeOptions,
} from './projectBriefConfig'
import {
  resolveProjectBriefAdapter,
  toProjectBriefPayload,
  validateProjectBrief,
  type ContactMethod,
  type ProjectBriefErrors,
  type ProjectBriefSubmissionAdapter,
  type ProjectBriefValues,
  type ProjectType,
} from './projectBriefModel'
import './ProjectBriefSection.css'

const initialValues: ProjectBriefValues = {
  name: '',
  company: '',
  projectType: '',
  description: '',
  contactMethod: '',
  contactValue: '',
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

type ProjectBriefSectionProps = {
  chapterNumber?: string
  submissionAdapter?: ProjectBriefSubmissionAdapter
  isDevelopment?: boolean
}

const runtimeIsDevelopment = Boolean(
  (import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV,
)

export default function ProjectBriefSection({
  chapterNumber = projectBriefSectionConfig.chapterNumber,
  submissionAdapter,
  isDevelopment = runtimeIsDevelopment,
}: ProjectBriefSectionProps) {
  const [values, setValues] = useState<ProjectBriefValues>(initialValues)
  const [errors, setErrors] = useState<ProjectBriefErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const nameRef = useRef<HTMLInputElement>(null)
  const projectTypeRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const contactMethodRef = useRef<HTMLInputElement>(null)
  const contactValueRef = useRef<HTMLInputElement>(null)

  const submission = useMemo(
    () => resolveProjectBriefAdapter({ isDevelopment, adapter: submissionAdapter }),
    [isDevelopment, submissionAdapter],
  )

  const contactField = values.contactMethod ? contactFieldByMethod[values.contactMethod] : null
  const isUnconnected = submission.status === 'unconnected'

  const clearError = (field: keyof ProjectBriefValues) => {
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
    if (status === 'error') setStatus('idle')
  }

  const updateText = (field: 'name' | 'company' | 'description' | 'contactValue', value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    clearError(field)
  }

  const updateProjectType = (projectType: ProjectType) => {
    setValues((current) => ({ ...current, projectType }))
    clearError('projectType')
  }

  const updateContactMethod = (contactMethod: ContactMethod) => {
    setValues((current) => ({ ...current, contactMethod }))
    clearError('contactMethod')
    clearError('contactValue')
  }

  const focusFirstError = (nextErrors: ProjectBriefErrors) => {
    const refs = {
      name: nameRef,
      projectType: projectTypeRef,
      description: descriptionRef,
      contactMethod: contactMethodRef,
      contactValue: contactValueRef,
    }

    const firstInvalid = (['name', 'projectType', 'description', 'contactMethod', 'contactValue'] as const)
      .find((field) => nextErrors[field])
    if (firstInvalid) window.requestAnimationFrame(() => refs[firstInvalid].current?.focus())
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'loading' || isUnconnected) return

    const nextErrors = validateProjectBrief(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      focusFirstError(nextErrors)
      return
    }

    if (!submission.adapter) return
    setStatus('loading')

    try {
      await submission.adapter(toProjectBriefPayload(values))
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setStatus('idle')
    window.requestAnimationFrame(() => nameRef.current?.focus())
  }

  return (
    <section className="project-brief" id="contact" aria-labelledby="project-brief-title">
      <div className="project-brief__canvas">
        <header className="project-brief__topline">
          <p className="project-brief__chapter" dir="ltr">
            {chapterNumber} / {projectBriefSectionConfig.chapterLabel}
          </p>
          <p className="project-brief__context" dir="ltr">
            {projectBriefSectionConfig.context}
            <span aria-hidden="true" />
          </p>
        </header>

        <div className="project-brief__intro" dir="rtl">
          <h2 id="project-brief-title">
            <span>{projectBriefSectionConfig.headline[0]}</span>
            <span>{projectBriefSectionConfig.headline[1]}</span>
          </h2>
          <p>{projectBriefSectionConfig.supportingLine}</p>
        </div>

        <div className="project-brief__composition" dir="rtl">
          <svg className="project-brief__route-art" viewBox="0 0 820 920" aria-hidden="true">
            <path className="project-brief__trail-glow" d="M-54 790C155 718 252 590 205 471C151 334 8 353 74 205C122 97 260 50 414 76" />
            <path d="M-54 790C155 718 252 590 205 471C151 334 8 353 74 205C122 97 260 50 414 76" />
            <path d="M-82 836C170 756 310 611 254 443C210 310 89 283 158 156C210 61 337 28 474 51" />
            <path d="M-22 742C118 686 183 586 147 502C105 403 2 421 31 291" />
            <line x1="74" y1="80" x2="74" y2="330" />
            <line x1="-10" y1="205" x2="320" y2="205" />
            <circle cx="-22" cy="742" r="4" />
            <circle cx="205" cy="471" r="4" />
            <circle cx="74" cy="205" r="4" />
            <circle cx="414" cy="76" r="4" />
          </svg>
          <div className="project-brief__form-frame">
            <div className="project-brief__panel-heading">
              <h3>شاركنا مشروعك</h3>
              <span dir="ltr">PROJECT BRIEF</span>
            </div>

            {status === 'success' ? (
              <div className="project-brief__success" role="status" aria-live="polite">
                <span className="project-brief__success-marker" aria-hidden="true" />
                <p className="project-brief__success-label" dir="ltr">BRIEF RECEIVED</p>
                <h3>وصلتنا التفاصيل.</h3>
                <p>هنراجع المشروع ونتواصل معاك بالطريقة اللي اخترتها.</p>
                <button type="button" onClick={resetForm}>إرسال مشروع آخر</button>
              </div>
            ) : (
              <form className="project-brief__form" noValidate onSubmit={handleSubmit}>
                <div className="project-brief__field-row">
                  <div className="project-brief__field">
                    <label htmlFor="brief-name">الاسم <span aria-hidden="true">*</span></label>
                    <input
                      ref={nameRef}
                      id="brief-name"
                      name="name"
                      autoComplete="name"
                      value={values.name}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'brief-name-error' : undefined}
                      onChange={(event) => updateText('name', event.target.value)}
                    />
                    {errors.name && <p className="project-brief__error" id="brief-name-error">{errors.name}</p>}
                  </div>

                  <div className="project-brief__field">
                    <label htmlFor="brief-company">الشركة / البراند <span>اختياري</span></label>
                    <input
                      id="brief-company"
                      name="company"
                      autoComplete="organization"
                      value={values.company}
                      onChange={(event) => updateText('company', event.target.value)}
                    />
                  </div>
                </div>

                <fieldset
                  className="project-brief__choice-group"
                  aria-describedby={errors.projectType ? 'brief-project-type-error' : undefined}
                >
                  <legend>نوع المشروع <span aria-hidden="true">*</span></legend>
                  <div className="project-brief__options project-brief__options--projects">
                    {projectTypeOptions.map((option, index) => (
                      <label className="project-brief__option" key={option.value}>
                        <input
                          ref={index === 0 ? projectTypeRef : undefined}
                          type="radio"
                          name="projectType"
                          value={option.value}
                          checked={values.projectType === option.value}
                          aria-invalid={Boolean(errors.projectType)}
                          onChange={() => updateProjectType(option.value)}
                        />
                        <span dir="ltr">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.projectType && <p className="project-brief__error" id="brief-project-type-error">{errors.projectType}</p>}
                </fieldset>

                <div className="project-brief__field project-brief__field--description">
                  <label htmlFor="brief-description">وصف مختصر عن المشروع <span aria-hidden="true">*</span></label>
                  <textarea
                    ref={descriptionRef}
                    id="brief-description"
                    name="description"
                    rows={5}
                    value={values.description}
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={`brief-description-help${errors.description ? ' brief-description-error' : ''}`}
                    onChange={(event) => updateText('description', event.target.value)}
                  />
                  <p className="project-brief__helper" id="brief-description-help">
                    احكيلنا باختصار عن شغلك، الهدف، وإيه اللي محتاج يتغير.
                  </p>
                  {errors.description && <p className="project-brief__error" id="brief-description-error">{errors.description}</p>}
                </div>

                <fieldset
                  className="project-brief__choice-group"
                  aria-describedby={errors.contactMethod ? 'brief-contact-method-error' : undefined}
                >
                  <legend>وسيلة التواصل المفضلة <span aria-hidden="true">*</span></legend>
                  <div className="project-brief__options project-brief__options--contact">
                    {contactMethodOptions.map((option, index) => (
                      <label className="project-brief__option" key={option.value}>
                        <input
                          ref={index === 0 ? contactMethodRef : undefined}
                          type="radio"
                          name="contactMethod"
                          value={option.value}
                          checked={values.contactMethod === option.value}
                          aria-invalid={Boolean(errors.contactMethod)}
                          onChange={() => updateContactMethod(option.value)}
                        />
                        <span dir="ltr">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.contactMethod && <p className="project-brief__error" id="brief-contact-method-error">{errors.contactMethod}</p>}
                </fieldset>

                <div className="project-brief__field project-brief__field--contact">
                  <label htmlFor="brief-contact-value">
                    {contactField?.label ?? 'بيانات التواصل'} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    ref={contactValueRef}
                    id="brief-contact-value"
                    name="contactValue"
                    type={contactField?.type ?? 'text'}
                    inputMode={contactField?.inputMode ?? 'text'}
                    autoComplete={contactField?.autoComplete ?? 'off'}
                    disabled={!values.contactMethod}
                    value={values.contactValue}
                    aria-invalid={Boolean(errors.contactValue)}
                    aria-describedby={errors.contactValue ? 'brief-contact-value-error' : undefined}
                    onChange={(event) => updateText('contactValue', event.target.value)}
                  />
                  {errors.contactValue && <p className="project-brief__error" id="brief-contact-value-error">{errors.contactValue}</p>}
                </div>

                <div className="project-brief__submit-zone">
                  <div className="project-brief__status" aria-live="polite">
                    {status === 'error' && (
                      <p role="alert">حصلت مشكلة أثناء إرسال التفاصيل. جرّب تاني، وبياناتك لسه موجودة.</p>
                    )}
                    {isUnconnected && (
                      <p>إرسال التفاصيل أونلاين مش متاح حاليًا. بياناتك مش هتتبعت قبل ربط وسيلة تواصل آمنة.</p>
                    )}
                  </div>
                  <button
                    className="project-brief__submit"
                    type="submit"
                    disabled={status === 'loading' || isUnconnected}
                  >
                    <span>{status === 'loading' ? 'جاري إرسال التفاصيل…' : 'أرسل تفاصيل مشروعك'}</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="project-brief__route" aria-labelledby="project-brief-route-title">
            <div className="project-brief__panel-heading">
              <h3 id="project-brief-route-title">ماذا يحدث بعد الإرسال؟</h3>
              <span dir="ltr">WHAT HAPPENS NEXT</span>
            </div>
            <ol>
              {nextSteps.map((step, index) => (
                <li key={step.number}>
                  <span className="project-brief__step-number" dir="ltr">{step.number}</span>
                  <span className="project-brief__step-icon" aria-hidden="true">
                    <svg viewBox="0 0 32 32">
                      {index === 0 && <path d="M6 7h20v14H15l-6 5v-5H6V7Zm5 7h.01M16 14h.01M21 14h.01" />}
                      {index === 1 && <path d="M16 4v5M16 23v5M4 16h5M23 16h5M16 10a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />}
                      {index === 2 && <path d="m7 23 4-9L24 7l-7 13-10 3Zm4-9 6 6M18 11l3 3M6 26l4-4" />}
                    </svg>
                  </span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="project-brief__privacy">
              بنستخدم بياناتك للتواصل بخصوص مشروعك فقط.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
