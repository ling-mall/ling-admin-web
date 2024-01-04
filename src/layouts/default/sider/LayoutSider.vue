<template>
  <aside class="layout-sider h-screen" :style="getLayoutSiderStyle">
    <AppLogo />
    <el-scrollbar style="height: calc(100vh - 48px)">
      <BasicMenu
        :data="menu"
        :background-color="getLayoutSiderStyle.backgroundColor"
        :text-color="getLayoutSiderStyle.color"
        class="border-r-0! text-base font-medium"
      />
    </el-scrollbar>
  </aside>
</template>
<script setup lang="ts">
  import { Menu } from '@/router/types'

  defineOptions({ name: 'DefaultLayoutSider' })

  const appState = useAppStoreWithOut()

  const menu = ref<Menu[]>([
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        title: 'dashboard',
        icon: 'dashboard'
      }
    },
    {
      path: '/form',
      name: 'form',
      meta: {
        title: 'form',
        icon: 'form'
      },
      children: [
        {
          path: '/form/basic',
          name: 'basic',
          meta: {
            title: 'basic',
            icon: 'form'
          }
        },
        {
          path: '/form/advance',
          name: 'advance',
          meta: {
            title: 'advance',
            icon: 'form'
          }
        }
      ]
    }
  ])

  const getLayoutSiderStyle = computed(() => {
    return {
      width: appState.projectConfig.menuSetting.menuWidth + 'px',
      backgroundColor: appState.projectConfig.menuSetting.bgColor,
      color: appState.projectConfig.menuSetting.textColor
    }
  })
</script>
<style scoped lang="scss"></style>
