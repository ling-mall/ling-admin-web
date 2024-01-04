<template>
  <header class="h-48px flex flex-row justify-between" border="0 b 1px solid gray-2">
    <div class="flex flex-row items-center">
      <div class="h-full flex items-center px-2 cursor-pointer hover:bg-gray-1">
        <div class="i-material-symbols:menu-open text-2xl"></div>
      </div>
      <div>
        <DefaultLayoutBreadcrumb />
      </div>
    </div>
    <div>右</div>
  </header>
</template>
<script setup lang="ts">
  import DefaultLayoutBreadcrumb from './Breadcrumb.vue'

  defineOptions({ name: 'DefaultLayoutHeader' })
</script>

<style scoped lang="scss"></style>
