import storage from "store";
import moment from "moment";
import { createI18n } from "vue-i18n";
// default lang
import enUS from "./lang/en-US";
import zhCN from "./lang/zh-CN";

export const defaultLang = "zh-CN";

const messages = {
  //   "en-US": {
  //     ...enUS
  //   },
  "zh-CN": {
    ...zhCN
  }
};

const i18n = createI18n({
  locale: "zh-CN",
  messages
});

const loadedLanguages = [defaultLang];

function setI18nLanguage(lang) {
  i18n.locale = lang;
  // request.headers['Accept-Language'] = lang
  document.querySelector("html").setAttribute("lang", lang);
  return lang;
}

export function loadLanguageAsync(lang = defaultLang) {
  return new Promise(resolve => {
    // 缓存语言设置
    storage.set("lang", lang);
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(
          /* webpackChunkName: "lang-[request]" */ `./lang/${lang}`
        ).then(msg => {
          const locale = msg.default;
          i18n.setLocaleMessage(lang, locale);
          loadedLanguages.push(lang);
          moment.updateLocale(locale.momentName, locale.momentLocale);
          return setI18nLanguage(lang);
        });
      }
      return resolve(setI18nLanguage(lang));
    }
    return resolve(lang);
  });
}

export function i18nRender(key) {
  return i18n.global.t(`${key}`);
}

export default i18n;
