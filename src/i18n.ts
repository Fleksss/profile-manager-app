import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import ru from './locales/ru/common.json';

const stored = localStorage.getItem('language');
const lng = stored || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, ru: { translation: ru } },
    lng,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
