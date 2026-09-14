import React from 'react'

import { ContactBlock } from '@/components/ui/ContactBlock'
import { DocLists } from '@/components/ui/DocLists'
import { Faq } from '@/components/ui/Faq'
import { PageHero } from '@/components/ui/PageHero'
import ui from '@/components/ui/ui.module.css'

export const metadata = {
  title: 'Банковские гарантии — Капитал Траст',
  description: 'Экспресс-оформление банковских гарантий по 44-ФЗ и 223-ФЗ без залога.',
}

const audience = [
  {
    title: 'Участникам госзакупок',
    text: 'Поставщикам товаров и услуг по 44-ФЗ и 223-ФЗ для обеспечения заявок, исполнения обязательств и гарантийного периода.',
  },
  {
    title: 'Коммерческим подрядчикам',
    text: 'Организациям, выполняющим заказы крупных частных холдингов в рамках тендерных процедур.',
  },
  {
    title: 'Получателям авансов',
    text: 'Гарантирование возврата авансовых платежей заказчика при крупных поставках оборудования.',
  },
]

const products = [
  { title: 'Исполнение контракта', rate: 'От 1.5%', limit: 'До 500 млн ₽' },
  { title: 'Возврат аванса', rate: 'От 1.8%', limit: 'До 400 млн ₽' },
  { title: 'Обеспечение заявки', rate: 'От 1.2%', limit: 'До 150 млн ₽' },
  { title: 'Гарантийный период', rate: 'От 1.4%', limit: 'До 300 млн ₽' },
]

export default function BankGuaranteesPage() {
  return (
    <>
      <PageHero
        eyebrow="ФЗ-44, ФЗ-223, коммерческие сделки"
        title="Экспресс-оформление банковских гарантий"
        lead="Получение тендерных и обеспечительных независимых гарантий от топ-30 уполномоченных Минфином банков напрямую. Без залогов, скрытых комиссий и личного визита в банк."
        primaryLabel="Рассчитать стоимость"
        secondaryLabel="Требования к заемщикам"
        secondaryHref="#details"
      />

      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Целевой профиль</p>
            <h2 className="section__title">Кому подходит предложение</h2>
            <p className="section__lead">
              Обеспечиваем компаниям беспрепятственный доступ к закупкам любого уровня сложности.
            </p>
          </div>
          <div className="grid-3">
            {audience.map((item) => (
              <article className="card" key={item.title}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 15 }}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted" id="products">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Виды гарантий</p>
            <h2 className="section__title">Инструменты под любые контрактные обязательства</h2>
          </div>
          <div className="grid-4">
            {products.map((item) => (
              <article className="card" key={item.title}>
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>{item.title}</h3>
                <p className={ui.metaLabel} style={{ marginTop: 18 }}>Ставка</p>
                <div className={ui.rateValue}>{item.rate}</div>
                <p className={ui.metaLabel} style={{ marginTop: 14 }}>Лимит</p>
                <p style={{ fontWeight: 700, marginTop: 6 }}>{item.limit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <DocLists
        eyebrow="Пакет документов"
        title="Минимальный комплект для принятия решения"
        lead="Мы снизили нагрузку на бухгалтерию — в большинстве случаев достаточно стандартных отчетов."
        muted={false}
        columns={[
          {
            title: 'Для юридических лиц',
            items: [
              'Устав в актуальной редакции со всеми изменениями',
              'Бухгалтерский баланс (Форма №1 и №2) за последние 4 квартала',
              'Решение о назначении единоличного исполнительного органа',
              'Декларации по налогу на прибыль / НДС',
            ],
          },
          {
            title: 'Для индивидуальных предпринимателей',
            items: [
              'Копия свидетельства ОГРНИП / Выписка из ЕГРИП',
              'Налоговая декларация (УСН/3-НДФЛ) за прошлый год',
              'Книга учета доходов и расходов (КУДиР) за текущий год',
              'Паспорт гражданина РФ (все страницы)',
            ],
          },
        ]}
      />

      <Faq
        eyebrow="Частые вопросы"
        title="Ответы на критически важные аспекты"
        items={[
          {
            q: 'Сколько времени занимает весь процесс выпуска гарантии?',
            a: 'Предварительное решение принимается за 1–2 часа. Полное согласование структуры и выпуск в реестр занимает от 1 до 3 рабочих дней в зависимости от сложности условий сделки.',
          },
          {
            q: 'Включена ли гарантия в Единый государственный реестр (ЕИС)?',
            a: 'Да, все выдаваемые при нашем содействии гарантии по 44-ФЗ и 223-ФЗ вносятся банками-эмитентами строго в официальный реестр согласно нормативным актам.',
          },
          {
            q: 'Возможен ли выпуск гарантии без залога и поручительства сторонних лиц?',
            a: 'Для большинства стандартных лимитов до 100 млн рублей оформление происходит по экспресс-технологии без залогов, при условии стабильных финансовых показателей компании-заявителя.',
          },
        ]}
      />

      <ContactBlock
        title="Получить расчет стоимости за 15 минут"
        lead="Укажите ссылку на закупку или прикрепите проект контракта — мы оперативно рассчитаем точные комиссии по аккредитованным банкам."
      />
    </>
  )
}
