import translationHelpers, {
  actionsTranslation,
  manageTranslations
} from '../src';

import _ from 'lodash';

import JasmineCallHelper from '@djforth/jest-call-helpers';

import SpyManager from '@djforth/stubs-spy-manager-jest';
const stubs_spies = SpyManager(translationHelpers);
const callHelper = JasmineCallHelper(stubs_spies);

describe('TranslationHelper', function(){
  afterEach(()=>{
    stubs_spies.reset();
  });

  beforeEach(()=>{
    stubs_spies.add([
      {
        spy: 'I18n.t'
        , callback: (key)=>key
      }
    ]).make();
    window.I18n = stubs_spies.get('I18n');
  });

  describe('set root', function(){
    let root;
    beforeEach(()=>{
      root = manageTranslations('root');
    });

    it('should return function', function(){
      expect(_.isFunction(root)).toBeTruthy();
    });
  });

  describe('set section', function(){
    let section;
    beforeEach(()=>{
      section = manageTranslations('root')('section');
    });

    it('should return function', function(){
      expect(_.isFunction(section)).toBeTruthy();
    });
  });

  describe('get translation', function(){
    let translation;
    beforeEach(()=>{
      translation = manageTranslations('root')('section')('mytranslation', {defaultValue: 'foo'});
    });

    it('should return key', function(){
      expect(translation).toEqual('root.section.mytranslation');
    });

    it('should return empty string if translation not implemented', function(){
      window.I18n = null;
      translation = manageTranslations('root')('section')('mytranslation');
      expect(translation).toEqual('');
    });

    it('should return default string if translation not implemented & default applied', function(){
      window.I18n = null;
      translation = manageTranslations('root')('section')('mytranslation', {defaultValue: 'foo'});
      expect(translation).toEqual('foo');
    });

    callHelper.add([
      ['I18n.t', ['root.section.mytranslation', {defaultValue: 'foo'}]]
    ]);
    callHelper.checkCalls();
    callHelper.reset();
  });

  describe('actionsTranslation ', function(){
    beforeEach(function(){
      stubs_spies.add([
        {
          spy: 'translation'
          , returnSpy: 't'
        }
        , {
          spy: 't'
          , callback: (key)=>key
        }
        , {
          stub: 'manageTranslations'
          , spy: 'translation'
        }
      ]).make();
      actionsTranslation('foo');
    });

    callHelper.add([
      [{stub: 'manageTranslations', count: 2}]
      , [{spy: 'translation', count: 2}]
      , [{spy: 't'}, ['title']]
      , [{spy: 't'}, ['add', {type: 'title'}], 1]
    ]);
    callHelper.checkCalls();
    callHelper.reset();

    // let calls = {
    //   manageTranslations0: ()=>stubs.get('manageTranslations')
    //   , manageTranslations1: [()=>stubs.get('manageTranslations')
    //   , [], 1
    //   ]
    //   , translation0: [()=>spyManager.get('translation')
    //   , ['action_btns']]
    //   , translation1: [()=>spyManager.get('translation')
    //   , ['foo'], 1
    //   ]
    //   , t0: [()=>spyManager.get('t')
    //   , ['title']]
    //   , t1: [()=>spyManager.get('t')
    //   , ['add', {type: 'title'}], 1
    //   ]
    // };

    // checkMulti(calls);
  });
});
