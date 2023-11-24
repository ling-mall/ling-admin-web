import { AxiosTransform, CreateAxiosOptions, RequestOptions, Result } from '#/axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { clone } from 'lodash-es'
import { CustomAxios } from './CustomAxios'
import { deepMerge, setObjToUrlParams } from '../..'
import { useGlobSetting } from '@/hooks/setting'
import { isString } from '@/utils/is'
import { formatRequestDate, joinTimestamp } from './helper'

const globSetting = useGlobSetting()
const urlPrefix = globSetting.urlPrefix

/**处理响应数据。如果数据不是预期格式，可直接抛出错误 */
const transformResponseHook = (res: AxiosResponse<Result>, options: RequestOptions) => {
  const { isReturnNativeResponse } = options
  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  if (isReturnNativeResponse) {
    return res
  }

  // 不进行任何处理，直接返回。用于页面代码可能需要直接获取 code，data，message 这些信息时开启
  const { isTransformResponse } = options
  if (!isTransformResponse) {
    return res.data
  }

  // 其他对结果的处理
}

/** 请求前的钩子，处理 config*/
const beforeRequestHook = (config: AxiosRequestConfig, options: RequestOptions) => {
  //接口地址前缀，有些系统所有接口地址都有前缀
  const { apiUrl, joinPrefix, urlPrefix, formatDate, joinTime, joinParamsToUrl } = options
  if (joinPrefix) {
    config.url = `${urlPrefix}${config.url}`
  }
  // 覆盖默认的接口地址
  if (apiUrl && isString(apiUrl)) {
    config.url = `${apiUrl}${config.url}`
  }

  const params = config.params || {}
  const data = config.data || false
  formatDate && data && !isString(data) && formatRequestDate(data)
  if (config.method?.toUpperCase() === RequestEnum.GET) {
    if (!isString(params)) {
      // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
      config.params = Object.assign(params || {}, joinTimestamp(!!joinTime, false))
    } else {
      // 兼容restful风格
      config.url = config.url + params + `${joinTimestamp(!!joinTime, true)}`
      config.params = undefined
    }
  } else {
    if (!isString(params)) {
      formatDate && formatRequestDate(params)
      if (
        Reflect.has(config, 'data') &&
        config.data &&
        (Object.keys(config.data).length > 0 || config.data instanceof FormData)
      ) {
        config.data = data
        config.params = params
      } else {
        // 非GET请求如果没有提供data，则将params视为data
        config.data = params
        config.params = undefined
      }
      if (joinParamsToUrl) {
        config.url = setObjToUrlParams(
          config.url as string,
          Object.assign({}, config.params, config.data)
        )
      }
    } else {
      // 兼容restful风格
      config.url = config.url + params
      config.params = undefined
    }
  }

  return config
}

const transform: AxiosTransform = {
  transformResponseHook,
  beforeRequestHook
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new CustomAxios(
    // 深度合并
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
        timeout: 10 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,

        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是 form-data 格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将 prefix 添加到 url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post 请求的时候添加参数到 url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带 token
          withToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 100
          }
        }
      },
      opt || {}
    )
  )
}
export const defHttp = createAxios()
