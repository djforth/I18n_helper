// i18n Helper v1.3.0 by Adrian Stainforth <adrian.stainforth@gmail.com>
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('lodash/isPlainObject')) :
  typeof define === 'function' && define.amd ? define(['lodash/isPlainObject'], factory) :
  (global = global || self, global.i18Helper = factory(global.isPlainObject));
}(this, (function (_isPlainObject) { 'use strict';

  _isPlainObject = _isPlainObject && _isPlainObject.hasOwnProperty('default') ? _isPlainObject['default'] : _isPlainObject;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  var isString = function isString(str) {
    return typeof str === 'string';
  };

  var sortOptions = function sortOptions(items) {
    return items.reduce(function (_ref, item) {
      var keys = _ref.keys,
          options = _ref.options;

      if (isString(item)) {
        keys.push(item);
      }

      if (_isPlainObject(item)) {
        options = _objectSpread2({}, options, {}, item);
      }

      return {
        keys: keys,
        options: options
      };
    }, {
      keys: [],
      options: {
        translate: false
      }
    });
  };

  var translator = function translator() {
    for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
      items[_key] = arguments[_key];
    }

    var _sortOptions = sortOptions(items),
        keys = _sortOptions.keys,
        options = _sortOptions.options;

    var translate = options.translate,
        opts = _objectWithoutProperties(options, ["translate"]);

    if (!translate) {
      return function () {
        for (var _len2 = arguments.length, newItems = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          newItems[_key2] = arguments[_key2];
        }

        return translator.apply(void 0, [keys.join('.'), opts].concat(newItems));
      };
    }

    if (keys.join('.').match(/[A-Z]/)) {
      console.log('key >>>>>>', keys.join('.'));
    }

    return I18n.t(keys.join('.'), opts);
  };

  var index = (function (l) {
    var locales = l || document.documentElement.lang;
    I18n.locale = locales;
    return translator;
  });

  return index;

})));
//# sourceMappingURL=index.js.map
