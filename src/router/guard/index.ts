import { PagePathEnum, whitePathList } from '@/settings/routerSetting'
import { useUserStoreWithOut } from '@/store/modules/user'
import { Router } from 'vue-router'

export function setupRouterGuard(router: Router) {
  createPermissionGuard(router)
}

/** 路由鉴权 */
function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const token = userStore.getToken
  router.beforeEach(async (to, from, next) => {
    // 白名单放行
    if (whitePathList.includes(to.path)) {
      next()
    }

    if (!token) {
      // redirect login page
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: PagePathEnum.BASE_LOGIN,
        replace: true
      }
      if (to.path) {
        redirectData.query = {
          redirect: to.path
        }
      }
      next(redirectData)
      return
    }
  })
}
