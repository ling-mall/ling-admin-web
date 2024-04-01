import { PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'

import { configHtmlPlugin } from './html'
import UnoCSS from 'unocss/vite'
import { configComponentsPlugin } from './components'
import { autoImportPlugin } from './autoImport'
import VueMacros from 'unplugin-vue-macros/vite'
import svgLoader from 'vite-svg-loader'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  /** 插件数组 */
  const vitePlugins: (PluginOption | PluginOption[])[] = []

  // API 自动引入
  vitePlugins.push(autoImportPlugin())

  // 自动按需引入组件
  vitePlugins.push(configComponentsPlugin())

  // 添加 UnoCSS
  vitePlugins.push(UnoCSS())

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  vitePlugins.push(svgLoader())

  vitePlugins.push(
    VueMacros({
      plugins: {
        vue: vue()
        // vueJsx: VueJsx(), // 如果需要
      }
    })
  )

  return vitePlugins
}
