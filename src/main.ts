import App from './App.vue'

import 'virtual:uno.css'
import '@/design/index.scss'
import { initAppConfigStore } from './logics/initAppConfig'
import { setupRouter } from './router'
import 'element-plus/dist/index.css'
import 'vxe-table/lib/style.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import { setupI18n } from './locales/setupI18n'
import VXETable from 'vxe-table'
import { setupPrimeVue } from '@/primevue'

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

app.use(VXETable)

app.mount('#app', true)
