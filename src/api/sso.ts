import { defHttp } from '@/utils/http/axios'
import { useRouteParams } from '@vueuse/router'

export const getRedirectUrl = () => {
  const params = {
    client: useRouteParams('client', '').value,
    redirect: useRouteParams('redirect', '').value,
    mode: useRouteParams('mode', '').value
  }
  return defHttp.get<string>({ url: '/account/sso/getRedirectUrl', params })
}
