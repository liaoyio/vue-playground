<script setup lang="ts">
/* const props = defineProps({
  comAttrs: {
    type: Object,
    default: () => { },
  },
}) */
const attrs = useAttrs()
</script>

<template>
  <div class="p-4">
    <div>传递的参数：</div>
    <p>
      {{ JSON.stringify(attrs) }}
    </p>
  </div>
</template>
