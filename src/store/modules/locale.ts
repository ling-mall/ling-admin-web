import { LocaleSetting, LocaleType } from '#/config'
import { localeSetting } from '@/settings/localeSetting'

interface LocaleState {
  localInfo: LocaleSetting
}

export const useLocaleStore = defineStore({
  id: 'local',
  persist: {
    key: 'pinia-store-local',
    storage: localStorage
  },

  state: (): LocaleState => ({
    localInfo: localeSetting
  }),
  getters: {
    getLocale(state): LocaleType {
      return state.localInfo?.locale ?? localeSetting.fallback
    }
  },
  actions: {
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info }
    }
  }
})

export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
