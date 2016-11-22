'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var manageTranslations = function manageTranslations() {
  var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'react';
  return function (section) {
    return function (key) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!I18n) return options.defaultValue ? options.defaultValue : '';
      var t_key = root + '.' + section;
      if (key) {
        t_key += '.' + key;
      }

      return I18n.t(t_key, options);
    };
  };
};

exports.default = manageTranslations;
var actionsTranslation = exports.actionsTranslation = function actionsTranslation(item) {
  var t = manageTranslations()('action_btns');
  var type = manageTranslations()(item)('title');

  return t('add', { type: type });
};