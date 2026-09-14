import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Пользователь',
    plural: 'Пользователи',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'company', 'role', 'updatedAt'],
  },
  auth: true,
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (!data) return data

        if (operation === 'create') {
          const existing = await req.payload.find({
            collection: 'users',
            limit: 1,
            depth: 0,
            overrideAccess: true,
          })

          // Первый пользователь системы — всегда админ (create-first-user)
          if (existing.totalDocs === 0) {
            data.role = 'admin'
          } else if (!req.user || req.user.role === 'client') {
            // Публичная регистрация / клиент не может назначить себе admin
            data.role = 'client'
          }
        }

        if (operation === 'update' && req.user?.role === 'client') {
          data.role = 'client'
        }

        return data
      },
    ],
  },
  access: {
    admin: ({ req: { user } }) => Boolean(user && user.role === 'admin'),
    create: () => true,
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    delete: ({ req: { user } }) => Boolean(user && user.role === 'admin'),
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      label: 'Роль',
      defaultValue: 'client',
      options: [
        { label: 'Администратор', value: 'admin' },
        { label: 'Клиент', value: 'client' },
      ],
      required: true,
      saveToJWT: true,
      access: {
        update: ({ req: { user } }) => Boolean(user && user.role === 'admin'),
      },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Контактное лицо',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Организация',
    },
    {
      name: 'inn',
      type: 'text',
      label: 'ИНН',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
    },
  ],
}
