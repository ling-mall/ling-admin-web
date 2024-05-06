import App from './App.vue'

import 'virtual:uno.css'
import '@/design/index.scss'
import { initAppConfigStore } from './logics/initAppConfig'
import { setupRouter } from './router'
import { setupPrimeVue } from './primevue'

import 'virtual:svg-icons-register'

import '@unocss/reset/tailwind-compat.css'
import 'primevue/resources/themes/lara-light-green/theme.css'
import 'vxe-table/lib/style.css'
import { setupI18n } from './locales/setupI18n'

const app = createApp(App)

// 配置 store，如果不需要 Vue devtools 支持、SSR 支持则不需要配置
setupStore(app)

// 初始化内部系统配置
initAppConfigStore()

// Configure routing
// 配置路由
setupRouter(app)

setupI18n(app)

// primevue
setupPrimeVue(app)

app.mount('#app', true)
