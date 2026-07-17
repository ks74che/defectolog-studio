import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

// Схемы-синглтоны — которые могут существовать только в 1 экземпляре
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

// Иконки для обычных схем (в сайдбаре)
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

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Обычные схемы (с иконками)
            ...S.documentTypeListItems()
              .filter((item) => !singletonTypes.includes(item.getId() ?? ""))
              .map((item) => {
                const id = item.getId() ?? "";
                const customTitle = typeIcons[id];
                return customTitle ? item.title(customTitle) : item;
              }),

            // Разделитель
            S.divider(),

            // Синглтоны
            ...singletonTypes.map((type) =>
              S.listItem()
                .title(singletonNames[type] ?? type)
                .id(type)
                .child(S.document().schemaType(type).documentId(type))
            ),
          ]),
    }),
    visionTool(),
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