<script setup>
import { useDialog } from '@/components/dialog/use-dialog'

/*
vue3 中基于 el-dialog 的命令式弹框，直接使用JS控制

每次想要有一个弹框打开功能：
1. 引入 ElDialog
2. 定义一个弹框打开关闭的变量， 在点击事件中去更改这个响应式变量

能不能通过类似于alert('消息') 这种方式，来直接调用，实现效果 ?
- 可以通过 provide 和 inject 来实现
*/

const { openDialog, closeDialog } = useDialog()

function open() {
  const comAttrs = {
    name: '孙悟空',
    age: 500,
    home: '花果山',
  }
  const dialogAttrs = {
    title: 'Warning',
    width: 600,
    showClose: true,
    alignCenter: true,
    closeOnClickModal: false,
    beforeClose() {
      ElMessageBox.confirm('确定要关闭吗？')
        .then(() => {
          closeDialog()
        })
        .catch(() => {
          closeDialog()
        })
    },
  }
  openDialog(comAttrs, dialogAttrs)
}
</script>

<template>
  <div class="canvasWrap">
    <ElButton type="primary" @click="open">
      打开弹框
    </ElButton>
  </div>
</template>
