import Link from 'next/link'
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
