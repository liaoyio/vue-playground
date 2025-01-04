<script setup lang="ts">
import { Button, message } from 'ant-design-vue'
import Modal1 from './modal-1.vue'
import Modal2 from './modal-2.vue'

import Modal3 from './modal-3.vue'

const modal1Visible = ref(false)
const modal2Visible = ref(false)
const modal3Visible = ref(false)

const show1 = () => {
  modal1Visible.value = true
}
const show2 = () => {
  modal2Visible.value = true
}
const show3 = () => {
  modal3Visible.value = true
}

const onConfirm1 = () => {
  message.success('弹窗 1 点击了确定，进行 1 业务相关操作 🥸')
}
const onConfirm2 = () => {
  message.success('弹窗 2 点击了确定，进行 2 业务相关操作 🤩')
}
const onConfirm3 = () => {
  message.success('弹窗 3 点击了确定，进行 3 业务相关操作 🥳')
}
</script>

<template>
  <div class="flex gap-4">
    <Button type="primary" @click="show1"> 👉🏻 弹窗 1</Button>
    <Button type="primary" @click="show2"> 👉🏻 弹窗 3</Button>
    <Button type="primary" @click="show3"> 👉🏻 弹窗 4</Button>

    <Modal1 v-model:visible="modal1Visible" title="弹窗 1" @confirm="onConfirm1">
      弹窗 1 内容
    </Modal1>
    <Modal2 v-model:visible="modal2Visible" title="弹窗 2" @confirm="onConfirm2">
      弹窗 2 内容
    </Modal2>
    <Modal3 v-model:visible="modal3Visible" title="弹窗 3" @confirm="onConfirm3">
      弹窗 3 内容
    </Modal3>
  </div>
</template>
