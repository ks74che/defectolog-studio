import { defineType, defineField } from "sanity";

export default defineType({
  name: "pageStati",
  title: "Страница «Статьи»",
  type: "document",
  groups: [
    { name: "hero", title: "Верхний блок с заголовком", default: true },
    { name: "topics", title: "Блок в боковой панели (список тем)" },
    { name: "cta", title: "Блок в боковой панели с кнопкой" },
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
      type: "text",
      rows: 2,
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),

    // ===== Блок в боковой панели (список тем) =====
    defineField({
      name: "topicsTitle",
      title: "Заголовок блока",
      type: "string",
      group: "topics",
      initialValue: "Популярные темы",
      validation: (Rule) => Rule.required(),
    }),

    // ===== Блок в боковой панели с кнопкой =====
    defineField({
      name: "ctaTitle",
      title: "Заголовок",
      type: "string",
      group: "cta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaText",
      title: "Текст",
      type: "text",
      rows: 3,
      group: "cta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaButtonText",
      title: "Текст на кнопке",
      type: "string",
      group: "cta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaButtonLink",
      title: "Куда ведёт кнопка (обычно /kontakty)",
      type: "string",
      group: "cta",
      initialValue: "/kontakty",
      validation: (Rule) => Rule.required(),
    }),

    // ===== Разное =====
    defineField({
      name: "filterAllText",
      title: "Текст на кнопке «Все статьи»",
      type: "string",
      group: "misc",
      initialValue: "Все статьи",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emptyMessage",
      title: "Сообщение, когда в категории нет статей",
      type: "string",
      group: "misc",
      initialValue: "В этой категории пока нет статей.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "📚 Страница «Статьи»" };
    },
  },
});