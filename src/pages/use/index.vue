<script setup lang="ts">
import child from '@/components/child.vue'

const childProps = { name: 'li', age: 18 }
const Child = h(child, { childProps })
</script>

<template>
  <Child />
</template>
