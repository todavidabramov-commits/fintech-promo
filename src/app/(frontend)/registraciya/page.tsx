import React from 'react'

import { RegisterForm } from '@/components/auth/RegisterForm'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Регистрация — Капитал Траст',
  description: 'Регистрация в личном кабинете клиента Капитал Траст.',
}

export default async function RegisterPage() {
  const user = await getCurrentUser()
  if (user) redirect('/cabinet')

  return (
    <section className="section">
      <div className="container">
        <div className="section__head" style={{ textAlign: 'center', marginInline: 'auto' }}>
          <p className="eyebrow">Клиентский доступ</p>
          <h1 className="section__title">Регистрация организации</h1>
          <p className="section__lead">
            Создайте кабинет, чтобы подавать заявки на банковские гарантии, кредитные лимиты и юридическое
            сопровождение.
          </p>
        </div>
        <RegisterForm />
      </div>
    </section>
  )
}
