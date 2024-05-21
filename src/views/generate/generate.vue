<template>
  <div v-if="groupId" class="divide-y children:(p-10 border-0 border-solid border-gray-200)">
    <div class="flex flex-col">
      <div class="text-2xl font-bold text-gray-600 h-20">实体</div>
      <!--      <Entity />-->
      {{ groupId }}
    </div>
  </div>
</template>
<script lang="ts" setup>
  defineOptions({ name: 'GenerateIndexView' })

  const route = useRoute()
  const groupId = ref(route.query.groupId)
</script>
<style lang="scss" scoped></style>
