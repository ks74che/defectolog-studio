import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Настройки сайта",
  type: "document",
  fields: [
    // === ОБЩЕЕ ===
    defineField({
      name: "specialistName",
      title: "Имя специалиста",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "general",
    }),
    defineField({
      name: "specialistTitle",
      title: "Специализация",
      type: "string",
      initialValue: "дефектолог",
      group: "general",
    }),
    defineField({
      name: "copyright",
      title: "Копирайт (в футере)",
      type: "string",
      group: "general",
    }),

    // === КОНТАКТЫ ===
    defineField({
      name: "phone",
      title: "Телефон",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "contacts",
    }),
    defineField({
      name: "phoneLink",
      title: "Телефон для клика (без пробелов)",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "contacts",
    }),
    defineField({
      name: "phoneNote",
      title: "Подпись под телефоном",
      type: "string",
      group: "contacts",
    }),
    defineField({
      name: "telegramUsername",
      title: "Telegram (username без @)",
      type: "string",
      group: "contacts",
    }),
    defineField({
      name: "telegramNote",
      title: "Подпись под Telegram",
      type: "string",
      group: "contacts",
    }),
    // TODO: возможно заменим на другой мессенджер (VK / Viber / Max) — уточнить у заказчицы
    defineField({
      name: "whatsapp",
      title: "WhatsApp — номер (только цифры, без + и пробелов)",
      type: "string",
      group: "contacts",
    }),
    defineField({
      name: "whatsappNote",
      title: "Подпись под WhatsApp",
      type: "string",
      group: "contacts",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
      group: "contacts",
    }),
    defineField({
      name: "emailNote",
      title: "Подпись под Email",
      type: "string",
      group: "contacts",
    }),

    // === АДРЕС ===
    defineField({
      name: "address",
      title: "Адрес",
      type: "string",
      group: "address",
    }),
    defineField({
      name: "metro",
      title: "Ближайшее метро",
      type: "string",
      group: "address",
    }),
    defineField({
      name: "workingHours",
      title: "Часы работы",
      type: "text",
      rows: 2,
      group: "address",
    }),
    defineField({
      name: "mapUrl",
      title: "Ссылка на iframe Яндекс.Карты",
      type: "url",
      group: "address",
    }),
  ],
  groups: [
    { name: "general", title: "Общее", default: true },
    { name: "contacts", title: "Контакты" },
    { name: "address", title: "Адрес и карта" },
  ],
  preview: {
    prepare() {
      return {
        title: "Настройки сайта",
      };
    },
  },
});