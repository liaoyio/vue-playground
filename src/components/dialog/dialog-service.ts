import { ElDialog } from 'element-plus'
import { createVNode, h, ref, render } from 'vue'
import Body from './body.vue'
import Footer from './footer.vue'
import 'element-plus/theme-chalk/el-dialog.css'

const visible = ref(false)
let container: HTMLElement | null = null // 定义弹框挂载的 DOM 容器

/**
 * 打开弹框函数
 * @param comAttrs - 传递给 Body 组件的属性
 * @param dialogAttrs - 传递给 ElDialog 的属性
 */
function openDialog(comAttrs: Record<string, any>, dialogAttrs: Record<string, any>) {
  visible.value = true

  if (!container) {
    container = document.createElement('div')
    document.body.appendChild(container)
    const vNode = createVNode(ElDialog, {
      ...dialogAttrs,
      modelValue: visible.value,
    }, {
      default: () => h(Body, comAttrs),
      footer: () => h(Footer),
    })
    render(vNode, container)
  }
}

function closeDialog() {
  visible.value = false
  if (container) {
    // 清除渲染的内容并移除容器
    render(null, container)
    container.remove()
    container = null
  }
}

export { closeDialog, openDialog }
