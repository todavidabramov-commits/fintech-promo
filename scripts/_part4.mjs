import fs from 'fs'
import path from 'path'

const w = (rel, content) => {
  const full = path.join(process.cwd(), rel)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, content, 'utf8')
  console.log('ok', rel)
}

w('src/app/(frontend)/yuridicheskoe-soprovozhdenie/page.tsx', `import React from 'react'

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
`)

w('src/app/(frontend)/blagotvoritelnost/page.tsx', `import React from 'react'

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
          <div className="grid-3">
            {projects.map((item) => (
              <article className="card" key={item.title}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 15 }}>{item.text}</p>
                <div className={ui.progressTrack}>
                  <div className={ui.progressFill} style={{ width: \`\${item.pct}%\` }} />
                </div>
                <div className={ui.progressMeta}>
                  <span>
                    <strong>{item.pct}%</strong> · Собрано: {item.raised}
                  </span>
                  <span>Цель: {item.goal}</span>
                </div>
              </article>
            ))}
          </div>
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
`)

console.log('legal + charity done')
