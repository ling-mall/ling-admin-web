<template>
  <div class="w-9/10 m-a mt-10">
    <div>
      <div>字典</div>
    </div>
    <div class="mt-20">
      <vxe-button @click="addColumn">添加列</vxe-button>
      <vxe-button>添加行</vxe-button>
    </div>
    <vxe-table
      class="mt-5"
      border
      show-overflow
      :data="tableData"
      :column-config="{ resizable: true }"
    >
      <vxe-column title="序号" type="seq" width="60" />
      <vxe-column
        v-for="(column, index) in columns"
        :key="index"
        :field="column.columnName"
        :title="column.columnName"
      />
    </vxe-table>
  </div>
</template>
<script lang="ts" setup>
  defineOptions({ name: 'EntityView' })

  const entityData = ref<any>({
    groupId: null,
    entityName: 'User',
    columns: [
      {
        id: 3,
        entityId: 5,
        columnName: 'JavaType',
        orderNo: 0,
        value: 'Long',
        isRequired: 0
      },
      {
        id: 4,
        entityId: 5,
        columnName: 'MysqlType',
        orderNo: 1,
        value: 'bigint',
        isRequired: 0
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

  const columns = ref<any>([])

  const tableData = ref<any[]>([])

  onMounted(() => {
    tableData.value = transformRows(entityData.value)
    columns.value = entityData.value.columns
  })

  const addColumn = () => {
    columns.value.push({
      id: 0,
      entityId: 0,
      columnName: 'AAA',
      orderNo: 0,
      isRequired: 0
    })
  }
</script>
<style lang="scss" scoped></style>
