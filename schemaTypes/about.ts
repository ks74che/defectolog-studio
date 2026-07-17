import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "Страница «Обо мне»",
  type: "document",
  groups: [
    { name: "hero", title: "Шапка страницы", default: true },
    { name: "cards", title: "3 карточки" },
    { name: "values", title: "Мои ценности" },
    { name: "qualifications", title: "Повышение квалификации" },
    { name: "quote", title: "Цитата" },
  ],
  fields: [
    // ===== HERO =====
    defineField({
      name: "heroTitle",
      title: "Заголовок",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Подзаголовок",
      type: "text",
      rows: 2,
      group: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Описание",
      type: "text",
      rows: 4,
      group: "hero",
    }),
    defineField({
      name: "heroPhoto",
      title: "Фото специалиста (в круге)",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "heroButtonText",
      title: "Текст кнопки",
      type: "string",
      initialValue: "Записаться на консультацию",
      group: "hero",
    }),

    // ===== 3 КАРТОЧКИ =====
    defineField({
      name: "cards",
      title: "Три карточки (Образование / Опыт / Подход)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Иконка (в голубом кружке)",
              type: "image",
              options: { hotspot: false },
            },
            {
              name: "title",
              title: "Заголовок карточки",
              type: "string",
            },
            {
              name: "lines",
              title: "Строки текста",
              type: "array",
              of: [{ type: "string" }],
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

    // ===== МОИ ЦЕННОСТИ =====
    defineField({
      name: "valuesTitle",
      title: "Заголовок блока",
      type: "string",
      initialValue: "Мои ценности",
      group: "values",
    }),
    defineField({
      name: "values",
      title: "Список ценностей (4 карточки)",
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

    // ===== ПОВЫШЕНИЕ КВАЛИФИКАЦИИ =====
    defineField({
      name: "qualificationsTitle",
      title: "Заголовок блока",
      type: "string",
      initialValue: "Повышение квалификации",
      group: "qualifications",
    }),
    defineField({
      name: "qualifications",
      title: "Список пунктов",
      type: "array",
      of: [{ type: "string" }],
      group: "qualifications",
    }),

    // ===== ЦИТАТА =====
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
      type: "string",
      group: "quote",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Страница «Обо мне»",
      };
    },
  },
});