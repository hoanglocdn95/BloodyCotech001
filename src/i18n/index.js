import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import English from './en';
import VietNam from './vi';

i18n.use(initReactI18next).init({
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        ...English,
      },
    },
    vi: {
      translation: {
        ...VietNam,
      },
    },
  },
});
export default i18n;
