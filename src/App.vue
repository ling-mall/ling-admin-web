<template>
  <div class="w-full h-full">
    <el-date-picker v-model="value1" type="Date" placeholder="Pick a day" />
  </div>
</template>

<script setup lang="ts">
  const value1 = ref('')
</script>

<style scoped></style>
