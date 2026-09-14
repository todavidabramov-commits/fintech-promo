import fs from 'fs'
import path from 'path'

const w = (rel, content) => {
  const full = path.join(process.cwd(), rel)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, content, 'utf8')
  console.log('ok', rel)
}

w('src/app/(frontend)/bankovskie-garantii/page.tsx', `import React from 'react'

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
  { title: 'На исполнение контракта', rate: 'От 1.5%', limit: 'До 500 млн ₽' },
  { title: 'На возврат аванса', rate: 'От 1.8%', limit: 'До 400 млн ₽' },
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
`)

w('src/app/(frontend)/kreditovanie-biznesa/page.tsx', `import React from 'react'

import { ContactBlock } from '@/components/ui/ContactBlock'
import { DocLists } from '@/components/ui/DocLists'
import { Faq } from '@/components/ui/Faq'
import { PageHero } from '@/components/ui/PageHero'
import ui from '@/components/ui/ui.module.css'

export const metadata = {
  title: 'Кредитование бизнеса — Капитал Траст',
  description: 'Оборотные кредиты, инвестиционное финансирование и овердрафт для МСБ.',
}

const programs = [
  {
    n: '01',
    title: 'Оборотный капитал',
    text: 'На закупку сырья, товаров, исполнение текущих заказов. Срок до 24 месяцев. Кредитные линии с лимитом выдачи.',
  },
  {
    n: '02',
    title: 'Инвестиционный кредит',
    text: 'На приобретение коммерческой недвижимости, транспорта, оборудования. Срок до 7 лет. Возможна отсрочка уплаты тела долга.',
  },
  {
    n: '03',
    title: 'Овердрафт',
    text: 'Автоматическое покрытие кассовых разрывов по расчетному счету организации. Лимит рассчитывается из стабильных оборотов.',
  },
]

const tariffs = [
  ['Экспресс-Оборотный', 'от 11.5%', 'до 30 млн ₽', 'Поручительство'],
  ['Инвестиционный Рост', 'от 9.8%', 'до 500 млн ₽', 'Залог оборудования'],
  ['Бизнес-Овердрафт', 'от 12.0%', 'до 15 млн ₽', 'Без залога'],
]

const steps = [
  { n: '01', title: 'Подача отчетности', text: 'Вы загружаете файл отчетности (XML/PDF) за последний год на портал.' },
  { n: '02', title: 'Авто-скоринг', text: 'Наша система за 3 минуты проверяет финансовые коэффициенты вашей фирмы.' },
  { n: '03', title: 'Предварительный оффер', text: 'Мы присылаем конкретный перечень банков-партнеров, готовых выдать деньги.' },
  { n: '04', title: 'Подписание договора', text: 'Финализация сделки и перечисление транша на расчетный счет.' },
]

export default function BusinessLendingPage() {
  return (
    <>
      <PageHero
        eyebrow="Оборотный и инвестиционный капитал"
        title="Профессиональное кредитование малого и среднего бизнеса"
        lead="Предоставление гибких финансовых траншей для пополнения оборотных средств, закупки основных фондов и масштабирования контрактного производства."
        primaryLabel="Оставить заявку"
        secondaryLabel="Кредитные программы"
        secondaryHref="#programs"
      />

      <section className="section" id="programs">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Кредитные программы</p>
            <h2 className="section__title">Решения под конкретные бизнес-задачи</h2>
            <p className="section__lead">
              Условия финансирования зависят от целей использования капитала и операционной модели заемщика.
            </p>
          </div>
          <div className="grid-3">
            {programs.map((item) => (
              <article className="card" key={item.n}>
                <div style={{ color: 'var(--color-teal)', fontWeight: 800, fontSize: 24, marginBottom: 12 }}>{item.n}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 15 }}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Тарифная сетка</p>
            <h2 className="section__title">Ориентировочные параметры кредитования</h2>
            <p className="section__lead">
              Вся информация носит ознакомительный характер — индивидуальные ставки рассчитываются на базе рискового профиля компании.
            </p>
          </div>
          <div className={ui.tableWrap}>
            <table className={ui.table}>
              <thead>
                <tr>
                  <th>Программа</th>
                  <th>Ставка (годовых)</th>
                  <th>Макс. сумма</th>
                  <th>Обеспечение</th>
                </tr>
              </thead>
              <tbody>
                {tariffs.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td className={ui.accent}>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Путь заявки</p>
            <h2 className="section__title">Пошаговый регламент согласования лимитов</h2>
          </div>
          <div className="grid-4">
            {steps.map((step) => (
              <article className="card" key={step.n}>
                <div style={{ color: 'var(--color-teal)', fontWeight: 800, fontSize: 24, marginBottom: 12 }}>{step.n}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 15 }}>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <DocLists
        eyebrow="Документы"
        title="Пакет для финансового анализа заемщика"
        columns={[
          {
            title: 'Финансовая отчетность',
            items: [
              'Бухгалтерский баланс (Форма 1, 2) за прошлый год',
              'Оборотно-сальдовые ведомости по счету 51 за последние 12 месяцев',
              'Справки об открытых счетах и отсутствии картотеки',
              'Справка об отсутствии задолженности перед бюджетом',
            ],
          },
          {
            title: 'Юридический блок',
            items: [
              'Копия Устава ООО со всеми изменениями и решениями',
              'Решение о создании ООО и назначении Генерального директора',
              'Паспорта бенефициаров и учредителей (доля > 25%)',
              'Договор аренды коммерческого помещения',
            ],
          },
        ]}
      />

      <Faq
        eyebrow="FAQ"
        title="Популярные вопросы предпринимателей"
        items={[
          {
            q: 'Требуется ли обязательно открывать расчетный счет в банке-кредиторе?',
            a: 'В большинстве партнерских банков переток оборотов является обязательным условием для получения минимальных процентных ставок по кредиту.',
          },
          {
            q: 'Каковы требования к возрасту бизнеса для подачи заявки?',
            a: 'Минимальный срок ведения реальной хозяйственной деятельности составляет от 12 месяцев по данным официальной отчетности.',
          },
        ]}
      />

      <ContactBlock
        title="Подать заявку на кредитный лимит"
        lead="Наши кредитные аналитики оперативно свяжутся с вами для сбора структуры сделки и оценки залоговой базы."
      />
    </>
  )
}
`)

console.log('pages 1-2 done')
