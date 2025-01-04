<script lang="ts" setup>
import { ElButton } from "element-plus";
defineOptions({ name: "ButtonList" });

type Props = {
  list: {
    type?: | "text" | "default" | "success" | "warning" | "info" | "primary" | "danger";
    label: string;
    event: Parameters<typeof emit>[0];
  }[]
}

defineProps<Props>();

const emit = defineEmits([
  "handleExamine",
  "handleDelete",
  "handleDownload",
  "handleAdd",
]);

const callback = (event: Parameters<typeof emit>[0]) => {
  emit(event);
};
</script>

<template>
  <ElButton v-for="item in list" :key="item.label" :type="item.type" @click="callback(item.event)">
    {{ item.label }}
  </ElButton>
</template>
