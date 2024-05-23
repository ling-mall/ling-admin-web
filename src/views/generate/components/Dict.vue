<template>
  <div>
    <div class="flex flex-col">
      <div class="flex flex-row w-80">
        <el-input v-model="addDictInputValueForm" placeholder="字典名称" />
        <el-button class="ml-4" @click="addDict">添加字典</el-button>
      </div>
      <div class="mt-4">
        <div class="flex flex-row p-3" v-for="dictItem in data" :key="dictItem.dictName">
          <div>{{ dictItem.dictName }}</div>
          :
          <div class="ml-6 flex flex-row">
            <el-tag
              class="ml-4"
              v-for="(tabItem, index) in dictItem.dictValue"
              :key="index"
              closable
              @close="removeDictValue(tabItem, dictItem.dictValue)"
            >
              {{ tabItem }}
            </el-tag>
            <div class="w-20">
              <el-input
                class="ml-4"
                size="small"
                v-model="dictItem.inputValue"
                @keyup.enter="addDictValue(dictItem)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  defineOptions({ name: 'DictView' })

  import { ElMessage } from 'element-plus'
  import { Dict } from '../types'

  const props = defineProps({
    data: {
      required: true,
      type: Object as PropType<Dict[]>
    }
  })

  const emit = defineEmits(['update:data'])

  const data = useVModel(props, 'data', emit)

  const addDictInputValueForm = ref('')

  const addDict = () => {
    if (addDictInputValueForm.value === '') {
      return
    }

    // 检查字典是否已存在
    let isExist = data.value.some((item) => item.dictName === addDictInputValueForm.value)
    if (isExist) {
      console.log('字典已存在')

      ElMessage.error('字典已存在')
      return
    }
    data.value.push({ dictName: addDictInputValueForm.value, dictValue: [], inputValue: '' })
    addDictInputValueForm.value = ''
  }

  const removeDictValue = (tag: string, tagArr: string[]) => {
    tagArr.splice(tagArr.indexOf(tag), 1)
  }

  const addDictValue = (item: Dict) => {
    if (item.inputValue === '') {
      return
    }
    item.dictValue.push(item.inputValue)
    item.inputValue = ''
  }
</script>
<style lang="scss" scoped></style>
