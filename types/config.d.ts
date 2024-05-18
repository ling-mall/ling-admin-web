import { ThemeModeEnum } from '@/enums/appEnum'

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

/**
 * 主题
 */
interface Theme {
  /**
   * 颜色
   */
  colors: {
    /**
     * 主要颜色，通常用于突出重点或主要元素
     */
    primary: string
    /**
     * 次要颜色，用于补充主要颜色或提供对比效果
     */
    secondary: string
    /**
     * 成功颜色，表示操作或状态成功
     */
    success: string
    /**
     * 危险颜色，表示警告或错误状态
     */
    danger: string
    /**
     * 警告颜色，用于表示潜在的问题或需要注意的情况
     */
    warning: string
    /**
     * 信息颜色，用于提供额外的信息或提示
     */
    info: string
  }
}

/** 项目配置 */
export interface ProjectConfig {
  /** 默认主题*/
  defaultTheme: ThemeModeEnum
  /** 主题 */
  theme: Theme
  /** 菜单设置 */
  menuSetting: MenuSetting
}

/**
 * 菜单设置
 */
export interface MenuSetting {
  /**
   * 菜单背景颜色
   */
  bgColor: string
  /**
   * 菜单文字颜色
   */
  textColor: string
  /**
   * 激活状态的菜单文字颜色
   */
  activeTextColor: string
  /**
   * 是否固定菜单，即是否在滚动页面时将菜单固定在顶部
   */
  fixed: boolean
  /**
   * 是否隐藏菜单栏
   */
  siderHidden: boolean
  /**
   * 是否显示菜单栏
   */
  show: boolean
  /**
   * 菜单栏宽度
   */
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
