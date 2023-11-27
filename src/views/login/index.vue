<template>
  <div class="w-full h-full relative"> <AButton @click="logoutApi">注销</AButton> </div>
</template>
<script></script>
<script lang="ts" setup>
  import { doLoginByTicket, getSsoAuthUrl, isLogin, logout } from '@/api/sso'
  import { useRouteQuery } from '@vueuse/router'

  defineOptions({ name: 'LoginPage' })

  const backUrl = useRouteQuery('back')

  const ticket = useRouteQuery('ticket')

  const loginByTicket = () => {
    doLoginByTicket(ticket.value as string).then((res) => {
      if (res.code !== 200) {
        toSso()
      }
    })
  }

  const toSso = () => {
    getSsoAuthUrl({
      clientLoginUrl: window.location.origin + window.location.pathname,
      backUrl: backUrl.value ? (backUrl.value as string) : '/'
    }).then((res) => {
      window.location.href = res
    })
  }

  const validate = () => {
    // 判断是否已登录
    isLogin().then((res) => {
      if (!res) {
        if (!!ticket.value) {
          loginByTicket()
        } else {
          toSso()
        }
      }
    })
  }

  onMounted(() => {
    validate()
  })

  const logoutApi = () => {
    logout()
  }
</script>
<style lang="scss" scoped></style>
