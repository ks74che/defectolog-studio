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
      description: "Короткий текст под заголовком услуги на карточке.",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Иконка услуги",
      description:
        "Небольшая иконка, показывается в круглом бежевом фоне на карточке.",
      type: "image",
      options: { hotspot: false },
      fields: [
        defineField({
          name: "alt",
          title: "Описание иконки",
          description: "Коротко опишите, что изображено. Нужно для поисковиков.",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Фото для карточки",
      description: "Показывается в правом нижнем углу карточки услуги.",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "points",
      title: "Что входит в услугу",
      description:
        "Список пунктов (от 1 до 6). Каждый — отдельная короткая строка. Показываются с галочками.",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
    defineField({
      name: "order",
      title: "Порядок в списке",
      description:
        "Чем меньше число — тем выше в списке. Первые 3 услуги показываются на главной странице.",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      order: "order",
      media: "photo",
    },
    prepare({ title, description, order, media }) {
      const shortDesc = description
        ? description.length > 60
          ? description.slice(0, 60) + "…"
          : description
        : "";
      return {
        title: title ?? "Без названия",
        subtitle: `№${order ?? 0} · ${shortDesc}`,
        media,
      };
    },
  },
});