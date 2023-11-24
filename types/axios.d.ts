import type { AxiosRequestConfig } from 'axios'

/**错误信息提示方式 */
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

/**Axios 处理方案 */
export interface AxiosTransform {
  /**
   *  请求前的流程配置
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

  /**
   *  处理响应数据
   */
  transformResponseHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any

  /**
   *  请求失败处理
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

  /**
   *  请求之前的拦截器
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig

  /**
   *  请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   *  请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   *  请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (axiosInstance: AxiosInstance, error: Error) => void
}

/** 创建 Axios 选项 */
export interface CreateAxiosOptions extends AxiosRequestConfig {
  /**身份验证方案  */
  authenticationScheme?: string
  /**数据处理方案 */
  transform?: AxiosTransform
  /**请求选项 */
  requestOptions?: RequestOptions
}

/** 请求选项 */
export interface RequestOptions {
  /**拼接请求参数到 url */
  joinParamsToUrl?: boolean
  /**格式化请求参数时间 */
  formatDate?: boolean
  /**是否需要对返回数据进行处理，有时候需要不进行任何处理，直接返回，用于页面代码可能需要直接获取 code，data，message 这些信息时关闭*/
  isTransformResponse?: boolean
  /**是否返回原生响应头 比如：需要获取响应头时使用该属性 */
  isReturnNativeResponse?: boolean
  /** 是否拼接前缀 */
  joinPrefix?: boolean
  /**接口地址，如果不设置为空，则使用默认 apiUrl */
  apiUrl?: string
  /**接口地址前缀，有些系统所有接口地址都有前缀，可以在这里统一加，方便切换 */
  urlPrefix?: string
  /**错误消息提示类型 */
  errorMessageMode?: ErrorMessageMode
  /**是否添加时间戳*/
  joinTime?: boolean
  /**忽略重复请求 */
  ignoreCancelToken?: boolean
  /** 是否在请求头携带 token */
  withToken?: boolean
  /**请求重试机制 */
  retryRequest?: RetryRequest
}

export interface RetryRequest {
  /** 开启重试 */
  isOpenRetry: boolean
  /** 重试次数 */
  count: number
  /** 等待时间 */
  waitTime: number
}
/**结果 */
export interface Result<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  message: string
  result: T
}

// multipart/form-data: upload file
export interface UploadFileParams {
  /**其他参数 */
  data?: Recordable
  /** 文件参数接口字段名 */
  name?: string
  /** 文件 */
  file: File | Blob
  /** 文件名 */
  filename?: string
  [key: string]: any
}
