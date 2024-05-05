import { createStyleImportPlugin } from 'vite-plugin-style-import'
import VxeTableResolve from '@vxecli/import-vite-plugin-style-import'
export function autoImportStylePlugin() {
  return createStyleImportPlugin({
    resolves: [VxeTableResolve()]
  })
}
