import { Manrope } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import './styles.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata = {
  description: 'Комплексные финансовые инструменты, банковские гарантии и юридическое сопровождение для бизнеса.',
  title: 'Капитал Траст — институциональные финансы',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html className={manrope.variable} lang="ru">
      <body>
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
