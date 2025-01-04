import type { Directive, DirectiveBinding } from 'vue'

// 扩展 HTMLElement，确保元素具有样式声明
interface BackTopElement extends HTMLElement {
  style: CSSStyleDeclaration
}

// 定义滚动容器接口，提供 scrollTop 属性支持
interface ScrollableElement extends HTMLElement {
  scrollTop: number
}
/**
 * v-backtop指令，为绑定的元素添加返回顶部的功能。
 * @example
 *  <button v-backtop> 点我返回顶部 </button>
 */
const vBackTop: Directive = {
  // 指令绑定时调用，用于初始化返回顶部功能
  mounted(el: BackTopElement, binding: DirectiveBinding) {
    // 获取滚动容器，优先使用参数指定的容器，否则默认为 window
    const target = binding.arg
      ? (document.getElementById(binding.arg) as Window | HTMLElement)
      : window

    // 绑定点击事件，实现平滑滚动到顶部
    el.addEventListener('click', () => {
      target.scrollTo({
        behavior: 'smooth', // 平滑滚动
        top: 0 // 滚动到顶部
      })
    })

    // 滚动事件处理，控制按钮的显示与隐藏
    const handleScroll = () => {
      const isScrolledUp = (target as ScrollableElement).scrollTop < (binding.value as number)
      el.style.visibility = isScrolledUp ? 'hidden' : 'unset' // 根据滚动位置切换按钮可见性
    }

    // 初始化时设置按钮的可见性
    if ((target as ScrollableElement).scrollTop < (binding.value as number)) {
      el.style.visibility = 'hidden'
    }

    // 为滚动容器添加滚动事件监听器
    ;(target as ScrollableElement).addEventListener('scroll', handleScroll)
  },

  // 指令解绑时调用，用于清理事件监听器
  unmounted(el: BackTopElement, binding: DirectiveBinding<number | undefined>) {
    const target = binding.arg
      ? (document.getElementById(binding.arg) as Window | HTMLElement)
      : window

    // 滚动事件处理函数，与 mounted 内一致
    const handleScroll = () => {
      const isScrolledUp = (target as ScrollableElement).scrollTop < (binding.value as number)
      el.style.visibility = isScrolledUp ? 'hidden' : 'unset'
    }

    // 移除滚动事件监听器
    ;(target as ScrollableElement).removeEventListener('scroll', handleScroll)

    // 移除点击事件监听器
    el.removeEventListener('click', handleScroll)
  },

  // 指令更新时调用，用于处理动态参数的变化
  updated(el: BackTopElement, binding: DirectiveBinding<number | undefined>) {
    const target = binding.arg
      ? (document.getElementById(binding.arg) as Window | HTMLElement)
      : window

    // 滚动事件处理函数，与 mounted 内一致
    const handleScroll = () => {
      const isScrolledUp = (target as ScrollableElement).scrollTop < (binding.value as number)
      el.style.visibility = isScrolledUp ? 'hidden' : 'unset'
    }

    // 根据新的绑定值动态添加或移除滚动事件监听器
    if (binding.value !== undefined) {
      ;(target as ScrollableElement).addEventListener('scroll', handleScroll)
    } else {
      ;(target as ScrollableElement).removeEventListener('scroll', handleScroll)
    }
  }
}

export default vBackTop
