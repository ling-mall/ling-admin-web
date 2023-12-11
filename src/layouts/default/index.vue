<template>
  <div class="flex flex-row">
    <DefaultLayoutSider />
    <DefaultLayoutHeader />
  </div>
</template>
<script setup lang="ts">
  import DefaultLayoutHeader from './header/index.vue'
  import DefaultLayoutSider from './sider/LayoutSider.vue'

  defineOptions({ name: 'DefaultLayout' })
</script>

<style scoped lang="scss"></style>
