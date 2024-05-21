<template>
  <ElDropdown trigger="click" class="w-full h-full flex items-center justify-center">
    <div class="px-2">
      <div class="i-lucide:languages text-xl"></div>
    </div>

    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="item in localeList"
          :key="item.event"
          @click="changeLocale(item.event)"
        >
          {{ item.text }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
<script lang="ts" setup>
  import { localeList } from '@/locales/index'
  import { useLocale } from '@/locales/useLocale'

  const { changeLocale } = useLocale()
</script>
<style lang="scss" scoped></style>
