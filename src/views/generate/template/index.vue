<template>
  <div class="w-9/10 m-a mt-10">
    <div class="flex flex-row">
      <div class="w-80">
        <Tree
          class="w-full"
          v-model:selectionKeys="selectedKey"
          :value="nodes"
          selectionMode="single"
          @node-select="select"
          v-model:expandedKeys="expandedKeys"
        />{{ expandedKeys }}
      </div>
      <div class="flex-grow border border-solid border-gray-300">
        <VelocityCodeEdit :code="code" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  defineOptions({ name: 'GenerateView' })
  import Tree from 'primevue/tree'
  import VelocityCodeEdit from '@/views/generate/template/VelocityCodeEdit.vue'

  const selectedKey = ref()
  const nodes = ref([
    {
      key: '0',
      label: 'Documents',
      data: 'Documents Folder',
      icon: 'pi pi-fw pi-inbox',
      children: [
        {
          key: '0-0',
          label: 'Work',
          data: 'Work Folder',
          icon: 'pi pi-fw pi-cog',
          children: [
            {
              key: '0-0-0',
              label: 'Expenses.doc',
              icon: 'pi pi-fw pi-file',
              data: 'Expenses Document'
            },
            { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
          ]
        },
        {
          key: '0-1',
          label: 'Home',
          data: 'Home Folder',
          icon: 'pi pi-fw pi-home',
          children: [
            {
              key: '0-1-0',
              label: 'Invoices.txt',
              icon: 'pi pi-fw pi-file',
              data: 'Invoices for this month'
            }
          ]
        }
      ]
    }
  ])
  const expandedKeys = ref({})
  const select = (e) => {
    expandNode(e)
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

  const code = ref('')
</script>
<style lang="scss" scoped>
  .p-tree {
    padding: 0 10px 0 0;
  }
</style>
