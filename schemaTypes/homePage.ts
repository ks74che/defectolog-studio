import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Главная страница',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero (шапка)'},
    {name: 'features', title: 'Почему я?'},
    {name: 'services', title: 'Мои услуги'},
    {name: 'steps', title: 'Как проходит работа'},
    {name: 'reviews', title: 'Отзывы'},
    {name: 'contacts', title: 'Связаться со мной'},
  ],
  fields: [
    // ===== HERO =====
    defineField({
      name: 'titleLine1',
      title: 'Заголовок — первая строка (голубая)',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleLine2',
      title: 'Заголовок — вторая строка (коричневая)',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Описание под заголовком',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroButtonText',
      title: 'Текст кнопки',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroPhoto',
      title: 'Фото в круге',
      type: 'image',
      options: {hotspot: true},
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),

    // ===== FEATURES (Почему я?) =====
    defineField({
      name: 'featuresTitle',
      title: 'Заголовок секции',
      type: 'string',
      group: 'features',
      initialValue: 'Почему я?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Карточки (ровно 3 штуки)',
      type: 'array',
      group: 'features',
      validation: (Rule) => Rule.length(3),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Иконка',
              type: 'image',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Подпись (можно в 2 строки через Enter)',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label', media: 'icon'},
          },
        }),
      ],
    }),

    // ===== SERVICES (Мои услуги) =====
    defineField({
      name: 'servicesTitle',
      title: 'Заголовок секции',
      type: 'string',
      group: 'services',
      initialValue: 'Мои услуги',
      validation: (Rule) => Rule.required(),
    }),

    // ===== STEPS (Как проходит работа) =====
    defineField({
      name: 'stepsTitle',
      title: 'Заголовок секции',
      type: 'string',
      group: 'steps',
      initialValue: 'Как проходит работа',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'steps',
      title: 'Шаги (ровно 4 штуки)',
      type: 'array',
      group: 'steps',
      validation: (Rule) => Rule.length(4),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Иконка',
              type: 'image',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Заголовок шага',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Описание',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'text', media: 'icon'},
          },
        }),
      ],
    }),

    // ===== REVIEWS (Отзывы) =====
    defineField({
      name: 'reviewsTitle',
      title: 'Заголовок секции',
      type: 'string',
      group: 'reviews',
      initialValue: 'Отзывы',
      validation: (Rule) => Rule.required(),
    }),

    // ===== CONTACTS (Связаться) =====
    defineField({
      name: 'contactsTitle',
      title: 'Заголовок секции',
      type: 'string',
      group: 'contacts',
      initialValue: 'Связаться со мной',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactsSubtitle',
      title: 'Подзаголовок',
      type: 'string',
      group: 'contacts',
      initialValue: 'Выберите удобный способ связи',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {title: '🏠 Главная страница'}
    },
  },
})