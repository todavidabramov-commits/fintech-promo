import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Медиафайл',
    plural: 'Медиа',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Альтернативный текст',
      required: true,
    },
  ],
  upload: true,
}
