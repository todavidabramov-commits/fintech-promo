'use client'

import React, { FormEvent, useState } from 'react'

import {
  EmailInput,
  FieldError,
  PhoneInput,
  TextInput,
} from '@/components/ui/fields/MaskedFields'
import { validateContact, type FieldErrors } from '@/lib/validation'

import formStyles from '../home/ContactForm.module.css'

type Props = {
  eyebrow?: string
  title: string
  lead: string
  etaNote?: string
}

export function ContactBlock({
  eyebrow = 'Обратная связь',
  title,
  lead,
  etaNote = 'До 15 минут в рабочее время',
}: Props) {
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = {
      company: String(new FormData(form).get('company') ?? ''),
      person: String(new FormData(form).get('person') ?? ''),
      phone: String(new FormData(form).get('phone') ?? ''),
      email: String(new FormData(form).get('email') ?? ''),
    }
    const nextErrors = validateContact(data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setSent(true)
  }

  return (
    <section className={`section section--muted ${formStyles.section}`} id="contact">
      <div className={`container ${formStyles.grid}`}>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section__title">{title}</h2>
          <p className="section__lead">{lead}</p>
          <p className={formStyles.eta}>
            Ориентировочное время ответа:
            <br />
            <strong>{etaNote}</strong>
          </p>
        </div>

        <form className={formStyles.form} noValidate onSubmit={onSubmit}>
          <label className={formStyles.field}>
            <span>Название организации</span>
            <TextInput
              aria-invalid={Boolean(errors.company)}
              className={errors.company ? 'field-invalid' : undefined}
              kind="company"
              name="company"
              placeholder="ООО Вектор"
              required
            />
            <FieldError message={errors.company} />
          </label>
          <label className={formStyles.field}>
            <span>Контактное лицо</span>
            <TextInput
              aria-invalid={Boolean(errors.person)}
              className={errors.person ? 'field-invalid' : undefined}
              kind="person"
              name="person"
              placeholder="Александр Константинович"
              required
            />
            <FieldError message={errors.person} />
          </label>
          <div className={formStyles.row}>
            <label className={formStyles.field}>
              <span>Телефон</span>
              <PhoneInput
                aria-invalid={Boolean(errors.phone)}
                className={errors.phone ? 'field-invalid' : undefined}
                name="phone"
                placeholder="+7 (999) 000-00-00"
                required
              />
              <FieldError message={errors.phone} />
            </label>
            <label className={formStyles.field}>
              <span>Email</span>
              <EmailInput
                aria-invalid={Boolean(errors.email)}
                className={errors.email ? 'field-invalid' : undefined}
                name="email"
                placeholder="ceo@vector.ru"
                required
              />
              <FieldError message={errors.email} />
            </label>
          </div>
          <button className="btn btn--primary" disabled={sent} style={{ width: '100%' }} type="submit">
            {sent ? 'Заявка отправлена' : 'Отправить запрос на консультацию'}
          </button>
          <p className={formStyles.note}>
            Отправляя форму, вы соглашаетесь на обработку персональных данных в соответствии с
            ФЗ-152 и правилами конфиденциальности.
          </p>
        </form>
      </div>
    </section>
  )
}
