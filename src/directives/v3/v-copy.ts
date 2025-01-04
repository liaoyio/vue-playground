import { ElMessage } from 'element-plus'
import type { Directive, DirectiveBinding } from 'vue'
import 'element-plus/theme-chalk/el-message.css'

function addEventListener(el: Element, binding: DirectiveBinding) {
  const { value } = binding
  if (!value) {
    console.log('无复制内容') // 值为空的时候，给出提示，可根据项目 UI 仔细设计
    return
  }

  el.setAttribute('copyValue', String(value))
  const copyHandler = (): void => {
    navigator.clipboard
      .writeText(el.getAttribute('copyValue') || '')
      .then(() => {
        console.log('复制成功')
        ElMessage({ message: '复制成功！', type: 'success' })
      })
      .catch(() => {
        console.log('复制失败！')
        ElMessage({ message: '复制失败！', type: 'warning' })
      })
  }

  el.addEventListener('click', copyHandler)
}

export const vCopy: Directive = {
  mounted(el: HTMLElement, binding) {
    addEventListener(el, binding)
  },
  updated(el: HTMLElement, binding) {
    const { value } = binding
    el.setAttribute('copyValue', String(value))
  }
}

// export default vCopy
