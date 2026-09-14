'use client'

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
      <div className={styles.inner}>
        <Link className={styles.logo} href="/">
          <span aria-hidden className={styles.logoMark}>
            К
          </span>
          Капитал Траст
        </Link>

        <nav aria-label="Основная навигация" className={styles.nav}>
          {NAV.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className={styles.actions}>
          <a className={styles.phone} href="tel:+78005553030">
            +7 (800) 555-30-30
          </a>
          <Link className="btn btn--ghost-dark" href="/registraciya">
            Зарегистрироваться
          </Link>
          <Link className="btn btn--cabinet" href="/cabinet">
            Личный кабинет
          </Link>
          <button aria-label="Меню" className={styles.menuBtn} type="button">
            ☰
          </button>
        </div>
      </div>
    </header>
  )
}
