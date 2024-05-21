<template>
  <Tree
    class="w-full"
    v-model:selectionKeys="selectedKey"
    :value="nodes"
    selectionMode="single"
    @node-select="select"
    @node-unselect="select"
    v-model:expandedKeys="expandedKeys"
  />
</template>
<script lang="ts" setup>
  import { TreeNode } from 'primevue/treenode'
  import Tree from 'primevue/tree'

  const { nodes } = defineProps({
    nodes: {
      type: Array as PropType<TreeNode[]>,
      default: () => []
    }
  })

  const emit = defineEmits(['select'])

  const selectedKey = ref()
  const expandedKeys = ref({})
  const select = (e) => {
    if (e.children && e.children.length > 0) {
      expandOneNode(e)
    } else {
      emit('select', e)
    }
  }
  const expandOneNode = (node) => {
    if (node.children && node.children.length) {
      if (expandedKeys.value[node.key]) {
        delete expandedKeys.value[node.key]
      } else {
        expandedKeys.value[node.key] = true
      }
    }
  }

  const expandAll = () => {
    for (let node of nodes) {
      expandNode(node)
    }
    expandedKeys.value = { ...expandedKeys.value }
  }

  const expandNode = (node) => {
    if (node.children && node.children.length) {
      expandedKeys.value[node.key] = true
      for (let child of node.children) {
        expandNode(child)
      }
    }
  }

  watch(
    () => nodes,
    () => {
      expandAll()
    }
  )
</script>
<style lang="scss" scoped></style>
