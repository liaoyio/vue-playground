import type { Directive, DirectiveBinding } from 'vue'

interface BackTopElement extends HTMLElement {
  _handleClick: () => void
  style: CSSStyleDeclaration
}

interface ScrollableElement extends HTMLElement {
  scrollTop: number
}

const scrollHandlerMap = new WeakMap<Element | Window, EventListener>()

export const vBackTop: Directive = {
  mounted(el: BackTopElement, binding: DirectiveBinding<number | undefined>) {
    const target = binding.arg
      ? (document.getElementById(binding.arg) as Window | HTMLElement)
      : window

    // 定义滚动事件处理函数
    const handleScroll = () => {
      const scrollTop =
        target instanceof Window ? window.scrollY : (target as ScrollableElement).scrollTop
      el.style.visibility = scrollTop < (binding.value || 0) ? 'hidden' : 'unset'
    }

    // 初始化按钮状态
    handleScroll()

    const handleClick = () => target.scrollTo({ behavior: 'smooth', top: 0 })

    // 将事件处理器存储到元素上，便于解绑
    el._handleClick = handleClick
    el.addEventListener('click', handleClick)

    // 绑定滚动事件
    target.addEventListener('scroll', handleScroll)
    scrollHandlerMap.set(target, handleScroll)
  },

  unmounted(el: BackTopElement, binding: DirectiveBinding<number | undefined>) {
    const target = binding.arg
      ? (document.getElementById(binding.arg) as Window | HTMLElement)
      : window
    const handleScroll = scrollHandlerMap.get(target)

    // 移除滚动事件和点击事件
    if (handleScroll) {
      target.removeEventListener('scroll', handleScroll)
    }
    if (el._handleClick) {
      el.removeEventListener('click', el._handleClick)
    }
  }
}

// export default vBackTop
