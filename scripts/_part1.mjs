import fs from 'fs'
import path from 'path'

const w = (rel, content) => {
  const full = path.join(process.cwd(), rel)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, content, 'utf8')
  console.log('ok', rel)
}

// ========== Shared CSS additions ==========
w('src/components/ui/ui.module.css', `.pageHero {
  background:
    radial-gradient(ellipse 80% 60% at 70% 10%, rgba(12, 148, 136, 0.18), transparent 55%),
    linear-gradient(160deg, #0e1628 0%, #121c34 55%, #0b1220 100%);
  color: #fff;
  padding: 72px 0 72px;
}

.pageHeroInner { max-width: 720px; }

.pageHeroTitle {
  font-size: clamp(32px, 4.4vw, 48px);
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 16px;
}

.pageHeroLead {
  margin: 0 0 28px;
  color: var(--color-text-on-dark-muted);
  font-size: 17px;
  line-height: 1.6;
}

.pageHeroActions { display: flex; flex-wrap: wrap; gap: 12px; }

.faqList { display: grid; gap: 12px; }

.faqItem {
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.faqBtn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  text-align: left;
  background: transparent;
  border: 0;
  padding: 20px 22px;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
  color: var(--color-text);
}

.faqIcon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(12, 148, 136, 0.12);
  color: var(--color-teal);
  display: grid;
  place-items: center;
  font-weight: 700;
}

.faqBody {
  padding: 0 22px 20px;
  color: var(--color-text-muted);
  font-size: 15px;
  line-height: 1.65;
}

.docGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.docList {
  margin: 16px 0 0;
  padding: 0 0 0 18px;
  color: var(--color-text-muted);
  display: grid;
  gap: 10px;
  font-size: 15px;
  line-height: 1.5;
}

.docList li::marker { color: var(--color-teal); }

.rateValue {
  color: var(--color-teal);
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 12px 0 4px;
}

.metaLabel {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.tableWrap {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: #fff;
}

.table {
  width: 100%;
  border-collapse: collapse;
  min-width: 640px;
}

.table th,
.table td {
  padding: 16px 20px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  font-size: 14px;
}

.table th {
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  background: var(--color-bg-muted);
}

.table tr:last-child td { border-bottom: 0; }

.table .accent { color: var(--color-teal); font-weight: 700; }

.status {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: rgba(12, 148, 136, 0.12);
  color: var(--color-teal);
}

.progressTrack {
  height: 8px;
  border-radius: 999px;
  background: #e8eef3;
  overflow: hidden;
  margin: 16px 0 10px;
}

.progressFill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #0c9488, #14b8a6);
}

.progressMeta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
  color: var(--color-text-muted);
}

.progressMeta strong { color: var(--color-text); }

.auditCard {
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 28px;
  box-shadow: var(--shadow-card);
}

.auditRow {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--color-border);
  font-size: 14px;
}

.auditRow:last-child { border-bottom: 0; }

.auditRow strong { color: var(--color-teal); }

.split2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

@media (max-width: 900px) {
  .docGrid, .split2 { grid-template-columns: 1fr; }
}
`)

w('src/components/ui/PageHero.tsx', `import React from 'react'
import styles from './ui.module.css'

type Props = {
  eyebrow: string
  title: string
  lead: string
  primaryHref?: string
  primaryLabel: string
  secondaryHref?: string
  secondaryLabel: string
}

export function PageHero({
  eyebrow,
  title,
  lead,
  primaryHref = '#contact',
  primaryLabel,
  secondaryHref = '#details',
  secondaryLabel,
}: Props) {
  return (
    <section className={styles.pageHero}>
      <div className={\`container \${styles.pageHeroInner}\`}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className={styles.pageHeroTitle}>{title}</h1>
        <p className={styles.pageHeroLead}>{lead}</p>
        <div className={styles.pageHeroActions}>
          <a className="btn btn--primary" href={primaryHref}>{primaryLabel}</a>
          <a className="btn btn--ghost" href={secondaryHref}>{secondaryLabel}</a>
        </div>
      </div>
    </section>
  )
}
`)

w('src/components/ui/Faq.tsx', `'use client'

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
`)

w('src/components/ui/DocLists.tsx', `import React from 'react'
import styles from './ui.module.css'

type Col = { title: string; items: string[] }

export function DocLists({
  eyebrow,
  title,
  lead,
  columns,
  muted = true,
}: {
  eyebrow: string
  title: string
  lead?: string
  columns: Col[]
  muted?: boolean
}) {
  return (
    <section className={\`section \${muted ? 'section--muted' : ''}\`} id="details">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section__title">{title}</h2>
          {lead ? <p className="section__lead">{lead}</p> : null}
        </div>
        <div className={styles.docGrid}>
          {columns.map((col) => (
            <article className="card" key={col.title}>
              <h3 style={{ fontSize: 20, fontWeight: 700 }}>{col.title}</h3>
              <ul className={styles.docList}>
                {col.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
`)

w('src/components/ui/ContactBlock.tsx', `'use client'

import React, { FormEvent, useState } from 'react'
import formStyles from '../home/ContactForm.module.css'

type Props = {
  eyebrow?: string
  title: string
  lead: string
  etaNote?: string
}

export function ContactBlock({
  eyebrow = 'Обратная связь',
  title,
  lead,
  etaNote = 'До 15 минут в рабочее время',
}: Props) {
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section className={\`section section--muted \${formStyles.section}\`} id="contact">
      <div className={\`container \${formStyles.grid}\`}>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section__title">{title}</h2>
          <p className="section__lead">{lead}</p>
          <p className={formStyles.eta}>
            Ориентировочное время ответа:
            <br />
            <strong>{etaNote}</strong>
          </p>
        </div>

        <form className={formStyles.form} onSubmit={onSubmit}>
          <label className={formStyles.field}>
            <span>Название организации / ИНН</span>
            <input name="company" placeholder="ООО Вектор, ИНН 7701234567" required />
          </label>
          <label className={formStyles.field}>
            <span>Контактное лицо</span>
            <input name="person" placeholder="Александр Константинович" required />
          </label>
          <div className={formStyles.row}>
            <label className={formStyles.field}>
              <span>Телефон</span>
              <input name="phone" placeholder="+7 (999) 000-00-00" required type="tel" />
            </label>
            <label className={formStyles.field}>
              <span>Email</span>
              <input name="email" placeholder="ceo@vector.ru" required type="email" />
            </label>
          </div>
          <button className="btn btn--primary" style={{ width: '100%' }} type="submit">
            {sent ? 'Заявка отправлена' : 'Отправить запрос на консультацию'}
          </button>
          <p className={formStyles.note}>
            Отправляя форму, вы соглашаетесь на обработку персональных данных в соответствии с
            ФЗ-152 и правилами конфиденциальности.
          </p>
        </form>
      </div>
    </section>
  )
}
`)

console.log('shared done')
