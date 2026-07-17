import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "homePage",
  title: "Главная страница",
  type: "document",
  groups: [
    { name: "hero", title: "Верхний блок с заголовком" },
    { name: "features", title: "Три карточки с иконками (левая колонка)" },
    { name: "services", title: "Три карточки с услугами (правая колонка)" },
    { name: "steps", title: "Блок с шагами" },
    { name: "reviews", title: "Блок с отзывами" },
    { name: "contacts", title: "Блок с кнопками для связи" },
  ],
  fields: [
    // ===== ВЕРХНИЙ БЛОК =====
    defineField({
      name: "titleLine1",
      title: "Заголовок — первая строка",
      description: "Показывается голубым цветом.",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleLine2",
      title: "Заголовок — вторая строка",
      description: "Показывается коричневым цветом.",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroDescription",
      title: "Описание под заголовком",
      type: "text",
      rows: 3,
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroButtonText",
      title: "Текст на кнопке",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroPhoto",
      title: "Фото",
      description: "Показывается в круглой рамке слева от заголовка.",
      type: "image",
      options: { hotspot: true },
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),

    // ===== ТРИ КАРТОЧКИ (Почему я?) =====
    defineField({
      name: "featuresTitle",
      title: "Заголовок блока",
      description: "Показывается над карточками.",
      type: "string",
      group: "features",
      initialValue: "Почему я?",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Карточки (ровно 3 штуки)",
      type: "array",
      group: "features",
      validation: (Rule) => Rule.length(3),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Иконка",
              description: "Небольшая картинка на карточке.",
              type: "image",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Подпись",
              description: "Короткий текст. Для новой строки нажмите Enter.",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", media: "icon" },
          },
        }),
      ],
    }),

    // ===== ТРИ КАРТОЧКИ (Мои услуги) =====
    defineField({
      name: "servicesTitle",
      title: "Заголовок блока",
      description:
        "Сами услуги настраиваются в разделе «Услуга» (слева). На главную попадают первые 3 (с наименьшим порядком).",
      type: "string",
      group: "services",
      initialValue: "Мои услуги",
      validation: (Rule) => Rule.required(),
    }),

    // ===== БЛОК С ШАГАМИ =====
    defineField({
      name: "stepsTitle",
      title: "Заголовок блока",
      description: "Показывается над шагами.",
      type: "string",
      group: "steps",
      initialValue: "Как проходит работа",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "steps",
      title: "Шаги (ровно 4 штуки)",
      type: "array",
      group: "steps",
      validation: (Rule) => Rule.length(4),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Иконка",
              type: "image",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Заголовок шага",
              description:
                "Например: «Знакомство», «Диагностика». Номер (1, 2, 3, 4) добавится автоматически.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "text",
              title: "Описание",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "text", media: "icon" },
          },
        }),
      ],
    }),

    // ===== БЛОК С ОТЗЫВАМИ =====
    defineField({
      name: "reviewsTitle",
      title: "Заголовок блока",
      description:
        "Сами отзывы настраиваются в разделе «Отзыв» (слева). На главную попадают первые 3 (с наименьшим порядком).",
      type: "string",
      group: "reviews",
      initialValue: "Отзывы",
      validation: (Rule) => Rule.required(),
    }),

    // ===== БЛОК С КНОПКАМИ ДЛЯ СВЯЗИ =====
    defineField({
      name: "contactsTitle",
      title: "Заголовок блока",
      description:
        "Мессенджеры и телефон настраиваются в разделе «Настройки сайта» → Контакты.",
      type: "string",
      group: "contacts",
      initialValue: "Связаться со мной",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactsSubtitle",
      title: "Текст под заголовком",
      type: "string",
      group: "contacts",
      initialValue: "Выберите удобный способ связи",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "🏠 Главная страница" };
    },
  },
});