import type { App } from 'vue'
import highlight from './highlight'
import { permiss } from './premission'
import { marker } from './water-marker'

// 汇总自定义指令
const directives = {
  highlight,
  permiss,
  marker,
}

export default {
  install(Vue: App) {
    // 遍历directives对象的key, 将每个directive注册到app中
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key as keyof typeof directives])
    })
  },
}
