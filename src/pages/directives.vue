<script setup lang="ts">
import { vDraggable as Draggable } from '@/directives/draggable'

const vDraggable = Draggable
</script>

<template>
  <main class="h-[800px] w-[800px] bg-red p-12">
    <div
      v-draggable :style="{
        width: '100px',
        height: '100px',
        background: 'blue',
        borderRadius: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'translateX(0px)',
      }"
    >
      拖拽我
    </div>
  </main>
</template>
