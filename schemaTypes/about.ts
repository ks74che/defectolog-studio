import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "Страница «Обо мне»",
  type: "document",
  groups: [
    { name: "hero", title: "Верхний блок с заголовком", default: true },
    { name: "cards", title: "Три карточки с иконками" },
    { name: "values", title: "Блок в середине страницы" },
    { name: "qualifications", title: "Блок со списком слева внизу" },
    { name: "quote", title: "Блок с цитатой справа внизу" },
  ],
  fields: [
    // ===== ВЕРХНИЙ БЛОК =====
    defineField({
      name: "heroTitle",
      title: "Главный заголовок страницы",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Текст под заголовком",
      type: "text",
      rows: 2,
      group: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Описание",
      description: "Основной текст в шапке страницы. Для новой строки нажмите Enter.",
      type: "text",
      rows: 4,
      group: "hero",
    }),
    defineField({
      name: "heroPhoto",
      title: "Фото специалиста",
      description: "Показывается в круглой рамке слева от заголовка.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Описание фото",
          description:
            "Коротко опишите, что на фото. Нужно для поисковиков и людей с плохим зрением.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      group: "hero",
    }),
    defineField({
      name: "heroButtonText",
      title: "Текст на кнопке",
      type: "string",
      initialValue: "Записаться на консультацию",
      group: "hero",
    }),

    // ===== ТРИ КАРТОЧКИ =====
    defineField({
      name: "cards",
      title: "Три карточки",
      description: "Всего должно быть ровно 3 карточки.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Иконка",
              description: "Показывается в круглом голубом фоне слева от текста.",
              type: "image",
              options: { hotspot: false },
            },
            {
              name: "title",
              title: "Заголовок карточки",
              type: "string",
            },
            {
              name: "content",
              title: "Содержание карточки",
              description:
                "Текст карточки. Для новой строки нажмите Enter — как в Word.",
              type: "text",
              rows: 4,
            },
          ],
          preview: {
            select: {
              title: "title",
              media: "icon",
            },
          },
        },
      ],
      validation: (Rule) => Rule.length(3),
      group: "cards",
    }),

    // ===== БЛОК В СЕРЕДИНЕ (Ценности) =====
    defineField({
      name: "valuesTitle",
      title: "Заголовок блока",
      description: "Показывается над карточками.",
      type: "string",
      initialValue: "Мои ценности",
      group: "values",
    }),
    defineField({
      name: "values",
      title: "Карточки со значками",
      description: "От 1 до 6 карточек. Каждая — иконка + заголовок + короткий текст.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Иконка",
              type: "image",
              options: { hotspot: false },
            },
            {
              name: "title",
              title: "Заголовок",
              type: "string",
            },
            {
              name: "text",
              title: "Текст",
              type: "text",
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: "title",
              media: "icon",
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
      group: "values",
    }),

    // ===== БЛОК СО СПИСКОМ (Квалификация) =====
    defineField({
      name: "qualificationsTitle",
      title: "Заголовок блока",
      description: "Показывается над списком.",
      type: "string",
      initialValue: "Повышение квалификации",
      group: "qualifications",
    }),
    defineField({
      name: "qualifications",
      title: "Список курсов / повышений квалификации",
      description:
        "Каждый пункт — отдельный курс или сертификат. Показывается с точкой • на сайте.",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(1),
      group: "qualifications",
    }),

    // ===== БЛОК С ЦИТАТОЙ =====
    defineField({
      name: "quoteText",
      title: "Текст цитаты",
      type: "text",
      rows: 3,
      group: "quote",
    }),
    defineField({
      name: "quoteAuthor",
      title: "Автор цитаты",
      description: "Обычно — имя специалиста.",
      type: "string",
      group: "quote",
    }),
  ],
  preview: {
    select: { heroTitle: "heroTitle" },
    prepare({ heroTitle }) {
      return {
        title: "👤 Страница «Обо мне»",
        subtitle: heroTitle || "не заполнена",
      };
    },
  },
});