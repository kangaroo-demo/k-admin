import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // 存在 token , 进入主页
  // 快捷访问
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/getUserInfo')
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })
        return next(to.path)
      }
      next()
    }
  } else {
    // 没有 token 的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
