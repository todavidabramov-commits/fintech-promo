# Capital Trust — Fintech Promo Platform

Промо-сайт финансовой компании **«Капитал Траст»** с личным кабинетом клиента и админ-панелью на Payload CMS.

Институциональные финансы: банковские гарантии, кредитование бизнеса, юридическое сопровождение и благотворительные программы.

---

## Возможности

### Публичный сайт
- Лендинг с Hero, направлениями услуг, статистикой, процессом, партнёрами и кейсами
- Отдельные страницы продуктов: гарантии, кредиты, юрсопровождение, благотворительность
- Адаптивная вёрстка (desktop / mobile)
- Анимации: счётчики статистики, прогресс-бары благотворительности, hover-эффекты, карусель банков

### Личный кабинет
- Регистрация организации и вход по email/паролю
- Профиль компании (ИНН, телефон, контакты)
- Подача заявок на гарантии / кредиты / юрсопровождение
- Статусы заявок и чек-лист документов для сделки

### Админка Payload
- Управление пользователями и заявками
- Роли: `admin` (CMS) и `client` (кабинет)
- Русская локализация интерфейса

### Формы и валидация
- Маски ввода: телефон `+7 (…)`, ИНН, суммы (`react-imask`)
- Схемы валидации **Yup** на клиенте и сервере
- Стилизованный select продуктов (`react-select`)

---

## Стек технологий

| Слой | Технологии |
|------|------------|
| Frontend | Next.js 16 (App Router), React 19, CSS Modules |
| CMS / Backend | Payload CMS 3 |
| БД | PostgreSQL (`@payloadcms/db-postgres`) |
| Auth | Payload Auth (cookie session) |
| UI libs | react-fast-marquee, react-select, react-imask |
| Validation | Yup |
| Прочее | TypeScript, Sharp, Lexical editor |

---

## Плюсы архитектуры

- **Один стек** — сайт, API и админка в одном Next.js-приложении
- **PostgreSQL** — готово к деплою на Vercel (Neon / другой managed Postgres)
- **Разделение ролей** — клиенты не попадают в `/admin`, админы работают в CMS
- **Server Actions** — вход, регистрация и заявки без отдельного REST-слоя на фронте
- **Типобезопасность** — TypeScript + автогенерация `payload-types.ts`
- **Готовый UX** — маски, валидация, анимации, единый визуальный язык (teal / navy)

---

## Структура проекта

```
src/
├── app/
│   ├── (frontend)/     # публичные страницы + кабинет
│   └── (payload)/      # /admin и /api
├── collections/        # Users, Applications, Media
├── components/         # UI сайта, auth, cabinet
├── lib/                # auth helpers, Yup, server actions
└── payload.config.ts
```

### Ключевые маршруты

| URL | Описание |
|-----|----------|
| `/` | Главная |
| `/bankovskie-garantii` | Банковские гарантии |
| `/kreditovanie-biznesa` | Кредитование |
| `/yuridicheskoe-soprovozhdenie` | Юридическое сопровождение |
| `/blagotvoritelnost` | Благотворительность |
| `/registraciya` | Регистрация клиента |
| `/vhod` | Вход в кабинет |
| `/cabinet` | Личный кабинет |
| `/admin` | Админ-панель Payload |

---

## Быстрый старт

### Требования
- Node.js 20+
- npm (или pnpm)
- PostgreSQL (рекомендуется [Neon](https://neon.tech) — бесплатный tier; локально можно Docker)

### Установка

1. Создайте БД в Neon (или поднимите Postgres через `docker compose up -d postgres`).
2. Скопируйте connection string в `.env`:

```bash
cp .env.example .env
```

3. Укажите `DATABASE_URL` и `PAYLOAD_SECRET`, затем:

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).  
Payload создаст таблицы при первом запуске (`push` schema).

Первый пользователь, созданный в `/admin`, получает роль **admin**.  
Регистрация на сайте создаёт пользователей с ролью **client**.

### Переменные окружения

В `.env`:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB?sslmode=require
PAYLOAD_SECRET=your-long-random-secret
```

Для Neon берите **pooled** connection string и добавьте `sslmode=require`.  
Те же переменные задайте в Vercel → Project → Settings → Environment Variables.

> Файл `.env` не коммитится в git. Старый локальный файл `.db` (SQLite) больше не используется.

### Скрипты

```bash
npm run dev                 # разработка
npm run build && npm start  # production
npm run generate:types      # типы Payload
npm run payload             # CLI Payload
```

---

## Роли

| Роль | Доступ |
|------|--------|
| `admin` | `/admin` + личный кабинет |
| `client` | только `/cabinet` |

---

## Деплой на Vercel

Стек **Next.js + Payload + Neon Postgres** рассчитан на serverless-деплой без отдельного VPS.

### Плюсы такого деплоя

- **Деплой из git** — каждый push в `main` собирает и выкатывает новую версию без ручного SSH
- **Preview-окружения** — на каждый PR Vercel даёт отдельный URL для проверки до мержа
- **CDN и edge** — статика и страницы раздаются близко к пользователю, без настройки nginx
- **HTTPS и домен из коробки** — сертификат и кастомный домен без Certbot
- **Масштабирование без админки сервера** — serverless-функции поднимаются под нагрузку
- **Neon Postgres** — managed БД с connection pooling, ветками и бесплатным стартом; подходит serverless (в отличие от SQLite на диске)
- **Один репозиторий = один проект** — сайт, кабинет и `/admin` живут на одном домене
- **Секреты в UI** — `DATABASE_URL` и `PAYLOAD_SECRET` задаются в Environment Variables, не в коде

### Как выкатить

1. Импортируйте репозиторий в [Vercel](https://vercel.com).
2. Env: `DATABASE_URL` (Neon **pooled** + `sslmode=require`) и `PAYLOAD_SECRET` (длинная случайная строка).
3. Deploy. Payload создаст/обновит схему при старте.
4. Media на serverless-диске не персистятся — для загрузок в админке позже нужен Blob/S3 (`@payloadcms/storage-vercel-blob` и т.п.).

Данные из старого SQLite (`.db`) **не переносятся автоматически** — после первого деплоя создайте админа заново в `/admin`.

---

## Дальнейшее развитие

- Сохранение лидов с контактных форм в CMS
- Email-уведомления по заявкам
- Загрузка документов клиентом в кабинете
- Вынос контента лендингов в коллекции Payload
- Vercel Blob / S3 для media

---

## Лицензия

MIT
