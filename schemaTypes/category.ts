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
      title: "Название для ссылки (латиницей, без пробелов)",
      description:
        "Автоматически создаётся из названия. Можно править вручную.",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pillColor",
      title: "Цвет фона категории",
      description:
        "Цвет плашки категории на карточке статьи. Формат: #XXXXXX (пример: #EDE4D3). Подобрать цвет можно на htmlcolorcodes.com",
      type: "string",
      initialValue: "#EDE4D3",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pillTextColor",
      title: "Цвет текста",
      description:
        "Цвет текста внутри плашки. Формат: #XXXXXX (пример: #4A5D6E).",
      type: "string",
      initialValue: "#4A5D6E",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Иконка категории",
      description:
        "Показывается в блоке «Популярные темы» на странице «Статьи».",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "order",
      title: "Порядок в списке",
      description:
        "Чем меньше число — тем выше в списке. 0 = самое верхнее.",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "icon",
    },
    prepare({ title, media }) {
      return {
        title: title ?? "Без названия",
        media,
      };
    },
  },
});