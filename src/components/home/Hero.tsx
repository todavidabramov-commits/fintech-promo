import React from 'react'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.grid}`}>
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
