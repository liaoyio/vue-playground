<script setup lang="ts">
const router = useRouter();
const id = useRoute("/cache/[id]/").params.id;
id ? router.push("/cache/:id/") : router.replace("/404");
definePage({ name: "CacheLayout" });

console.log("👨路由-> /cache ------- setup [组件创建前, 数据初始化]");

onBeforeMount(() => {
  console.log("👨路由-> /cache ------- onBeforeMount [DOM 挂载前]");
});

onMounted(() => {
  console.log("👨路由-> /cache ------- onMounted [DOM 挂载后]");
});

onBeforeUpdate(() => {
  console.log(
    "👨路由-> /cache ------- onBeforeUpdate [ DOM更新前, 检查数据的变化]",
  );
});

onUpdated(() => {
  console.log("👨路由-> /cache ------- onUpdated [DOM更新后] ");
});

onBeforeUnmount(() => {
  console.log(
    "👨路由-> /cache ------- onBeforeUnmount [组件卸载前，清理一些定时器、事件监听器等]",
  );
});

onUnmounted(() => {
  console.log("👨路由-> /cache------- onUnmounted [组件卸载后]");
});
</script>

<template>
  <main class="p-6">
    <header class="pb-1 border-b mb-4">
      <div class="pl-3">Cache Layouts</div>
      <nav class="my-3 divide-blue divide-x-[1px] divide-dashed">
        <RouterLink class="px-3 rounded-sm inline-block border-gray-300 hover:bg-[#00bd7e33]" active-class="a-active"
          :to="`/cache/${id}/over-view`">
          OverView
        </RouterLink>
        <RouterLink class="px-3 rounded-sm inline-block border-gray-300 hover:bg-[#00bd7e33]" active-class="a-active"
          :to="`/cache/${id}/content`">
          Content
        </RouterLink>
        <RouterLink class="px-3 rounded-sm inline-block border-gray-300 hover:bg-[#00bd7e33]" active-class="a-active"
          :to="`/cache/${id}/token`">
          Token
        </RouterLink>
      </nav>
    </header>

    <RouterView />
  </main>
</template>

<style>
.a-active {
  color: hsla(160, 100%, 37%, 1);
}

a.router-link-exact-active:hover {
  background-color: transparent;
}

/* nav a.router-link-exact-active {
  color: #2c3e50;
} */
</style>
