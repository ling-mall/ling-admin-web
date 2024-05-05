import { PluginOption } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VxeTableResolver from '@vxecli/import-unplugin-vue-components'

export function configComponentsPlugin() {
  const componentsPlugin: PluginOption = Components({
    dts: 'types/components.d.ts',
    dirs: ['src/components'],
    resolvers: [ElementPlusResolver({ importStyle: 'sass' }), VxeTableResolver()]
  })

  return componentsPlugin
}
