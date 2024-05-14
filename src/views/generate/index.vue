<template>
  <div
    class="w-full h-full flex flex-row divide-x children:(border-0 border-solid border-gray-200)"
  >
    <div class="min-w-64 h-full w-auto hidden lg:flex">
      <Tree
        class="w-full"
        v-model:selectionKeys="selectedKey"
        :value="nodes"
        selectionMode="single"
        @node-select="select"
        @node-unselect="select"
        v-model:expandedKeys="expandedKeys"
      />
    </div>
    <div class="flex-grow"> 选择{{ selectedKey }}</div>
  </div>
</template>
<script lang="ts" setup>
  import Tree from 'primevue/tree'
  import { copyProps } from '@/utils/index'

  defineOptions({ name: 'GenerateView' })

  const selectedKey = ref()
  const nodes = ref<any[]>([])
  const expandedKeys = ref({})
  const select = (e) => {
    if (e.children && e.children.length > 0) {
      expandNode(e)
    }
  }
  const expandNode = (node) => {
    if (node.children && node.children.length) {
      if (expandedKeys.value[node.key]) {
        delete expandedKeys.value[node.key]
      } else {
        expandedKeys.value[node.key] = true
      }
    }
  }

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

    nodes.value = a
  })
</script>
<style lang="scss">
  .p-tree {
    padding: 0;
  }
</style>
