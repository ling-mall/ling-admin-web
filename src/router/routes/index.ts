import { RouteRecordRaw } from 'vue-router'

/** 公共路由 */
export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard/analysis'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/layouts/default/index.vue'),
    redirect: '/dashboard/analysis',
    meta: {
      title: 'routes.dashboard.dashboard',
      hideChildrenInMenu: true,
      icon: 'bx:bx-home'
    },
    children: [
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/index.vue'),
        meta: {
          hideMenu: true,
          hideBreadcrumb: true,
          title: 'routes.dashboard.analysis',
          currentActiveMenu: '/dashboard',
          icon: 'bx:bx-home'
        }
      },
      {
        path: 'workbench',
        name: 'Workbench',
        component: () => import('@/views/index2.vue'),
        meta: {
          hideMenu: true,
          hideBreadcrumb: true,
          title: 'routes.dashboard.workbench',
          currentActiveMenu: '/dashboard',
          icon: 'bx:bx-home'
        }
      }
    ]
  }
]
