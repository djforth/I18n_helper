import tHelpers from '../src';

import I18n from 'i18n-js';

describe('TranslationHelper', function() {
  describe('Set translations', () => {
    beforeAll(() => {
      document.documentElement.lang = 'cy';
    });

    test('should set language if passed to function', () => {
      const translationHelpers = tHelpers('fr');

      expect(I18n.currentLocale()).toEqual('fr');
    });

    test('should set language if passed to function', () => {
      const translationHelpers = tHelpers();

      expect(I18n.currentLocale()).toEqual('cy');
    });
  });

  describe('get translation', () => {
    let translationHelpers;
    beforeAll(() => {
      translationHelpers = tHelpers('cy');
    });

    beforeEach(() => {
      I18n.t.mockClear();
    });

    test('should return translations if translate passed', () => {
      const tr = translationHelpers('some.key', { translate: true });
      expect(tr).toEqual({ key: 'some.key', options: {} });
      expect(I18n.t).toHaveBeenCalled();
    });

    test('should return translations if translate passed with option', () => {
      const tr = translationHelpers('some.key', {
        foo: 'bar',
        translate: true
      });

      expect(tr).toEqual({ key: 'some.key', options: { foo: 'bar' } });
      expect(I18n.t).toHaveBeenCalled();
    });

    test('should return translations if translate passed with option and multiple keys', () => {
      const tr = translationHelpers('some', 'key', {
        foo: 'bar',
        translate: true
      });

      expect(tr).toEqual({ key: 'some.key', options: { foo: 'bar' } });
      expect(I18n.t).toHaveBeenCalled();
    });

    test('should return function if no translate key', () => {
      const tr = translationHelpers('some.key');

      expect(tr).toBeFunction();
      expect(I18n.t).not.toHaveBeenCalled();
    });

    test('should all multiple keys to combine', () => {
      let trh = translationHelpers('some.key');
      expect(I18n.t).not.toHaveBeenCalled();
      trh = trh('foo');
      expect(I18n.t).not.toHaveBeenCalled();
      const tr = trh('bar', { translate: true });
      expect(tr).toEqual({ key: 'some.key.foo.bar', options: {} });
      expect(I18n.t).toHaveBeenCalled();
    });

    test('should all multiple keys to combine, but no key in last', () => {
      let trh = translationHelpers('some.key');
      expect(I18n.t).not.toHaveBeenCalled();

      trh = trh('foo');
      expect(I18n.t).not.toHaveBeenCalled();

      const tr = trh({ translate: true });
      expect(tr).toEqual({ key: 'some.key.foo', options: {} });
      expect(I18n.t).toHaveBeenCalled();
    });

    test('should all multiple keys to combine, but no key in last', () => {
      let trh = translationHelpers('some.key');
      expect(I18n.t).not.toHaveBeenCalled();

      trh = trh('foo');
      expect(I18n.t).not.toHaveBeenCalled();

      const tr = trh({ translate: true });
      expect(tr).toEqual({ key: 'some.key.foo', options: {} });
      expect(I18n.t).toHaveBeenCalled();
    });

    test('should all multiple keys to combine, and multiple options', () => {
      let trh = translationHelpers('some', 'key');
      expect(I18n.t).not.toHaveBeenCalled();

      trh = trh('another', 'foo', { foo: 'bar' });
      expect(I18n.t).not.toHaveBeenCalled();

      const tr = trh({ translate: true, bar: 'foo' });
      expect(tr.key).toEqual('some.key.another.foo');

      expect(tr.options).toEqual(
        expect.objectContaining({ foo: 'bar', bar: 'foo' })
      );
      expect(I18n.t).toHaveBeenCalled();
    });
  });
});
