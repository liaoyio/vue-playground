<script setup lang="ts">
import Father from '@/components/life-cycle/father.vue'

const child = ref(true)
</script>

<template>
  <main class="h-screen w-screen flex items-center justify-center">
    <div class="h-1/2 w-1/2 rounded-lg bg-gray-200 p-6">
      <div class="text-right hover:text-green-400/60 hover:underline hover:underline-2" @click="child = !child">
        {{ child ? "About" : "Child" }}
      </div>
      <Father v-if="child" />
      <div v-else class="flex flex-col gap-4 py-4">
        Other Page
      </div>
    </div>
  </main>
</template>
