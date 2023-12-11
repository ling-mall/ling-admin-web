import { ProjectConfig } from '#/config'

const setting: ProjectConfig = {
  // 默认主题为跟随系统
  defaultTheme: ThemeEnum.SYSTEM,
  menuSetting: {
    menuWidth: 210,
    fixed: true,
    siderHidden: false,
    show: true,
    bgColor: '#34495e'
  }
}

export default setting
