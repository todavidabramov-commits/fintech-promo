import React from 'react'

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
