import { ProjectConfig } from '#/config'
import { ThemeEnum } from '@/enums/appEnum'
import setting from '@/settings/projectSetting'
import { Ref } from 'vue'

interface AppState {
  theme?: ThemeEnum | string
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
    getTheme(): ThemeEnum | string {
      return this.theme || setting.defaultTheme
    },
    /** 获取当前宽度是否属于移动端 */
    getIsMobile(): Ref<boolean> {
      return useBreakpoints(screenObj).smaller(sizeEnum.LG)
    },
    getProjectConfig(): ProjectConfig | null {
      return this.projectConfig
    }
  },
  actions: {
    /**设置主题 */
    setTheme(mode: ThemeEnum | string): void {
      this.theme = mode
      const isDark = useDark()
      switch (mode) {
        case ThemeEnum.SYSTEM:
          const systemIsDark = usePreferredDark()
          systemIsDark.value ? (isDark.value = true) : (isDark.value = false)
          break
        case ThemeEnum.DARK:
          isDark.value = true
          break
        case ThemeEnum.LIGHT:
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
