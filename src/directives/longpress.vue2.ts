import type { DirectiveBinding } from 'vue'

interface ElType extends HTMLElement {
  $value: string
  __handler__?: (e: Event) => void // 保存 handler 引用以便解绑
}
/**
 * 复制指令
 * @example
 * <div v-longpress="onLongPress">长按触发</div>
 *
 * const onLongPress = () => {
 *    console.log('长按触发')
 * }
 */
const longpress = {
  bind(el: ElType, binding: DirectiveBinding) {
    if (typeof binding.value !== 'function') {
      throw new TypeError('The value of the directive must be a function')
    }
    // 定义变量
    let pressTimer: null | NodeJS.Timeout = null

    // 创建计时器（ 2秒后执行函数 ）
    const start = (e: MouseEvent | TouchEvent) => {
      if (e.type === 'click' && (e as MouseEvent).button !== 0) {
        return
      }

      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler(e)
        }, 2000)
      }
    }
    // 取消计时器
    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }
    // 运行函数
    const handler = (e: any) => {
      binding.value(e)
    }

    // 添加事件监听器
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    // 取消计时器
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  },
  // 当传进来的值更新的时候触发
  componentUpdated(el: ElType, { value }: DirectiveBinding) {
    el.$value = value
  },
  // 指令与元素解绑的时候，移除事件绑定
  unbind(el: ElType) {
    // 移除事件监听器
    el.removeEventListener('mousedown', el.__handler__!)
    el.removeEventListener('touchstart', el.__handler__!)
    el.removeEventListener('click', el.__handler__!)
    el.removeEventListener('mouseout', el.__handler__!)
    el.removeEventListener('touchend', el.__handler__!)
    el.removeEventListener('touchcancel', el.__handler__!)
    delete el.__handler__
  }
}

export default longpress
