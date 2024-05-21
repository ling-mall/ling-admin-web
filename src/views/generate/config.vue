<template>
  <div class="divide-y children:(p-10 border-0 border-solid border-gray-200)">
    <div>
      <div class="text-2xl font-bold text-gray-600 h-20">字典</div>
      <Dict :data="groupConfig.dictData" />
    </div>
    <div class="flex flex-col">
      <div class="text-2xl font-bold text-gray-600 h-20">自定义表单</div>
      <GlobalProperties :dictData="groupConfig.dictData" :formItemArr="groupConfig.formItemArr" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  defineOptions({ name: 'GenerateConfigView' })

  import GlobalProperties from './components/GlobalProperties.vue'
  import Dict from './components/Dict.vue'

  const groupConfig = ref({
    dictData: [],
    formItemArr: [],
    Entity: []
  })
</script>
<style lang="scss" scoped></style>
