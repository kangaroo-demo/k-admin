import { createApp } from 'vue'
import i18n from '@/i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import installIcons from './icons'
import installFilter from '@/filters'
import installDirective from '@/directives'
// 导入全局样式
import './styles/index.scss'
// 导入权限文件
import './permission'

const app = createApp(App)

// 导入 ElementPlus
installElementPlus(app)
// 导入本地Icons
installIcons(app)
// 导入全局属性（过滤器）
installFilter(app)
// 导入全局指令
installDirective(app)

app.use(store).use(router).use(i18n).mount('#app')
