<template>
  <div class="divide-y children:( border-0 border-solid border-gray-200) w-full relative">
    <div class="p-10">
      <div class="text-2xl font-bold text-gray-600 h-20">字典</div>
      <Dict :data="groupConfig.dictData" />
    </div>
    <div class="flex flex-col p-10">
      <div class="text-2xl font-bold text-gray-600 h-20">自定义表单</div>
      <GlobalProperties :dictData="groupConfig.dictData" :formItemArr="groupConfig.formItemArr" />
    </div>
    <div class="p-10">
      <div class="text-2xl font-bold text-gray-600 h-20">模板</div>
      <GenerateTemplate />
    </div>
    <Toolbar class="sticky bottom-0 left-0 right-0 bg-white z-101">
      <template #end>
        <el-button type="primary"> 保存</el-button>
      </template>
    </Toolbar>
  </div>
</template>
<script lang="ts" setup>
  defineOptions({ name: 'GenerateConfigView' })

  import GlobalProperties from './components/GlobalProperties.vue'
  import Dict from './components/Dict.vue'
  import GenerateTemplate from './template/index.vue'

  import Toolbar from 'primevue/toolbar'

  // const route = useRoute()
  // const groupId = ref(route.query.groupId)

  const groupConfig = ref({
    dictData: [],
    formItemArr: [],
    Entity: []
  })

  const beforeunloadFn = (e) => {
    // 这个事件只有在鼠标真正和浏览器有了交互，再刷新或者关闭时才会触发, 浏览器事件会弹框确认用户是否要离开页面
    if (e) {
      e.preventDefault()
      e.returnValue = '关闭提示'
    }
    return '关闭提示'
  }
  onMounted(() => {
    window.addEventListener('beforeunload', (e) => beforeunloadFn(e))
  })
  onUnmounted(() => {
    window.removeEventListener('beforeunload', (e) => beforeunloadFn(e))
  })

  onBeforeRouteLeave(() => {
    const answer = window.confirm('还未保存，是否离开？')
    if (!answer) return false
  })
</script>
<style lang="scss" scoped></style>
