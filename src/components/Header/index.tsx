'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useId, useState } from 'react'

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
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <header className={`${styles.header} ${open ? styles.headerOpen : ''}`}>
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
          <div className={styles.desktopActions}>
            <a className={styles.phone} href="tel:+78005553030">
              +7 (800) 555-30-30
            </a>
            <Link className="btn btn--ghost-dark" href="/registraciya">
              Зарегистрироваться
            </Link>
            <Link className="btn btn--cabinet" href="/cabinet">
              Личный кабинет
            </Link>
          </div>
          <button
            aria-controls={panelId}
            aria-expanded={open}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            className={`${styles.menuBtn} ${open ? styles.menuBtnOpen : ''}`}
            onClick={() => setOpen((v) => !v)}
            type="button"
          >
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
          </button>
        </div>
      </div>

      <div
        aria-hidden={!open}
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`}
        onClick={() => setOpen(false)}
      />

      <div
        aria-hidden={!open}
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
        id={panelId}
      >
        <nav aria-label="Мобильная навигация" className={styles.panelNav}>
          {NAV.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                className={`${styles.panelLink} ${active ? styles.panelLinkActive : ''}`}
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className={styles.panelFooter}>
          <a className={styles.panelPhone} href="tel:+78005553030">
            +7 (800) 555-30-30
          </a>
          <Link
            className="btn btn--ghost-dark"
            href="/registraciya"
            onClick={() => setOpen(false)}
          >
            Зарегистрироваться
          </Link>
          <Link className="btn btn--cabinet" href="/cabinet" onClick={() => setOpen(false)}>
            Личный кабинет
          </Link>
        </div>
      </div>
    </header>
  )
}
