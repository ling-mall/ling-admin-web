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

import { ThemeColorsVarName } from './src/enums/appEnum'

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      primary: `var(${ThemeColorsVarName.PRIMARY})`,
      secondary: `var(${ThemeColorsVarName.INFO})`,
      success: `var(${ThemeColorsVarName.SUCCESS})`,
      danger: `var(${ThemeColorsVarName.DANGER})`,
      warning: `var(${ThemeColorsVarName.WARNING})`,
      info: `var(${ThemeColorsVarName.INFO})`
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
      include: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}'
      ]
    }
  }
})
