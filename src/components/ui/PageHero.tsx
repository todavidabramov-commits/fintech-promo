import React from 'react'
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
      <div className={`container ${styles.pageHeroInner}`}>
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
