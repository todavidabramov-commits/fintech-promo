'use client'

import { useRouter } from 'next/navigation'
import React, { FormEvent, useActionState, useEffect, useState } from 'react'

import {
  createApplicationAction,
  logoutAction,
  type AuthState,
} from '@/lib/actions/auth'
import { AmountInput, FieldError } from '@/components/ui/fields/MaskedFields'
import { ServiceTypeSelect } from '@/components/ui/ServiceTypeSelect'
import { validateApplication, type FieldErrors } from '@/lib/validation'

import formStyles from '../auth/AuthForm.module.css'
import styles from './Cabinet.module.css'

type ApplicationItem = {
  id: number | string
  title: string
  serviceType: 'guarantee' | 'credit' | 'legal'
  status: 'review' | 'approved' | 'issued' | 'rejected'
  amount?: number | null
  createdAt?: string | null
}

type Props = {
  user: {
    email: string
    name?: string | null
    company?: string | null
    phone?: string | null
    inn?: string | null
  }
  applications: ApplicationItem[]
}

const STATUS_LABEL: Record<ApplicationItem['status'], string> = {
  review: 'На рассмотрении',
  approved: 'Одобрено',
  issued: 'Выпущено',
  rejected: 'Отклонено',
}

const STATUS_CLASS: Record<ApplicationItem['status'], string> = {
  review: styles.badgeReview,
  approved: styles.badgeApproved,
  issued: styles.badgeIssued,
  rejected: styles.badgeRejected,
}

const SERVICE_LABEL: Record<ApplicationItem['serviceType'], string> = {
  guarantee: 'Банковская гарантия',
  credit: 'Кредитование',
  legal: 'Юридическое сопровождение',
}

const initial: AuthState = {}

function formatAmount(value?: number | null) {
  if (value == null) return '—'
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)
}

export function CabinetDashboard({ user, applications }: Props) {
  const router = useRouter()
  const [state, action, pending] = useActionState(createApplicationAction, initial)
  const [errors, setErrors] = useState<FieldErrors>({})

  useEffect(() => {
    if (state.success) router.refresh()
  }, [state.success, router])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget)
    const nextErrors = validateApplication({
      amount: String(formData.get('amount') ?? ''),
      comment: String(formData.get('comment') ?? ''),
    })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) event.preventDefault()
  }

  const activeCount = applications.filter(
    (item) => item.status === 'review' || item.status === 'approved',
  ).length
  const issuedSum = applications
    .filter((item) => item.status === 'issued' || item.status === 'approved')
    .reduce((sum, item) => sum + (item.amount ?? 0), 0)
  const reviewCount = applications.filter((item) => item.status === 'review').length

  return (
    <div className={styles.shell}>
      <div className={styles.top}>
        <div>
          <p className="eyebrow">Личный кабинет клиента</p>
          <h1 className="section__title" style={{ marginBottom: 8 }}>
            {user.company || 'Организация'}
          </h1>
          <p className="section__lead" style={{ margin: 0 }}>
            {user.name || 'Клиент'} · {user.email}
          </p>
        </div>
        <form action={logoutAction}>
          <button className="btn btn--ghost-dark" type="submit">
            Выйти
          </button>
        </form>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <div className={styles.metricValue}>{activeCount}</div>
          <div className={styles.metricLabel}>Активных заявок</div>
        </div>
        <div className={styles.metric}>
          <div className={styles.metricValue}>{formatAmount(issuedSum)}</div>
          <div className={styles.metricLabel}>Одобренный / выданный объём</div>
        </div>
        <div className={styles.metric}>
          <div className={styles.metricValue}>{reviewCount}</div>
          <div className={styles.metricLabel}>На комплаенс-проверке</div>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>Заявки по продуктам</h2>
          {applications.length === 0 ? (
            <p className={styles.empty}>
              Пока нет заявок. Оформите запрос на гарантию, кредит или юридическое сопровождение —
              статус появится здесь после проверки.
            </p>
          ) : (
            <div className={styles.list}>
              {applications.map((item) => (
                <article className={styles.item} key={item.id}>
                  <div className={styles.itemHead}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <span className={`${styles.badge} ${STATUS_CLASS[item.status]}`}>
                      {STATUS_LABEL[item.status]}
                    </span>
                  </div>
                  <p className={styles.meta}>
                    {SERVICE_LABEL[item.serviceType]} · {formatAmount(item.amount)}
                    {item.createdAt
                      ? ` · ${new Date(item.createdAt).toLocaleDateString('ru-RU')}`
                      : ''}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gap: 20 }}>
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Профиль организации</h2>
            <div className={styles.profileRow}>
              <span>Организация</span>
              <strong>{user.company || 'Не указана'}</strong>
            </div>
            <div className={styles.profileRow}>
              <span>ИНН</span>
              <strong>{user.inn || 'Не указан'}</strong>
            </div>
            <div className={styles.profileRow}>
              <span>Телефон</span>
              <strong>{user.phone || 'Не указан'}</strong>
            </div>
            <div className={styles.profileRow}>
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>
          </div>

          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Документы для сделки</h2>
            <ul className={styles.docs}>
              <li>Карточка организации и устав</li>
              <li>Бухгалтерская отчётность за последний год</li>
              <li>Решение о крупной сделке (при необходимости)</li>
              <li>Паспорт бенефициара / ЕИО</li>
            </ul>
          </div>

          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>Новая заявка</h2>
            <form action={action} className={styles.form} noValidate onSubmit={onSubmit}>
              {state.error ? <p className={formStyles.error}>{state.error}</p> : null}
              {state.success ? <p className={formStyles.success}>{state.success}</p> : null}
              <label className={formStyles.field}>
                <span>Продукт</span>
                <ServiceTypeSelect />
              </label>
              <label className={formStyles.field}>
                <span>Сумма, ₽</span>
                <AmountInput
                  aria-invalid={Boolean(errors.amount)}
                  className={errors.amount ? 'field-invalid' : undefined}
                  name="amount"
                  placeholder="15 000 000"
                />
                <FieldError message={errors.amount} />
              </label>
              <label className={formStyles.field}>
                <span>Комментарий</span>
                <textarea
                  aria-invalid={Boolean(errors.comment)}
                  className={errors.comment ? 'field-invalid' : undefined}
                  maxLength={500}
                  name="comment"
                  placeholder="Срок, обеспечение, номер контракта…"
                />
                <FieldError message={errors.comment} />
              </label>
              <button className="btn btn--primary" disabled={pending} type="submit">
                {pending ? 'Отправляем…' : 'Отправить заявку'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
