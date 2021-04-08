import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import localeEN from "./locales/locale_en.json";
import localeAM from "./locales/locale_am.json";
import localeRU from "./locales/locale_ru.json";

const resources = {
    en: {
        translation: localeEN
    },
    am: {
        translation: localeAM
    },
    ru: {
        translation: localeRU
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: localStorage.getItem('lang')? localStorage.getItem('lang') : 'en',
        fallbackLng: 'en',
        keySeparator: '.',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
