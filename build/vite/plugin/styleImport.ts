import { createStyleImportPlugin } from 'vite-plugin-style-import'
export function autoImportStylePlugin() {
  return createStyleImportPlugin({
    resolves: []
  })
}
