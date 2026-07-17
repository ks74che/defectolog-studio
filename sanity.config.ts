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
  siteSettings: "Настройки сайта",
  about: "Страница «Обо мне»",
  homePage: "🏠 Главная страница",
  pageUslugi: "📝 Страница «Услуги»",
  pageOtzyvy: "💬 Страница «Отзывы»",
  pageStati: "📚 Страница «Статьи»",
  pageContacts: "📞 Страница «Контакты»",
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
            ...S.documentTypeListItems().filter(
              (item) => !singletonTypes.includes(item.getId() ?? "")
            ),
            S.divider(),
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