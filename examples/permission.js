import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  // set page title
  document.title = `支撑平台-${to.meta.title}`

  const hasRole = store.getters.info.role

  if (hasRole) {
    next()
  } else {
    const { role } = await store.dispatch('user/getInfo')
    const accessRoutes = await store.dispatch('user/generateRoutes', role)
    router.addRoutes(accessRoutes)
    next({ ...to, replace: true })
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
