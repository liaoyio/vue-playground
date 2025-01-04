<script setup lang="ts">
import { Button, message } from "ant-design-vue";
import UnityModal from "./unity-modal.vue";
import { useShowModal } from "./use-show-modal";
defineOptions({ name: "HookModals" });

// 假如你的页面上有几十个弹窗，你会怎样优雅地展示它们？🧐
// https://juejin.cn/post/7454394839461249087

const { showModal } = useShowModal();
const buttons = [
  {
    label: "按钮 1",
    content: "弹窗1内容",
    onClick: () => {
      showModal("modal1", {
        content: "弹窗1内容",
        slot: "sd",
        onConfirm: () => message.success("弹窗1点击了确定, 进行1业务相关操作"),
      });
    },
  },
  {
    label: "按钮 2",
    content: "弹窗2内容",
    onClick: () => {
      showModal("modal2", {
        content: "弹窗2内容",
        slot: "sd",
        onConfirm: () => message.success("弹窗2点击了确定, 进行2业务相关操作"),
      });
    },
  },
  {
    label: "按钮 3",
    content: "弹窗3内容",
    onClick: () => {
      showModal("modal3", {
        content: "弹窗3内容",
        slot: "sd",
        onConfirm: () => message.success("弹窗3点击了确定, 进行3业务相关操作"),
      });
    },
  },
];
</script>

<template>
  <div class="flex gap-4">
    <Button v-for="btn in buttons" :key="btn.label" type="primary" @click="btn.onClick">
      👉🏻 {{ btn.label }}
    </Button>
    <UnityModal />
  </div>
</template>
