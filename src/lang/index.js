import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

//首页
import HomeZh  from "./Home/zh"
import HomeEn  from "./Home/en"
const messages = {
    en: {
      ...HomeEn
    },
    zh: {
      ...HomeZh
    }
  }
 export function getLanguage(){
    let language = localStorage.getItem('language')
    if(language == 'zh'){
        return 'zh'
    }else if(language == 'en'){
        return 'en'
    }else{
        localStorage.setItem('language','zh')
        return 'zh'
    }
 }
 console.log('getLanguage',getLanguage());
const i18n = new VueI18n({
    // set locale
    // options: en | zh | es
    locale: getLanguage(),
    // set locale messages
    messages
  })
  export default i18n