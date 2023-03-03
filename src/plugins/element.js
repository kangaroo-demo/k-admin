import ElementPlus from 'element-plus'
import store from '@/store'
import 'element-plus/theme-chalk/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

export default (app) => {
  app.use(ElementPlus, {
    locale: store.getters.language === 'en_us' ? en : zhCn
  })
}
