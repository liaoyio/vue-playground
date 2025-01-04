import type { Directive, DirectiveBinding } from 'vue'

const elMapToHandlers: WeakMap<Element, () => void> = new WeakMap()
const elMapToEventName: WeakMap<Element, string> = new WeakMap()

function addEventListener(el: Element, binding: DirectiveBinding): void {
  const { arg, value } = binding
  const { eventName, delay } = parseDirectiveArgs(arg)

  if (typeof value !== 'function') {
    throw new TypeError('The value of v-throttle must be a function')
  }

  let lastExecTime = 0 // 记录上次事件执行时间

  // 节流处理器：限制事件触发频率
  const handler = (): void => {
    const currentTime = Date.now()
    // 如果时间间隔不足，直接返回
    if (currentTime - lastExecTime < delay) return
    // 更新上次执行时间，执行绑定的回调函数
    lastExecTime = currentTime
    value()
  }

  // 如果已存在相同事件的处理器，先移除旧的处理器
  const existingHandler = elMapToHandlers.get(el)
  if (existingHandler) el.removeEventListener(eventName, existingHandler)

  // 绑定新的事件处理器并存储到 WeakMap 中
  elMapToHandlers.set(el, handler)
  elMapToEventName.set(el, eventName)
  el.addEventListener(eventName, handler)
}

function parseDirectiveArgs(arg: string | undefined): { eventName: string; delay: number } {
  if (!arg) return { eventName: 'click', delay: 300 }
  const [eventName, delay] = arg.split('-')
  return {
    eventName: eventName || 'click',
    delay: delay && !Number.isNaN(Number(delay)) ? Number(delay) : 300
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

/**
 * @description: v-throttle 指令，用于实现事件的节流功能
 * @example
 * <button v-once v-throttle:click-2000="onSubmit">快速点击我</button>
 */
export const vThrottle: Directive = {
  beforeUnmount(el: HTMLElement) {
    removeEventListener(el)
  },
  mounted(el: HTMLElement, binding) {
    addEventListener(el, binding)
  },
  updated(el: HTMLElement, binding) {
    removeEventListener(el)
    addEventListener(el, binding)
  }
}

// export default vThrottle
