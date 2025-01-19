<script setup lang="ts">
defineProps({
  childProps: {
    type: Object,
    default: () => { },
  },
})
</script>

<template>
  <div class="p-4">
    <div>传递的参数：</div>
    <p> ❌ props: {{ JSON.stringify(childProps) }} </p>
    <p> ✅ attrs: {{ JSON.stringify($attrs) }}</p>
  </div>
</template>
