import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import store from '@/store'
// 格式化时间
const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

// 加载相对时间插件
dayjs.extend(rt)

function relativeTime(val) {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs()
    .locale(store.getters.language === 'zh-CN' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
