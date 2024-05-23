interface GenerateState {
  /**
   * 是否更新了配置
   */
  configIsUpdated?: boolean
}

export const useGenerateStore = defineStore({
  id: 'generate',
  persist: {
    key: 'pinia-store-generate',
    storage: localStorage
  },
  state: (): GenerateState => ({
    configIsUpdated: undefined
  }),
  getters: {
    getConfigIsUpdated(): boolean {
      return this.configIsUpdated || false
    }
  },
  actions: {
    setConfigIsUpdated(configIsUpdated: boolean) {
      this.configIsUpdated = configIsUpdated
    }
  }
})

export function useGenerateStoreWithOut() {
  return useGenerateStore(store)
}
