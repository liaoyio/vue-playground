<script setup lang="ts">
import Child1 from './child1.vue'
import Child2 from './child2.vue'
import Child3 from './child3.vue'

console.log('👨组件  ------- setup [组件创建前, 数据初始化]')

onBeforeMount(() => {
  console.log('👨组件  ------- onBeforeMount [DOM 挂载前]')
})

onMounted(() => {
  console.log('👨组件  ------- onMounted [DOM 挂载后]')
})

onBeforeUpdate(() => {
  console.log('👨组件  ------- onBeforeUpdate [ DOM更新前, 检查数据的变化]')
})

onUpdated(() => {
  console.log('👨组件  ------- onUpdated [DOM更新后] ')
})

onBeforeUnmount(() => {
  console.log(
    '👨组件  ------- onBeforeUnmount [组件卸载前，清理一些定时器、事件监听器等]',
  )
})

onUnmounted(() => {
  console.log('👨组件  ------- onUnmounted [组件卸载后]')
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between border-b border-gray-300 pb-2">
      <h4>👨 组件</h4>
    </div>

    <div class="flex flex-col gap-4 py-4">
      <Child1 />
      <Child2 />
      <Child3 />
    </div>
  </div>
</template>

<style lang="scss"></style>
