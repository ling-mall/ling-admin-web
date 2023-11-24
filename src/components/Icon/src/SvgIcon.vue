<template>
  <svg class="svg-icon" aria-hidden="true" :style="getStyle">
    <use class="svg-use" :href="symbolId" />
  </svg>
</template>
<script lang="ts" setup>
  import type { CSSProperties } from 'vue'

  const props = defineProps({
    prefix: {
      type: String,
      default: 'icon'
    },
    name: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: 16
    },
    spin: {
      type: Boolean,
      default: false
    }
  })

  const symbolId = computed(() => `#${props.prefix}-${props.name}`)

  const getStyle = computed((): CSSProperties => {
    const { size } = props
    let s = `${size}`
    s = `${s.replace('px', '')}px`
    return {
      width: s,
      height: s
    }
  })
</script>
<style lang="scss" scoped>
  .svg-icon {
    display: inline-block;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentcolor;
  }

  .svg-icon-spin {
    animation: loadingCircle 1s infinite linear;
  }
</style>
