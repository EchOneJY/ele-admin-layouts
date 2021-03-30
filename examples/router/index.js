import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect'),
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'el-icon-box', affix: true },
      },
    ],
  },
  {
    path: '/interface',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/interface'),
        name: 'Interface',
        meta: {
          title: '接口管理',
          icon: 'el-icon-data-analysis',
        },
      },
    ],
  },
  {
    path: '/system',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'el-icon-s-tools',
    },
    children: [
      {
        path: 'function',
        component: () => import('@/views/system/function'),
        name: 'Function',
        meta: {
          title: '功能设置',
        },
      },
      {
        path: 'role',
        component: () => import('@/views/system/role'),
        name: 'Role',
        meta: {
          title: '角色设置',
        },
      },
    ],
  },
]

export const asyncRoutes = []

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
