import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {ruKZLocale} from '@sanity/locale-ru-kz'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemaTypes'

// ==================== СИНГЛТОНЫ ====================
const singletonTypes = [
  'siteSettings',
  'about',
  'homePage',
  'pageUslugi',
  'pageOtzyvy',
  'pageStati',
  'pageContacts',
]

// Названия для страниц (синглтонов)
const singletonNames: Record<string, string> = {
  homePage: '🏠 Главная',
  about: '👤 Обо мне',
  pageUslugi: '📝 Услуги',
  pageOtzyvy: '💬 Отзывы',
  pageStati: '📚 Статьи',
  pageContacts: '📞 Контакты',
  siteSettings: '⚙️ Настройки сайта',
}

// Названия для контентных типов
const typeIcons: Record<string, string> = {
  article: '📄 Статьи',
  service: '🎯 Услуги',
  review: '💬 Отзывы',
  category: '🏷️ Категории статей',
}

// Порядок вывода контентных типов
const contentTypesOrder = ['article', 'service', 'review', 'category']

// Порядок вывода страниц
const pageTypesOrder = [
  'homePage',
  'about',
  'pageUslugi',
  'pageOtzyvy',
  'pageStati',
  'pageContacts',
]

export default defineConfig({
  name: 'default',
  title: 'Сайт Анны',

  projectId: 'oh19circ',
  dataset: 'production',

  // 🚫 Отключаем ненужные для заказчицы функции
  releases: {
    enabled: false,
  },
  scheduledPublishing: {
    enabled: false,
  },

  plugins: [
    ruKZLocale(),
    colorInput(),

    structureTool({
      name: 'structure',
      title: 'Разделы',
      structure: (S) =>
        S.list()
          .title('Разделы')
          .items([
            // ==================== ГРУППА 1: КОНТЕНТ ====================
            S.listItem()
              .title('📝 Контент')
              .child(
                S.list()
                  .title('📝 Контент')
                  .items(
                    contentTypesOrder.map((type) =>
                      S.documentTypeListItem(type).title(typeIcons[type] ?? type),
                    ),
                  ),
              ),

            S.divider(),

            // ==================== ГРУППА 2: СТРАНИЦЫ ====================
            S.listItem()
              .title('📄 Страницы сайта')
              .child(
                S.list()
                  .title('📄 Страницы сайта')
                  .items(
                    pageTypesOrder.map((type) =>
                      S.listItem()
                        .title(singletonNames[type] ?? type)
                        .id(type)
                        .child(
                          S.document()
                            .schemaType(type)
                            .documentId(type)
                            .title(singletonNames[type] ?? type),
                        ),
                    ),
                  ),
              ),

            S.divider(),

            // ==================== ГРУППА 3: НАСТРОЙКИ ====================
            S.listItem()
              .title('⚙️ Настройки')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('⚙️ Настройки сайта'),
              ),
          ]),
    }),

    visionTool({
      name: 'vision',
      title: 'GROQ-запросы',
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => prev.filter((template) => !singletonTypes.includes(template.schemaType)),
  },

  document: {
    actions: (prev, {schemaType}) =>
      singletonTypes.includes(schemaType)
        ? prev.filter(({action}) => !['duplicate', 'delete'].includes(action ?? ''))
        : prev,
  },
})
