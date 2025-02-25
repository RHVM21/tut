import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en/translation.json';
import translationRU from './ru/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

// Получаем сохранённый язык из localStorage
const savedLanguage = localStorage.getItem('language') ?? 'en'; // Если ничего не сохранено, используем русский язык по умолчанию

void i18n
  .use(initReactI18next) // Передаем i18n в react-i18next
  .init({
    resources,
    lng: savedLanguage, // Используем сохранённый язык
    fallbackLng: 'en', // Язык по умолчанию при отсутствии перевода
    interpolation: {
      escapeValue: false, // React сам обрабатывает экранирование
    },
  });

export default i18n;
