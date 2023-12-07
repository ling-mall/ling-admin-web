import { PluginOption } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export function configComponentsPlugin() {
  const componentsPlugin: PluginOption = Components({
    dts: 'types/components.d.ts',
    resolvers: [ElementPlusResolver()]
  })

  return componentsPlugin
}
