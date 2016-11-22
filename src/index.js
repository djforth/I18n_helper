
const manageTranslations = (root = 'react')=>(section)=>{
  return (key, options = {})=>{
    if (!I18n) return (options.defaultValue) ? options.defaultValue : '';
    let t_key = `${root}.${section}`;
    if (key){
      t_key += `.${key}`;
    }

    return I18n.t(t_key, options);
  };
};

export default manageTranslations;

export const actionsTranslation = (item)=>{
  var t = manageTranslations()('action_btns');
  var type = manageTranslations()(item)('title');

  return t('add', {type});
};
