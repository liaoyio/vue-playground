import type { App, Directive } from 'vue'

// 定义 LazyLoad 类型
interface LazyLoadOptions {
  default: string // 默认图片地址
}

/**
 * 图片懒加载
 * @example
 *  <img v-LazyLoad="https://example.com/real-image.jpg" alt="Lazy Loaded Image" />
 */
const LazyLoad = {
  // install 方法
  install(Vue: App, options: LazyLoadOptions) {
    const defaultSrc = options.default

    // 定义指令
    const lazyDirective: Directive<HTMLImageElement, string> = {
      // 替换 bind 为 beforeMount，替换 inserted 为 mounted，符合 Vue 3 的生命周期
      beforeMount(el, binding) {
        LazyLoad.init(el, binding.value, defaultSrc)
      },
      mounted(el) {
        if ('IntersectionObserver' in window) {
          LazyLoad.observe(el)
        }
        else {
          LazyLoad.listenerScroll(el)
        }
      },
    }

    Vue.directive('lazy', lazyDirective)
  },

  // 初始化
  init(el: HTMLImageElement, val: string, def: string) {
    el.dataset.src = val
    el.setAttribute('src', def)
  },

  // 利用 IntersectionObserver 监听元素
  observe(el: HTMLImageElement) {
    const io = new IntersectionObserver((entries) => {
      const realSrc = el.dataset.src
      if (entries[0].isIntersecting && realSrc) {
        el.src = realSrc
        delete el.dataset.src
      }
    })
    io.observe(el)
  },

  // 监听 scroll 事件
  listenerScroll(el: HTMLImageElement) {
    const handler = LazyLoad.throttle(() => LazyLoad.load(el), 300)
    LazyLoad.load(el)
    window.addEventListener('scroll', handler)
  },

  // 加载真实图片
  load(el: HTMLImageElement) {
    const windowHeight = document.documentElement.clientHeight
    const elTop = el.getBoundingClientRect().top
    const elBottom = el.getBoundingClientRect().bottom
    const realSrc = el.dataset.src
    if (elTop - windowHeight < 0 && elBottom > 0 && realSrc) {
      el.src = realSrc
      delete el.dataset.src
    }
  },

  // 节流
  throttle(fn: (...args: any[]) => void, delay: number) {
    let timer: NodeJS.Timeout | null = null
    let prevTime: number | null = null

    return function (this: any, ...args: any[]) {
      const currTime = Date.now()

      if (!prevTime)
        prevTime = currTime
      if (timer)
        clearTimeout(timer)

      if (currTime - prevTime > delay) {
        prevTime = currTime
        fn.apply(this, args)
        return
      }

      timer = setTimeout(() => {
        prevTime = Date.now()
        timer = null
        fn.apply(this, args)
      }, delay)
    }
  },
}

export default LazyLoad
