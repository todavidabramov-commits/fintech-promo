'use client'

import React, { useState } from 'react'
import styles from './ui.module.css'

type Item = { q: string; a: string }

export function Faq({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string
  title: string
  items: Item[]
}) {
  const [open, setOpen] = useState(0)

  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section__title">{title}</h2>
        </div>
        <div className={styles.faqList}>
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <div className={styles.faqItem} key={item.q}>
                <button
                  aria-expanded={isOpen}
                  className={styles.faqBtn}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  type="button"
                >
                  <span>{item.q}</span>
                  <span className={styles.faqIcon}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen ? <div className={styles.faqBody}>{item.a}</div> : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
