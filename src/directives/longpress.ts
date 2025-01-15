import type { Directive, DirectiveBinding } from 'vue'

// 使用 WeakMap 存储元素和对应的事件处理器，避免内存泄漏
const elMapToMouseDownHandlers: WeakMap<Element, () => void> = new WeakMap()
const elMapToMouseUpHandlers: WeakMap<Element, () => void> = new WeakMap()

/**
 * @description: v-longpress指令,长按触发事件
 * @example
    _<button v-longpress:1000="handleFn">长按一段时间</button>
 */
export const vLongPress: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<number | undefined>) {
    setupLongPressHandlers(el, binding)
  },

  updated(el: HTMLElement, binding: DirectiveBinding<number | undefined>) {
    removeLongPressHandlers(el)
    setupLongPressHandlers(el, binding)
  },

  beforeUnmount(el: HTMLElement) {
    removeLongPressHandlers(el)
  },
}

function setupLongPressHandlers(el: HTMLElement, binding: DirectiveBinding<number | undefined>) {
  const { arg, value } = binding
  const duration = arg ? Number(arg) : 300

  if (Number.isNaN(duration) || duration <= 0) {
    console.warn('Invalid duration for v-longpress, using default 300ms')
  }

  if (typeof value !== 'function') {
    throw new TypeError('The value of v-longpress must be a function')
  }

  let timer: number | undefined

  const pressHandler = () => {
    timer = window.setTimeout(value, duration)
  }

  const clearTimeoutHandler = () => clearTimeout(timer)

  // 添加鼠标和触摸事件
  el.addEventListener('mousedown', pressHandler)
  el.addEventListener('mouseup', clearTimeoutHandler)
  el.addEventListener('touchstart', pressHandler)
  el.addEventListener('touchend', clearTimeoutHandler)

  elMapToMouseDownHandlers.set(el, pressHandler)
  elMapToMouseUpHandlers.set(el, clearTimeoutHandler)
}

function removeLongPressHandlers(el: HTMLElement) {
  const pressHandler = elMapToMouseDownHandlers.get(el)
  const clearTimeoutHandler = elMapToMouseUpHandlers.get(el)

  if (pressHandler) {
    el.removeEventListener('mousedown', pressHandler)
    el.removeEventListener('touchstart', pressHandler)
    elMapToMouseDownHandlers.delete(el)
  }

  if (clearTimeoutHandler) {
    el.removeEventListener('mouseup', clearTimeoutHandler)
    el.removeEventListener('touchend', clearTimeoutHandler)
    elMapToMouseUpHandlers.delete(el)
  }
}

// export default vLongPress
