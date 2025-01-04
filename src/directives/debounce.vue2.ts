import type { DirectiveBinding } from 'vue'

/**
 * 防抖函数
 * @example
 *   <button v-debounce="debounceClick">防抖</button>
 *
 * const debounceClick = () => {
 *    console.log('只触发一次')
 * }
 */
const debounce = {
  inserted(el: HTMLElement, binding: DirectiveBinding) {
    let timer: null | NodeJS.Timeout
    el.addEventListener('keyup', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, 1000)
    })
  }
}

export default debounce
