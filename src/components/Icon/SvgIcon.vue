<script setup lang="ts">
  import { defineAsyncComponent, CSSProperties } from 'vue'

  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 16
    }
  })

  const getStyle = computed((): CSSProperties => {
    const { size } = props
    let s = `${size}`
    s = `${s.replace('px', '')}px`
    return {
      width: s,
      height: s,
      fill: 'currentColor'
    }
  })

  const dynamicIcon = shallowRef<any>('')

  /** 加载图标 */
  const loadSvgIcon = () => {
    dynamicIcon.value = defineAsyncComponent(() => import(`../../assets/icons/${props.name}.svg`))
  }

  onMounted(() => {
    loadSvgIcon()
  })

  watch(
    () => props.name,
    () => {
      loadSvgIcon()
    }
  )
</script>
<template>
  <component v-if="dynamicIcon" :is="dynamicIcon" v-bind="$attrs" :style="getStyle" />
</template>
