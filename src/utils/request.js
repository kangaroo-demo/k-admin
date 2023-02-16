import store from '@/store'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 添加 icode
    config.headers.icode = '1DDC5641F25EA34E'
    // 添加 token
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 返回配置
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      // 业务错误
      ElMessage.error(message) // 提示错误信息
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
