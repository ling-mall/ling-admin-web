import { hexToRgb, rgbToHex } from '@/utils'

const getCssVariable = (varName: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
}

const getInitHx = () => {
  const r = parseInt(getCssVariable(ThemeColorsVarName.PRIMARY + ThemeColorsVarSuffix.R))
  const g = parseInt(getCssVariable(ThemeColorsVarName.PRIMARY + ThemeColorsVarSuffix.G))
  const b = parseInt(getCssVariable(ThemeColorsVarName.PRIMARY + ThemeColorsVarSuffix.B))
  return rgbToHex(r, g, b).slice(1)
}

export function useTheme() {
  const color = ref(getInitHx())

  const r = useCssVar(ThemeColorsVarName.PRIMARY + ThemeColorsVarSuffix.R)
  const g = useCssVar(ThemeColorsVarName.PRIMARY + ThemeColorsVarSuffix.G)
  const b = useCssVar(ThemeColorsVarName.PRIMARY + ThemeColorsVarSuffix.B)

  watch(color, (newValue) => {
    const rgb = hexToRgb(newValue)
    r.value = '' + rgb?.r
    g.value = '' + rgb?.g
    b.value = '' + rgb?.b
  })

  return { color }
}
