interface UserState {
  token?: string
}

export const useUserStore = defineStore({
  id: 'user',
  persist: {
    key: 'pinia-store-user',
    storage: localStorage
  },
  state: (): UserState => ({
    token: undefined
  }),
  getters: {
    getToken(): string {
      return this.token as string
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
