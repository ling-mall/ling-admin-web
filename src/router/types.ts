import type { RouteMeta } from 'vue-router'

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success'
  content?: string
  dot?: boolean
}

export interface Menu {
  /** 菜单项的名称。 */
  name: string
  /** 菜单项的可选图标。 */
  icon?: string
  /** 菜单项的可选图片。 */
  img?: string
  /** 与菜单项关联的路径。 */
  path: string
  /**
   * 如果路径包含参数，则此字段指定参数路径以进行自动分配。
   */
  paramPath?: string
  /** 指示菜单项是否已禁用。 */
  disabled?: boolean
  /** 子菜单项的数组。 */
  children?: Menu[]
  /** 菜单项的排序号。 */
  orderNo?: number
  /** 与路由相关的其他元数据。 */
  meta?: Partial<RouteMeta>
  /** 与菜单项关联的标记信息。 */
  tag?: MenuTag
  /** 指示是否应隐藏菜单项。 */
  hideMenu?: boolean
}
