// import {t} from 'i18n-js';

export const t = jest.fn((key, options) => ({ key, options }));

const I18n = {
  t,
  locale: 'en',
  currentLocale() {
    return this.locale;
  }
};

export default I18n;
