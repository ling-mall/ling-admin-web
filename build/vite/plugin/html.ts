/**
 * 一个为 index.html 提供 minify 和基于 EJS 模板功能的 Vite 插件。
 * 项目地址：https://github.com/anncwb/vite-plugin-html
 * minify：压缩 index.html 代码
 * EJS：给 index.html 提供访问变量的能力
 */
import type { PluginOption } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import pkg from '../../../package.json'
import { GLOB_CONFIG_FILE_NAME } from '../../configConstant'

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env

  /**资源公共路径 */
  const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`

  /** 获取动态配置文件的地址 */
  const getAppConfigSrc = () => {
    return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`
  }

  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    // 如果是开发环境则不压缩 index.html 的代码
    minify: isBuild,
    inject: {
      // 将数据注入 ejs 模板
      data: {
        title: VITE_GLOB_APP_TITLE
      },
      // 如果是生产环境则嵌入生成的 app.config.js 文件
      tags: isBuild
        ? [
            {
              tag: 'script',
              attrs: {
                src: getAppConfigSrc()
              }
            }
          ]
        : []
    }
  })
  return htmlPlugin
}
