import { defineField, defineType } from "sanity";

export default defineType({
  name: "article",
  title: "Статья",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заголовок",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-адрес (slug)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Краткое описание",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "photo",
      title: "Обложка статьи",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Категория",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Дата публикации",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
      initialValue: () => new Date().toISOString().split("T")[0],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Время чтения",
      type: "string",
      initialValue: "5 мин чтения",
    }),
    defineField({
      name: "content",
      title: "Текст статьи",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "photo",
    },
  },
});