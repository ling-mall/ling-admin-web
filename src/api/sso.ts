import { Result } from '#/axios'
import { defHttp } from '@/utils/http/axios'

export const getSsoAuthUrl = (params: { clientLoginUrl: string; backUrl: string }) => {
  return defHttp.get<string>({
    url: '/demo/sso/getSsoAuthUrl',
    params
  })
}

export const isLogin = () => {
  return defHttp.get<boolean>({
    url: '/demo/sso/isLogin'
  })
}

export const doLoginByTicket = (ticket: string) => {
  return defHttp.get<Result>(
    {
      url: '/demo/sso/doLoginByTicket',
      params: { ticket }
    },
    { isTransformResponse: false }
  )
}

export const logout = () => {
  return defHttp.get<boolean>({
    url: '/demo/sso/logout'
  })
}
