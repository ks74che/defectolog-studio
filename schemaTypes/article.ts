import { defineField, defineType, defineArrayMember } from "sanity";

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
        "Основной текст статьи. Можно добавлять заголовки, списки, картинки и специальные блоки: шаги, важное замечание, текст с картинкой.",
      type: "array",
      of: [
        // ==== Обычный текст с заголовками и списками ====
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Обычный", value: "normal" },
            { title: "Заголовок H2", value: "h2" },
            { title: "Подзаголовок H3", value: "h3" },
            { title: "Цитата", value: "blockquote" },
          ],
          lists: [
            { title: "Маркированный", value: "bullet" },
            { title: "Нумерованный", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Жирный", value: "strong" },
              { title: "Курсив", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Ссылка",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        }),

        // ==== Обычная картинка ====
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Описание картинки (для SEO)",
            },
          ],
        }),

        // ==== БЛОК: Список с сердечками ====
        defineArrayMember({
          name: "heartList",
          type: "object",
          title: "❤️ Список с сердечками",
          fields: [
            defineField({
              name: "items",
              title: "Пункты списка",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { items: "items" },
            prepare({ items }: { items?: string[] }) {
              const count = items?.length ?? 0;
              const first = items?.[0] ?? "";
              return {
                title: `❤️ Список с сердечками (${count} пункт${
                  count === 1 ? "" : "ов"
                })`,
                subtitle: first,
              };
            },
          },
        }),

        // ==== БЛОК: Нумерованные шаги ====
        defineArrayMember({
          name: "stepsList",
          type: "object",
          title: "🔢 Шаги",
          fields: [
            defineField({
              name: "steps",
              title: "Шаги",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "step",
                  fields: [
                    {
                      name: "title",
                      title: "Заголовок шага",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "text",
                      title: "Описание шага",
                      type: "text",
                      rows: 2,
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: { title: "title", subtitle: "text" },
                  },
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { steps: "steps" },
            prepare({ steps }: { steps?: unknown[] }) {
              const count = steps?.length ?? 0;
              return {
                title: `🔢 Шаги (${count} шаг${count === 1 ? "" : "ов"})`,
              };
            },
          },
        }),

        // ==== БЛОК: Важное замечание (Callout) ====
        defineArrayMember({
          name: "calloutBox",
          type: "object",
          title: "🌿 Важное замечание",
          fields: [
            defineField({
              name: "text",
              title: "Текст",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { text: "text" },
            prepare({ text }: { text?: string }) {
              return {
                title: "🌿 Важное замечание",
                subtitle: text,
              };
            },
          },
        }),

        // ==== БЛОК: Текст с картинкой справа ====
        defineArrayMember({
          name: "textWithImage",
          type: "object",
          title: "🖼️ Текст с картинкой",
          fields: [
            defineField({
              name: "image",
              title: "Картинка (необязательно)",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "imageCaption",
              title: "Подпись под картинкой (необязательно)",
              type: "string",
            }),
            defineField({
              name: "text",
              title: "Текст рядом с картинкой",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [
                    { title: "Обычный", value: "normal" },
                    { title: "Подзаголовок H3", value: "h3" },
                  ],
                  lists: [
                    { title: "Маркированный", value: "bullet" },
                    { title: "Нумерованный", value: "number" },
                  ],
                  marks: {
                    decorators: [
                      { title: "Жирный", value: "strong" },
                      { title: "Курсив", value: "em" },
                    ],
                  },
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { image: "image", text: "text" },
            prepare({ image, text }: { image?: unknown; text?: any[] }) {
              const firstBlock = text?.[0];
              const preview =
                firstBlock?.children?.[0]?.text ?? "Текст с картинкой";
              return {
                title: "🖼️ Текст с картинкой",
                subtitle: preview,
                media: image as any,
              };
            },
          },
        }),
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