import store from '@/store'
import mZhLocale from './lang/zh_CN'
import mEnLocale from './lang/en_US'
const messages = {
  'en-US': {
    msg: {
      ...mEnLocale
    }
  },
  'zh-CN': {
    msg: {
      ...mZhLocale
    }
  }
}

import { createI18n } from 'vue-i18n'

function getLanguage() {
  return store && store.getters && store.getters.language
}

const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为 false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: getLanguage(),
  messages
})

export default i18n
