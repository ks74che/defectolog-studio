import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'review',
  title: 'Отзыв',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Имя автора',
      description: 'Показывается под текстом отзыва.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Текст отзыва',
      description: 'Оптимально 2-4 предложения (до 400 символов).',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: 'rating',
      title: 'Оценка',
      description: 'Выберите сколько звёзд показать рядом с отзывом.',
      type: 'number',
      options: {
        list: [
          {title: '⭐ 1 звезда', value: 1},
          {title: '⭐⭐ 2 звезды', value: 2},
          {title: '⭐⭐⭐ 3 звезды', value: 3},
          {title: '⭐⭐⭐⭐ 4 звезды', value: 4},
          {title: '⭐⭐⭐⭐⭐ 5 звёзд', value: 5},
        ],
        layout: 'radio',
      },
      initialValue: 5,
      validation: (Rule) => Rule.required(),
    }),
    // TODO: если понадобится добавить 3-ю категорию —
    // править нужно и OtzyvyClient.tsx (там жёстко привязано)
    defineField({
      name: 'category',
      title: 'Категория отзыва',
      description: 'К какой вкладке-фильтру относится отзыв на странице «Отзывы».',
      type: 'string',
      options: {
        list: [
          {title: 'О занятиях', value: 'lessons'},
          {title: 'О специалисте', value: 'specialist'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Фото автора',
      description: 'Не обязательно. Если фото нет — покажется первая буква имени в кружке.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'order',
      title: 'Порядок в списке',
      description:
        'Чем меньше число — тем выше отзыв в списке. Первые 3 отзыва показываются также на главной странице.',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      text: 'text',
      rating: 'rating',
      category: 'category',
      order: 'order',
      media: 'avatar',
    },
    prepare({name, text, rating, category, order, media}) {
      const stars = '⭐'.repeat(rating ?? 0)
      const catLabel =
        category === 'lessons' ? 'О занятиях' : category === 'specialist' ? 'О специалисте' : ''
      const shortText = (text ?? '').slice(0, 60)
      const orderStr = `№${order ?? 0}`
      const parts = [orderStr]
      if (catLabel) parts.push(catLabel)
      if (shortText) parts.push(`${shortText}...`)
      return {
        title: `${name ?? 'Аноним'} ${stars}`,
        subtitle: parts.join(' · '),
        media,
      }
    },
  },
})
