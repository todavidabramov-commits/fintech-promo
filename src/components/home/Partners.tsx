'use client'

import React from 'react'
import Marquee from 'react-fast-marquee'

import styles from './Partners.module.css'

const BANKS = [
  { name: 'Альфа-Банк', src: '/banks/alfa-bank.svg' },
  { name: 'ВТБ', src: '/banks/vtb.svg' },
  { name: 'Газпромбанк', src: '/banks/gazprom-bank.png' },
  { name: 'Совкомбанк', src: '/banks/sovcombank.svg' },
  { name: 'Т-Банк', src: '/banks/t-bank.svg' },
  { name: 'МТС Банк', src: '/banks/mts-bank.svg' },
  { name: 'Озон Банк', src: '/banks/ozon-bank.svg' },
  { name: 'ОТП Банк', src: '/banks/otp-bank.svg' },
  { name: 'Уралсиб', src: '/banks/uralsib.svg' },
  { name: 'Хоум Кредит', src: '/banks/home-credit.svg' },
  { name: 'Локо-Банк', src: '/banks/loko-bank.svg' },
  { name: 'Ренессанс', src: '/banks/renaissance.svg' },
  { name: 'WB Банк', src: '/banks/wb-bank.png' },
  { name: 'ВТБ Капитал', src: '/banks/vtb-capital-full.svg' },
  { name: 'Альфа Страхование', src: '/banks/alfa-insurance.svg' },
] as const

export function Partners() {
  return (
    <section className={`section section--muted ${styles.section}`} id="partners">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">Надежность</p>
          <h2 className="section__title">Ведущие банки-партнеры</h2>
          <p className="section__lead">
            Мы взаимодействуем напрямую только с аккредитованными Министерством финансов РФ
            финансовыми институтами.
          </p>
        </div>
      </div>

      <div className={styles.track}>
        <Marquee autoFill gradient gradientColor="#f5fafd" gradientWidth={72} pauseOnHover speed={28}>
          {BANKS.map((bank) => (
            <div className={styles.card} key={bank.name}>
              <div className={styles.logo}>
                <img alt="" className={styles.image} src={bank.src} />
              </div>
              <span className={styles.caption}>{bank.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
