import { RouteRecordRaw } from 'vue-router'

/** 公共路由 */
export const basicRoutes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/views/index.vue') },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  { path: '/:path(.*)*', redirect: '/' }
]
