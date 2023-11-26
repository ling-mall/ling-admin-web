import { defHttp } from '@/utils/http/axios'
import { useRouteParams } from '@vueuse/router'

export const getRedirectUrl = () => {
  const params = {
    client: useRouteParams('client', 'aa').value,
    redirect: useRouteParams('redirect', 'http://localhost:7999/login').value
  }
  return defHttp.get<string>({ url: '/account/sso/getRedirectUrl', params })
}
export const doLogin = (userInfo) => {
  return defHttp.post<string>({ url: '/account/sso/doLogin', data: userInfo })
}
