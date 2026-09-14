import React from 'react'

import { CharityProjects } from '@/components/charity/CharityProjects'
import { ContactBlock } from '@/components/ui/ContactBlock'
import { PageHero } from '@/components/ui/PageHero'
import ui from '@/components/ui/ui.module.css'

export const metadata = {
  title: 'Благотворительность — Капитал Траст',
  description: 'Благотворительные программы фонда Капитал Траст: образование, медицина, ESG.',
}

const principles = [
  {
    title: 'Адресная помощь',
    text: 'Каждый перечисленный рубль идет непосредственно конкретным получателям под жестким контролем со стороны наблюдательного совета.',
  },
  {
    title: 'Технологичность',
    text: 'Использование современных цифровых платформ для мгновенной отчетности и прозрачного трекинга платежей.',
  },
  {
    title: 'ESG соответствие',
    text: 'Интеграция экологических, социальных и управленческих стандартов в деятельность каждого нашего партнера.',
  },
]

const projects = [
  {
    title: 'Будущее инженерии',
    text: 'Гранты талантливым студентам технических вузов в дотационных регионах.',
    pct: 75,
    raised: '18.5 млн ₽',
    goal: '25 млн ₽',
  },
  {
    title: 'Медицина регионов',
    text: 'Закупка высокотехнологичного реанимационного оборудования в районные больницы.',
    pct: 40,
    raised: '8.0 млн ₽',
    goal: '20 млн ₽',
  },
  {
    title: 'Цифровая деревня',
    text: 'Подключение сельских школ к высокоскоростному интернету и поставка ноутбуков.',
    pct: 90,
    raised: '13.5 млн ₽',
    goal: '15 млн ₽',
  },
]

const partners = [
  {
    title: 'Совместные проекты',
    text: 'Создание именного гранта или стипендии от имени вашей организации на базе нашей верифицированной инфраструктуры.',
  },
  {
    title: 'Волонтерский трек',
    text: 'Подключение ваших сотрудников к реальным делам фонда на выездных локациях фонда.',
  },
  {
    title: 'Налоговые преференции',
    text: 'Предоставление полного пакета закрывающих актов для уменьшения налогооблагаемой базы.',
  },
]

export default function CharityPage() {
  return (
    <>
      <PageHero
        eyebrow="Социальная ответственность бизнеса"
        title="Устойчивое будущее: благотворительные программы фонда"
        lead="Капитал Траст направляет до 5% операционной прибыли на развитие региональной образовательной инфраструктуры, грантовую поддержку талантливой молодежи и адресную медицинскую помощь."
        primaryLabel="Принять участие"
        secondaryLabel="Отчеты фонда"
        secondaryHref="#transparency"
      />

      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Наши принципы</p>
            <h2 className="section__title">Как мы помогаем</h2>
            <p className="section__lead">
              Программы благотворительного фонда строятся на базе строгих критериев прозрачности и максимальной эффективности.
            </p>
          </div>
          <div className="grid-3">
            {principles.map((item) => (
              <article className="card" key={item.title}>
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
            <p className="eyebrow">Действующие программы</p>
            <h2 className="section__title">Проекты в активной фазе</h2>
          </div>
          <CharityProjects projects={projects} />
        </div>
      </section>

      <section className="section" id="transparency">
        <div className="container">
          <div className={ui.split2}>
            <div>
              <p className="eyebrow">Прозрачность</p>
              <h2 className="section__title">Абсолютная финансовая подотчетность</h2>
              <p className="section__lead">
                Капитал Траст ежеквартально публикует официальные аудированные отчеты о расходовании денежных средств фонда. Любой благотворитель может лично проверить движение финансов по расчетным счетам.
              </p>
              <a className="btn btn--primary" href="#contact" style={{ marginTop: 24 }}>
                Скачать годовой отчет PDF
              </a>
            </div>
            <div className={ui.auditCard}>
              <p className={ui.metaLabel} style={{ marginBottom: 8 }}>Данные независимого аудита</p>
              <div className={ui.auditRow}>
                <span>Административные расходы</span>
                <strong>3.2% (при норме до 10%)</strong>
              </div>
              <div className={ui.auditRow}>
                <span>Целевые выплаты</span>
                <strong>96.8%</strong>
              </div>
              <div className={ui.auditRow}>
                <span>Уровень прозрачности (РА Эксперт)</span>
                <strong>A++</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--muted">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Корпоративное участие</p>
            <h2 className="section__title">Для партнеров и инвесторов Капитал Траст</h2>
            <p className="section__lead">
              Возможности совместного ESG позиционирования и участия ваших сотрудников в волонтерских движениях.
            </p>
          </div>
          <div className="grid-3">
            {partners.map((item) => (
              <article className="card" key={item.title}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 15 }}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactBlock
        title="Подать заявку на грант или предложить проект"
        lead="Если ваше образовательное учреждение или медицинская клиника нуждается в поддержке — отправьте подробную презентацию, и экспертный совет рассмотрит ее на ближайшем заседании."
      />
    </>
  )
}
