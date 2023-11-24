import { localeSetting } from '@/settings/localeSetting'
import { App } from 'vue'
import { createI18n } from 'vue-i18n'

export let i18n: ReturnType<typeof createI18n>

const { fallback, availableLocales } = localeSetting

/** 初始化国际化资源 */
export async function setupI18n(app: App) {
  const localeStore = useLocaleStoreWithOut()
  const locale = localeStore.getLocale
  const defaultLocal = await import(`./lang/${locale}.ts`)
  const message = defaultLocal.default?.message ?? {}

  i18n = createI18n({
    // 当前语言
    locale: locale,
    // 资源文件
    messages: {
      [locale]: message
    },
    // 默认语言
    fallbackLocale: fallback,
    // 允许的语言列表
    availableLocales: availableLocales,
    // vue3 必须使用 false 以获得对vue3的新特性的支持和优化
    legacy: false,
    // 全局作用域继承语言环境
    sync: true,
    // 禁止翻译警告信息的输出
    silentTranslationWarn: true,
    // 禁止缺失翻译的警告信息的输出
    missingWarn: false,
    // 禁止回退翻译的警告信息的输出
    silentFallbackWarn: true
  })
  app.use(i18n)
}
