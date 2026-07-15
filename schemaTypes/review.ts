import { defineField, defineType } from "sanity";

export default defineType({
  name: "review",
  title: "Отзыв",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Имя автора",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Текст отзыва",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Оценка (звёзды)",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: "category",
      title: "Категория",
      type: "string",
      options: {
        list: [
          { title: "О занятиях", value: "lessons" },
          { title: "О специалисте", value: "specialist" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Фото автора (необязательно)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Порядок отображения",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "text",
      media: "avatar",
    },
  },
});