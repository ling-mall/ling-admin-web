<template>
  <div class="w-9/10 m-a mt-10">
    <div>
      <div class="flex flex-col mt-10">
        <div class="flex flex-row w-80">
          <el-input v-model="addDictInputValueForm" />
          <el-button class="ml-1" @click="addDict">添加字典</el-button>
        </div>
        <div class="mt-4 border border-solid border-gray-200 divide-y">
          <div class="flex flex-row p-3" v-for="dictItem in dict" :key="dictItem.dictName">
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
    <div class="mt-20">
      <el-button @click="handleAddColumn">添加列</el-button>
      <el-button @click="addRow">添加行</el-button>
      <el-popover placement="bottom" :width="240" trigger="click">
        <template #reference>
          <el-button>列操作</el-button>
        </template>
        <div class="w-60">
          <VueDraggable
            class="flex flex-col space-y-1"
            v-model="entityData.columns"
            handle=".cloumn-handle"
            :animation="150"
            @end="sortColumn"
          >
            <div
              v-for="cloumn in entityData.columns"
              :key="cloumn.columnName"
              class="flex flex-row p-2 border"
            >
              <div
                class="cloumn-handle w-10 text-2xl text-gray-500 flex justify-center items-center"
              >
                <div class="i-material-symbols-drag-handle cursor-move"></div
              ></div>
              <div class="flex-grow flex items-center">{{ cloumn.columnName }}</div>
              <el-popconfirm title="确定删除该列吗？" @confirm="handleDeleteColumn(cloumn)">
                <template #reference>
                  <div class="w-8 flex items-center justify-center cursor-pointer">
                    <div class="i-material-symbols-remove"></div>
                  </div>
                </template>
              </el-popconfirm>
            </div>
          </VueDraggable>
        </div>
      </el-popover>
    </div>
    <VueDraggable
      v-model="tableData"
      target=".vxe-table--body tbody"
      handle=".handle"
      :animation="150"
      @end="sortRow"
    >
      <vxe-grid ref="tableRef" class="mt-5" v-bind="gridOptions">
        <template #select_edit="{ row }">
          <ElInput size="small" v-model="row.value" />
        </template>
        <template #input_edit="{ row }">
          <div>{{ row }}</div>
        </template>
        <template #dragDrop_default>
          <div class="handle w-full h-full flex justify-center items-center text-2xl">
            <div class="i-material-symbols-drag-handle cursor-move"></div>
          </div>
        </template>
        <template #operate="{ row }">
          <el-button type="danger" link @click="handleDeleteRow(row)">删除</el-button>
        </template>
      </vxe-grid>
    </VueDraggable>
    <el-dialog title="添加列" v-model="addColumnDialogVisible" width="30%">
      <el-form ref="addColumnFormRef" :model="addColumnForm" label-width="80px">
        <el-form-item :required="true" label="列名">
          <el-input v-model="addColumnForm.columnName" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="addColumnForm.type">
            <el-option label="输入框" :value="1" />
            <el-option label="下拉框" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="字典" v-if="addColumnForm.type === 2">
          <el-select v-model="addColumnForm.dictName">
            <el-option
              v-for="dictItem in dict"
              :key="dictItem.dictName"
              :label="dictItem.dictName"
              :value="dictItem.dictName"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addColumnDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addColumn">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { ElMessage } from 'element-plus'
  import { VxeGridProps } from 'vxe-table'
  import { VueDraggable } from 'vue-draggable-plus'

  defineOptions({ name: 'EntityView' })

  onMounted(() => {
    tableData.value = transformRows(entityData.value)
    columns.value = transformColumns(entityData.value)
    gridOptions.columns = columns.value
    gridOptions.data = tableData.value
  })

  // 表格数据================================================================================

  const entityData = ref<any>({
    groupId: null,
    entityName: 'User',
    columnsDictMap: { MysqlType: 'MysqlType' },
    columns: [
      {
        id: 3,
        entityId: 5,
        columnName: 'JavaType',
        orderNo: 0,
        isRequired: 0,
        type: 1
      },
      {
        id: 4,
        entityId: 5,
        columnName: 'MysqlType',
        orderNo: 1,
        isRequired: 0,
        type: 2
      }
    ],
    rows: [
      {
        id: 5,
        index: 0,
        entityId: 5,
        columns: [
          {
            columnName: 'JavaType',
            value: 'Long'
          },
          {
            columnName: 'MysqlType',
            value: 'bigint'
          }
        ]
      }
    ]
  })

  const tableRef = ref()
  const tableData = ref<any[]>([])
  const gridOptions = reactive<VxeGridProps<any>>({
    border: true,
    editConfig: {
      mode: 'cell',
      trigger: 'click'
    },
    columns: []
  })

  // 行操作====================================================================================

  const transformRows = (data) => {
    // 创建一个空数组来存储结果
    let result: Object[] = []

    // 遍历数据中的每一行
    for (let row of data.rows) {
      // 创建一个空对象来存储列数据
      let obj = {}

      // 遍历行中的每一列
      for (let column of row.columns) {
        // 将列名称和值添加到对象中
        obj[column.columnName] = column.value
      }

      // 将对象添加到结果数组中
      result.push(obj)
    }

    // 返回结果数组
    return result
  }

  const sortRow = () => {
    tableRef.value.loadData(tableData.value)
  }

  const addRow = () => {
    tableData.value.push({})
    tableRef.value.loadData(tableData.value)
  }

  const handleDeleteRow = (row) => {
    const index = tableData.value.indexOf(row)
    console.log(index)

    if (index > -1) {
      tableData.value.splice(index, 1)
    }
    tableRef.value.loadData(tableData.value)
  }

  // 列操作 ===================================================================================

  const columns = ref<any>([])

  const refushColumn = () => {
    columns.value = transformColumns(entityData.value)
    tableRef.value.loadColumn(columns.value)
  }

  const addColumnDialogVisible = ref(false)
  const addColumnFormRef = ref()
  const addColumnForm = reactive({
    columnName: '',
    isRequired: 0,
    type: 1,
    dictName: ''
  })
  const handleAddColumn = () => {
    addColumnDialogVisible.value = true
  }
  const addColumn = () => {
    addColumnFormRef.value.validate((valid) => {
      if (valid) {
        // 校验是否名字重复
        if (entityData.value.columns.some((c) => c.columnName === addColumnForm.columnName)) {
          ElMessage.error('列名重复')
          return
        }

        let col = {
          columnName: addColumnForm.columnName,
          type: addColumnForm.type
        }
        if (addColumnForm.type === 2) {
          entityData.value.columnsDictMap[addColumnForm.columnName] = addColumnForm.dictName
        }
        entityData.value.columns.push(col)

        ElMessage.success('添加成功')
        addColumnDialogVisible.value = false
        refushColumn()
      }
    })
  }

  const handleDeleteColumn = (column) => {
    const index = entityData.value.columns.indexOf(column)
    if (index > -1) {
      entityData.value.columns.splice(index, 1)
    }
    refushColumn()
  }

  const sortColumn = () => {
    refushColumn()
  }

  const transformColumns = (data: any) => {
    let result: Object[] = [
      {
        title: '排序',
        slots: { default: 'dragDrop_default' },
        width: 50
      }
    ]
    let operation = {
      title: '操作',
      slots: { default: 'operate' },
      width: 100
    }
    data.columns.forEach((c) => {
      let obj: Object = {
        field: c.columnName,
        title: c.columnName,
        align: 'center'
      }

      if (c.type === 2) {
        obj['editRender'] = { name: 'VxeSelect', options: getDictOptions(c.columnName) }
      } else {
        obj['editRender'] = { name: 'VxeInput' }
      }

      result.push(obj)
    })
    return [...result, operation]
  }

  // 字典 ===================================================================================================================

  const addDictInputValueForm = ref('')

  type Dict = { dictName: string; dictValue: string[]; inputValue: string }

  const dict = ref<Dict[]>([
    { dictName: 'MysqlType', dictValue: ['bigint', 'varchar'], inputValue: '' }
  ])

  const addDict = () => {
    if (addDictInputValueForm.value === '') {
      return
    }

    // 检查字典是否已存在
    let isExist = dict.value.some((item) => item.dictName === addDictInputValueForm.value)
    if (isExist) {
      console.log('字典已存在')

      ElMessage.error('字典已存在')
      return
    }
    dict.value.push({ dictName: addDictInputValueForm.value, dictValue: [], inputValue: '' })
    addDictInputValueForm.value = ''
  }

  const removeDictValue = (tag: string, tagArr: string[]) => {
    tagArr.splice(tagArr.indexOf(tag), 1)
    refushColumn()
  }

  const addDictValue = (item: Dict) => {
    if (item.inputValue === '') {
      return
    }
    item.dictValue.push(item.inputValue)
    item.inputValue = ''
    refushColumn()
  }

  const getDictOptions = (columnName: string) => {
    let dictName = entityData.value.columnsDictMap[columnName]
    let dictItem = dict.value.find((item) => item.dictName === dictName)
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
