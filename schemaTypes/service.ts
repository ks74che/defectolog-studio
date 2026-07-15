import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Услуга",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Название услуги",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Описание",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Иконка (в бежевом кружке)",
      type: "image",
      options: { hotspot: false },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Фото ребёнка",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "points",
      title: "Пункты списка (с галочками)",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1).max(6),
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
      subtitle: "description",
      media: "icon",
    },
  },
});