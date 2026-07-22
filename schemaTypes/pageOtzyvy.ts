import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'pageOtzyvy',
  title: 'Страница «Отзывы»',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Верхний блок с заголовком', default: true},
    {name: 'stats', title: 'Карточки со статистикой'},
    {name: 'filters', title: 'Кнопки-фильтры'},
    {name: 'misc', title: 'Разное'},
  ],
  fields: [
    // ===== Верхний блок =====
    defineField({
      name: 'heroTitle',
      title: 'Главный заголовок страницы',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Текст под заголовком',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Описание (несколько строк)',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),

    // ===== Карточки со статистикой =====
    defineField({
      name: 'stats',
      title: 'Карточки (ровно 3 штуки)',
      type: 'array',
      group: 'stats',
      validation: (Rule) => Rule.length(3),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Число или значение',
              description: 'Короткое: 98%, 200+, 5.0 и т.п.',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Подпись под значением',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'showStar',
              title: 'Показать звёздочку рядом со значением',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {title: 'value', subtitle: 'label'},
          },
        }),
      ],
    }),

    // ===== Кнопки-фильтры =====
    defineField({
      name: 'filterAllText',
      title: 'Текст на кнопке «Все отзывы»',
      type: 'string',
      group: 'filters',
      initialValue: 'Все отзывы',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'filterLessonsText',
      title: 'Текст на кнопке «О занятиях»',
      type: 'string',
      group: 'filters',
      initialValue: 'О занятиях',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'filterSpecialistText',
      title: 'Текст на кнопке «О специалисте»',
      type: 'string',
      group: 'filters',
      initialValue: 'О специалисте',
      validation: (Rule) => Rule.required(),
    }),

    // ===== Разное =====
    defineField({
      name: 'emptyMessage',
      title: 'Сообщение, когда в категории нет отзывов',
      type: 'string',
      group: 'misc',
      initialValue: 'В этой категории пока нет отзывов.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {title: '💬 Страница «Отзывы»'}
    },
  },
})
