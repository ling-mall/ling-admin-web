<template>
  <aside> <BasicMenu :data="menu" /> </aside>
</template>
<script setup lang="ts">
  import { Menu } from '@/router/types'

  defineOptions({ name: 'DefaultLayoutSider' })

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
</script>

<style scoped lang="scss"></style>
