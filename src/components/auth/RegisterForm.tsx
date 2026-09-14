'use client'

import Link from 'next/link'
import React, { FormEvent, useActionState, useState } from 'react'

import { registerAction, type AuthState } from '@/lib/actions/auth'
import {
  EmailInput,
  FieldError,
  InnInput,
  PhoneInput,
  TextInput,
} from '@/components/ui/fields/MaskedFields'
import { validateRegister, type FieldErrors } from '@/lib/validation'

import styles from './AuthForm.module.css'

const initial: AuthState = {}

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, initial)
  const [errors, setErrors] = useState<FieldErrors>({})

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget)
    const nextErrors = validateRegister({
      company: String(formData.get('company') ?? ''),
      name: String(formData.get('name') ?? ''),
      inn: String(formData.get('inn') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
    })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) event.preventDefault()
  }

  return (
    <div className={styles.wrap}>
      <form action={action} className={styles.card} noValidate onSubmit={onSubmit}>
        {state.error ? <p className={styles.error}>{state.error}</p> : null}
        <label className={styles.field}>
          <span>Организация</span>
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
        <label className={styles.field}>
          <span>Контактное лицо</span>
          <TextInput
            aria-invalid={Boolean(errors.name)}
            className={errors.name ? 'field-invalid' : undefined}
            kind="person"
            name="name"
            placeholder="Александр Константинович"
            required
          />
          <FieldError message={errors.name} />
        </label>
        <div className={styles.row}>
          <label className={styles.field}>
            <span>ИНН</span>
            <InnInput
              aria-invalid={Boolean(errors.inn)}
              className={errors.inn ? 'field-invalid' : undefined}
              name="inn"
              placeholder="7701234567"
            />
            <FieldError message={errors.inn} />
          </label>
          <label className={styles.field}>
            <span>Телефон</span>
            <PhoneInput
              aria-invalid={Boolean(errors.phone)}
              className={errors.phone ? 'field-invalid' : undefined}
              name="phone"
              placeholder="+7 (999) 000-00-00"
            />
            <FieldError message={errors.phone} />
          </label>
        </div>
        <label className={styles.field}>
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
        <label className={styles.field}>
          <span>Пароль</span>
          <input
            aria-invalid={Boolean(errors.password)}
            autoComplete="new-password"
            className={errors.password ? 'field-invalid' : undefined}
            maxLength={72}
            minLength={8}
            name="password"
            required
            type="password"
          />
          <FieldError message={errors.password} />
        </label>
        <button className="btn btn--primary" disabled={pending} style={{ width: '100%' }} type="submit">
          {pending ? 'Создаём аккаунт…' : 'Зарегистрироваться'}
        </button>
      </form>
      <p className={styles.switch}>
        Уже есть аккаунт? <Link href="/vhod">Войти</Link>
      </p>
    </div>
  )
}
