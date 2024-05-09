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
