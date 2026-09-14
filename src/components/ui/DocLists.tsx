import React from 'react'
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
    <section className={`section ${muted ? 'section--muted' : ''}`} id="details">
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
