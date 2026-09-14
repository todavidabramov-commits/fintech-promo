import React from 'react'

import { ContactBlock } from '@/components/ui/ContactBlock'
import { Faq } from '@/components/ui/Faq'
import { PageHero } from '@/components/ui/PageHero'
import ui from '@/components/ui/ui.module.css'

export const metadata = {
  title: 'Юридическое сопровождение — Капитал Траст',
  description: 'Due diligence, структурирование M&A и защита интеллектуальной собственности.',
}

const practices = [
  {
    title: 'Due Diligence (Аудит)',
    text: 'Глубокая проверка финансово-хозяйственной, налоговой и правовой истории приобретаемого актива перед подписанием сделки.',
  },
  {
    title: 'Структурирование M&A',
    text: 'Разработка многоуровневых схем слияний и поглощений для минимизации транзакционных издержек и корпоративных конфликтов.',
  },
  {
    title: 'Защита интеллектуальной собственности',
    text: 'Регистрация товарных знаков, патентование технологий и составление договоров коммерческой концессии.',
  },
]

const scenarios = [
  {
    title: 'Венчурные фонды',
    text: 'Проверка юридической чистоты стартапа при входе на раундах Pre-seed / Seed / A.',
  },
  {
    title: 'Промышленные холдинги',
    text: 'Покупка производственных мощностей, земельных наделов, интеллектуальных прав у сторонних юрлиц.',
  },
  {
    title: 'Масштабируемый ритейл',
    text: 'Сопровождение масштабного франчайзинга и выкупа площадей у коммерческих застройщиков.',
  },
]

const risks = [
  { title: 'Судебные споры', status: 'Критично' },
  { title: 'Налоговые доначисления', status: 'Управляемо' },
  { title: 'Неочевидный залог активов', status: 'Блокировка' },
]

export default function LegalSupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Инвестиционный и корпоративный аудит"
        title="Юридическое сопровождение M&A и инвестиционных сделок"
        lead="Минимизация регуляторных и налоговых рисков при покупке активов, реструктуризации корпоративного долга и выстраивании венчурного финансирования."
        primaryLabel="Получить аудит"
        secondaryLabel="Перечень практик"
        secondaryHref="#practices"
      />

      <section className="section" id="practices">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Портфолио практик</p>
            <h2 className="section__title">Спектр юридической безопасности бизнеса</h2>
          </div>
          <div className="grid-3">
            {practices.map((item) => (
              <article className="card" key={item.title}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-teal)', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 15 }}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Для кого</p>
            <h2 className="section__title">Сценарии правовой поддержки</h2>
          </div>
          <div className="grid-3">
            {scenarios.map((item) => (
              <article className="card" key={item.title}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 15 }}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Карта рисков</p>
            <h2 className="section__title">Иллюстрация процесса минимизации правовых угроз</h2>
            <p className="section__lead">Интегральный подход к выявлению скрытых обязательств продавца.</p>
          </div>
          <div className="grid-3">
            {risks.map((item) => (
              <article className="card" key={item.title}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{item.title}</h3>
                <p className={ui.metaLabel} style={{ marginBottom: 8 }}>Статус угрозы</p>
                <span className={ui.status}>{item.status}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Faq
        eyebrow="Правовой FAQ"
        title="Сложные вопросы корпоративного права"
        items={[
          {
            q: 'Что такое SHA (акционерное соглашение) и зачем оно нужно?',
            a: 'Акционерное соглашение определяет правила голосования по ключевым вопросам, порядок разрешения дедлоков и ограничения по отчуждению долей бенефициарами холдинга.',
          },
          {
            q: 'Каковы последствия покупки компании без проведения Due Diligence?',
            a: 'Новый владелец несет полную солидарную ответственность по скрытым долгам, неуплаченным налогам за предыдущие три года и оспариваемым сделкам с недвижимостью.',
          },
        ]}
      />

      <ContactBlock
        title="Записаться на правовой разбор сделки"
        lead="Опишите в общих чертах структуру активов продавца и состав будущей сделки. Мы гарантируем полную конфиденциальность (NDA на первом звонке)."
      />
    </>
  )
}
