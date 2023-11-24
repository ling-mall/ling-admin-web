/**
 * Used to parse the .env.development proxy configuration
 * 用于解析.env.development代理配置
 */
import type { ProxyOptions } from 'vite'
/**
 * 代理对象
 */
type ProxyItem = [string, string]
/**
 * 代理列表
 */
type ProxyList = ProxyItem[]
/**
 * 创建代理列表
 */
// Record工具类型可以将 string 作为键的同时传给rewrite函数 源码Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。
type ProxyTargetList = Record<string, ProxyOptions & { rewrite: (path: string) => string }>
// https的正则表达式
const httpsRE = /^https:\/\//

/**
 * Generate proxy
 * 生成代理
 * @param list 字符串键值对数组
 */
export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {}
  for (const [prefix, target] of list) {
    // 是否是https
    const isHttps = httpsRE.test(target)

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      // 改写路径,使用path模块
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {})
    }
  }
  return ret
}
