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
        "Цвет плашки категории на карточках статей. Выберите цвет мышкой из палитры.",
      type: "color",
      options: { disableAlpha: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pillTextColor",
      title: "Цвет текста",
      description:
        "Цвет текста внутри плашки категории. Выберите цвет мышкой из палитры.",
      type: "color",
      options: { disableAlpha: true },
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
        "Чем меньше число — тем выше категория в списке. 0 = самая верхняя.",
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