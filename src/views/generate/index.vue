<template>
  <div class="w-9/10 m-a mt-10">
    <!-- <DictView :data="dict" />
    <EntityView :dict-data="dict" /> -->
    <!--    <GlobalProperties :dict-data="dict" />-->
    <VelocityCodeEdit />
  </div>
</template>
<script lang="ts" setup>
  defineOptions({ name: 'GenerateView' })
  // import EntityView from '@/views/generate/Entity.vue'
  // import DictView from '@/views/generate/Dict.vue'
  // import { Dict } from './types'
  // import GlobalProperties from '@/views/generate/GlobalProperties.vue'
  import VelocityCodeEdit from '@/views/generate/VelocityCodeEdit.vue'

  // const dict = ref<Dict[]>([
  //   { dictName: 'MysqlType', dictValue: ['bigint', 'varchar'], inputValue: '' }
  // ])
</script>
<style lang="scss" scoped></style>
