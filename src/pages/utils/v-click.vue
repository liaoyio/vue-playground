<script setup lang="ts">
import type { DirectiveBinding } from 'vue'
import { ElButton } from 'element-plus'

const state = ref('')
const loading = ref(false)

function debounce(fn: (ages: any) => void, delay: number) {
  let timer: NodeJS.Timeout | null = null
  return function (...ages: any) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => fn(ages), delay)
  }
}

// 使用 WeakMap 来存储 DOM 元素和其绑定的事件处理器
const handlerMap = new WeakMap<HTMLElement, EventListener>()

const vClick = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value, modifiers } = binding
    const [fn, delay] = Array.isArray(value) ? value : [value, 300]
    // 根据是否有防抖修饰符创建事件处理器
    const handler = modifiers.debounce ? debounce(fn, delay) : fn
    handlerMap.set(el, handler)
    el.addEventListener('click', handler)
  },
  unmounted(el: HTMLElement) {
    const handler = handlerMap.get(el)
    if (handler) {
      el.removeEventListener('click', handler)
      handlerMap.delete(el)
    }
  },
}

function handleClick() {
  console.log('点击事件', state.value)
  loading.value = true
  fetch(`https://jsonplaceholder.typicode.com/todos/${state.value}`)
    .then(res => res.json())
    .then(data => console.log(data))
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div>
    <el-input v-model="state" />
    <ElButton v-click.debounce="[handleClick, 1000]" :loading="loading">
      点击
    </ElButton>
  </div>
</template>
