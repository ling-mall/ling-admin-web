<template>
  <div class="m-a min-h-4xl flex relative">
    <div class="flex flex-row flex-1" id="template">
      <el-affix :offset="50">
        <div
          class="min-w-64 h-full w-auto hidden lg:flex border-0 border-r border-t border-solid border-gray-200"
        >
          <ScrollPanel style="width: 100%" class="h-2xl">
            <DataTree :nodes="nodes" @select="handleSelect" />
          </ScrollPanel>
        </div>
      </el-affix>
      <div class="flex-grow border border-solid border-gray-300">
        <VelocityCodeEdit :code="code" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { copyProps } from '@/utils'
  import ScrollPanel from 'primevue/scrollpanel'
  import DataTree from '../components/MenuTree.vue'
  import VelocityCodeEdit from '@/views/generate/template/VelocityCodeEdit.vue'
  import { getGenerateTemplateGroupTree } from '@/api/generate'

  defineOptions({ name: 'GenerateTemplateView' })

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
  const nodes = ref<any[]>([])
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
  const handleSelect = (_node: any) => {}

  const code = ref('')
</script>
<style lang="scss" scoped>
  .p-tree {
    padding: 0 10px 0 0;
  }
</style>
