import type { Directive, DirectiveBinding } from 'vue'

// 使用 WeakMap 存储元素与其对应的事件处理器，避免内存泄漏
const elMapToHandlers: WeakMap<Element, () => void> = new WeakMap()

// 使用 WeakMap 存储元素与其对应的事件名称，便于在解绑时查找
const elMapToEventName: WeakMap<Element, string> = new WeakMap()

function parseDirectiveArgs(arg: string | undefined): { eventName: string, delay: number } {
  if (!arg)
    return { eventName: 'click', delay: 1000 }
  const [eventName, delay] = arg.split('-')
  return {
    eventName: eventName || 'click',
    delay: delay && !Number.isNaN(Number(delay)) ? Number(delay) : 300,
  }
}

function removeEventListener(el: HTMLElement): void {
  const eventName = elMapToEventName.get(el)
  const handler = elMapToHandlers.get(el)

  if (eventName && handler) {
    el.removeEventListener(eventName as keyof HTMLElementEventMap, handler)
    elMapToHandlers.delete(el)
    elMapToEventName.delete(el)
  }
}

function addEventListener(el: HTMLElement, binding: DirectiveBinding): void {
  const { eventName, delay } = parseDirectiveArgs(binding.arg)
  if (typeof binding.value !== 'function') {
    throw new TypeError('The value of v-debounce must be a function')
  }
  let timer: undefined | number

  // 防抖处理器：在指定时间内多次触发事件，只执行最后一次
  const handler = (): void => {
    if (timer !== undefined) {
      clearTimeout(timer) // 如果定时器已存在，清除旧的
    }
    timer = window.setTimeout(() => {
      binding.value() // 执行绑定的回调函数
      timer = undefined // 重置定时器
    }, delay)
  }

  el.addEventListener(eventName, handler)
  elMapToHandlers.set(el, handler)
  elMapToEventName.set(el, eventName)
}

/**
 * @description: v-debounce 指令，用于实现事件的防抖功能
 * @example
 * <button v-debounce="debounceClick">防抖</button>
 */
export const vDebounce: Directive = {
  mounted(el: HTMLElement, binding) {
    addEventListener(el, binding)
  },
  updated(el: HTMLElement, binding) {
    removeEventListener(el)
    addEventListener(el, binding)
  },
  beforeUnmount(el: HTMLElement) {
    removeEventListener(el)
  },
}

// export default vDebounce
