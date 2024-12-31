<script setup lang="ts">
const route = useRoute("/cache/[id]/");
const id = route.params.id;

console.log(
  " 👦🏻路由-> cache/:id/token  ------- setup [组件创建前, 数据初始化]",
);

onBeforeMount(() => {
  console.log("👦🏻路由-> cache/:id/token  ------- onBeforeMount [DOM 挂载前]");
});

onMounted(() => {
  console.log("👦🏻路由-> cache/:id/token  ------- onMounted [DOM 挂载后]");
});

onBeforeUpdate(() => {
  console.log(
    "👦🏻路由-> cache/:id/token  ------- onBeforeUpdate [ DOM更新前, 检查数据的变化]",
  );
});

onUpdated(() => {
  console.log("👦🏻路由-> cache/:id/token  ------- onUpdated [DOM更新后] ");
});

onBeforeUnmount(() => {
  console.log(
    "👦🏻路由-> cache/:id/token  ------- onBeforeUnmount [组件卸载前，清理一些定时器、事件监听器等]",
  );
});

onUnmounted(() => {
  console.log("👦🏻路由-> cache/:id/token ------- onUnmounted [组件卸载后]");
});
</script>

<template>
  <div>Tokens {{ id }}</div>
</template>

<style lang="scss"></style>
