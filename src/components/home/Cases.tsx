import React from 'react'

import styles from './Cases.module.css'

const CASES = [
  {
    company: 'ООО «ДорСтройХолдинг»',
    text: 'Требовалось обеспечение контракта на сумму 1.2 млрд рублей для строительства магистрали. Выдана банковская гарантия консорциумом банков-партнеров за 48 часов без залога имущества.',
    image: '/cases/road-highway.png',
    imageAlt: 'Строительство автомобильной магистрали',
  },
  {
    company: 'АО «ФармРазвитие»',
    text: 'Финансирование закупки оборудования для фармацевтической фабрики. Предоставлен инвестиционный кредит на сумму 250 млн рублей сроком на 5 лет под льготные 8.5% годовых.',
    image: '/cases/pharma-factory.png',
    imageAlt: 'Производственная линия фармацевтической фабрики',
  },
] as const

export function Cases() {
  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">Кейсы</p>
          <h2 className="section__title">Реализованные проекты</h2>
          <p className="section__lead">
            Примеры интеграции наших комплексных решений в реальный сектор экономики.
          </p>
        </div>

        <div className={styles.grid}>
          {CASES.map((item) => (
            <article className={styles.card} key={item.company}>
              <img alt={item.imageAlt} className={styles.media} src={item.image} />
              <div className={styles.body}>
                <h3 className={styles.title}>{item.company}</h3>
                <p className={styles.text}>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
