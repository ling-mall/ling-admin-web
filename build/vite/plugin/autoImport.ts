import AutoImport from 'unplugin-auto-import/vite'
import { PluginOption } from 'vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export function autoImportPlugin() {
  const autoImportPlugin: PluginOption = AutoImport({
    resolvers: [ElementPlusResolver()],
    // 声明文件生成位置和文件名称
    dts: 'types/auto-imports.d.ts',
    // 目标文件
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/ // .md
    ],
    dirs: ['src/store/**/**.ts', 'src/enums/**.ts'],
    imports: [
      'vue',
      'pinia',
      'vue-i18n',
      '@vueuse/core',
      'vue-router',
      {
        axios: [
          // default imports
          ['default', 'axios'] // import { default as axios } from 'axios',
        ]
      }
    ],
    vueTemplate: true,
    // Generate corresponding .eslintrc-auto-import.json file.
    // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
    eslintrc: {
      enabled: false, // Default `false`
      filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    }
  })

  return autoImportPlugin
}
