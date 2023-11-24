import { defineConfig } from 'vite'
import { loadEnv } from 'vite'
// ↓加载 node 的 path 模块
import { resolve } from 'path'

import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugin'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 当前 Node.js 进程执行时的工作目录
  const root = process.cwd()

  /**获取当前环境下的环境变量 */
  const env = loadEnv(mode, root)
  /**判断是否是生产环境，生产环境下 command 为 build，在开发环境下 command 的值为 serve*/
  const isBuild = command === 'build'

  // loadEnv 读取的布尔类型是字符串。此函数可以转换为布尔类型
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  return {
    // 在生产中服务时的基本公共路径。
    base: VITE_PUBLIC_PATH,
    // 项目根目录（index.html 文件所在的位置）
    root,
    resolve: {
      // 路径别名
      alias: {
        '@/': `${resolve(__dirname, 'src')}/`,
        '#/': `${resolve(__dirname, 'types')}/`
      }
    },
    server: {
      // 指定服务器应该监听哪个 IP 地址。如果将此设置为 0.0.0.0 将监听所有地址，包括局域网和公网地址。
      host: true,
      port: VITE_PORT,
      // 从.env 文件获取的代理列表
      proxy: createProxy(VITE_PROXY)
    },
    // 插件
    plugins: createVitePlugins(viteEnv, isBuild),
    // 构建相关
    build: {
      // 设置最终构建的浏览器兼容目标。设置为 es 的版本
      target: 'es2015',
      // 指定输出路径（相对于项目根目录)
      outDir: 'dist',
      terserOptions: {
        // 默认{}-通过 false 以完全跳过压缩。传递一个对象以指定自定义压缩选项
        compress: {
          // 默认值：false）- 通过 true 以防止 Infinity 被压缩为 1/0，这可能会导致 Chrome 出现性能问题。
          keep_infinity: true,
          // 在生产环境中删除 console
          drop_console: VITE_DROP_CONSOLE
        }
      },
      // chunk 大小警告的限制（以 kbs 为单位）。
      chunkSizeWarningLimit: 2000
    },
    css: {}
  }
})
