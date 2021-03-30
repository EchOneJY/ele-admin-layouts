import { getUrlParam } from '@/utils/tools.js'
import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(role, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(role)
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes, role) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(role, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, role)
      }
      res.push(tmp)
    }
  })

  return res
}

export default {
  namespaced: true,
  state: {
    info: {
      role: '',
      roleId: '',
      name: '',
      userId: '',
    },
    routes: [],
    addRoutes: [],
  },
  mutations: {
    SET_INFO: (state, info) => {
      Object.assign(state.info, info)
    },
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
  },
  actions: {
    generateRoutes({ commit }, role) {
      return new Promise(resolve => {
        let accessedRoutes
        if (role === 'admin') {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, role)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    },
    getInfo({ commit }) {
      return new Promise(resolve => {
        const obj = {}
        if (!getUrlParam('role')) {
          obj.role = 'admin'
        }
        if (!getUrlParam('name')) {
          obj.name = 'admin'
        }
        commit('SET_INFO', obj)
        resolve(obj)
      })
    },
  },
}
