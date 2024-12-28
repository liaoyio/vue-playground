<script setup lang="ts">
const route = useRoute("/cache/[id]/");
const id = route.params.id;
</script>

<template>
  <div>Cache index id -> {{ id }}</div>
</template>

<style lang="scss"></style>
