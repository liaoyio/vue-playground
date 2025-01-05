<script setup lang="ts"></script>

<template>
  <main class="">
    <nav>
      <router-link to="/pro-table">高级表格</router-link> |
      <router-link to="/pro-table/base">use-url-state</router-link> |
    </nav>
  </main>
</template>

<style lang="scss">
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
