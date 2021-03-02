import { createI18n } from 'react-router-i18n';
 
// Array of supported locales
// The first in the array is treated as the default locale
const locales = ['en', 'ar'];
 
// Dictionary of translations
const translations = {
  en: {
    Asnwered: 'Asnwered',
    switchTo:'AR'
  },
  ar: {
    Asnwered: 'الاجوبة',
    switchTo:'EN'
  }
}
 
const I18n = createI18n(
  locales,
  translations,
);
 
export default I18n;