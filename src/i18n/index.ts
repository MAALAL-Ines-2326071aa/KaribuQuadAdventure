import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import swTranslations from './locales/sw.json';
import esTranslations from './locales/es.json';
import itTranslations from './locales/it.json';
import deTranslations from './locales/de.json';
import zhTranslations from './locales/zh.json';

const resources = {
  en: { translation: enTranslations },
  fr: { translation: frTranslations },
  sw: { translation: swTranslations },
  es: { translation: esTranslations },
  it: { translation: itTranslations },
  de: { translation: deTranslations },
  zh: { translation: zhTranslations },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;