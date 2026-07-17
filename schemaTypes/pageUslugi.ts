import { defineType, defineField } from "sanity";

export default defineType({
  name: "pageUslugi",
  title: "Страница «Услуги»",
  type: "document",
  groups: [
    { name: "hero", title: "Верхний блок с заголовком", default: true },
    { name: "cta", title: "Нижний блок с кнопкой" },
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

    // ===== Нижний блок с кнопкой =====
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
  ],
  preview: {
    prepare() {
      return { title: "📝 Страница «Услуги»" };
    },
  },
});