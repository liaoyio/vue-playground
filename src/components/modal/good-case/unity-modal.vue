<script setup lang="ts">
import { camelCase, kebabCase, upperFirst } from 'lodash-es'
import { computed, unref, useAttrs } from 'vue'
import { useUnityModal } from './hooks/use-unity-modal'

defineOptions({ inheritAttrs: false })

const { visible, injectAttrs, modalComponent } = useUnityModal()

const attrs = useAttrs()
/** 组件默认公共属性 */
const commonAttrs = computed(() => {
  const newAttrs: any = {}
  // 添加外面组件外传入的公共事件
  modalComponent.value?.default.emits?.forEach((key: any) => {
    // 事件名称转换大驼峰
    const emitKey = `on${upperFirst(camelCase(key))}`
    if (attrs[emitKey]) {
      newAttrs[emitKey] = attrs[emitKey]
    }
  })
  // 添加外面组件外传入的属性
  const props = modalComponent.value?.default.props || {}
  Object.keys(props).forEach((key) => {
    const propKey = kebabCase(key)
    if (attrs[propKey]) {
      newAttrs[propKey] = attrs[propKey]
    }
  })
  return newAttrs
})

/** 结合默认属性和注入的属性 */
const renderAttrs = computed(() => {
  const newAttrs = { ...commonAttrs.value }
  // 仅传入有值的属性
  Object.keys(injectAttrs.value).forEach((key) => {
    if (typeof injectAttrs.value[key] !== 'undefined') {
      newAttrs[key] = unref(injectAttrs.value[key]) // 支持ref数据转入
    }
  })

  return newAttrs
})
</script>

<template>
  <component :is="modalComponent?.default" v-model:visible="visible" v-bind="renderAttrs" />
</template>
