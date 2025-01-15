import type { Directive } from 'vue'

function handleMouseDown(el: HTMLElement, e: MouseEvent, handler: (e: MouseEvent) => void) {
  const { clientX, clientY } = e
  el.dataset.startX = clientX.toString()
  el.dataset.startY = clientY.toString()
  el.style.userSelect = 'none' // 禁止选择内容
  window.addEventListener('mousemove', handler)
}

function handleMouseUp(el: HTMLElement, handler: (e: MouseEvent) => void) {
  el.style.userSelect = '' // 恢复选择行为
  window.removeEventListener('mousemove', handler)
}
/**
 * @description: v-draggable指令，允许目标元素通过鼠标拖拽移动位置
 * @example
 * <div class="el-dialog" v-draggable></div>
 */
export const vDraggable: Directive = {
  mounted(el: HTMLElement) {
    let startX = 0
    let startY = 0
    let endX = 0
    let endY = 0

    el.style.cursor = 'move'

    const transformValue = window
      .getComputedStyle(el)
      .transform
      .split(',')
      .map(item => Number.parseInt(item))
      .slice(4, 6)

    if (transformValue.length > 1) {
      endX = transformValue[0] || 0
      endY = transformValue[1] || 0
    }

    const handler = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const offsetX = clientX - startX + endX
      const offsetY = clientY - startY + endY
      el.style.transform = `translate(${offsetX}px, ${offsetY}px)`
    }

    el.addEventListener('mousedown', (e: MouseEvent) => {
      startX = e.clientX
      startY = e.clientY
      handleMouseDown(el, e, handler)
    })

    window.addEventListener('mouseup', () => {
      endX = Number.parseFloat(el.style.transform.split(',')[0]?.replace('translate(', '') || '0')
      endY = Number.parseFloat(el.style.transform.split(',')[1]?.replace('px)', '') || '0')
      handleMouseUp(el, handler)
    })
  },
}

// export default vDraggable
