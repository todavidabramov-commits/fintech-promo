'use client'

import Link from 'next/link'
import React, { FormEvent, useActionState, useState } from 'react'

import { loginAction, type AuthState } from '@/lib/actions/auth'
import { EmailInput, FieldError } from '@/components/ui/fields/MaskedFields'
import { validateLogin, type FieldErrors } from '@/lib/validation'

import styles from './AuthForm.module.css'

const initial: AuthState = {}

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initial)
  const [errors, setErrors] = useState<FieldErrors>({})

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget)
    const nextErrors = validateLogin({
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
          <span>Email</span>
          <EmailInput
            aria-invalid={Boolean(errors.email)}
            className={errors.email ? 'field-invalid' : undefined}
            name="email"
            placeholder="ceo@company.ru"
            required
          />
          <FieldError message={errors.email} />
        </label>
        <label className={styles.field}>
          <span>Пароль</span>
          <input
            aria-invalid={Boolean(errors.password)}
            autoComplete="current-password"
            className={errors.password ? 'field-invalid' : undefined}
            maxLength={72}
            name="password"
            required
            type="password"
          />
          <FieldError message={errors.password} />
        </label>
        <button className="btn btn--primary" disabled={pending} style={{ width: '100%' }} type="submit">
          {pending ? 'Входим…' : 'Войти в кабинет'}
        </button>
      </form>
      <p className={styles.switch}>
        Нет аккаунта? <Link href="/registraciya">Зарегистрироваться</Link>
      </p>
    </div>
  )
}
