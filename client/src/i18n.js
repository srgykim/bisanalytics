import i18n from 'i18next';
import Backend from 'i18next-http-backend'; // Для загрузки переводов из удаленного сервера
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next).init({
    fallback: 'ru',
    debug: false,
    detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage']
    },
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
