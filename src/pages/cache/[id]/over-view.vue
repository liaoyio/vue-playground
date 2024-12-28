<script setup lang="ts">
const route = useRoute("/cache/[id]/");
const id = route.params.id;
</script>

<template>
  <div>Over view {{ id }}</div>
</template>

<style lang="scss"></style>
