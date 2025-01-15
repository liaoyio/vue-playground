<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { Modal } from 'ant-design-vue'

const props = defineProps<{
  visible: boolean
  title: string
}>()

const emit = defineEmits(['update:visible', 'confirm'])

const bindVisible = useVModel(props, 'visible', emit)

function handleOk() {
  bindVisible.value = false
  emit('confirm')
}
</script>

<template>
  <Modal v-model:open="bindVisible" :title="title" @ok="handleOk">
    <slot />
  </Modal>
</template>
