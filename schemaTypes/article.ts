import { defineField, defineType } from "sanity";

export default defineType({
  name: "article",
  title: "Статья",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заголовок статьи",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Название для ссылки (латиницей, без пробелов)",
      description:
        "Автоматически создаётся из заголовка. Можно править вручную. Используется в адресе страницы.",
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
      description:
        "Короткий текст (до 200 символов). Показывается в карточке статьи в списке.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "photo",
      title: "Обложка статьи",
      description: "Главное изображение статьи. Показывается в карточке и на самой странице.",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Категория",
      description: "Выберите категорию из списка. Категории создаются в разделе «Категория статей».",
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
      description: "Примерная оценка. Пример: «5 мин чтения».",
      type: "string",
      initialValue: "5 мин чтения",
    }),
    defineField({
      name: "content",
      title: "Текст статьи (с картинками и форматированием)",
      description:
        "Основной текст статьи. Можно добавлять заголовки, списки, ссылки, картинки.",
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
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? "Без названия",
        subtitle: subtitle ? `📁 ${subtitle}` : "⚠️ Без категории",
        media,
      };
    },
  },
});