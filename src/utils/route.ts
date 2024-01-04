import { RouteRecordNormalized } from 'vue-router'
// 通过router.getRoutes()获取routes

function isChild(route: RouteRecordNormalized, pRoute: RouteRecordNormalized): boolean {
  if (
    pRoute.children &&
    pRoute.children.find((child) => `${pRoute.path}/${child.path}` === route.path)
  ) {
    return true
  }
  return false
}

export function handleRoutes(routes: RouteRecordNormalized[]): RouteRecordNormalized[] {
  routes = routes.filter((route) => route.meta?.showInAside)
  const map = new Map<string, boolean>() //该路由是否为顶级路由
  routes.forEach((route) => {
    if (routes.find((pRoute) => isChild(route, pRoute))) {
      map.set(route.path, false) //该路由是某个路由的子路由
    } else {
      map.set(route.path, true) //该路由不是任何路由的子路由，是顶级路由
    }
  })
  return routes.filter((route) => map.get(route.path)) //返回所有顶级路由
}

export function getRouteByName(
  name: string,
  routes: RouteRecordNormalized[]
): RouteRecordNormalized | undefined {
  for (const route of routes) {
    if (route.name == name) {
      return route
    }
  }
  return undefined
}

// 获取面包屑的路由名称数组
export function getNames(name: string, routes: RouteRecordNormalized[]): string[] {
  const names: string[] = []
  while (true) {
    names.push(name)
    const route = getRouteByName(name, routes) as RouteRecordNormalized
    const parentRoute = getRouteByName(route.meta?.parentRouteName as string, routes)
    if (parentRoute) {
      name = parentRoute.name as string
      continue
    } else {
      break
    }
  }
  return names.reverse()
}

// 获取面包屑的路由描述数组
export function getDescriptions(names: string[], routes: RouteRecordNormalized[]): string[] {
  const descriptions: string[] = []
  for (const name of names) {
    const route = getRouteByName(name, routes) as RouteRecordNormalized
    descriptions.push(route.meta?.description as string)
  }
  return descriptions
}
