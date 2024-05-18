/**主题枚举 */
export enum ThemeModeEnum {
  /** 暗黑主题*/
  DARK = 'dark',
  /** 明亮主题 */
  LIGHT = 'light',
  /** 跟随系统*/
  SYSTEM = 'system'
}

/**
 * 主题颜色变量名
 */
export enum ThemeColorsVarName {
  /** 主要颜色 */
  PRIMARY = '--color-primary',
  /** 次要颜色 */
  SECONDARY = '--color-secondary',
  /** 成功颜色 */
  SUCCESS = '--color-success',
  /** 危险颜色 */
  DANGER = '--color-danger',
  /** 警告颜色 */
  WARNING = '--color-warning',
  /** 信息颜色 */
  INFO = '--color-info'
}

export enum ThemeColorsVarSuffix {
  R = '-r',
  G = '-g',
  B = '-b'
}
