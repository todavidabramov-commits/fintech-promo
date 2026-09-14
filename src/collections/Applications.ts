import type { CollectionConfig } from 'payload'

export const Applications: CollectionConfig = {
  slug: 'applications',
  labels: {
    singular: 'Заявка',
    plural: 'Заявки',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'serviceType', 'status', 'amount', 'updatedAt'],
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role !== 'client') return true
      return { client: { equals: user.id } }
    },
    update: ({ req: { user } }) => Boolean(user) && user.role !== 'client',
    delete: ({ req: { user } }) => Boolean(user) && user.role !== 'client',
  },
  hooks: {
    beforeValidate: [
      ({ data, operation, req }) => {
        if (!data) return data

        if (operation === 'create' && req.user) {
          data.client = req.user.id
          if (!data.status) data.status = 'review'
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      required: true,
    },
    {
      name: 'serviceType',
      type: 'select',
      label: 'Продукт',
      required: true,
      options: [
        { label: 'Банковская гарантия', value: 'guarantee' },
        { label: 'Кредитование бизнеса', value: 'credit' },
        { label: 'Юридическое сопровождение', value: 'legal' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Статус',
      required: true,
      defaultValue: 'review',
      options: [
        { label: 'На рассмотрении', value: 'review' },
        { label: 'Одобрено', value: 'approved' },
        { label: 'Выпущено / выдано', value: 'issued' },
        { label: 'Отклонено', value: 'rejected' },
      ],
    },
    {
      name: 'amount',
      type: 'number',
      label: 'Сумма, ₽',
      min: 0,
    },
    {
      name: 'comment',
      type: 'textarea',
      label: 'Комментарий клиента',
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'users',
      label: 'Клиент',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
