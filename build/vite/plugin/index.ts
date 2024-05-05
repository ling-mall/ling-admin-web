import { PluginOption } from 'vite'

import vue from '@vitejs/plugin-vue'

import { configHtmlPlugin } from './html'
import UnoCSS from 'unocss/vite'
import { configComponentsPlugin } from './components'
import { autoImportPlugin } from './autoImport'
import { configSvgIconsPlugin } from './svgSprite'
import VueMacros from 'unplugin-vue-macros/vite'
import { autoImportStylePlugin } from './styleImport'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  /** 插件数组 */
  const vitePlugins: (PluginOption | PluginOption[])[] = []

  // API 自动引入
  vitePlugins.push(autoImportPlugin())

  // 自动按需引入组件
  vitePlugins.push(configComponentsPlugin())

  // 自动引入样式
  vitePlugins.push(autoImportStylePlugin())

  // 添加 UnoCSS
  vitePlugins.push(UnoCSS())

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

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
