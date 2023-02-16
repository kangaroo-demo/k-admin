import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import installIcons from './icons'
// 导入全局样式
import './styles/index.scss'
// 导入权限文件
import './permission'

const app = createApp(App)
// 导入 ElementPlus
installElementPlus(app)
// 导入本地Icons
installIcons(app)

app.use(store).use(router).mount('#app')
