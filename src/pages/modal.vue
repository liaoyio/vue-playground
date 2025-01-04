<script setup lang="ts">
import Modals from '@/components/modal/bad-use.vue'
import HookModals from '@/components/modal/good-case/index.vue'
</script>

<template>
  <div class="mx-auto max-w-screen-md p-6 space-y-4xl">
    <div class="flex flex-col gap-6">
      <h3>Bad ❌</h3>
      <Modals />
    </div>
    <div class="flex flex-col gap-6">
      <h3>Good ✅</h3>
      <HookModals />
    </div>
  </div>
</template>
