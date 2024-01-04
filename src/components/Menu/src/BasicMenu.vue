<template>
  <el-menu v-bind="$attrs">
    <BasicMenuItem :data="props.data" />
  </el-menu>
</template>
<script lang="ts" setup>
  import { Menu } from '@/router/types'
  import BasicMenuItem from './components/BasicMenuItem.vue'

  defineOptions({ name: 'BasicMenu' })
  const props = defineProps({
    data: {
      type: Array as PropType<Menu[]>,
      default: () => []
    }
  })
</script>
<style lang="scss" scoped></style>
