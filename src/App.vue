<template>
  <div class="w-full h-full">
    <DarkToggle v-slot="{ toggle }">
      <el-button @click="toggle" type="primary">aaa</el-button>
    </DarkToggle>
    {{ color }}
    <el-color-picker v-model="color" />
  </div>
</template>

<script setup lang="ts">
  import { useElementPlusTheme } from './hooks/useElementPlusTheme'

  const { color } = useElementPlusTheme()
</script>

<style scoped></style>
