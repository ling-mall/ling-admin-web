import { hexToRgb, rgbToHex } from '@/utils'

const getCssVariable = (varName: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
}

const getInitHx = () => {
  const r = parseInt(getCssVariable('--el-color-primary-value-r'))
  const g = parseInt(getCssVariable('--el-color-primary-value-g'))
  const b = parseInt(getCssVariable('--el-color-primary-value-b'))
  return rgbToHex(r, g, b)
}

export function useElementPlusTheme() {
  const color = ref(getInitHx())

  const r = useCssVar('--el-color-primary-value-r')
  const g = useCssVar('--el-color-primary-value-g')
  const b = useCssVar('--el-color-primary-value-b')

  watch(color, (newValue) => {
    const rgb = hexToRgb(newValue)
    r.value = '' + rgb?.r
    g.value = '' + rgb?.g
    b.value = '' + rgb?.b
  })

  return { color }
}
