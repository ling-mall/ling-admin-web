<template>
  <!-- <RouterView /> -->
  <SvgIcon :name="svgName" :size="100" class="color-blue" />
  {{ svgName }}
  <ElButton type="primary" @click="svgName = 'AA'">测试按钮</ElButton>
</template>

<script setup lang="ts">
  import SvgIcon from '@/components/Icon/SvgIcon.vue'
  import { ElButton } from 'element-plus'

  const svgName = ref('dark')
</script>

<style scoped></style>
