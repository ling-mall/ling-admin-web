// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

import { ThemeColorsVarName, ThemeColorsVarSuffix } from './src/enums/appEnum'

const getRgba = (cssVarName: string) => {
  return (
    'rgba(' +
    'calc(var(' +
    cssVarName +
    ThemeColorsVarSuffix.R +
    ')),' +
    'calc(var(' +
    cssVarName +
    ThemeColorsVarSuffix.G +
    ')),' +
    'calc(var(' +
    cssVarName +
    ThemeColorsVarSuffix.B +
    ')))'
  )
}

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      primary: getRgba(ThemeColorsVarName.PRIMARY),
      secondary: getRgba(ThemeColorsVarName.INFO),
      success: getRgba(ThemeColorsVarName.SUCCESS),
      danger: getRgba(ThemeColorsVarName.DANGER),
      warning: getRgba(ThemeColorsVarName.WARNING),
      info: getRgba(ThemeColorsVarName.INFO)
    }
  },
  presets: [
    presetUno(),
    presetAttributify({
      prefix: 'u-'
    }),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {}
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  content: {
    pipeline: {
      include: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
    }
  }
})
