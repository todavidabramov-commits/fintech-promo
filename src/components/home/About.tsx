'use client'

import React, { useEffect, useRef, useState } from 'react'

import styles from './About.module.css'

const PRINCIPLES = [
  {
    title: 'Независимость',
    text: 'Подбираем банки и структуру сделки под задачу клиента, а не под квоту одного партнёра.',
  },
  {
    title: 'Прозрачность',
    text: 'Фиксируем условия, сроки и риски до старта работы — без скрытых комиссий и нежданных поворотов.',
  },
  {
    title: 'Ответственность',
    text: 'Сопровождаем сделку до выпуска гарантии или транша и остаёмся на связи после закрытия.',
  },
] as const

export function About() {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className={`section section--muted ${styles.section} ${visible ? styles.visible : ''}`}
      id="about"
      ref={ref}
    >
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className="eyebrow">О компании</p>
          <h2 className="section__title">
            Финансовый партнёр для сделок, где цена ошибки высока
          </h2>
          <p className={styles.lead}>
            ООО УК «Капитал Траст» — команда с опытом в банковских гарантиях, кредитовании бизнеса и юридическом сопровождении.
            Мы соединяем доступ к лимитам банков-партнёров с практической экспертизой по 44-ФЗ, 223-ФЗ и коммерческим контрактам.
          </p>
          <p className={styles.lead}>
            Работаем со средним и крупным бизнесом: от первой консультации до выпуска инструмента и сопровождения исполнения.
          </p>
        </div>

        <ul className={styles.principles}>
          {PRINCIPLES.map((item, i) => (
            <li
              className={styles.principle}
              key={item.title}
              style={{ transitionDelay: `${120 + i * 90}ms` }}
            >
              <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.principleTitle}>{item.title}</h3>
              <p className={styles.principleText}>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
