import Link from 'next/link'
import React from 'react'

import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span aria-hidden className={styles.logoMark}>
                К
              </span>
              Капитал Траст
            </div>
            <p className={styles.about}>
              Лицензированная финансовая организация. Комплексные решения для среднего и крупного
              бизнеса. Член саморегулируемых организаций финансовых рынков.
            </p>
          </div>

          <div>
            <h3 className={styles.colTitle}>Услуги бизнеса</h3>
            <ul className={styles.list}>
              <li>
                <Link href="/bankovskie-garantii">Банковские гарантии</Link>
              </li>
              <li>
                <Link href="/kreditovanie-biznesa">Кредиты на госконтракты</Link>
              </li>
              <li>
                <Link href="/kreditovanie-biznesa">Инвестиционные займы</Link>
              </li>
              <li>
                <Link href="/yuridicheskoe-soprovozhdenie">Юридический консалтинг</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={styles.colTitle}>Организация</h3>
            <ul className={styles.list}>
              <li>
                <a href="/#about">О компании</a>
              </li>
              <li>
                <a href="/#partners">Партнерские банки</a>
              </li>
              <li>
                <Link href="/cabinet">Личный кабинет</Link>
              </li>
              <li>
                <Link href="/registraciya">Регистрация</Link>
              </li>
              <li>
                <Link href="/blagotvoritelnost">Благотворительный фонд</Link>
              </li>
              <li>
                <a href="#disclosure">Раскрытие информации</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={styles.colTitle}>Контакты</h3>
            <p className={styles.contact}>
              123112, г. Москва, Пресненская наб., д. 12,
              <br />
              башня Федерация
              <br />
              <br />
              <a href="mailto:info@capitaltrust.ru">info@capitaltrust.ru</a>
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.legal}>
            Информация, размещенная на сайте, носит ознакомительный характер и не является
            публичной офертой. Все финансовые инструменты регулируются законодательством.
          </p>
          <p>© 2026 ООО УК «Капитал Траст». Лицензия ЦБ РФ № 4821-У</p>
        </div>
      </div>
    </footer>
  )
}
