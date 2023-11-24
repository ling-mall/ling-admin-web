import { LocaleType } from '#/config'
import { set } from 'lodash-es'

export const loadLocalePool: LocaleType[] = []

export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale)
}

/**
 *  根据传入的语言包模块路径和前缀，生成一个按层级结构组织的语言包对象
 * @param langs 语言包模块
 * @param prefix 前缀，例如 zh-CN/sys.json 会生成 {zh-CN:{sys:{}}} 去除前缀后生成 {sys:{}}
 * @returns 语言包对象
 */
export function genMessage(langs: Record<string, Record<string, any>>, prefix = 'lang') {
  const obj: Recordable = {}

  console.log(prefix)

  // 遍历所有文件路径
  Object.keys(langs).forEach((key) => {
    // 获取默认导出内容
    const langFileModule = langs[key].default
    // 获取路径与文件名 例如：routes/basic.json
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '')
    // 获取文件名（无后缀）
    const lastIndex = fileName.lastIndexOf('.')
    fileName = fileName.substring(0, lastIndex)
    // 根据目录设置层级关系
    const keyList = fileName.split('/')
    const moduleName = keyList.shift()
    const objKey = keyList.join('.')
    if (moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {})
        set(obj[moduleName], objKey, langFileModule)
      } else {
        set(obj, moduleName, langFileModule || {})
      }
    }
  })
  return obj
}
