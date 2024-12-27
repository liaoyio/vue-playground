<script setup lang="ts">
const router = useRoute();
const id = router.params.id;
</script>

<template>
  <div>Users -> {{ id }}</div>
</template>

<style lang="scss"></style>
