import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "pageOtzyvy",
  title: "Страница «Отзывы»",
  type: "document",
  groups: [
    { name: "hero", title: "Верхний блок с заголовком", default: true },
    { name: "stats", title: "Карточки со статистикой" },
    { name: "filters", title: "Кнопки-фильтры" },
    { name: "cta", title: "Блок «Оставить отзыв» внизу" },
    { name: "misc", title: "Разное" },
  ],
  fields: [
    // ===== Верхний блок =====
    defineField({
      name: "heroTitle",
      title: "Главный заголовок страницы",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Текст под заголовком",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroDescription",
      title: "Описание (несколько строк)",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),

    // ===== Карточки со статистикой =====
    defineField({
      name: "stats",
      title: "Карточки (ровно 3 штуки)",
      type: "array",
      group: "stats",
      validation: (Rule) => Rule.length(3),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Число или значение",
              description: "Короткое: 98%, 200+, 5.0 и т.п.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Подпись под значением",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "showStar",
              title: "Показать звёздочку рядом со значением",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        }),
      ],
    }),

    // ===== Кнопки-фильтры =====
    defineField({
      name: "filterAllText",
      title: "Текст на кнопке «Все отзывы»",
      type: "string",
      group: "filters",
      initialValue: "Все отзывы",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "filterLessonsText",
      title: "Текст на кнопке «О занятиях»",
      type: "string",
      group: "filters",
      initialValue: "О занятиях",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "filterSpecialistText",
      title: "Текст на кнопке «О специалисте»",
      type: "string",
      group: "filters",
      initialValue: "О специалисте",
      validation: (Rule) => Rule.required(),
    }),

    // ===== Блок «Оставить отзыв» =====
    defineField({
      name: "ctaTitle",
      title: "Заголовок блока",
      type: "string",
      group: "cta",
      initialValue: "Поделитесь своим впечатлением",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaText",
      title: "Текст под заголовком",
      type: "text",
      rows: 2,
      group: "cta",
      initialValue:
        "Ваш отзыв поможет другим родителям сделать правильный выбор. Напишите мне удобным способом — и я добавлю отзыв на сайт.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaMessage",
      title: "Готовый текст сообщения",
      description:
        "Этот текст автоматически подставится в поле сообщения в Telegram/WhatsApp. Клиенту останется только дописать свой отзыв.",
      type: "text",
      rows: 3,
      group: "cta",
      initialValue:
        "Здравствуйте, Ксения! Хочу оставить отзыв о занятиях с моим ребёнком…",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaTelegramText",
      title: "Текст на кнопке Telegram",
      type: "string",
      group: "cta",
      initialValue: "Написать в Telegram",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaWhatsappText",
      title: "Текст на кнопке WhatsApp",
      type: "string",
      group: "cta",
      initialValue: "Написать в WhatsApp",
      validation: (Rule) => Rule.required(),
    }),

    // ===== Разное =====
    defineField({
      name: "emptyMessage",
      title: "Сообщение, когда в категории нет отзывов",
      type: "string",
      group: "misc",
      initialValue: "В этой категории пока нет отзывов.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "💬 Страница «Отзывы»" };
    },
  },
});