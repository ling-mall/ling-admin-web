<template>
  <template v-for="item in props.data">
    <ElSubMenu
      v-if="item.children && item.children.length > 0"
      :key="item.path"
      :title="item.name"
      :index="item.path"
    >
      <template #title>
        <span>{{ item.name }}</span>
      </template>
      <BasicMenuItem :data="item.children" />
    </ElSubMenu>
    <ElMenuItem v-else :key="item.path + ''" :index="item.path" :disabled="item.disabled">
      <span>{{ item.name }}</span>
    </ElMenuItem>
  </template>
</template>
<script lang="ts" setup>
  import { Menu } from '@/router/types'

  defineOptions({ name: 'BasicMenuItem' })

  const props = defineProps({
    data: {
      type: Array as PropType<Menu[]>,
      default: () => []
    }
  })
</script>
<style lang="scss" scoped></style>
