import I18n from 'i18n-js';
import { isPlainObject } from 'lodash';

const isString = str => typeof str === 'string';

const sortOptions = items => {
  return items.reduce(
    ({ keys, options }, item) => {
      if (isString(item)) {
        keys.push(item);
      }

      if (isPlainObject(item)) {
        options = { ...options, ...item };
      }

      return { keys, options };
    },
    { keys: [], options: { translate: false } }
  );
};

const translator = (...items) => {
  const { keys, options } = sortOptions(items);

  const { translate, ...opts } = options;

  if (!translate) {
    return (...newItems) => {
      return translator(keys.join('.'), opts, ...newItems);
    };
  }

  return I18n.t(keys.join('.'), opts);
};

export default l => {
  const locales = l || document.documentElement.lang;
  I18n.locale = locales;
  return translator;
};
