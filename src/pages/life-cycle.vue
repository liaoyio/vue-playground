<script setup lang="ts">
import Father from "@/components/life-cycle/father.vue";

const child = ref(true);
</script>

<template>
  <main class="w-screen h-screen flex justify-center items-center">
    <div class="w-1/2 h-1/2 bg-gray-200 rounded-lg p-6">
      <div class="text-right hover:text-green-400/60 hover:underline-2 hover:underline" @click="child = !child">
        {{ child ? "About" : "Child" }}
      </div>
      <Father v-if="child" />
      <div v-else class="flex flex-col gap-4 py-4">Other Page</div>
    </div>
  </main>
</template>
