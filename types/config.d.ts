import { ThemeEnum } from '@/enums/appEnum'

/**全局环境配置 */
export interface GlobEnvConfig {
  /** 网站标题 */
  VITE_GLOB_APP_TITLE: string
  /** API 接口地址 */
  VITE_GLOB_API_URL: string
  /**接口地址前缀，有些系统所有接口地址都有前缀，可以在这里统一加，方便切换 */
  VITE_GLOB_API_URL_PREFIX?: string
  /**简称，用于配置文件名字 不要出现空格、数字开头等特殊字符 */
  VITE_GLOB_APP_SHORT_NAME: string
}

/** 全局配置 */
export interface GlobConfig {
  /** 网站标题 */
  title: string
  /** API 接口地址 */
  apiUrl: string
  /**接口地址前缀，有些系统所有接口地址都有前缀，可以在这里统一加，方便切换 */
  urlPrefix?: string
  /**简称，用于配置文件名字 不要出现空格、数字开头等特殊字符 */
  shortName: string
}

/** 项目配置 */
export interface ProjectConfig {
  /** 默认主题*/
  defaultTheme: ThemeEnum
  /** 菜单设置 */
  menuSetting: MenuSetting
}

export interface MenuSetting {
  bgColor: string
  fixed: boolean
  siderHidden: boolean
  show: boolean
  menuWidth: number
}

/** 语言类型 */
export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko'

export interface LocaleSetting {
  /** 是否显示选择器 */
  showPicker: boolean
  /** 当前语言 */
  locale: LocaleType
  /** 默认语言 */
  fallback: LocaleType
  /** 允许的语言列表 */
  availableLocales: LocaleType[]
}
