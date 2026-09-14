import React from 'react'

import { LoginForm } from '@/components/auth/LoginForm'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Вход — Капитал Траст',
  description: 'Вход в личный кабинет клиента Капитал Траст.',
}

export default async function LoginPage() {
  const user = await getCurrentUser()
  if (user) redirect('/cabinet')

  return (
    <section className="section">
      <div className="container">
        <div className="section__head" style={{ textAlign: 'center', marginInline: 'auto' }}>
          <p className="eyebrow">Клиентский доступ</p>
          <h1 className="section__title">Вход в личный кабинет</h1>
          <p className="section__lead">
            Отслеживайте заявки на гарантии и кредиты, статусы комплаенс-проверки и документы по сделкам.
          </p>
        </div>
        <LoginForm />
      </div>
    </section>
  )
}
