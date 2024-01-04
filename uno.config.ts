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

export default defineConfig({
  shortcuts: [
    // ...
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#4361ee',
        light: '#eaf1ff',
        'dark-light': 'rgba(67,97,238,.15)'
      },
      secondary: {
        DEFAULT: '#805dca',
        light: '#ebe4f7',
        'dark-light': 'rgb(128 93 202 / 15%)'
      },
      success: {
        DEFAULT: '#00ab55',
        light: '#ddf5f0',
        'dark-light': 'rgba(0,171,85,.15)'
      },
      danger: {
        DEFAULT: '#e7515a',
        light: '#fff5f5',
        'dark-light': 'rgba(231,81,90,.15)'
      },
      warning: {
        DEFAULT: '#e2a03f',
        light: '#fff9ed',
        'dark-light': 'rgba(226,160,63,.15)'
      },
      info: {
        DEFAULT: '#2196f3',
        light: '#e7f7ff',
        'dark-light': 'rgba(33,150,243,.15)'
      },
      dark: {
        DEFAULT: '#3b3f5c',
        light: '#eaeaec',
        'dark-light': 'rgba(59,63,92,.15)'
      },
      black: {
        DEFAULT: '#0e1726',
        light: '#e3e4eb',
        'dark-light': 'rgba(14,23,38,.15)'
      },
      white: {
        DEFAULT: '#ffffff',
        light: '#e0e6ed',
        dark: '#888ea8'
      }
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
