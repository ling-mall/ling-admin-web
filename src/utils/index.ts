import { isObject } from '@/utils/is'

export const noop = () => {}

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

export function rgbToHex(r: number, g: number, b: number) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

type PropMap = { [key: string]: string }

/**
 * 用于复制属性到别的属性上或者提取属性
 * @param data 对象数组
 * @param propMap 键值对，{'oldProp': 'newProp'}
 * @param copyAll 是否复制所有属性，会新增 propMap 中没有的属性
 * @param isTree 是否是树形结构
 * @param childrenProp 树形结构子节点属性名
 */
export const copyProps = (
  data: any[],
  propMap: PropMap,
  copyAll: boolean,
  isTree = false,
  childrenProp = 'children'
) => {
  return data.map((item) => {
    const newItem: { [key: string]: any } = {}
    if (copyAll) {
      for (const key in item) {
        newItem[key] = item[key]
      }
    }
    for (const key in propMap) {
      if (item.hasOwnProperty(key)) {
        newItem[propMap[key]] = item[key]
      }
    }
    if (isTree && Array.isArray(item[childrenProp])) {
      newItem[childrenProp] = copyProps(item[childrenProp], propMap, copyAll, isTree, childrenProp)
    }
    return newItem
  })
}
