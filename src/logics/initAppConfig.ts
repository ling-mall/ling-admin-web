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
}
