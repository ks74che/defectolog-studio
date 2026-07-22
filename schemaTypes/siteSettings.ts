import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Настройки сайта",
  type: "document",
  groups: [
    { name: "general", title: "Общее", default: true },
    { name: "contacts", title: "Контакты" },
    { name: "address", title: "Адрес и карта" },
  ],
  fields: [
    // === ОБЩЕЕ ===
    defineField({
      name: "specialistName",
      title: "Имя специалиста",
      description: "Показывается в шапке сайта и в подвале.",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "general",
    }),
    defineField({
      name: "specialistTitle",
      title: "Профессия / Специализация",
      description: "Показывается под именем в шапке сайта.",
      type: "string",
      initialValue: "дефектолог",
      group: "general",
    }),
    defineField({
      name: "copyright",
      title: "Текст в подвале сайта",
      description: "Показывается внизу на всех страницах.",
      type: "string",
      group: "general",
    }),

    // === КОНТАКТЫ ===
    defineField({
      name: "phone",
      title: "Телефон (как показывать)",
      description:
        "Формат с пробелами и скобками: +7 (999) 123-45-67. Используется в футере и в блоке «Связаться» на главной.",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "contacts",
    }),
    defineField({
      name: "phoneLink",
      title: "Телефон (для клика)",
      description:
        "Тот же номер, но только цифры и +, без пробелов: +79991234567. Нужен, чтобы по номеру можно было позвонить со смартфона.",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "contacts",
    }),
    defineField({
      name: "phoneNote",
      title: "Подпись под телефоном",
      description: "Небольшой текст под номером в блоке контактов.",
      type: "string",
      group: "contacts",
    }),
    defineField({
      name: "telegramUsername",
      title: "Telegram — имя пользователя",
      description:
        "Только имя, без символа @ и без ссылки. Если ссылка t.me/anna_defect — сюда пишем anna_defect.",
      type: "string",
      group: "contacts",
    }),
    defineField({
      name: "telegramNote",
      title: "Подпись под Telegram",
      description: "Небольшой текст под ссылкой на Telegram.",
      type: "string",
      group: "contacts",
    }),
    // TODO: возможно заменим на другой мессенджер (VK / Viber / Max) — уточнить у заказчицы
    defineField({
      name: "whatsapp",
      title: "WhatsApp — номер",
      description:
        "Только цифры, без + пробелов и скобок: 79991234567. Используется в блоке «Связаться» на главной.",
      type: "string",
      group: "contacts",
    }),
    defineField({
      name: "whatsappNote",
      title: "Подпись под WhatsApp",
      description: "Небольшой текст под номером.",
      type: "string",
      group: "contacts",
    }),
    defineField({
      name: "email",
      title: "Email",
      description: "Электронная почта. Используется в футере и на главной.",
      type: "string",
      validation: (Rule) => Rule.required().email(),
      group: "contacts",
    }),
    defineField({
      name: "emailNote",
      title: "Подпись под Email",
      description: "Небольшой текст под адресом.",
      type: "string",
      group: "contacts",
    }),

    // === АДРЕС ===
    defineField({
      name: "address",
      title: "Адрес",
      description:
        "Полный адрес. Показывается в футере и на странице «Контакты».",
      type: "string",
      group: "address",
    }),
    defineField({
      name: "metro",
      title: "Ближайшее метро",
      description:
        "Название станции и время пешком. Показывается на странице «Контакты» в блоке «Как добраться».",
      type: "string",
      group: "address",
    }),
    defineField({
      name: "workingHours",
      title: "Часы работы",
      description:
        "Показывается в блоке «График работы» на странице «Контакты». Для новой строки нажимайте Enter.",
      type: "text",
      rows: 3,
      group: "address",
    }),
    defineField({
      name: "mapUrl",
      title: "Ссылка на карту (Яндекс.Карты)",
      description:
        'Как получить: 1) Откройте Яндекс.Карты и найдите нужное место. 2) Нажмите «Поделиться» → «Скопировать код». 3) Из кода скопируйте только адрес из src="..." (то, что в кавычках). 4) Вставьте сюда.',
      type: "url",
      group: "address",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "⚙️ Настройки сайта",
      };
    },
  },
});