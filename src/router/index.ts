import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { title: '首页大屏' }
  },
  {
    path: '/overview',
    name: 'Overview',
    component: () => import('@/views/Overview.vue'),
    meta: { title: '风机概览' }
  },
  {
    path: '/monitor',
    name: 'Monitor',
    component: () => import('@/views/Monitor.vue'),
    meta: { title: '风机监测' }
  },
  {
    path: '/operation',
    name: 'Operation',
    component: () => import('@/views/Operation.vue'),
    meta: { title: '运维管理' }
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import('@/views/Data.vue'),
    meta: { title: '数据管理' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title} - 风电场智慧协同云平台`
  next()
})

export default router
