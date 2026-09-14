import fs from 'fs'
import path from 'path'

const w = (rel, content) => {
  const full = path.join(process.cwd(), rel)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, content, 'utf8')
  console.log('ok', rel)
}

// ---- Fix Header ----
w('src/components/Header/index.tsx', `'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import styles from './Header.module.css'

const NAV = [
  { href: '/', label: 'Главная' },
  { href: '/bankovskie-garantii', label: 'Банковские гарантии' },
  { href: '/kreditovanie-biznesa', label: 'Кредитование бизнеса' },
  { href: '/yuridicheskoe-soprovozhdenie', label: 'Юридическое сопровождение' },
  { href: '/blagotvoritelnost', label: 'Благотворительность' },
] as const

export function Header() {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <div className={\`container \${styles.inner}\`}>
        <Link className={styles.logo} href="/">
          <span aria-hidden className={styles.logoMark}>К</span>
          Капитал Траст
        </Link>

        <nav aria-label="Основная навигация" className={styles.nav}>
          {NAV.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                className={\`\${styles.navLink} \${active ? styles.navLinkActive : ''}\`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className={styles.actions}>
          <a className={styles.phone} href="tel:+78005553030">+7 (800) 555-30-30</a>
          <a className="btn btn--cabinet" href="#cabinet">Личный кабинет</a>
          <button aria-label="Меню" className={styles.menuBtn} type="button">☰</button>
        </div>
      </div>
    </header>
  )
}
`)

// ---- Fix home components ----
w('src/components/home/Hero.tsx', `import React from 'react'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={\`container \${styles.grid}\`}>
        <div className={styles.copy}>
          <p className="eyebrow">Институциональные финансы</p>
          <h1 className={styles.title}>Капитальные решения для устойчивого роста бизнеса</h1>
          <p className={styles.lead}>
            Комплексные финансовые инструменты, независимые гарантии и профессиональное юридическое
            сопровождение инвестиций на всех этапах жизненного цикла вашего предприятия.
          </p>
          <div className={styles.actions}>
            <a className="btn btn--primary" href="#contact">Рассчитать лимиты</a>
            <a className="btn btn--ghost" href="#about">О компании</a>
          </div>
        </div>

        <div aria-hidden className={styles.chartCard}>
          <div className={styles.chartHead}>
            <span className={styles.chartLabel}>Динамика портфеля (YTD)</span>
            <span className={styles.badge}>+24.8%</span>
          </div>
          <div className={styles.bars}>
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </div>
        </div>
      </div>
    </section>
  )
}
`)

w('src/components/home/Directions.tsx', `import Link from 'next/link'
import React from 'react'

const DIRECTIONS = [
  {
    href: '/bankovskie-garantii',
    title: 'Банковские гарантии',
    text: 'Обеспечение госконтрактов по 44-ФЗ и 223-ФЗ без залогов.',
  },
  {
    href: '/kreditovanie-biznesa',
    title: 'Кредитование бизнеса',
    text: 'Оборотные кредиты, инвестиционный капитал и кредитные линии.',
  },
  {
    href: '/yuridicheskoe-soprovozhdenie',
    title: 'Юридическое сопровождение',
    text: 'Проведение due diligence, структурирование M&A сделок.',
  },
  {
    href: '/blagotvoritelnost',
    title: 'Благотворительный фонд',
    text: 'Программы устойчивого корпоративного развития (ESG).',
  },
] as const

export function Directions() {
  return (
    <section className="section" id="directions">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">Направления</p>
          <h2 className="section__title">Основные инструменты поддержки бизнеса</h2>
          <p className="section__lead">
            Финансово-юридическая экосистема, разработанная для минимизации рисков при реализации
            сложных проектов.
          </p>
        </div>
        <div className="grid-4">
          {DIRECTIONS.map((item) => (
            <article className="card" key={item.href}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 15 }}>{item.text}</p>
              <Link className="link-more" href={item.href}>Подробнее →</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
`)

w('src/components/home/Stats.tsx', `import React from 'react'

const STATS = [
  { value: '8+', label: 'Лет успешной работы' },
  { value: '450 млрд ₽', label: 'Объем выданных гарантий' },
  { value: '12 тыс.+', label: 'Доверенных контрагентов' },
  { value: '30+', label: 'Банков-партнеров' },
] as const

export function Stats() {
  return (
    <section className="section section--muted">
      <div className="container">
        <div className="grid-4">
          {STATS.map((item) => (
            <div key={item.label}>
              <div style={{ color: 'var(--color-teal)', fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                {item.value}
              </div>
              <p style={{ marginTop: 8, color: 'var(--color-text-muted)', fontSize: 14 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`)

w('src/components/home/Process.tsx', `import React from 'react'

const STEPS = [
  { n: '01', title: 'Подача заявки', text: 'Заполнение базовой анкеты онлайн и автоматическая верификация заемщика за 5 минут.' },
  { n: '02', title: 'Экспресс-анализ', text: 'Предварительный андеррайтинг портфеля рисков по упрощенному комплекту документации.' },
  { n: '03', title: 'Согласование лимитов', text: 'Подбор оптимальных банков-партнеров и согласование структуры обеспечения сделки.' },
  { n: '04', title: 'Выпуск гарантии/транша', text: 'Зачисление средств или отправка электронной версии гарантии в реестр ЕИС.' },
] as const

export function Process() {
  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">Процесс работы</p>
          <h2 className="section__title">Прозрачная цепочка реализации сделки</h2>
          <p className="section__lead">
            Мы ценим ваше время и свели бюрократические процедуры к обоснованному технологическому минимуму.
          </p>
        </div>
        <div className="grid-4">
          {STEPS.map((step) => (
            <article key={step.n}>
              <div style={{ color: 'var(--color-teal)', fontWeight: 800, fontSize: 28, marginBottom: 12 }}>{step.n}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 15 }}>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
`)

w('src/components/home/Partners.tsx', `import React from 'react'

const BANKS = ['Сбербанк', 'Промсвязьбанк', 'ВТБ', 'Росбанк', 'Газпромбанк', 'Совкомбанк', 'Альфа-Банк', 'Райффайзенбанк'] as const

export function Partners() {
  return (
    <section className="section section--muted" id="partners">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">Надежность</p>
          <h2 className="section__title">Ведущие банки-партнеры</h2>
          <p className="section__lead">
            Мы взаимодействуем напрямую только с аккредитованными Министерством финансов РФ финансовыми институтами.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
          {BANKS.map((bank) => (
            <div key={bank} style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 999, minHeight: 52, display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 14, color: 'var(--color-text-muted)' }}>
              {bank}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
`)

w('src/components/home/ContactForm.tsx', `import React from 'react'
import { ContactBlock } from '@/components/ui/ContactBlock'

export function ContactForm() {
  return (
    <ContactBlock
      title="Начать сотрудничество"
      lead="Оставьте первичные параметры вашей компании, и наш ведущий эксперт проведет экспресс-оценку возможных финансовых инструментов."
    />
  )
}
`)

w('src/app/(frontend)/layout.tsx', `import { Manrope } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import './styles.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata = {
  description: 'Комплексные финансовые инструменты, банковские гарантии и юридическое сопровождение для бизнеса.',
  title: 'Капитал Траст — институциональные финансы',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html className={manrope.variable} lang="ru">
      <body>
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
`)

console.log('home/header fixed')
