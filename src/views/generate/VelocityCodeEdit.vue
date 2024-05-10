<template>
  <Codemirror
    v-model="codeString"
    placeholder="Code here..."
    :style="{ height: '400px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tabSize="2"
    :extensions="extensions"
  />
</template>

<script setup lang="ts">
  defineOptions({ name: 'VelocityCodeEdit' })

  import { Codemirror } from 'vue-codemirror'
  import { defaultHighlightStyle, StreamLanguage, syntaxHighlighting } from '@codemirror/language'
  import { velocity } from '@codemirror/legacy-modes/mode/velocity'

  const props = defineProps({
    code: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(['update:code'])
  const codeString = useVModel(props, 'code', emit)

  const extensions = [
    StreamLanguage.define(velocity),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true })
  ]
</script>

<style scoped lang="scss"></style>
