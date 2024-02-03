<template>
  <ElBreadcrumb separator="/">
    <ElBreadcrumbItem v-for="item in levelList" :key="item.path" :to="item.path">
      {{ t(item.meta.title as string) }}
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>
<script lang="ts" setup>
  import { RouteLocationMatched } from 'vue-router'
  import { useI18n } from '@/hooks/useI18n'

  const { t } = useI18n()

  defineOptions({ name: 'DefaultLayoutBreadcrumb' })

  const route = useRoute()

  const levelList = ref<Array<RouteLocationMatched>>([])
  // 获取面包屑导航
  const getBreadcrumb = () => {
    // 对匹配的路由进行过滤 过滤掉没有 title 属性的路由，没有 title 就无法作为面包屑导航
    let matched = route.matched.filter((item) => item.meta && item.meta.title)

    levelList.value = matched.filter(
      (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
    )
    console.log(levelList.value)
  }

  onMounted(() => {
    getBreadcrumb()
  })
</script>
<style lang="scss" scoped></style>
