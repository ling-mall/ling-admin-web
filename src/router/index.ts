import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'
import { basicRoutes } from './routes'

// app router
// 创建一个可以被 Vue 应用程序使用的路由实例
export const router = createRouter({
  // HTML5 模式。
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  // 应该添加到路由的初始路由列表。
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  // 如果前一个页面有滚动条的滚动，当路由跳转后发现滚动条的位置还保持在原来的位置，这个就带来了困扰 scrollBehavior 方法可以指定滚动条的位置
  scrollBehavior: () => ({ left: 0, top: 0 })
})

/** 配置路由 */
export function setupRouter(app: App<Element>) {
  app.use(router)
}
