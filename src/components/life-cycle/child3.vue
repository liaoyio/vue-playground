<script setup lang="ts">
console.log('👦🏻组件 3  ------- setup [组件创建前, 数据初始化]')

onBeforeMount(() => {
  console.log('👦🏻组件 3  ------- onBeforeMount [DOM 挂载前]')
})

onMounted(() => {
  console.log('👦🏻组件 3  ------- onMounted [DOM 挂载后]')
})

onBeforeUpdate(() => {
  console.log('👦🏻组件 3  ------- onBeforeUpdate [ DOM更新前, 检查数据的变化]')
})

onUpdated(() => {
  console.log('👦🏻组件 3  ------- onUpdated [DOM更新后] ')
})

onBeforeUnmount(() => {
  console.log(
    '👦🏻组件 3  ------- onBeforeUnmount [组件卸载前，清理一些定时器、事件监听器等]',
  )
})

onUnmounted(() => {
  console.log('👦🏻组件 3  ------- onUnmounted [组件卸载后]')
})
</script>

<template>
  <div>👦🏻组件 3</div>
</template>

<style lang="scss"></style>
