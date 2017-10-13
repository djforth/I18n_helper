
export const manageTranslations = (root = 'react')=>(section)=>{
  return (key, options = {})=>{
    if (!I18n) return (options.defaultValue) ? options.defaultValue : '';
    let t_key = `${root}.${section}`;
    if (key){
      t_key += `.${key}`;
    }

    return I18n.t(t_key, options);
  };
};

export const actionsTranslation = (item)=>{
  let t = manageTranslations()('action_btns');
  let type = manageTranslations()(item)('title');

  return t('add', {type});
};
