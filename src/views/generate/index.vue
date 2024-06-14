<template>
  <div
    class="w-full h-full flex flex-row divide-x children:(border-0 border-solid border-gray-200)"
    id="generate"
  >
    <div
      class="min-w-64 h-full w-auto hidden lg:flex fixed border-0 border-r border-solid border-gray-200"
    >
      <ScrollPanel style="width: 100%; height: 100%">
        <DataTree :nodes="nodes" @select="handleSelect" />
      </ScrollPanel>
    </div>
    <div
      v-if="!groupId"
      class="flex flex-grow justify-center items-center h-full w-full text-3xl text-gray-600 pl-64"
    >
      <div>请先选择分组</div>
    </div>
    <div v-if="groupId" class="flex-grow flex flex-col pl-64">
      <TabMenu :model="items" v-model:activeIndex="active" class="fixed w-full bg-white z-10">
        <template #item="{ item, props }">
          <router-link v-if="item.route" :to="{ path: item.route, query: { groupId } }">
            <div class="flex flex-row px-6 py-4 gap-2 items-center">
              <div :class="[item.icon, 'text-2xl text-gray-500']"></div>
              <span v-bind="props.label">{{ item.label }}</span>
            </div>
          </router-link>
        </template>
      </TabMenu>
      <div class="pt-14">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import DataTree from './components/MenuTree.vue'
  import ScrollPanel from 'primevue/scrollpanel'
  import TabMenu from 'primevue/tabmenu'

  import { copyProps } from '@/utils'
  import { getGenerateTemplateGroupTree } from '@/api/generate'
  import { useGenerateStoreWithOut } from '@/store/modules/generate'

  defineOptions({ name: 'GenerateView' })

  const route = useRoute()
  const groupId = ref(route.query.groupId)

  const active = ref()
  const items = ref([
    { label: '生成', icon: 'i-system-uicons-lightning', route: '/generate/index' },
    {
      label: '配置',
      icon: 'i-material-symbols-settings-outline-rounded',
      route: '/generate/cofig'
    },
    { label: '模板', icon: 'i-carbon-prompt-template', route: '/generate/templates' }
  ])
  onMounted(() => {
    // 查找当前路由在第几个下标
    const index = items.value.findIndex((item) => item.route === route.path)
    if (index !== -1) {
      active.value = index
    }
  })

  const generateStore = useGenerateStoreWithOut()
  watch(
    () => active.value,
    (newVal, oldVal) => {
      if (newVal === 0 && generateStore.getConfigIsUpdated) {
        nextTick(() => {
          active.value = oldVal
        })
      }
    }
  )

  const nodes = ref<any[]>([])
  const currentNode = ref()

  const groupTreeData = [
    {
      id: 2,
      parentId: 0,
      name: '后端',
      groupName: '后端',
      parentList: '0',
      orderNo: 0,
      type: 0,
      userId: 1,
      isDeleted: 0,
      createBy: 1,
      createTime: '2024-04-15 17:54:35',
      updateBy: 0,
      updateTime: '2024-04-15 17:54:35',
      remark: '',
      children: [
        {
          id: 3,
          parentId: 2,
          name: 'java',
          groupName: 'java',
          parentList: '0,2',
          orderNo: 0,
          type: 0,
          userId: 1,
          isDeleted: 0,
          createBy: 1,
          createTime: '2024-05-14 13:48:37',
          updateBy: 0,
          updateTime: '2024-05-14 13:49:08',
          remark: '',
          children: [
            {
              id: 4,
              parentId: 3,
              name: '单实体',
              groupName: '单实体',
              parentList: '0,2,3',
              orderNo: 0,
              type: 0,
              userId: 1,
              isDeleted: 0,
              createBy: 1,
              createTime: '2024-05-14 13:49:53',
              updateBy: 0,
              updateTime: '2024-05-14 13:51:31',
              remark: ''
            }
          ]
        }
      ]
    }
  ]

  onMounted(() => {
    let a = copyProps(
      groupTreeData,
      {
        id: 'key',
        name: 'label'
      },
      true,
      true
    )

    getGenerateTemplateGroupTree().then((res) => {
      copyProps(
        res,
        {
          id: 'key',
          name: 'label'
        },
        true,
        true
      )
    })

    nodes.value = a
  })

  const router = useRouter()
  const handleSelect = (node: any) => {
    currentNode.value = node
    router.push({
      path: '/generate/index',
      query: {
        groupId: node.id
      }
    })
    groupId.value = node.id
  }
</script>
<style lang="scss">
  .p-tree {
    padding: 0;
  }
</style>
