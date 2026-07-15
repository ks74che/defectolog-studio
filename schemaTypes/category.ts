import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Категория статей",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Название категории",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL-идентификатор",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pillColor",
      title: "Цвет пилюли (фон)",
      type: "string",
      initialValue: "#EDE4D3",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pillTextColor",
      title: "Цвет текста на пилюле",
      type: "string",
      initialValue: "#4A5D6E",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Иконка (для сайдбара)",
      type: "image",
      options: { hotspot: false },
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
      title: "title",
      subtitle: "slug.current",
      media: "icon",
    },
  },
});