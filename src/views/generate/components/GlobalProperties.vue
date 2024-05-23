<template>
  <div>
    <el-form :model="formData">
      <div class="flex flex-row" v-for="(formItem, index) in formItemArr" :key="formItem.field">
        <div class="w-15 flex pt-2">
          <el-popconfirm title="确定删除该元素吗？" @confirm="handleDelete(index)">
            <template #reference>
              <div class="text-center text-red text-sm cursor-pointer"> 删除</div>
            </template>
          </el-popconfirm>
        </div>
        <div class="flex-grow flex flex-col">
          <el-form-item
            :label="formItem.label"
            :required="formItem.required"
            :prop="formItem.field"
          >
            <template v-if="formItem.component === 'Input'">
              <el-input v-model="formData[formItem.field]" />
            </template>
            <template v-if="formItem.component === 'InputNumber'">
              <el-input-number v-model="formData[formItem.field]" />
            </template>
            <template v-if="formItem.component === 'Select'">
              <el-select v-model="formData[formItem.field]">
                <el-option
                  v-for="option in formItem.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </template>
            <template v-if="formItem.component === 'RadioGroup'">
              <el-radio-group v-model="formData[formItem.field]">
                <el-radio
                  v-for="option in formItem.options"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                />
              </el-radio-group>
            </template>
            <template v-if="formItem.component === 'Switch'">
              <el-switch v-model="formData[formItem.field]" />
            </template>
            <template v-if="formItem.component === 'CheckboxGroup'">
              <el-checkbox-group v-model="formData[formItem.field]">
                <el-checkbox
                  v-for="option in formItem.options"
                  :key="option.value"
                  :label="option.value"
                >
                  {{ option.label }}
                </el-checkbox>
              </el-checkbox-group>
            </template>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <el-button @click="handleAdd">添加表单</el-button>
    <el-dialog title="新增" v-model="addFormShow" width="30%">
      <el-form ref="addFormRef" :model="addForm" label-position="left" label-width="80px">
        <el-form-item label="属性名" required prop="field">
          <el-input v-model="addForm.field" />
        </el-form-item>
        <el-form-item label="标签名" required prop="label">
          <el-input v-model="addForm.label" />
        </el-form-item>
        <el-form-item label="类型" required prop="component">
          <el-select v-model="addForm.component" placeholder="请选择">
            <el-option label="文本输入框" value="Input" />
            <el-option label="下拉框" value="Select" />
            <el-option label="单选按钮组" value="RadioGroup" />
            <el-option label="复选框组" value="CheckboxGroup" />
            <el-option label="开关（布尔类型）" value="Switch" />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="
            addForm.component === 'Select' ||
            addForm.component === 'RadioGroup' ||
            addForm.component === 'CheckboxGroup'
          "
          label="字典"
          prop="dictName"
          :required="
            addForm.component === 'Select' ||
            addForm.component === 'RadioGroup' ||
            addForm.component === 'CheckboxGroup'
          "
        >
          <el-select v-model="addForm.dictName" placeholder="请选择">
            <el-option
              v-for="(item, index) in props.dictData"
              :key="index"
              :label="item.dictName"
              :value="item.dictName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="默认值" prop="defaultValue">
          <el-input v-model="addForm.defaultValue" />
        </el-form-item>
        <el-form-item label="是否必填" prop="required">
          <el-switch v-model="addForm.required" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addFormShow = false">取 消</el-button>
          <el-button type="primary" @click="addFormSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { Dict, FormItem } from './../types'
  import { PropType } from 'vue'

  defineOptions({ name: 'GlobalProperties' })

  const props = defineProps({
    dictData: {
      type: Object as PropType<Dict[]>,
      default: () => {
        return []
      }
    },
    formItemArr: {
      type: Object as PropType<FormItem[]>,
      default: () => {
        return []
      }
    }
  })
  const emit = defineEmits(['update:formItemArr'])
  const formItemArr = useVModel(props, 'formItemArr', emit)

  const formData = reactive({})

  const addFormRef = ref()
  const addForm = ref<FormItem>({
    field: '',
    label: '',
    component: 'Input',
    options: [],
    required: false,
    defaultValue: undefined,
    dictName: ''
  })
  const addFormShow = ref(false)

  const handleAdd = () => {
    addFormShow.value = true
    nextTick(() => {
      addFormRef.value.resetFields()
    })
  }

  const addFormSubmit = () => {
    addFormRef.value.validate(async (valid: boolean) => {
      if (valid) {
        const { field, label, component, required, defaultValue, dictName } = addForm.value
        formItemArr.value.push({
          field,
          label,
          component,
          required,
          defaultValue,
          options: getOptions(dictName as string)
        })
        addFormShow.value = false
      }
    })
  }

  const handleDelete = (index: number) => {
    formItemArr.value.splice(index, 1)
  }

  const getOptions = (dictName: string) => {
    let dictItem = props.dictData.find((item) => item.dictName === dictName)
    if (dictItem) {
      return dictItem.dictValue.map((str) => {
        return { label: str, value: str }
      })
    } else {
      return []
    }
  }
</script>
<style lang="scss" scoped></style>
