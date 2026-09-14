import React from 'react'

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
