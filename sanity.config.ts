import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { ruKZLocale } from "@sanity/locale-ru-kz";
import { schemaTypes } from "./schemaTypes";

const singletonTypes = [
  "siteSettings",
  "about",
  "homePage",
  "pageUslugi",
  "pageOtzyvy",
  "pageStati",
  "pageContacts",
];

const singletonNames: Record<string, string> = {
  siteSettings: "⚙️ Настройки сайта",
  about: "👤 Страница «Обо мне»",
  homePage: "🏠 Главная страница",
  pageUslugi: "📝 Страница «Услуги»",
  pageOtzyvy: "💬 Страница «Отзывы»",
  pageStati: "📚 Страница «Статьи»",
  pageContacts: "📞 Страница «Контакты»",
};

const typeIcons: Record<string, string> = {
  review: "💬 Отзыв",
  article: "📄 Статья",
  category: "🏷️ Категория статей",
  service: "🎯 Услуга",
};

export default defineConfig({
  name: "default",
  title: "Сайт Анны",

  projectId: "oh19circ",
  dataset: "production",

  // 🚫 Отключаем ненужные для заказчицы функции
  releases: {
    enabled: false,
  },
  scheduledPublishing: {
    enabled: false,
  },

  plugins: [
    ruKZLocale(),

    structureTool({
      name: "structure",
      title: "Разделы",
      structure: (S) =>
        S.list()
          .title("Разделы")
          .items([
            ...S.documentTypeListItems()
              .filter((item) => !singletonTypes.includes(item.getId() ?? ""))
              .map((item) => {
                const id = item.getId() ?? "";
                const customTitle = typeIcons[id];
                return customTitle ? item.title(customTitle) : item;
              }),
            S.divider(),
            ...singletonTypes.map((type) =>
              S.listItem()
                .title(singletonNames[type] ?? type)
                .id(type)
                .child(S.document().schemaType(type).documentId(type))
            ),
          ]),
    }),

    visionTool({
      name: "vision",
      title: "GROQ-запросы",
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) =>
      prev.filter((template) => !singletonTypes.includes(template.schemaType)),
  },

  document: {
    actions: (prev, { schemaType }) =>
      singletonTypes.includes(schemaType)
        ? prev.filter(
            ({ action }) => !["duplicate", "delete"].includes(action ?? "")
          )
        : prev,
  },
});