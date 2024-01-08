import { ProjectConfig } from '#/config'
import { ThemeModeEnum } from '@/enums/appEnum'
import setting from '@/settings/projectSetting'
import { Ref } from 'vue'

interface AppState {
  theme?: ThemeModeEnum | string
  projectConfig: ProjectConfig
}

export const useAppStore = defineStore({
  id: 'app',
  persist: {
    key: 'pinia-store-app',
    storage: localStorage
  },
  state: (): AppState => ({
    theme: undefined,
    projectConfig: setting
  }),
  getters: {
    /**
     * 获取主题
     * @returns 主题
     */
    getTheme(): ThemeModeEnum | string {
      return this.theme || setting.defaultTheme
    },
    /** 获取当前宽度是否属于移动端 */
    getIsMobile(): Ref<boolean> {
      return useBreakpoints(screenObj).smaller(sizeEnum.LG)
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig
    }
  },
  actions: {
    /**设置主题 */
    setTheme(mode: ThemeModeEnum | string): void {
      this.theme = mode
      const isDark = useDark()
      switch (mode) {
        case ThemeModeEnum.SYSTEM:
          const systemIsDark = usePreferredDark()
          systemIsDark.value ? (isDark.value = true) : (isDark.value = false)
          break
        case ThemeModeEnum.DARK:
          isDark.value = true
          break
        case ThemeModeEnum.LIGHT:
          isDark.value = false
          break
      }
    },
    setMenuWidth(width: number): void {
      this.projectConfig.menuSetting.menuWidth = width
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
