import config from '@payload-config'
import React from 'react'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'

import { CabinetDashboard } from '@/components/cabinet/CabinetDashboard'
import { getCurrentUser } from '@/lib/auth'
import type { Application } from '@/payload-types'

export const metadata = {
  title: 'Личный кабинет — Капитал Траст',
  description: 'Кабинет клиента: заявки, статусы и профиль организации.',
}

export default async function CabinetPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/vhod')

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'applications',
    where: {
      client: {
        equals: user.id,
      },
    },
    sort: '-createdAt',
    limit: 50,
    user,
    overrideAccess: false,
  })

  const applications = result.docs.map((doc: Application) => ({
    id: doc.id,
    title: doc.title,
    serviceType: doc.serviceType,
    status: doc.status,
    amount: doc.amount,
    createdAt: doc.createdAt,
  }))

  return (
    <section className="section section--muted">
      <div className="container">
        <CabinetDashboard
          applications={applications}
          user={{
            email: user.email,
            name: user.name,
            company: user.company,
            phone: user.phone,
            inn: user.inn,
          }}
        />
      </div>
    </section>
  )
}
