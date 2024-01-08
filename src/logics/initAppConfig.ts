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

  const themeColors = appStore.getProjectConfig.theme.colors

  document.documentElement.style.setProperty(ThemeColorsVarName.PRIMARY, themeColors.primary)
  document.documentElement.style.setProperty(ThemeColorsVarName.SECONDARY, themeColors.secondary)
  document.documentElement.style.setProperty(ThemeColorsVarName.SUCCESS, themeColors.success)
  document.documentElement.style.setProperty(ThemeColorsVarName.DANGER, themeColors.danger)
  document.documentElement.style.setProperty(ThemeColorsVarName.WARNING, themeColors.warning)
  document.documentElement.style.setProperty(ThemeColorsVarName.INFO, themeColors.info)
}
