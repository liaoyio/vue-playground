import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useUnityModal = createGlobalState(() => {
  const visible = ref(false)
  const injectAttrs = ref<Record<string, any>>({})
  const modalComponent = ref()

  /**
   * 切换UnityModal组件渲染的弹窗
   * @param com 组件，可传入两种类型，1.直接函数格式返回import动态导入 2.包含component属性的对象类型
   * @param attrs 弹窗组件属性，可使用`on事件`方式添加事件方法，属性支持Ref类型进行绑定以实现动态变化
   */
  async function onToggleComponent(com: any, attrs?: Record<string, any>) {
    try {
      // 兼容直接传入component对象格式与直接导入格式
      if (typeof com === 'function') {
        modalComponent.value = await com()
      } else if (typeof com === 'object' && com?.component) {
        modalComponent.value = await com.component()
      }
      injectAttrs.value = attrs || {}
      visible.value = true
    } catch (error) {
      console.error(error)
    }
  }

  return {
    visible,
    injectAttrs,
    modalComponent,
    onToggleComponent
  }
})
