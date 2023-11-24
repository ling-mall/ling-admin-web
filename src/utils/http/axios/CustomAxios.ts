import { AxiosTransform, CreateAxiosOptions, RequestOptions, Result } from '#/axios'
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { cloneDeep } from 'lodash-es'
import qs from 'qs'
import { isFunction } from '../../is'

export class CustomAxios {
  /** Axios 实例 */
  private axiosInstance: AxiosInstance
  /**初始化选项 */
  private readonly options: CreateAxiosOptions

  /**
   * 构造函数
   * @param options
   */
  constructor(options: CreateAxiosOptions) {
    this.options = options
    //创建实例
    this.axiosInstance = axios.create(options)
    // 设置拦截器
    this.setupInterceptors()
  }

  /** 获取数据处理方案 */
  private getTransform(): AxiosTransform {
    const { transform } = this.options
    return transform as AxiosTransform
  }

  /** 获取 axios 实例 */
  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  /**
   * @description: Interceptor configuration 拦截器配置
   */
  private setupInterceptors() {
    // 获取数据处理对象
    const transform = this.getTransform()
    if (!transform) {
      return
    }

    // 设置请求拦截器
    const { requestInterceptors } = transform
    this.axiosInstance.interceptors.request.use(undefined, (config: AxiosRequestConfig) => {
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options)
      }
      return config
    })

    // 请求拦截器错误捕获
    const { requestInterceptorsCatch } = transform
    if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) {
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)
    }

    // 响应结果拦截器处理
    const { responseInterceptors } = transform
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)

    // 响应结果拦截器错误捕获
    const { responseInterceptorsCatch } = transform
    if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) {
      this.axiosInstance.interceptors.response.use(undefined, (error) => {
        return responseInterceptorsCatch(this.axiosInstance, error)
      })
    }
  }

  /** 支持 FormData */
  supportFormData(config: AxiosRequestConfig) {
    /**请求头配置*/
    const headers = config.headers || this.options.headers
    /** 请求头 */
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    if (
      // 请求为 FormData
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      // 如果没有 data 属性
      !Reflect.has(config, 'data') ||
      // 如果是 GET 请求
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      // 不修改直接返回
      return config
    }

    // 对象序列化为 URL 查询字符串的，arrayFormat 指定了数组序列化格式，data: [1, 2, 3] 的对象会被序列化为 data[]=1&data[]=2&data[]=3
    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' })
    }
  }
  /** 请求方法 */
  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    // 深克隆，避免操作到对象
    let conf: CreateAxiosOptions = cloneDeep(config)
    /** 获取数据处理方式 */
    const transform = this.getTransform()

    /** 初始化时请求选项 */
    const { requestOptions } = this.options

    /** 合并请求选项，使用方法时有传参则覆盖默认 */
    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    // 执行请求前 钩子
    const { beforeRequestHook } = transform
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }

    // 覆盖初始值
    conf.requestOptions = opt

    // 处理 FormData
    conf = this.supportFormData(conf)

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          // 处理响应数据
          const { transformResponseHook } = transform
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              // 返回处理后数据
              const ret = transformResponseHook(res, opt)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('request error!'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          // 请求失败的请求
          const { requestCatchHook } = transform
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt))
            return
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e)
        })
    })
  }
  /** 发送 get 请求 */
  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  /** 发送 post 请求 */
  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  /** 发送 put 请求 */
  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  /** 发送 delete 请求 */
  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }
}
