export type Dict = { dictName: string; dictValue: string[]; inputValue: string }

export type FormItem = {
  label: string
  field: string
  component: 'Input' | 'Select' | 'RadioGroup' | 'CheckboxGroup' | 'InputNumber' | 'Switch'
  options?: any[]
  componentProps?: any
  required?: boolean
  defaultValue?: any
  dictName?: string
}

export interface Column {
  id?: number
  entityId?: number
  columnName: string
  orderNo?: number
  isRequired?: number
  type: number
}

export interface Row {
  id: number
  index: number
  entityId: number
  columns: RowColumn[]
}

interface RowColumn {
  columnName: string
  value: string
}

export interface EntityData {
  groupId: number | null
  entityName: string
  columnsDictMap: Record<string, string>
  columns: Column[]
  rows: Row[]
}
