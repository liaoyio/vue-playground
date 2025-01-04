<script setup lang="ts">
import { vDraggable as Draggable } from "@/directives/draggable";

const vDraggable = Draggable;
</script>

<template>
  <main class="p-12 w-[800px] h-[800px] bg-red">
    <div v-draggable :style="{
      width: '100px',
      height: '100px',
      background: 'blue',
      borderRadius: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transform: 'translateX(0px)',
    }">
      拖拽我
    </div>
  </main>
</template>
