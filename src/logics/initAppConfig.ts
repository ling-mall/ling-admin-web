import { hexToRgb } from '@/utils/index'

export function initAppConfigStore() {
  const appStore = useAppStoreWithOut()

  // 设置项目主题
  appStore.setTheme(appStore.getTheme)

  // 主题跟随系统，系统主题改变，应用主题也改变
  watch(usePreferredDark(), () => {
    if (appStore.theme === ThemeEnum.SYSTEM) {
      appStore.setTheme(ThemeEnum.SYSTEM)
    }
  })

  // 设置项目的主题颜色css变量
  const themeColors = appStore.getProjectConfig.theme.colors
  const colorKeys = Object.keys(themeColors) as (keyof typeof themeColors)[]
  for (const key of colorKeys) {
    const color = themeColors[key]
    const rgb = hexToRgb(color)!
    const varName = ThemeColorsVarName[key.toUpperCase()]

    document.documentElement.style.setProperty(varName, color)
    document.documentElement.style.setProperty(
      `${varName}${ThemeColorsVarSuffix.R}`,
      rgb.r.toString()
    )
    document.documentElement.style.setProperty(
      `${varName}${ThemeColorsVarSuffix.G}`,
      rgb.g.toString()
    )
    document.documentElement.style.setProperty(
      `${varName}${ThemeColorsVarSuffix.B}`,
      rgb.b.toString()
    )
  }
}
