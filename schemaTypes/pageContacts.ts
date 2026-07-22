import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "pageContacts",
  title: "Страница «Контакты»",
  type: "document",
  groups: [
    { name: "hero", title: "Верхний блок с заголовком", default: true },
    { name: "titles", title: "Заголовки колонок" },
    { name: "contacts", title: "Карточки контактов (левая колонка)" },
    { name: "mini", title: "Мини-карточки под картой" },
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
    defineField({
      name: "heroDescription",
      title: "Описание",
      type: "text",
      rows: 2,
      group: "hero",
    }),
    defineField({
      name: "heroPhoto",
      title: "Фото кабинета",
      description: "Показывается в верхнем блоке страницы.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Описание фото",
          description:
            "Коротко опишите, что на фото. Нужно для поисковиков и людей с плохим зрением.",
          type: "string",
        }),
      ],
      group: "hero",
    }),

    // ===== Заголовки колонок =====
    defineField({
      name: "contactsTitle",
      title: "Заголовок над карточками контактов",
      type: "string",
      group: "titles",
      initialValue: "Как со мной связаться?",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mapTitle",
      title: "Заголовок над картой",
      type: "string",
      group: "titles",
      initialValue: "Как меня найти?",
      validation: (Rule) => Rule.required(),
    }),

    // ===== Карточки контактов =====
    defineField({
      name: "contacts",
      title: "Список карточек (можно добавить, удалить, переставить)",
      type: "array",
      group: "contacts",
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
              title: "Заголовок карточки",
              description:
                "Название канала связи: Телефон, Max, VK, Email и т.п.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Значение (номер, юзернейм, email…)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "note",
              title: "Подпись под значением (не обязательно)",
              type: "string",
            }),
            defineField({
              name: "link",
              title: "Ссылка при клике (не обязательно)",
              description:
                "Форматы: tel:+79991234567 для звонка, mailto:test@mail.ru для письма, https://t.me/username для мессенджера.",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "value", media: "icon" },
          },
        }),
      ],
    }),

    // ===== Мини-карточки под картой =====
    defineField({
      name: "scheduleIcon",
      title: "Иконка карточки «График работы»",
      type: "image",
      group: "mini",
    }),
    defineField({
      name: "scheduleTitle",
      title: "Заголовок карточки «График работы»",
      type: "string",
      group: "mini",
      initialValue: "График работы",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "directionsIcon",
      title: "Иконка карточки «Как добраться»",
      type: "image",
      group: "mini",
    }),
    defineField({
      name: "directionsTitle",
      title: "Заголовок карточки «Как добраться»",
      type: "string",
      group: "mini",
      initialValue: "Как добраться",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "📞 Страница «Контакты»" };
    },
  },
});