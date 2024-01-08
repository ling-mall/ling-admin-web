import { ProjectConfig } from '#/config'

const setting: ProjectConfig = {
  // 默认主题为跟随系统
  defaultTheme: ThemeModeEnum.SYSTEM,
  theme: {
    colors: {
      // 主要颜色，通常用于突出重点或主要元素
      primary: '#4361ee',
      // 次要颜色，用于补充主要颜色或提供对比效果
      secondary: '#805dca',
      // 成功颜色，表示操作或状态成功
      success: '#00ab55',
      // 危险颜色，表示警告或错误状态
      danger: '#e7515a',
      // 警告颜色，用于表示潜在的问题或需要注意的情况
      warning: '#e2a03f',
      // 信息颜色，用于提供额外的信息或提示
      info: '#2196f3'
    }
  },
  menuSetting: {
    menuWidth: 210,
    fixed: true,
    siderHidden: false,
    show: true,
    bgColor: '#001529',
    textColor: '#ffffff',
    activeTextColor: '#ffffff'
  }
}

export default setting
