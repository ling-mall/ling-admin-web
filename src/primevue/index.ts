import { App } from 'vue'
import PrimeVue from 'primevue/config'

/**
 * 获取所有预设
 */
async function loadModules() {
  const modules = {}
  const files = import.meta.glob('./presets/*.ts')

  for (const path in files) {
    const m = (await files[path]()) as any
    const name = path.slice(0, -3).split('/').pop() as string
    modules[name] = m.default
  }
  return modules
}

const primevueConfig = {
  unstyled: false,
  ripple: true,
  pt: await loadModules()
}

export function setupPrimeVue(app: App<Element>) {
  app.use(PrimeVue, primevueConfig)
}
